package gw.plugin.validation

@Export
class SearchCriteriaValidationPlugin implements ISearchCriteriaValidationPlugin {

  override function validateCanSearch(searchCriteria : ActivitySearchCriteria) : String {
    if ( not(
        searchCriteria.ClaimNumber.HasContent or
        searchCriteria.AssignedToGroup.Set or
        searchCriteria.AssignedToUser != null or
        searchCriteria.CreatedByUser != null or
        searchCriteria.ExternalOwner != null))
      return displaykey.Java.SearchCriteria.Validation.ActivitySearchCriteria
    else if (searchCriteria.CompletedLate and ActivityStatus.TC_OPEN == searchCriteria.ActivityStatus)
      return displaykey.Java.Activity.Error.OpenAndCompletedLateNotAllowed
    else if (searchCriteria.CompletedLate and searchCriteria.OverdueNow)
      return displaykey.Java.Activity.Error.OverdueNowCompletedLateNotAllowed
    else
      return null
  }
  
  override function validateCanSearch(searchCriteria : BulkInvoiceSearchCriteria) : String {
    return (
        searchCriteria.ClaimNumber.HasContent or
        searchCriteria.InvoiceNumber.HasContent or
        searchCriteria.CheckNumber.HasContent or
        searchCriteria.NameCriteria.Set)
      ? null
      : displaykey.Java.SearchCriteria.Validation.BulkInvoiceSearchCriteria
  }
  
  override function validateCanSearch(searchCriteria : ClaimAssociationSearchCriteria) : String {
    return (
        searchCriteria.Title.HasContent or
        searchCriteria.ClaimNumber.HasContent or
        searchCriteria.LossDate != null or
        searchCriteria.FirstName.HasContent or
        searchCriteria.LastName.HasContent or
        searchCriteria.CompanyName.HasContent or
        searchCriteria.FirstNameKanji.HasContent or
        searchCriteria.LastNameKanji.HasContent or
        searchCriteria.NameKanji.HasContent)
      ? null
      : displaykey.Java.SearchCriteria.Validation.ClaimAssociationSearchCriteria
  }


  override function validateCanSearchSimple(searchCriteria : ClaimInfoCriteria) : String {
    return (
        searchCriteria.ClaimNumber.HasContent or
        searchCriteria.PolicyNumber.HasContent or
        (searchCriteria.NameCriteria.isSet() and searchCriteria.NameSearchType != null))
      ? null
      : displaykey.Java.SearchCriteria.Validation.ClaimSearchCriteriaSimple
  }

  override function validateCanSearchAdvanced(searchCriteria : ClaimSearchCriteria) : String {
    if (searchCriteria.ArchivedSearch)
      return validateCanSearchSimple(searchCriteria)
      
    return (
        searchCriteria.ClaimNumber.HasContent or
        searchCriteria.PolicyNumber.HasContent or
        (searchCriteria.NameCriteria.Set and searchCriteria.NameSearchType != null) or
        searchCriteria.AssignedToUser != null or
        searchCriteria.AssignedToGroup.Set or
        searchCriteria.Catastrophe != null or
        searchCriteria.vinNumber.HasContent or
        searchCriteria.CreatedByUser != null or
        searchCriteria.licensePlate.HasContent)
      ? null
      : displaykey.Java.SearchCriteria.Validation.ClaimSearchCriteriaAdvanced
  }
  
  override function validateCanSearch(searchCriteria : PaymentSearchCriteria) : String {
    return (
        searchCriteria.ClaimNumber.HasContent or
        searchCriteria.ApprovedByGroup.Set or
        searchCriteria.ApprovedByUser != null or
        searchCriteria.CreatedByUser != null or
        searchCriteria.CheckNumber.HasContent or
        searchCriteria.InvoiceNumber.HasContent or
        searchCriteria.NameCriteria.Set)
      ? null
      : displaykey.Java.SearchCriteria.Validation.PaymentSearchCriteria
  }

  override function validateCanSearch(searchCriteria : PolicySearchCriteria) : String {
    return (
        searchCriteria.validateAtLeastOneFieldSet())
      ? null
      : displaykey.Java.SearchCriteria.Validation.PolicySearchCriteria
  }

  override function validateCanSearch(searchCriteria : RecoverySearchCriteria) : String {
    return (
        searchCriteria.ClaimNumber.HasContent or
        searchCriteria.CreatedByUser != null or
        searchCriteria.NameCriteria.Set)
      ? null
      : displaykey.Java.SearchCriteria.Validation.RecoverySearchCriteria
  }

}
