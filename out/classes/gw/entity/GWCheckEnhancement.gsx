package gw.entity

uses gw.api.util.LocaleUtil

uses java.lang.IllegalStateException
uses java.util.Date

@Export
enhancement GWCheckEnhancement : Check {
  
  /**
   * Return service period display key for check if both the start and end period are non-null.
   */
  property get ServicePeriodString() : String {
    var shortFormat = LocaleUtil.CurrentLocale.getOutputDateFormat(SHORT, null)
    return (this.ServicePdStart == null or this.ServicePdEnd == null) ? "" :
            displaykey.Java.Financials.Check.ServicePeriod(shortFormat.format(this.ServicePdStart), shortFormat.format(this.ServicePdEnd))
  }  
  
  property set EFTData(contactEFT : EFTData) {
    this.AccountName = contactEFT.AccountName
    this.PayTo = contactEFT.AccountName
    this.BankAccountNumber = contactEFT.BankAccountNumber
    this.BankAccountType = contactEFT.BankAccountType
    this.BankName = contactEFT.BankName
    this.BankRoutingNumber = contactEFT.BankRoutingNumber
  }
  
  property get EFTData() : EFTData {
    if (this.FirstPayee.Payee.EFTRecords.Count > 0) {
      return this.FirstPayee.Payee.EFTRecords.where( \ e -> e.BankAccountNumber == this.BankAccountNumber ).first()    
    }
    return null
  }

  /**
   * Adds a string to the beginning of this check's comments, separated by a ';', or sets the comment to be the given
   * string if the check previously had no comments.
   *
   * @param comment the string to prepend
   */
  public function prependComment(comment : String) {
    if (this.Comments == null || this.Comments.Empty) {
      this.Comments = comment
    } else if (comment != null && !comment.Empty) {
      this.Comments = comment + "; " + this.Comments
    }
  }
  
  /**
   * This method sets the MailTo, MailToAddress, and Reportability fields
   * based on the FirstPayee values.
   */
  private function setPrimaryPayeeRelatedFields() {
    var payee = this.FirstPayee
    this.MailTo = payee.Payee.DisplayName
    this.MailToAddress = payee.Payee.getPrimaryAddressDisplayValue()
    this.Reportability = (payee.PayeeType == "vendor") ? "reportable" : "notreportable";
  }
  
  /**
   * If payment method is not EFT, resets PayTo field by joining all the payee displayNames with " & "
   */
  public function reconstructPayTo() {
    if (this.PaymentMethod != PaymentMethod.TC_EFT) {
      var joiner = com.google.common.base.Joiner.on(" & ").skipNulls()
      this.PayTo = joiner.join(this.Payees.map(\ c -> c.Payee.DisplayName))
    }
  }
  
  /**
   * Operates on a single check (e.g., each check in a group).
   */
  public function resetCloneFields( originalCheck : Check ) {
    this.ScheduledSendDate = Date.getTodayOrNextBusinessDay(this.BusinessCalendarAddress)
    this.IssueDate = null
    this.ServicePdStart = null
    this.ServicePdEnd = null

    // If CheckNumbers are set through the API by the downstream system, then this clone's CheckNumber will likely be
    // set again when it is requested.
    this.CheckNumber = null

    if( originalCheck.Status != TransactionStatus.TC_DENIED ) {
      this.Comments = null
      this.InvoiceNumber = null
    }
  }

  /**
   * Performs actions on a newly-cloned check and its group members before the user gets to edit it.
   */
  public function prepareClone( originalCheck : Check ) {
    this.removeClonedDeductibleLineItems()

    if( this.isGroupMember(false) ) {
      for( c in this.Group.Checks ) {
        c.resetCloneFields( originalCheck )
      }
    } else {
      this.resetCloneFields( originalCheck )
    }
  }

  /**
   * Returns a copy of this check for reissuance. This sets these fields:
   * <ul>
   * <li> CheckNumber = null
   * <li> IssueDate = null
   * <li> ScheduledSendDate = &lt;today&gt;
   * <li> Comments = null
   * <li> Status = {@link TransactionStatus#TC_AWAITINGSUBMISSION}
   * </ul>
   * If this is a primary check, the returned check will be a secondary check (since it won't have any payments yet);
   * when {@link #voidAndReissue} or {@link #stopAndReissue} is eventually called, the checks will swap roles:
   * the old check will become a secondary check, the new check will become the primary check, and the payments and
   * deductions will be moved to the new check.
   *
   * @return a new Check bean that is a copy of this check for purposes of reissuance.
   * @throws IllegalStateException if the check is not reissuable
   */
  public function createCheckForReissue() : Check {
    var newCheck = this.coreCreateCheckForReissue()
    newCheck.CheckNumber = null
    newCheck.IssueDate = null
    newCheck.ScheduledSendDate = Date.getTodayOrNextBusinessDay(this.BusinessCalendarAddress)
    newCheck.Comments = null
    return newCheck
  }

  /**
   * This method cleans up fields related to specific Payment Method
   * -for Check, it will null out bankAccountNumber, bankName, bankAccountType,
   *   and bankRoutingNumber
   * -for EFT, it will null out mailToAddress, mailTo, and DeliveryMethod.
   */
  public function removeUnusedPaymentMethodRelatedFields() {
    if (this.PaymentMethod == PaymentMethod.TC_CHECK) {
      this.BankAccountNumber = null
      this.BankName = null
      this.BankAccountType = null
      this.BankRoutingNumber = null
    } else if (this.PaymentMethod == PaymentMethod.TC_EFT) {
      this.MailToAddress = null
      this.MailTo = null
      this.DeliveryMethod = null
    }
  }

  /**
   * This method handles payee changes.  
   * - set PayeeType
   * - populate PayTo field with the correct payTo if not EFT payment
   * - Sync up the EFT fields if payment method is EFT
   * - set/reset the primary payee fields
   */
  public function handleOnPickForPayee(checkPayee : CheckPayee) {
    if (checkPayee != null) {
      checkPayee.PayeeType = this.getSuggestedPayeeType(checkPayee.Payee);
    }
        
    reconstructPayTo()
    
    setPrimaryPayeeRelatedFields()
  }
  
  /*
    This method works with the legacy deductible feature, which was completely replaced by the new
    deductible support in ClaimCenter 6.0. To continue using this method and legacy deductibles,
    uncomment this method and make sure DeductibleSubtracted and the related properties are added
    to Payment.etx and Transaction.etx.

  function isDeductibleSubtracted() : Boolean {
    for (payment in this.Payments) {
      if (payment.DeductibleSubtracted) {
        return true
      }
    }
    return false;
  }
  */

  property get LinkedToServiceRequests() : boolean {
    return this.ServiceRequestInvoices.HasElements
  }

  /**
   * Gets the specialist for the service requests linked to this check through service request invoices (they are
   * all expected to have the same specialist).
   * @throws IllegalStateException  if this check is not linked to any service request invoices (LinkedToServiceRequests
   *                                is false)
   */
  property get ServiceRequestSpecialist() : Contact {
    if (not LinkedToServiceRequests) {
      throw new IllegalStateException("this property may only be evaluated when the check is linked to service requests")
    }
    // All service request invoices linked to a check are expected to be on service requests with the same specialist,
    // so just get the specialist off the first
    return this.ServiceRequestInvoices.first().ServiceRequest.Specialist
  }

  /**
   * Gets the currency for the service requests linked to this check through service request invoices (they are
   * all expected to have the same currency).
   * @throws IllegalStateException  if this check is not linked to any service request invoices (LinkedToServiceRequests
   *                                is false)
   */
  property get ServiceRequestCurrency() : Currency {
    if (not LinkedToServiceRequests) {
      throw new IllegalStateException("this property may only be evaluated when the check is linked to service requests")
    }
    // All service request invoices linked to a check are expected to be on service requests with the same currency,
    // so just get the currency off the first
    return this.ServiceRequestInvoices.first().ServiceRequest.Currency
  }

  /**
   * Gets a string containing a bulleted list of invoices associated with this Service for use in warning messages
   * for when a check operations will affect the invoices
   * (e.g., {@link displaykey.Java.Financials.DeleteCheckWithInvoices.Tip.Payment}).
   * Returns null if there aren't any invoices.
   */
  property get BulletedListOfServiceRequestInvoicesForWarning() : String {
    var orderedInvoices = this.ServiceRequestInvoices
        .orderBy(\ invoice -> invoice.ServiceRequest.ServiceRequestNumber)
        .thenBy(\ invoice -> invoice.ReferenceNumber ?: "")
    var bullets = orderedInvoices.map( \ invoice -> {
      var invoiceRefNum = invoice.ReferenceNumber.HasContent ? invoice.ReferenceNumber : displaykey.Java.Financials.Check.LinkedInvoiceWarningBullet.NoInvoiceRefNumber
      return displaykey.Java.Financials.Check.LinkedInvoiceWarningBullet.Bullet(invoiceRefNum,invoice.ServiceRequest.ServiceRequestNumber)
    })
    return bullets.HasElements ? bullets.join("") : null
  }

  private function unlinkServiceRequestInvoice(changeDescriptionWithRefNumKey : String, changeDescriptionKey : String) {
    for (invoice in this.ServiceRequestInvoices) {
      var newStatus = ServiceRequestInvoiceStatus.TC_APPROVED
      invoice.Status = newStatus
      invoice.Check = null
      var description : String
      if (invoice.ReferenceNumber.HasContent) {
        description = gw.api.domain.DisplayKey.getDisplayKeyValue(changeDescriptionWithRefNumKey, {this.DisplayName, invoice.ReferenceNumber, newStatus.DisplayName})
      } else {
        description = gw.api.domain.DisplayKey.getDisplayKeyValue(changeDescriptionKey, {this.DisplayName, newStatus.DisplayName})
      }
      invoice.ServiceRequest.recordChange(description, null, invoice, User.util.CurrentUser.Contact)
    }
  }

  /**
   * Finds all the service request invoices linked to this check, unlinks them, moves them back to Approved status,
   * and records a history event on the service request stating that the check was deleted.
   */
  public function unlinkServiceRequestInvoicesForDelete() {
    unlinkServiceRequestInvoice("Web.ServiceRequest.StateTransition.Description.InvoiceUnlinked.InvoiceCheckDeletedWithReferenceNumber",
                                "Web.ServiceRequest.StateTransition.Description.InvoiceUnlinked.InvoiceCheckDeleted")
  }

  /**
   * Finds all the service request invoices linked to this check, unlinks them, moves them back to Approved status,
   * and records a history event on the service request stating that the check was voided.
   */
  public function unlinkServiceRequestInvoicesForVoid() {
    unlinkServiceRequestInvoice("Web.ServiceRequest.StateTransition.Description.InvoiceUnlinked.InvoiceCheckVoidedWithReferenceNumber",
                                "Web.ServiceRequest.StateTransition.Description.InvoiceUnlinked.InvoiceCheckVoided")
  }

  /**
   * Finds all the service request invoices linked to this check, unlinks them, moves them back to Approved status,
   * and records a history event on the service request stating that the check was stopped.
   */
  public function unlinkServiceRequestInvoicesForStop() {
    unlinkServiceRequestInvoice("Web.ServiceRequest.StateTransition.Description.InvoiceUnlinked.InvoiceCheckStoppedWithReferenceNumber",
                                "Web.ServiceRequest.StateTransition.Description.InvoiceUnlinked.InvoiceCheckStopped")
  }

  /**
   * Finds all the service request invoices linked to this check, unlinks them, moves them back to Approved status,
   * and records a history event on the service request stating that the check was transferred.
   */
  public function unlinkServiceRequestInvoicesForTransfer() {
    unlinkServiceRequestInvoice("Web.ServiceRequest.StateTransition.Description.InvoiceUnlinked.InvoiceCheckTransferredWithReferenceNumber",
                                "Web.ServiceRequest.StateTransition.Description.InvoiceUnlinked.InvoiceCheckTransferred")
  }

}
