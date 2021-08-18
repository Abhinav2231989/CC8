package gw.entity

uses gw.vendormanagement.ServiceRequestStatementEditHelper
uses gw.vendormanagement.ServiceRequestStatus
uses gw.vendormanagement.servicerequeststate.ServiceRequestInvoiceOperationDefinition
uses gw.vendormanagement.servicerequeststate.ServiceRequestOperationDefinition
uses gw.vendormanagement.servicerequeststate.ServiceRequestOperationUnavailableException
uses gw.vendormanagement.servicerequeststate.ServiceRequestStateHandler

uses java.lang.IllegalArgumentException
uses java.util.Collection

@Export
enhancement GWServiceRequestInvoiceEnhancement : entity.ServiceRequestInvoice {

  function pay() {
    performOperation(ServiceRequestOperation.TC_PAYINVOICE, new ServiceRequestInvoiceOperationDefinition.OperationContext(), false)
  }

  function finishSetup(isSpecialist : boolean) {
    
    this.Status = ServiceRequestInvoiceStatus.TC_WAITINGFORAPPROVAL
    var serviceRequest = this.ServiceRequest
    ServiceRequestStatementEditHelper.removeUnusedDocuments(this)
    
    var context = new ServiceRequestOperationDefinition.OperationContext(){:Statement = this}
    serviceRequest.performOperation(TC_ADDINVOICE, context, isSpecialist)
    ServiceRequestStatementEditHelper.clearAttachedToStatementDocuments(this)
  }
  
  /**
   * Checks the availability of an operation given the invoice status and service request's current progress.
   * @param operation  to check for availability
   * @param toSpecialist  whether availability should be checked for specialists or for anyone
   * @return true if the ServiceRequestOperation is available given the invoice's status, false otherwise
   */
  function operationAvailable(operation : ServiceRequestOperation, toSpecialist : boolean = false, stateHandler : ServiceRequestStateHandler = null) : boolean {
    // No operation is available until a handler is defined
    var stateHandlerSafe = stateHandler ?: this.ServiceRequest.createStateHandler()
    if (stateHandlerSafe == null) {
      return false
    }

    // If there is not a definition for the operation in the implementation for invoice's ServiceRequest.Kind
    var operationDefinition = stateHandlerSafe.getInvoiceOperationDefinition(operation)
    if (operationDefinition == null) {
      return false
    }

    // No operation is available if the Service Request has been promoted
    if (this.ServiceRequest.AlreadyPromoted) {
      return false
    }

    if (not operationDefinition.AvailableExpression(this)  or
        (toSpecialist and not operationDefinition.AvailableToSpecialistExpression(this))) {
      return false
    }

    return true
  }
  
  /**
   * Performs an operation on the invoice such as approving, adding, rejecting or paying an invoice
   * @param operation to perform
   * @param reason optional reason to record in a history record
   * @param commitInNewBundle flag to indicate if the operation should happen in a separate bundle
   */
  function performOperation(operation : ServiceRequestOperation, context: ServiceRequestInvoiceOperationDefinition.OperationContext, isSpecialist : boolean = false, stateHandler : ServiceRequestStateHandler = null) {
    var stateHandlerSafe = stateHandler ?: this.ServiceRequest.createStateHandler()
    var definition = (stateHandlerSafe)?.getInvoiceOperationDefinition(operation)
    if (not operationAvailable(operation, isSpecialist, stateHandlerSafe)) {
      throw new ServiceRequestOperationUnavailableException(operation.DisplayName, this)
    }
    if (context == null) {
      context = new ServiceRequestInvoiceOperationDefinition.OperationContext()
    } else {
      context = new ServiceRequestInvoiceOperationDefinition.OperationContext(context)
    }
    
    // Validate the fields in the context are correct
    var requiredFields = ServiceRequestOperationDefinition.getRequiredFields(operation)
    if(requiredFields*.RootType.hasMatch(\ i -> i != context.IntrinsicType)) {
      throw new IllegalArgumentException("The required fields for '" + operation.DisplayName + "' contains OperationContext properties that are not compatible with the current context")
    } 
    
    for (field in gw.vendormanagement.servicerequeststate.ServiceRequestInvoiceOperationDefinition.OperationContext.Type.TypeInfo.DeclaredProperties.where(\ prop -> prop.Public)) {
      if (requiredFields*.PropertyInfo.contains(field)) {
        if (field.Accessor.getValue(context) == null) {
          throw new IllegalArgumentException("The field '" + field.DisplayName + "' is required in the OperationContext to perform the operation '" + operation.DisplayName +"'")
        }
      } else {
        if (field.Accessor.getValue(context) != null) {
          throw new IllegalArgumentException("You must add '" + field.DisplayName + "' as a required field in ServiceRequestOperation for operation '" + operation.DisplayName +"'")
        }
      }
    }
    
    if (context.Operation != null) {
      throw new IllegalArgumentException("Operation cannot be specified on an OperationContext passed to performOperation; it will be set automatically")
    }
    if (context.PerformedBySpecialist != null) {
      throw new IllegalArgumentException("PerformedBySpecialist cannot be specified on an OperationContext passed to performOperation; it will be set automatically")
    }
    context.Operation = operation
    context.PerformedBySpecialist = isSpecialist
    
    transitionServiceRequestStateAndRecordChange(definition,
                                                 context)
  }
  
  /**
   * Checks if any of the given operations are available to anyone
   */
  function anyOperationAvailable (operations: Collection<ServiceRequestOperation>, stateHandler : ServiceRequestStateHandler = null): boolean {
    return operations.hasMatch(\ operation -> operationAvailable(operation,false, stateHandler))
  }

  /**
   * Gets the action icon for this Invoice 
   */
  property get ActionRequiredIcon(): ServiceRequestStatus {
    return ActionRequiredVisible ? ServiceRequestStatus.ATTENTION : ServiceRequestStatus.NONE
  }
  
  /**
   * Gets whether the invoice action required icon should be displayed
   */
  property get ActionRequiredVisible(): boolean {
    return this.Status == TC_WAITINGFORAPPROVAL 
  }

  property get HasConsistentCheckCurrency() : boolean {
    if(this.Check != null) {
      return this.Check.Currency == this.ServiceRequest.Currency
    }
    return true
  }

  /**
   * Perform the invoice operation and create a ServiceRequestChange object recording the change
   */
  private function transitionServiceRequestStateAndRecordChange(operationDefinition : ServiceRequestInvoiceOperationDefinition,
                                                                context : ServiceRequestInvoiceOperationDefinition.OperationContext) {
    var initiator = context.PerformedBySpecialist ? this.ServiceRequest.Specialist : User.util.CurrentUser.Contact
    operationDefinition.ActionExpression(this, context)
    this.addEvent(generateEventID(context.Operation))
    this.Status = operationDefinition.NewInvoiceStatusExpression(this, context)
    this.ServiceRequest.recordChange(operationDefinition.DescriptionExpression(this,context), context.Operation, this, initiator)
  }

  private static function generateEventID(operation : ServiceRequestOperation) : String {
    return "ServiceRequestInvoiceOperation_" + operation.Code
  }
}
