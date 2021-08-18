package gw.entity
uses gw.vendormanagement.ServiceRequestStatementEditHelper
uses gw.vendormanagement.servicerequeststate.ServiceRequestOperationDefinition

@Export
enhancement GWServiceRequestQuoteEnhancement : entity.ServiceRequestQuote {
  
  /**
   *  Assign the latest quote to the quote Service Request
   *  and perform the Add/Replace quote operation
   */
  function finishSetup(isSpecialist : boolean) {
    
    var serviceRequest = this.ServiceRequest

    ServiceRequestStatementEditHelper.removeUnusedDocuments(this)
    
    var context = new ServiceRequestOperationDefinition.OperationContext(){:Statement = this}
    serviceRequest.performOperation(TC_ADDQUOTE, context, isSpecialist)
    ServiceRequestStatementEditHelper.clearAttachedToStatementDocuments(this)
  }
  
  /**
   * Creates a new quote and copy the description, documents, and service request link from the current quote
   * Returns the new quote
   */
  function copyQuoteForRevision() : ServiceRequestQuote {
    var newQuote = new ServiceRequestQuote()
    newQuote.ServiceRequest = this.ServiceRequest
    newQuote.Description = this.Description
    this.StatementDocumentLinks.each(\ oldDocLink -> {
      var linkedDoc = oldDocLink.ServiceRequestDocumentLink.LinkedDocument
      if (linkedDoc != null) { // usually null from failing permission checks
        newQuote.linkDocument(oldDocLink.ServiceRequestDocumentLink.LinkedDocument)
      }
    })
    return newQuote
  }

}
