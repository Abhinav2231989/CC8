package gw.api.name
uses java.util.Set

@Export
class PLPersonNameSearchOwner extends NameOwnerBase {

  construct (criteria : ContactSearchCriteria) {
    ContactName = new PLContactCriteriaDelegate(criteria)
    AlwaysShowSeparateFields = true
  }

  public static final var HIDDEN_FOR_SEARCH_FIELDS : Set<NameOwnerFieldId> =
    { NameOwnerFieldId.PREFIX, NameOwnerFieldId.MIDDLENAME, NameOwnerFieldId.PARTICLE, NameOwnerFieldId.SUFFIX }.freeze()

  override property get RequiredFields() : Set<NameOwnerFieldId> {
    return NameOwnerFieldId.NO_FIELDS
  }

  override property get HiddenFields() : Set<NameOwnerFieldId> {
    return HIDDEN_FOR_SEARCH_FIELDS
  }

  override property get ShowNameSummary() : boolean {
    return false
  }
}