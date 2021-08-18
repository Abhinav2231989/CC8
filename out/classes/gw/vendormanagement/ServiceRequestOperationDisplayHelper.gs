package gw.vendormanagement

/**
 * Provides static methods that define the labels and title for the OperationReasonPromptPopup 
 * corresponding to the ServiceRequestOperation that requires a reason when executed.
 */
@Export
class ServiceRequestOperationDisplayHelper {
  
  private static var OPERATIONS : java.util.Map<ServiceRequestOperation, ServiceRequestOperationReasonDefinition> = {
    
      ServiceRequestOperation.TC_SPECIALISTWAITING    -> new ServiceRequestOperationReasonDefinition(
                                                        displaykey.Web.ServiceRequest.StateTransition.SpecialistWaitingPopup.Title, 
                                                        displaykey.Web.ServiceRequest.StateTransition.SpecialistWaitingPopup.ChangeDescription,
                                                        displaykey.Web.ServiceRequest.StateTransition.OperationReasonPopup.Update,
                                                        displaykey.Web.ServiceRequest.StateTransition.OperationReasonPopup.Cancel),
      ServiceRequestOperation.TC_REJECTINVOICE        -> new ServiceRequestOperationReasonDefinition(
                                                        displaykey.Web.ServiceRequest.StateTransition.RejectInvoicePopup.Title, 
                                                        displaykey.Web.ServiceRequest.StateTransition.RejectInvoicePopup.ChangeDescription, 
                                                        displaykey.Web.ServiceRequest.StateTransition.RejectInvoicePopup.RejectButton,
                                                        displaykey.Web.ServiceRequest.StateTransition.RejectInvoicePopup.CancelButton),
      ServiceRequestOperation.TC_SPECIALISTDECLINED   -> new ServiceRequestOperationReasonDefinition(
                                                        displaykey.Web.ServiceRequest.StateTransition.DeclinePopup.Title, 
                                                        displaykey.Web.ServiceRequest.StateTransition.DeclinePopup.ChangeDescription, 
                                                        displaykey.Web.ServiceRequest.StateTransition.OperationReasonPopup.Update,
                                                        displaykey.Web.ServiceRequest.StateTransition.OperationReasonPopup.Cancel),
      ServiceRequestOperation.TC_CANCELSERVICEREQUEST-> new ServiceRequestOperationReasonDefinition(
                                                        displaykey.Web.ServiceRequest.StateTransition.CancelPopup.Title, 
                                                        displaykey.Web.ServiceRequest.StateTransition.CancelPopup.ChangeDescription, 
                                                        displaykey.Web.ServiceRequest.StateTransition.CancelPopup.CancelServiceRequest,
                                                        displaykey.Web.ServiceRequest.StateTransition.CancelPopup.CancelWorksheet),
      ServiceRequestOperation.TC_SPECIALISTCANCELED   -> new ServiceRequestOperationReasonDefinition(
                                                        displaykey.Web.ServiceRequest.StateTransition.SpecialistCancelPopup.Title, 
                                                        displaykey.Web.ServiceRequest.StateTransition.SpecialistCancelPopup.ChangeDescription, 
                                                        displaykey.Web.ServiceRequest.StateTransition.CancelPopup.CancelServiceRequest,
                                                        displaykey.Web.ServiceRequest.StateTransition.CancelPopup.CancelWorksheet),
      ServiceRequestOperation.TC_WITHDRAWINVOICE      -> new ServiceRequestOperationReasonDefinition(
                                                        displaykey.Web.ServiceRequest.StateTransition.WithdrawInvoicePopup.Title, 
                                                        displaykey.Web.ServiceRequest.StateTransition.WithdrawInvoicePopup.ChangeDescription, 
                                                        displaykey.Web.ServiceRequest.StateTransition.WithdrawInvoicePopup.WithdrawButton,
                                                        displaykey.Web.ServiceRequest.StateTransition.WithdrawInvoicePopup.CancelButton),
      ServiceRequestOperation.TC_UNPAYINVOICE         -> new ServiceRequestOperationReasonDefinition(
                                                        displaykey.Web.ServiceRequest.StateTransition.UnpayInvoicePopup.Title,
                                                        displaykey.Web.ServiceRequest.StateTransition.UnpayInvoicePopup.ChangeDescription,
                                                        displaykey.Web.ServiceRequest.StateTransition.OperationReasonPopup.Update,
                                                        displaykey.Web.ServiceRequest.StateTransition.OperationReasonPopup.Cancel)
  }

  static function getPopupTitle(operation: ServiceRequestOperation, invoice: ServiceRequestInvoice) : String {
    return OPERATIONS[operation].PopupTitle + (invoice.ReferenceNumber.HasContent ? " " + invoice.ReferenceNumber : "")
  }

  static function getReasonLabel(operation: ServiceRequestOperation) : String {
    return OPERATIONS[operation].ReasonLabel
  }

  static function getUpdateLabel(operation: ServiceRequestOperation) : String {
    return OPERATIONS[operation].UpdateLabel
  }

  static function getCancelLabel(operation: ServiceRequestOperation) : String {
    return OPERATIONS[operation].CancelLabel
  }
  
  static class ServiceRequestOperationReasonDefinition {
    var _popupTitle : String as readonly PopupTitle
    var _reasonLabel : String as readonly ReasonLabel
    var _updateLabel : String as readonly UpdateLabel  
    var _cancelLabel : String as readonly CancelLabel  
    
    construct(popupTitleValue: String, reasonLabelValue: String, updateLabelValue : String, cancelLabelValue: String) { 
      _popupTitle = popupTitleValue
      _reasonLabel = reasonLabelValue
      _updateLabel = updateLabelValue
      _cancelLabel = cancelLabelValue
    }
  }
}
