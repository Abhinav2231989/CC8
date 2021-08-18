package gw.plugin.addressbook.ab700

uses wsi.remote.gw.webservice.ab.ab700.abcontactapi.types.complex.ABContactAPIFindDuplicatesResult
uses gw.api.database.spatial.SpatialPoint

/*
*  This class contains methods to map the ABContactAPIFindDuplicatesResult to Contact.
*  If you add any properties to ABContactAPIFindDuplicatesResult, you need to
*  update this file to make sure the properties are mapped back to the Contact that is returned
*  from the search calls.
*/
@Export
class ContactFindDuplicatesResultMapper {

  private construct() { }
  
/**
 * Populates a Contact from the ABContactAPIFindDuplicatesResult
 * 
 * If you extend the ABContactAPIFindDuplicatesResult object to have additional
 * properties returned from a findDuplicates operation in ContactManager you need to 
 * extend this method to copy those properties into the contact passed in.
 * 
 * @param contact the Contact to be populated
 * @param findDuplicatesResult a result object from a call to ABContactAPI.findDuplicates()
 */
  public static function populateContactFromFindDuplicatesResult(contact : Contact, 
                                                          findDuplicatesResult : ABContactAPIFindDuplicatesResult) {
    contact.AddressBookUID = findDuplicatesResult.LinkID
    if (contact typeis Person) {
      contact.FirstName   = findDuplicatesResult.FirstName
      contact.LastName    = findDuplicatesResult.LastName
      contact.MiddleName  = findDuplicatesResult.MiddleName
      contact.Prefix      = typekey.NamePrefix.get(findDuplicatesResult.Prefix)
      contact.Suffix      = typekey.NameSuffix.get(findDuplicatesResult.Suffix)
      contact.CellPhone   = findDuplicatesResult.CellPhone
      contact.DateOfBirth = findDuplicatesResult.DateOfBirth
    }
    contact.Name          = findDuplicatesResult.Name
    contact.EmailAddress1 = findDuplicatesResult.EmailAddress1
    contact.EmailAddress2 = findDuplicatesResult.EmailAddress2
    contact.PrimaryPhone  = typekey.PrimaryPhoneType.get(findDuplicatesResult.PrimaryPhone)
    contact.FaxPhone      = findDuplicatesResult.FaxPhone
    contact.HomePhone     = findDuplicatesResult.HomePhone
    contact.WorkPhone     = findDuplicatesResult.WorkPhone
    contact.Preferred     = findDuplicatesResult.Preferred
    contact.VendorType    = typekey.VendorType.get(findDuplicatesResult.VendorType)
    contact.Score         = findDuplicatesResult.Score as java.lang.Integer
    contact.TaxID         = findDuplicatesResult.TaxID
    var address = new Address()
    address.AddressBookUID = findDuplicatesResult.PrimaryAddress.LinkID
    address.AddressLine1   = findDuplicatesResult.PrimaryAddress.AddressLine1
    address.AddressLine2   = findDuplicatesResult.PrimaryAddress.AddressLine2
    address.AddressLine3   = findDuplicatesResult.PrimaryAddress.AddressLine3
    address.City           = findDuplicatesResult.PrimaryAddress.City
    address.State          = typekey.State.get(findDuplicatesResult.PrimaryAddress.State)
    address.PostalCode     = findDuplicatesResult.PrimaryAddress.PostalCode
    address.Country        = typekey.Country.get(findDuplicatesResult.PrimaryAddress.Country)
    address.County         = findDuplicatesResult.PrimaryAddress.County
    address.Description    = findDuplicatesResult.PrimaryAddress.Description
    address.AddressType    = typekey.AddressType.get(findDuplicatesResult.PrimaryAddress.AddressType)
    address.ValidUntil     = findDuplicatesResult.PrimaryAddress.ValidUntil
    address.SpatialPoint   = findDuplicatesResult.PrimaryAddress.Longitude == null ? null : new SpatialPoint(findDuplicatesResult.PrimaryAddress.Longitude, findDuplicatesResult.PrimaryAddress.Latitude)
    address.GeocodeStatus  = typekey.GeocodeStatus.get(findDuplicatesResult.PrimaryAddress.GeocodeStatus)
    contact.PrimaryAddress = address
  }
}
