package gw.exposure.metric.financials
uses gw.api.exposure.metric.TimeBasedExposureMetricMethodsImpl
uses java.util.Date
uses gw.api.metric.MetricUpdateHelper
uses gw.api.database.Query

@Export
class TimeToFirstPaymentExposureMetricMethodsImpl extends TimeBasedExposureMetricMethodsImpl {

  construct(timeToFirstPaymentExposureMetric : TimeToFirstPaymentExposureMetric) {
    super(timeToFirstPaymentExposureMetric)
  }
  
  override function updateMetricValue(helper : MetricUpdateHelper) : Date {
    var exposure = Metric.Exposure
    if (Metric.StartTime == null) {
      Metric.StartTime = Metric.getCreateTime(exposure)
    }
    
    if (Metric.New or helper.updateContainsChangesOfType(Payment)) {
      var earliestSubmitTime = getEarliestSubmitTime()
      if (earliestSubmitTime != null) {
        close(earliestSubmitTime)
      }
    }
    
    handleExposureStateChange()
    return null
  }
  
  override property get ApplicableDisplayValue() : String {
    return Metric.IsOpen or Metric.Skipped
            ? displaykey.Web.Claim.TimeToFirstPaymentExposureMetric.NoPaymentMade
            : super.ApplicableDisplayValue
  }
  
  private function getEarliestSubmitTime() : Date {
    var normalPayment = Query.make(Payment).compareIn("Payment.Status", {TransactionStatus.TC_SUBMITTING, TransactionStatus.TC_SUBMITTED} as java.lang.Object[])
                                                 .compare("CostType", Equals, CostType.TC_CLAIMCOST)
                                                 .compare("Exposure", Equals, Metric.Exposure)
                                                 .join("Payment.Check").compare("Check.ScheduledSendDate", NotEquals, null)
                                                 .select().orderBy(\ p -> p.Check.ScheduledSendDate)
                                                 .FirstResult
                                                 
    var manualPayment = Query.make(Payment).compareIn("Payment.Status", {TransactionStatus.TC_SUBMITTING, TransactionStatus.TC_SUBMITTED} as java.lang.Object[])
                                                 .compare("CostType", Equals, CostType.TC_CLAIMCOST)
                                                 .compare("Exposure", Equals, Metric.Exposure)
                                                 .join("Payment.Check").compare("Check.ScheduledSendDate", Equals, null)
                                                 .select().orderBy(\ p -> p.Check.IssueDate)
                                                 .FirstResult
    var date : Date
    var payment : Payment
    if (normalPayment != null and manualPayment != null) {
      payment = normalPayment.Check.ScheduledSendDate < manualPayment.Check.IssueDate ? normalPayment : manualPayment
    } else {
      payment = normalPayment ?: manualPayment
    }
    
    if (payment != null) {
      date = payment.Check.ScheduledSendDate ?: payment.Check.IssueDate
    }
    var dateFromBundle = getEarliestSubmitTimeFromBundle()
    if (date == null or dateFromBundle < date) {
      date = dateFromBundle
    }
    return date
  }

  private function getEarliestSubmitTimeFromBundle() : Date { 
    var payments = Metric.Exposure.Bundle.getInsertedAndUpdatedBeansOfType( Payment )
                        .where( \ p -> (p.Status == TransactionStatus.TC_SUBMITTING or p.Status == TransactionStatus.TC_SUBMITTED)
                                       and p.CostType == CostType.TC_CLAIMCOST
                                       and p.Exposure == Metric.Exposure)
                        .orderBy( \ p -> p.Check.ScheduledSendDate ?: p.Check.IssueDate)
    if (payments.Count > 0) {
      return payments.first().Check.ScheduledSendDate ?: payments.first().Check.IssueDate
    } else {
      return null
    }
  }
}
