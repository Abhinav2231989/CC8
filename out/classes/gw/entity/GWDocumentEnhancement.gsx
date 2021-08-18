package gw.entity

@Export
enhancement GWDocumentEnhancement : entity.Document {
  
  property get Deletable() : boolean {
    return not this.RelatedServiceRequestDocumentLinks.hasMatch(\ di -> di.Unlinkable)
  }
  
  /**
   * Gets whether the document is linked to any Service Request Quote or Invoice
   */
  property get IsServiceRequestStatementDocument() : boolean {
    return this.RelatedServiceRequestDocumentLinks.hasMatch(\ di -> di.StatementDocumentLinks.HasElements)
  }

}
