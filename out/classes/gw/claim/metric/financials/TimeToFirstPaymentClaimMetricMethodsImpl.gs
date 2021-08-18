package gw.claim.metric.financials
uses java.util.Date
uses gw.api.claim.metric.TimeBasedClaimMetricMethodsImpl
uses gw.api.metric.MetricUpdateHelper
uses gw.api.database.Query

@Export
class TimeToFirstPaymentClaimMetricMethodsImpl extends TimeBasedClaimMetricMethodsImpl {
  
  construct(timeToFirstPaymentClaimMetric : TimeToFirstPaymentClaimMetric) {
    super(timeToFirstPaymentClaimMetric, "ClaimFinancialsMetrics")
  }
  
  override function updateMetricValue(helper : MetricUpdateHelper) : Date {
    Metric.StartTime = Metric.Claim.ReportedDate
    if (Metric.New or helper.updateContainsChangesOfType(Payment) or ReportedDateChanged) {
      var earliestSubmitTime = getEarliestSubmitTime()
      if (earliestSubmitTime != null) {
        close(earliestSubmitTime)
      } else if (not Metric.IsOpen and not Metric.Skipped) {
        // Metric closed, but no payment. Can happen if payment rejected
        Metric.IsOpen = true
        Metric.IntegerValue = null
      }
    } 
    handleClaimStateChange()
    return null
  }

  override property get ApplicableDisplayValue() : String {
    return Metric.IsOpen or Metric.Skipped
            ? displaykey.Web.Claim.TimeToFirstPaymentClaimMetric.NoPaymentMade
            : super.ApplicableDisplayValue
  }

  private function getEarliestSubmitTime() : Date {
    var bundlePayments = Metric.Claim.Bundle.getInsertedAndUpdatedBeansOfType(Payment)
    var dbNormalPaymentsIterator = Query.make(Payment).compareIn("Payment.Status", {TransactionStatus.TC_SUBMITTING, TransactionStatus.TC_SUBMITTED} as java.lang.Object[])
                                                 .compare("CostType", Equals, CostType.TC_CLAIMCOST)
                                                 .compare("Payment.Claim", Equals, Metric.Claim)
                                                 .join("Payment.Check").compare("Check.ScheduledSendDate", NotEquals, null)
                                                 .select().orderBy(\ p -> p.Check.ScheduledSendDate)
                                                 .iterator()
    var dbManualPaymentsIterator = Query.make(Payment).compareIn("Payment.Status", {TransactionStatus.TC_SUBMITTING, TransactionStatus.TC_SUBMITTED} as java.lang.Object[])
                                                 .compare("CostType", Equals, CostType.TC_CLAIMCOST)
                                                 .compare("Payment.Claim", Equals, Metric.Claim)
                                                 .join("Payment.Check").compare("Check.ScheduledSendDate", Equals, null)
                                                 .select().orderBy(\ p -> p.Check.IssueDate)
                                                 .iterator()
    
    var firstBundleCheck = bundlePayments.where( \ p -> (p.Status == "submitting" or p.Status == "submitted")
                                     and p.CostType == "claimcost"
                                     and p.Claim == Metric.Claim )
                                .orderBy( \ p -> p.Check.ScheduledSendDate ?: p.Check.IssueDate )
                                .first().Check
    var firstBundleSubmitDate = firstBundleCheck.ScheduledSendDate ?: firstBundleCheck.IssueDate

    // compare the first submit date found in the changed payments to the first found in
    // the unchanged payments
    var firstDBNormalPaymentDate : Date
    while (firstDBNormalPaymentDate == null and dbNormalPaymentsIterator.hasNext()) {
      var dbPayment = dbNormalPaymentsIterator.next()
      if (not bundlePayments.contains(dbPayment)) {
        firstDBNormalPaymentDate = dbPayment.Check.ScheduledSendDate
      }
    }
    
    var firstDBManualPaymentDate : Date
    while (firstDBManualPaymentDate == null and dbManualPaymentsIterator.hasNext()) {
      var dbPayment = dbManualPaymentsIterator.next()
      if (not bundlePayments.contains(dbPayment)) {
        firstDBManualPaymentDate = dbPayment.Check.IssueDate
      }
    }
    return earliest(earliest(firstDBNormalPaymentDate, firstDBManualPaymentDate), firstBundleSubmitDate)
  }
  
  private function earliest(date1 : Date, date2 : Date) : Date {
    if (date1 == null) {
      return date2
    } else if (date2 == null or date1 < date2) {
      return date1
    } else {
      return date2
    }
  }
}
