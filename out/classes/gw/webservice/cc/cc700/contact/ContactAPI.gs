package gw.webservice.cc.cc700.contact

uses gw.api.contact.ContactAutoSyncUtil
uses gw.api.database.Query
uses gw.api.database.IQueryBeanResult
uses gw.api.server.AvailabilityLevel
uses gw.api.webservice.exception.BadIdentifierException
uses gw.api.webservice.exception.RequiredFieldException
uses gw.api.webservice.exception.SOAPSenderException
uses gw.api.webservice.exception.SOAPSenderException
uses gw.webservice.contactapi.ab700.ABClientAPI
uses gw.webservice.contactapi.beanmodel.XmlBackedInstance
uses gw.api.contact.ContactRetireHelper
uses gw.api.system.CCLoggerCategory
uses org.slf4j.Logger
uses gw.api.database.Relop

/**
 * This API provide external system ability to interact with contacts in ClaimCenter.
 */
@Export
@gw.xml.ws.annotation.WsiWebService( "http://guidewire.com/cc/ws/gw/webservice/cc/cc700/contact/ContactAPI" )
@gw.xml.ws.annotation.WsiAvailability(AvailabilityLevel.MAINTENANCE)
class ContactAPI implements ABClientAPI {

  public static final var MAX_CONTACT_LIMIT : int = 10
  var _logger : Logger = CCLoggerCategory.CC_CONTACT_API_PLUGIN

  construct() { }

  /**
   * Update a contact in the client system.
   *
   * @param contactXML the updates expressed as a SOAP object
   */
  @Throws(BadIdentifierException, "If an object cannot be found for a given ID")
  @Throws(RequiredFieldException, "If required fields are missing")
  @Throws(SOAPSenderException, "Other sender error")
  override function updateContact(contactXML : gw.webservice.contactapi.beanmodel.XmlBackedInstance, transactionId : String) {
    var abuidToUpdate : String = null

    if(contactXML == null) {
      throw new RequiredFieldException(displaykey.Webservice.Error.MissingRequiredField("contactXML"))
    }
    // The AddressBookUID we need to update is the LinkID on the Contact received in the XML
    abuidToUpdate = contactXML.LinkID
    if(abuidToUpdate == null) {
      throw new RequiredFieldException(displaykey.Webservice.Error.MissingRequiredField("AddressBookUID"))
    }
    autoSyncContactWithABUID(abuidToUpdate)
  }

  /**
   * Merge a given contact with another.
   *
   * @param keptContactABUID the UID of the contact to keep
   * @param deletedContactABUID the UID of contact to be replaced
   * @param transactionID the transaction ID of this message
   */
  @Throws(RequiredFieldException, "If required fields are missing")
  override function mergeContacts(keptContactABUID : String, deletedContactABUID : String, transactionId : String) {
    // deletedContactABUID field must be specified
    if (deletedContactABUID == null) {
      throw new RequiredFieldException(displaykey.Webservice.Error.MissingRequiredField("deletedContactABUID"))
    }

    // keptContactABUID field must be specified
    if (keptContactABUID == null) {
      throw new RequiredFieldException(displaykey.Webservice.Error.MissingRequiredField("keptContactABUID"))
    }

    if(_logger.DebugEnabled) {
      _logger.debug("ContactAPI merge, deletedContact: ${deletedContactABUID} ; keptContact ${keptContactABUID}")
    }
    // 3) Create an autosync worker item to update all local contacts with deltedContactABUID with keptContactABUID
    ContactAutoSyncUtil.createAutoSyncWorkItem(deletedContactABUID, keptContactABUID)
  }

  /**
   * Submits the Contacts associated with this AddressBookUID to be automatically synchronized.
   * If the system config parameter, "InstantaneousContactAutoSync" is set to true, then system
   * will begin synchronizing contacts immediately.  If the parameter is set to false, the system
   * will add the AddressBookUID to the Contact Autosync work queue and will start synchronizing
   * contacts when the batch job is next run.
   *
   * @param addressBookUID - Address book uid for the contacts need to re-sync
   */
  function autoSyncContactWithABUID(addressBookUID : String) {
    ContactAutoSyncUtil.createAutoSyncWorkItem(addressBookUID)
  }

  /**
   * Removes the specified contact.
   *
   * @param addressBookUID the <code>AddressBookUID</code> of the <code>Contact</code>
   */
  override function removeContact(addressBookUID : String, transactionId : String) {
    // addressBookUID field must be specified
    if (addressBookUID == null) {
      throw new RequiredFieldException(displaykey.Webservice.Error.MissingRequiredField("addressBookUID"))
    }

    for(contact in findContactsByAddressBookUID(addressBookUID)) {
      ContactRetireHelper.retireContact(contact)
    }

  }

  /**
   * Return true if the contact associated with the <code>AddressBookUID</code> can be deleted
   * or no contact is associated with <code>AddressBookUID</code>, false otherwise. The criteria
   * for eligible contact with specified AddressBookUID is:
   *
   * <ul>
   *   <li> associated with a Claim or entity associated with a claim such as an Exposure or Matter
   *   <li> only contacts on open or close claims
   * </ul>
   *
   * @param addressBookUID the <code>AddressBookUID</code> of the <code>Contact</code>
   * @return true if the associated contact is deletable or nonexistant, false otherwise.
   */
  @Throws(RequiredFieldException, "If required fields are missing")
  override function isContactDeletable(addressBookUID : String) : boolean {

    // addressBookUID field must be specified
    if (addressBookUID == null) {
      throw new RequiredFieldException(displaykey.Webservice.Error.MissingRequiredField("addressBookUID"))
    }

    var deleteOK = true

    var query = findContactsByAddressBookUID(addressBookUID)
    if(query.Count > MAX_CONTACT_LIMIT) {
      deleteOK = false
      for(contact in query) {
        ContactRetireHelper.createContactRetireWorkItem(contact)
      }
    } else {
      for(contact in query) {
        if(!ContactRetireHelper.retireContact(contact)) {
          deleteOK = false
          break
        }
      }
    }
    return deleteOK
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Private functions
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private function findContactsByAddressBookUID(addressBookUID : String) : IQueryBeanResult<Contact> {
    return Query.make(Contact)
                .compare("AddressBookUID", Relop.Equals, addressBookUID)
                .select()
  }
}
