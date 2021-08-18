package gw.api.name

uses java.util.Set

@Export
class AddressSearchNameOwner extends NameOwnerBase {

  construct (searchCriteria : ContactSearchCriteria) {
    _searchCriteria = searchCriteria
    ContactName = new AddressBookSearchNameDelegate(searchCriteria)
    AlwaysShowSeparateFields = true
  }

  var _searchCriteria : ContactSearchCriteria

  override property get RequiredFields() : Set<NameOwnerFieldId> {
    return NameOwnerFieldId.NO_FIELDS
  }

  override property get HiddenFields() : Set<NameOwnerFieldId> {
    return NameOwnerFieldId.HIDDEN_FOR_SEARCH
  }

  override property get ShowNameSummary() : boolean {
    return false
  }

  override property get ContactNameLabel() : String {
    var rv : String = null
    if (_searchCriteria.isSearchFor(entity.Person)) {
      rv = displaykey.Web.AddressBook.Search.LastName
    } else if (_searchCriteria.isSearchFor(entity.Company) or _searchCriteria.isSearchFor(entity.Place)) {
      rv = displaykey.Web.AddressBook.Search.Name
    } else {
      rv = displaykey.Web.AddressBook.Search.ContactName
    }
    return rv
  }

  override property get ContactNamePhoneticLabel() : String {
    if (_searchCriteria.isSearchFor(entity.Company) or _searchCriteria.isSearchFor(entity.Place)) {
      return displaykey.Web.ContactDetail.Name.OrganizationNamePhonetic
    }
    return displaykey.Web.AddressBook.Search.ContactNamePhonetic
  }

}
