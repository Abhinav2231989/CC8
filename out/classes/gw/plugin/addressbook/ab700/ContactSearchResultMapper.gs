package gw.plugin.addressbook.ab700

uses wsi.remote.gw.webservice.ab.ab700.abcontactapi.types.complex.ABContactAPISearchResult
uses gw.api.database.spatial.SpatialPoint

/*
 *  This class contains methods to map the ABContactAPISearchResult to Contact.
 *  If you add any properties to ABContactAPISearchResult, you need to
 *  update this file to make sure the properties are mapped back to the Contact that is returned
 *  from the search calls.
 */
@Export
class ContactSearchResultMapper {

  private construct() { }

/**
 * Populates a Contact instance with the values returned from a Contact search in ContactManager.
 * 
 * If you extend the ABContactAPISearchResult to have additional properties returned from the search
 * you need to extend this method to copy those properties into the Contact instance.
 * 
 * @param contact the Contact to populate
 * @param searchResult the ABContactAPISearchResult returned from ContactManager
 */
  public static function populateContactFromSearchResult(contact : Contact, searchResult : ABContactAPISearchResult) {

    contact.AddressBookUID = searchResult.LinkID
    if (contact typeis Person) {
      contact.FirstName   = searchResult.FirstName
      contact.LastName    = searchResult.LastName
      contact.MiddleName  = searchResult.MiddleName
      contact.Prefix      = typekey.NamePrefix.get(searchResult.Prefix)
      contact.Suffix      = typekey.NameSuffix.get(searchResult.Suffix)
      contact.CellPhone   = searchResult.CellPhone
      contact.DateOfBirth = searchResult.DateOfBirth
    }
    contact.Name          = searchResult.Name
    contact.EmailAddress1 = searchResult.EmailAddress1
    contact.EmailAddress2 = searchResult.EmailAddress2
    contact.PrimaryPhone  = typekey.PrimaryPhoneType.get(searchResult.PrimaryPhone)
    contact.FaxPhone      = searchResult.FaxPhone
    contact.HomePhone     = searchResult.HomePhone
    contact.WorkPhone     = searchResult.WorkPhone
    contact.Preferred     = searchResult.Preferred
    contact.VendorType    = typekey.VendorType.get(searchResult.VendorType)
    contact.Score         = searchResult.Score as java.lang.Integer
    contact.TaxID         = searchResult.TaxID
    var address = new Address()
    address.AddressBookUID = searchResult.PrimaryAddress.LinkID
    address.AddressLine1   = searchResult.PrimaryAddress.AddressLine1
    address.AddressLine2   = searchResult.PrimaryAddress.AddressLine2
    address.AddressLine3   = searchResult.PrimaryAddress.AddressLine3
    address.City           = searchResult.PrimaryAddress.City
    address.State          = typekey.State.get(searchResult.PrimaryAddress.State)
    address.PostalCode     = searchResult.PrimaryAddress.PostalCode
    address.Country        = typekey.Country.get(searchResult.PrimaryAddress.Country)
    address.County         = searchResult.PrimaryAddress.County
    address.Description    = searchResult.PrimaryAddress.Description
    address.AddressType    = typekey.AddressType.get(searchResult.PrimaryAddress.AddressType)
    address.ValidUntil     = searchResult.PrimaryAddress.ValidUntil
    address.SpatialPoint   = searchResult.PrimaryAddress.Longitude == null ? null : new SpatialPoint(searchResult.PrimaryAddress.Longitude, searchResult.PrimaryAddress.Latitude)
    address.GeocodeStatus  = typekey.GeocodeStatus.get(searchResult.PrimaryAddress.GeocodeStatus)
    contact.PrimaryAddress = address
    
  }
}
