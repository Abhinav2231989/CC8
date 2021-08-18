package gw.contactmapper.ab700

uses com.guidewire.pl.domain.contact.XmlElementByteContainer
uses com.guidewire.pl.system.server.Version
uses gw.webservice.contactapi.beanmodel.XmlBackedInstance
uses gw.webservice.contactapi.NameMapperBase
uses gw.webservice.contactapi.beanmodel.anonymous.elements.XmlBackedInstance_Array

uses java.util.Set
uses gw.plugin.addressbook.ab700.ABContactPluginUtil

/**
 * Use this file to map between ClaimCenter entities and "XmlBackedInstance" objects that represent 
 * ContactManager entities. The XmlBackedInstance is expressed in terms of the ContactManager
 * datamodel, so all entities, typelists and typecodes need to be set into the XmlBackedInstance
 * in the ContactManager datamodel namespace.
 * <p>
 * The XmlBackedInstance object contains the properties that need to be sent between the applications.
 * If you extend Contact or add Contact subtypes with extensions you will need to update this class
 * to ensure the extensions are mapped for sending to ContactManager as well as when received from
 * ContactManager.
 * <p>
 * When we send updates to ContactManager part of the XmlBackedInstance includes the original value
 * for the values we are sending. In order to keep track of original values through UI manipulation 
 * there may be an OriginalValuesXML value in the Contact. We extract that if it is present and then
 * pass it to all the methods that populate the XmlBackedInstance to ensure that the original values
 * are set.
 * If the original values in the XmlBackedInstance do not match the values in ContactManager when it
 * processes the update, the update will fail.
 * <p>
 * For translating from a bean to the XmlBackedInstance:
 * <p>
 * Simple properties can be set in the XmlBackedInstance using the populateFieldXml method:
 * <p>
 * <code>
 * populateFieldXML(originalValuesXML, instanceXML, ab_fieldName, bean, local_fieldName)
 * </code>
 * where the parameters are:
 * <ul>
 * <li>originalValuesXML  - the originalValuesXML from the Contact
 * <li>instanceXML        - the XmlBackedInstance being populated
 * <li>ab_fieldName       - the name of the property in the ContactManager datamodel
 * <li>bean               - the ClaimCenter bean being used to populate the XmlBackedInstance
 * <li>local_fieldName    - the name of the property in the ClaimCenter datamodel (optional)
 * </ul>
 * <p>
 * To populate a Foreign Key property:
 * <p>
 * <code>
 * populateFkXML(originalValuesXML, instanceXML, ab_FKName, bean, local_FKName, populateXmlBlock)
 * </code>
 * <p>
 * where the parameters are:
 * <p>
 * <ul>
 * <li>originalValuesXML  - the originalValuesXML from the Contact
 * <li>instanceXML        - the XmlBackedInstance being populated
 * <li>ab_FKName          - the name of the FK property in the ContactManager datamodel
 * <li>bean               - the ClaimCenter bean populating the XmlBackedInstance
 * <li>local_FKName       - the name of the FK property in the ClaimCenter datamodel
 * <li>populateXmlBlock   - a Gosu block that calls the method to create the XML for the FK reference
 * </ul>
 * <p>
 * To populate an Array property
 * <p>
 * <code>
 * populateArrayXML(originalValuesXML, instanceXML, ab_arrayName, bean, local_arrayName, populateXmlBlock)
 * </code>
 * <p>
 * where the parameters are:
 * <p>
 * <ul>
 * <li>originalValuesXML  - the originalValuesXML from the Contact
 * <li>instanceXML        - the XmlBackedInstance being populated
 * <li>ab_arrayName       - the name of the array property in the ContactManager datamodel
 * <li>bean               - the ClaimCenter bean populating the XmlBackedInstance
 * <li>local_arrayName    - the name of the array property in the ClaimCenter datamodel
 * <li>populateXmlBlock   - a Gosu block that calls the method to create the XML for the FK reference
 * </ul> 
 * <p>
 * For translating from an XmlBackedInstance to a bean:
 * <p>
 * <code>
 * populateBeanField(bean, local_fieldName, instanceXml, ab_fieldName)
 * </code>
 * <p>
 * where the parameters are:
 * <p>
 * <ul>
 * <li>bean                - the bean to be populated
 * <li>local_fieldName     - the name of the property in the bean, ClaimCenter datamodel
 * <li>instanceXml         - the XmlBackedInstance we are populating the bean from 
 * <li>ab_fieldName        - the name of the field in the XmlBackedInstance, ContactManager datamodel (optional)
 * </ul>
 * <p>
 * To populate an FK in the bean:
 * <p>
 * <code>
 * populateFkBean(bean, local_FKName, instanceXML, ab_FKName, populateBeanBlock)
 * </code>
 * <p>
 * where the parameters are:
 * <p>
 * <ul>
 * <li>bean                - the bean to be populated
 * <li>local_FKName        - the name of the FK property in the bean, ClaimCenter datamodel
 * <li>instanceXml         - the XmlBackedInstance we are populating the bean from 
 * <li>ab_FKName           - the name of the FK field in the XmlBackedInstance, ContactManager datamodel (optional)
 * <li>populateBeanBlock   - a Gosu block to call the method that populates the FK bean from the XML
 * </ul>
 * <p>
 * To populate an array in the bean:
 * <p>
 * <code>
 * populateArrayBean(bean, local_arrayName, instanceXML, ab_arrayName, populateBeanBlock)
 * </code>
 * <p>
 * where the parameters are:
 * <p>
 * <ul>
 * <li>bean                - the bean to be populated
 * <li>local_FKName        - the name of the array property in the bean, ClaimCenter datamodel
 * <li>instanceXml         - the XmlBackedInstance we are populating the bean from 
 * <li>ab_FKName           - the name of the array field in the XmlBackedInstance, ContactManager datamodel (optional)
 * <li>populateBeanBlock   - a Gosu block to call the method that populates the beans that are array elements from the XML
 * </ul>
 * 
 */
@Deprecated("Since 8.0.0.  Please use the gw.contactmapper.ab800 package instead.")
@Export
class ContactIntegrationXMLMapper extends ContactIntegrationXMLMapperCCBase {


  /* Class initializers */
  private static var _instance : ContactIntegrationXMLMapper = new ContactIntegrationXMLMapper()
  
  protected construct() {}

  public static function getInstance() : ContactIntegrationXMLMapper { return _instance }
  public override function getNameMapper() : NameMapperBase { return NameMapper.getInstance() }

  // ============================== Map from ClaimCenter entities to ContactManager XmlBackedInstance objects
 
  /**
   * Populate an XmlBackedInstance from a ClaimCenter contact for sending to ContactManager.
   *
   * @param contact a Contact from which to generate XML
   * @return an instance of XmlBackedInstance, which can be serialized as an XML String that ContactManager can parse
   */
  public function populateXMLFromContact(contact : Contact) : XmlBackedInstance {
    return populateXMLFromContact(contact, null)
  }
 
  /**
   * Populate the XML from a contact.
   *
   * @param contact a Contact from which to generate XML
   * @param relationshipSyncSet the relationships that should be included in the return result   
   * @return an instance of XmlBackedInstance, which can be serialized as an XML String that ContactManager can parse
   */
  public function populateXMLFromContact(contact : Contact, relationshipSyncSet : Set<ContactBidiRel> ) : XmlBackedInstance {
    var abContactXML = createXmlBackedInstance(contact)
    
    var originalValuesXML = contact.OriginalValuesXML == null
        ? null
        : contact.OriginalValuesXML.Element as XmlBackedInstance
    
 /**
  * To populate an XMLBackedInstance field from a contact, use populateFieldXML. Note that local_fieldName can be omitted if it is the same as ab_fieldName:
  * The originalValuesXML is used to avoid preemption and make sure that the contact update is consistent.
  * populateFieldXML(originalValuesXML, instanceXML,  ab_fieldName       , bean   , local_fieldName)
  */
    populateFieldXML(originalValuesXML, abContactXML, LINK_ID            , contact, ADDRESS_BOOK_UID)
    populateFieldXML(originalValuesXML, abContactXML, EXTERNAL_PUBLIC_ID , contact, PUBLIC_ID       )
    populateFieldXML(originalValuesXML, abContactXML, "EmailAddress1"    , contact)
    populateFieldXML(originalValuesXML, abContactXML, "EmailAddress2"    , contact)
    populateFieldXML(originalValuesXML, abContactXML, "FaxPhone"         , contact)
    populateFieldXML(originalValuesXML, abContactXML, "HomePhone"        , contact)
    populateFieldXML(originalValuesXML, abContactXML, "Name"             , contact)
    populateFieldXML(originalValuesXML, abContactXML, "Notes"            , contact)
    populateFieldXML(originalValuesXML, abContactXML, "Preferred"        , contact)
    populateFieldXML(originalValuesXML, abContactXML, "PreferredCurrency", contact)
    populateFieldXML(originalValuesXML, abContactXML, "PrimaryPhone"     , contact)
    populateFieldXML(originalValuesXML, abContactXML, "Score"            , contact)
    populateFieldXML(originalValuesXML, abContactXML, "TaxID"            , contact)
    populateFieldXML(originalValuesXML, abContactXML, "TaxStatus"        , contact)
    populateFieldXML(originalValuesXML, abContactXML, "VendorNumber"     , contact)
    populateFieldXML(originalValuesXML, abContactXML, "VendorType"       , contact)
    populateFieldXML(originalValuesXML, abContactXML, "W9Received"       , contact)
    populateFieldXML(originalValuesXML, abContactXML, "W9ReceivedDate"   , contact)
    populateFieldXML(originalValuesXML, abContactXML, "W9ValidFrom"      , contact)
    populateFieldXML(originalValuesXML, abContactXML, "W9ValidTo"        , contact)
    populateFieldXML(originalValuesXML, abContactXML, "WithholdingRate"  , contact)
    populateFieldXML(originalValuesXML, abContactXML, "WorkPhone"        , contact)
    
    if (contact typeis Adjudicator) {
      populateFieldXML(originalValuesXML, abContactXML, "AdjudicativeDomain", contact)
      populateFieldXML(originalValuesXML, abContactXML, "AdjudicatorLicense", contact)
    }
    if (contact typeis Attorney) {
      populateFieldXML(originalValuesXML, abContactXML, "AttorneyLicense"  , contact)
      populateFieldXML(originalValuesXML, abContactXML, "AttorneySpecialty", contact)
    }
    if (contact typeis AutoRepairShop) {
      populateFieldXML(originalValuesXML, abContactXML, "AutoRepairLicense", contact)
    }
    if (contact typeis AutoTowingAgcy) {
      populateFieldXML(originalValuesXML, abContactXML, "AutoTowingLicense", contact)
    }
    if (contact typeis Doctor) {
      populateFieldXML(originalValuesXML, abContactXML, "DoctorSpecialty", contact)
      populateFieldXML(originalValuesXML, abContactXML, "MedicalLicense" , contact)
    }
    if (contact typeis LawFirm) {
      populateFieldXML(originalValuesXML, abContactXML, "LawFirmSpecialty", contact)
    }
    if (contact typeis LegalVenue) {
      populateFieldXML(originalValuesXML, abContactXML, "VenueType", contact)
    }
    if (contact typeis MedicalCareOrg) {
      populateFieldXML(originalValuesXML, abContactXML, "MedicalOrgSpecialty", contact)
    }
    if (contact typeis Person) {
      populateFieldXML(originalValuesXML, abContactXML, "CellPhone"       , contact)
      populateFieldXML(originalValuesXML, abContactXML, "DateOfBirth"     , contact)
      populateFieldXML(originalValuesXML, abContactXML, "FirstName"       , contact)
      populateFieldXML(originalValuesXML, abContactXML, "FormerName"      , contact)
      populateFieldXML(originalValuesXML, abContactXML, "Gender"          , contact)
      populateFieldXML(originalValuesXML, abContactXML, "LastName"        , contact)
      populateFieldXML(originalValuesXML, abContactXML, "LicenseNumber"   , contact)
      populateFieldXML(originalValuesXML, abContactXML, "LicenseState"    , contact)
      populateFieldXML(originalValuesXML, abContactXML, "MaritalStatus"   , contact)
      populateFieldXML(originalValuesXML, abContactXML, "MiddleName"      , contact)
      populateFieldXML(originalValuesXML, abContactXML, "NumDependents"   , contact)
      populateFieldXML(originalValuesXML, abContactXML, "NumDependentsU18", contact)
      populateFieldXML(originalValuesXML, abContactXML, "NumDependentsU25", contact)
      populateFieldXML(originalValuesXML, abContactXML, "Occupation"      , contact)
      populateFieldXML(originalValuesXML, abContactXML, "Prefix"          , contact)
      populateFieldXML(originalValuesXML, abContactXML, "Suffix"          , contact)
      populateFieldXML(originalValuesXML, abContactXML, "TaxFilingStatus" , contact)
    }
    if (contact typeis UserContact) {
      populateFieldXML(originalValuesXML, abContactXML, "EmployeeNumber", contact)
    }
    
    /**
     * Handle foreign keys and arrays. Please use populateFkXML and populateArrayXML
     * to populate custom children entities, with methods you write to set the actual 
     * values into those entities.
     * The createEntityXMLFromEntity() methods in the final parameter of the populateArrayXML
     * and populateFkXML are used to create and populate the XmlBackedInstance that represents
     * the entity in the XML being sent to ContactManager.
     */
    
    populateArrayXML(originalValuesXML, // original values XML
                     abContactXML,  // parent XmlBackedInstance
                     "Tags",        // name of array on parent XmlBackedInstance (determined by ContactManager datamodel)
                     contact,       // local parent bean
                     "Tags",        // name of array on local parent bean
                     \ x  : XmlBackedInstance, b : KeyableBean ->createABContactTagXMLFromContactTag(x, b))
    
    populateFkXML(originalValuesXML, // original values XML
                  abContactXML,     // parent XmlBackedInstance
                  "PrimaryAddress", // name of FK on parent XmlBackedInstance (determined by ContactManager datamodel)
                  contact,          // local parent bean
                  "PrimaryAddress", // name of FK on local parent bean
                  \ x  : XmlBackedInstance, b : KeyableBean ->createAddressXMLFromAddress(x, b))
    
    populateArrayXML(originalValuesXML,  // original values XML
                     abContactXML,       // parent XmlBackedInstance
                     "ContactAddresses", // name of array on parent XmlBackedInstance (determined by ContactManager datamodel)
                     contact,            // local parent bean
                     "ContactAddresses", // name of array on local parent bean
                     \ x : XmlBackedInstance, b : KeyableBean ->createABContactAddressXMLFromABContactAddress(x, b))
    
    populateArrayXML(originalValuesXML, // original values XML
                     abContactXML,  // parent XmlBackedInstance
                     "EFTRecords",  // name of array on parent XmlBackedInstance (determined by ContactManager datamodel)
                     contact,       // local parent bean
                     "EFTRecords",  // name of array on local parent bean
                     \ x : XmlBackedInstance, b : KeyableBean ->createEFTDataXMLFromEFTData(x, b))
        
    populateRelatedContactXML(originalValuesXML, // original values XML
                     abContactXML,             // parent XmlBackedInstance
                     "SourceRelatedContacts",  // name of array on parent XmlBackedInstance (determined by ContactManager datamodel)
                     contact,                  // local parent bean
                     "SourceRelatedContacts",  // name of array on local parent bean
                     relationshipSyncSet,
                     \ x : XmlBackedInstance, b : KeyableBean ->createSourceRelatedContactsXMLFromSourceRelatedContacts(x, b))
    populateRelatedContactXML(originalValuesXML, // original values XML
                     abContactXML,             // parent XmlBackedInstance
                     "TargetRelatedContacts",  // name of array on parent XmlBackedInstance (determined by ContactManager datamodel)
                     contact,                  // local parent bean
                     "TargetRelatedContacts",  // name of array on local parent bean
                     relationshipSyncSet,
                     \ x : XmlBackedInstance, b : KeyableBean ->createTargetRelatedContactsXMLFromTargetRelatedContacts(x, b))
    
    // For history tracking
    abContactXML.External_UpdateApp = Version.getAppCode()
    abContactXML.External_UpdateUser = User.util.CurrentUser.Credential.UserName

    return abContactXML
  }
  
  /**
   * Methods to populate child entities. These get called by populateFkXML and populateArrayXML.
   */
  
  protected function createABContactAddressXMLFromABContactAddress(originalValuesXML : XmlBackedInstance, abContactAddress : KeyableBean) : XmlBackedInstance {
    var xml = createXmlBackedInstance(abContactAddress)
    populateFieldXML(originalValuesXML, xml, LINK_ID           , abContactAddress, ADDRESS_BOOK_UID)
    populateFieldXML(originalValuesXML, xml, EXTERNAL_PUBLIC_ID, abContactAddress, PUBLIC_ID)
    
    populateFkXML(originalValuesXML, xml,      // parent XmlBackedInstance
                  "Address",        // name of FK on parent XmlBackedInstance (determined by ContactManager datamodel)
                  abContactAddress, // local parent bean
                  "Address",        // name of FK on local parent bean
                  \ x : XmlBackedInstance, b : KeyableBean ->createAddressXMLFromAddress(x, b))
    
    return xml
  }
  
  protected function createAddressXMLFromAddress(originalValuesXML : XmlBackedInstance, address : KeyableBean) : XmlBackedInstance {
    var xml = createXmlBackedInstance(address)
    populateFieldXML(originalValuesXML, xml, LINK_ID           , address, ADDRESS_BOOK_UID)
    populateFieldXML(originalValuesXML, xml, EXTERNAL_PUBLIC_ID, address, PUBLIC_ID       )
    populateFieldXML(originalValuesXML, xml, "AddressLine1"    , address)
    populateFieldXML(originalValuesXML, xml, "AddressLine2"    , address)
    populateFieldXML(originalValuesXML, xml, "AddressLine3"    , address)
    populateFieldXML(originalValuesXML, xml, "AddressType"     , address)
    populateFieldXML(originalValuesXML, xml, "City"            , address)
    populateFieldXML(originalValuesXML, xml, "Country"         , address)
    populateFieldXML(originalValuesXML, xml, "County"          , address)
    populateFieldXML(originalValuesXML, xml, "Description"     , address)
    populateFieldXML(originalValuesXML, xml, "GeocodeStatus"   , address)
    populateFieldXML(originalValuesXML, xml, "PostalCode"      , address)
    populateFieldXML(originalValuesXML, xml, "State"           , address)
    populateFieldXML(originalValuesXML, xml, "ValidUntil"      , address)
    return xml
  }
  
  protected function createEFTDataXMLFromEFTData(originalValuesXML : XmlBackedInstance, eftData : KeyableBean) : XmlBackedInstance {
    var xml = createXmlBackedInstance(eftData)
    populateFieldXML(originalValuesXML, xml, LINK_ID            , eftData, ADDRESS_BOOK_UID)
    populateFieldXML(originalValuesXML, xml, EXTERNAL_PUBLIC_ID , eftData, PUBLIC_ID       )
    populateFieldXML(originalValuesXML, xml, "AccountName"      , eftData)
    populateFieldXML(originalValuesXML, xml, "BankAccountNumber", eftData)
    populateFieldXML(originalValuesXML, xml, "BankAccountType"  , eftData)
    populateFieldXML(originalValuesXML, xml, "BankName"         , eftData)
    populateFieldXML(originalValuesXML, xml, "BankRoutingNumber", eftData)
    populateFieldXML(originalValuesXML, xml, "IsPrimary"        , eftData)
    return xml
  }
  
  protected function createABContactTagXMLFromContactTag(originalValuesXML : XmlBackedInstance, contactTag : KeyableBean) : XmlBackedInstance {
    var xml = createXmlBackedInstance(contactTag)
    populateFieldXML(originalValuesXML, xml, LINK_ID           , contactTag, ADDRESS_BOOK_UID)
    populateFieldXML(originalValuesXML, xml, EXTERNAL_PUBLIC_ID, contactTag, PUBLIC_ID       )
    populateFieldXML(originalValuesXML, xml, "Type"            , contactTag)
    return xml
  }
  
  /**
   * Create the XML to update contact tags in ContactManager for a contact based on the update batch
   * passed in. This generates the minimal XML to update the contact, just the Contact LinkID, 
   * External_PublicID and the ADD/REMOVE operations for the Tags array.
   * This method does not look at the Tags array in the Contact passed in, all operations are based
   * on the data in the updateBatch.
   * 
   * @param updateBatch the updateBatch which contains the updates for the Tags array in the Contact
   * @param contact the linked contact in Contact Manager that needs to have the Tags array updated
   */
  public function createXmlFromTagUpdateBatch(updateBatch : UpdateBatch, contact : Contact) : XmlBackedInstance {
    var localContact = createEntity((typeof contact).RelativeName, null) as Contact
    var instance_Array = new XmlBackedInstance_Array()
    instance_Array.Name = "Tags"

    for(createOp in updateBatch.CreateUpdateOps) {
      var tag = createTagFromUpdateBatchForID(updateBatch, createOp.ObjectUId)
      var arrayElemXML = createABContactTagXMLFromContactTag(null, tag)
      if (arrayElemXML.LinkID == null) {
        arrayElemXML.Action = ADD
      }
      instance_Array.XmlBackedInstance.add(arrayElemXML)
    }

    for(deleteOp in updateBatch.DeleteUpdateOps) {
      var tag = createTagFromUpdateBatchForID(updateBatch, deleteOp.ObjectUId)
      tag.AddressBookUID = deleteOp.ObjectUId
      var origXml = createABContactTagXMLFromContactTag(null, tag)
      var arrayElemXML = createABContactTagXMLFromContactTag(origXml, tag)
      arrayElemXML.Action = REMOVE
      instance_Array.XmlBackedInstance.add(arrayElemXML)
    }

    var abContactXML = createXmlBackedInstance(localContact)
    populateFieldXML(null, abContactXML, LINK_ID            , contact, ADDRESS_BOOK_UID)
    populateFieldXML(null, abContactXML, EXTERNAL_PUBLIC_ID , contact, PUBLIC_ID       )
    abContactXML.Array.add(instance_Array)

    // For history tracking
    abContactXML.External_UpdateApp = Version.getAppCode()
    abContactXML.External_UpdateUser = User.util.CurrentUser.Credential.UserName
        
    return abContactXML
  }

  protected function createTagFromUpdateBatchForID(updateBatch : UpdateBatch, objectUId : String) : ContactTag {
    var tag = createEntity(ContactTag.Type.RelativeName, null) as ContactTag
    var pID =  ABContactPluginUtil.extractPublicIdFromObjectUId(objectUId)
    tag.PublicID = pID == null ? objectUId : pID
    var typeUpdateOp = updateBatch.FieldChangeUpdateOps.firstWhere(\ f -> f.ObjectUId == objectUId && f.Field == "Type")
    tag.Type = typeUpdateOp.Value
    return tag
  }

  
  // ============================== Map from ContactManager XmlBackedInstance objects to ClaimCenter entities
  
  /**
   * Populate a Contact instance from an XmlBackedInstance that came from ContactManager. 
   * 
   *
   * @param abContactXML the XmlBackedInstance that contains update values with which to populate a contact
   * @return the populated contact
   */
  public function populateContactFromXML(abContactXML : XmlBackedInstance) : Contact {
    var contact = createEntity(abContactXML.EntityType, gw.transaction.Transaction.getCurrent()) as entity.Contact
    contact.OriginalValuesXML = XmlElementByteContainer.getContainerForElement(abContactXML)
    return populateContactFromXML(contact, abContactXML)
  }

  /**
   * Populates a Contact from the XmlBackedInstance that came from ContactManager.
   * 
   * @param contact the Contact to populate
   * @param abContactXML the XmlBackedInstance that contains update values with which to populate contact
   * @return the populated contact
   */
  public function populateContactFromXML(contact : Contact, abContactXML : XmlBackedInstance) : Contact {
    
  /**
  * To populate a field, use populateBeanField. Note that ab_fieldName can be omitted if it is the same as local_fieldName:
  * 
  * populateBeanField(bean   , local_fieldName    , xml         , ab_fieldName)
  */
    populateBeanField(contact, ADDRESS_BOOK_UID   , abContactXML, LINK_ID)
    populateBeanField(contact, "EmailAddress1"    , abContactXML)
    populateBeanField(contact, "EmailAddress2"    , abContactXML)
    populateBeanField(contact, "FaxPhone"         , abContactXML)
    populateBeanField(contact, "HomePhone"        , abContactXML)
    populateBeanField(contact, "Name"             , abContactXML)
    populateBeanField(contact, "Notes"            , abContactXML)
    populateBeanField(contact, "Preferred"        , abContactXML)
    populateBeanField(contact, "PreferredCurrency", abContactXML)
    populateBeanField(contact, "PrimaryPhone"     , abContactXML)
    populateBeanField(contact, "Score"            , abContactXML)
    populateBeanField(contact, "TaxID"            , abContactXML)
    populateBeanField(contact, "TaxStatus"        , abContactXML)
    populateBeanField(contact, "VendorNumber"     , abContactXML)
    populateBeanField(contact, "VendorType"       , abContactXML)
    populateBeanField(contact, "W9Received"       , abContactXML)
    populateBeanField(contact, "W9ReceivedDate"   , abContactXML)
    populateBeanField(contact, "W9ValidFrom"      , abContactXML)
    populateBeanField(contact, "W9ValidTo"        , abContactXML)
    populateBeanField(contact, "WithholdingRate"  , abContactXML)
    populateBeanField(contact, "WorkPhone"        , abContactXML)
    
    if (contact typeis Adjudicator) {
      populateBeanField(contact, "AdjudicativeDomain", abContactXML)
      populateBeanField(contact, "AdjudicatorLicense", abContactXML)
    }
    if (contact typeis Attorney) {
      populateBeanField(contact, "AttorneyLicense"  , abContactXML)
      populateBeanField(contact, "AttorneySpecialty", abContactXML)
    }
    if (contact typeis AutoRepairShop) {
      populateBeanField(contact, "AutoRepairLicense", abContactXML)
    }
    if (contact typeis AutoTowingAgcy) {
      populateBeanField(contact, "AutoTowingLicense", abContactXML)
    }
    if (contact typeis Doctor) {
      populateBeanField(contact, "DoctorSpecialty", abContactXML)
      populateBeanField(contact, "MedicalLicense" , abContactXML)
    }
    if (contact typeis LawFirm) {
      populateBeanField(contact, "LawFirmSpecialty" , abContactXML)
    }
    if (contact typeis LegalVenue) {
      populateBeanField(contact, "VenueType", abContactXML)
    }
    if (contact typeis MedicalCareOrg) {
      populateBeanField(contact, "MedicalOrgSpecialty", abContactXML)
    }
    if (contact typeis Person) {
      populateBeanField(contact, "CellPhone"       , abContactXML)
      populateBeanField(contact, "DateOfBirth"     , abContactXML)
      populateBeanField(contact, "FirstName"       , abContactXML)
      populateBeanField(contact, "FormerName"      , abContactXML)
      populateBeanField(contact, "Gender"          , abContactXML)
      populateBeanField(contact, "LastName"        , abContactXML)
      populateBeanField(contact, "LicenseNumber"   , abContactXML)
      populateBeanField(contact, "LicenseState"    , abContactXML)
      populateBeanField(contact, "MaritalStatus"   , abContactXML)
      populateBeanField(contact, "MiddleName"      , abContactXML)
      populateBeanField(contact, "NumDependents"   , abContactXML)
      populateBeanField(contact, "NumDependentsU18", abContactXML)
      populateBeanField(contact, "NumDependentsU25", abContactXML)
      populateBeanField(contact, "Occupation"      , abContactXML)
      populateBeanField(contact, "Prefix"          , abContactXML)
      populateBeanField(contact, "Suffix"          , abContactXML)
      populateBeanField(contact, "TaxFilingStatus" , abContactXML)
    }
    if (contact typeis UserContact) {
      populateBeanField(contact, "EmployeeNumber", abContactXML)
    }
    
    /**
     * Handle foreign keys and arrays. Please use populateFkBean and populateArrayBean
     * to populate custom children entities.
     * The populateBeanFromEntityXML() methods that are the last parameter to populateArrayBean()
     * and populateFkBean() are used to populate a bean with the values from the XML received from
     * ContactManager.
     */
    
    
    /**
     * Addresses are handled specially. The case where Primary address can be swapped with a SecondaryAddress
     * requires all addresses to be dealt with at once.
     */
    populateAddresses(contact, abContactXML)
    
    populateArrayBean(contact,      // local parent bean
                      "EFTRecords", // name of array on local parent bean
                      abContactXML, // parent XmlBackedInstance
                      "EFTRecords", // name of array on parent XmlBackedInstance (determined by ContactManager datamodel)
                      \ b : KeyableBean, x : XmlBackedInstance ->populateEFTDataFromEFTDataXML(b, x))
    
    populateArrayBean(contact,
                      "Tags",
                      abContactXML,
                      "Tags",
                      \ b : KeyableBean, x : XmlBackedInstance -> populateContactTagFromContactTagXML(b,x))

    populateArrayBean(contact,
                      "CategoryScores",
                      abContactXML,
                      "CategoryScores",
                      \ b : KeyableBean, x : XmlBackedInstance -> populateCategoryScoreFromCategoryScoreXML(b,x))


    /* Example usages of populateFkBean:
    
    populateFkBean(parentBean,
                   custom_fkName_on_Bean,
                   parentXML,
                   custom_fkName_on_XML,
                   \ b : KeyableBean, x : XmlBackedInstance ->custom_populate_function(b, x))
    */
    
    return contact
  }
  
  /**
   * Methods to populate child entities. These get called by populateFkBean and populateArrayBean.
   */
  
  override protected function populateABContactAddressFromABContactAddressXML(bean : KeyableBean, xml : XmlBackedInstance) {
    populateBeanField(bean, ADDRESS_BOOK_UID, xml, LINK_ID)
    populateFkBean(bean,
                   "Address",
                   xml,
                   "Address",
                   \ b : KeyableBean, x : XmlBackedInstance ->populateAddressFromAddressXML(b, x))
  }
  
  override protected function populateAddressFromAddressXML(bean : KeyableBean, xml : XmlBackedInstance) {
    populateBeanField(bean, ADDRESS_BOOK_UID, xml, LINK_ID)
    populateBeanField(bean, "AddressLine1"  , xml)
    populateBeanField(bean, "AddressLine2"  , xml)
    populateBeanField(bean, "AddressLine3"  , xml)
    populateBeanField(bean, "AddressType"   , xml)
    populateBeanField(bean, "City"          , xml)
    populateBeanField(bean, "Country"       , xml)
    populateBeanField(bean, "County"        , xml)
    populateBeanField(bean, "Description"   , xml)
    populateBeanField(bean, "GeocodeStatus" , xml)
    populateBeanField(bean, "PostalCode"    , xml)
    populateBeanField(bean, "State"         , xml)
    populateBeanField(bean, "ValidUntil"    , xml)
  }
  
  protected function populateEFTDataFromEFTDataXML(bean : KeyableBean, xml : XmlBackedInstance) {
    populateBeanField(bean, ADDRESS_BOOK_UID   , xml, LINK_ID)
    populateBeanField(bean, "AccountName"      , xml)
    populateBeanField(bean, "BankAccountNumber", xml)
    populateBeanField(bean, "BankAccountType"  , xml)
    populateBeanField(bean, "BankName"         , xml)
    populateBeanField(bean, "BankRoutingNumber", xml)
    populateBeanField(bean, "IsPrimary"        , xml)
  }
  
  protected function populateCategoryScoreFromCategoryScoreXML(bean : KeyableBean, xml : XmlBackedInstance) {
    populateBeanField(bean, ADDRESS_BOOK_UID   , xml, LINK_ID)
    populateBeanField(bean, "ReviewCategory"   , xml)
    populateBeanField(bean, "Score"            , xml)         
  }
  
  /**
   * Populates a ContactTag with data from the XmlBackedInstance
   * @param bean the ContactTag to be populated
   * @param xml the XmlBackedInstance to populate the bean from 
   */
  public function populateContactTagFromContactTagXML(bean : KeyableBean, xml : XmlBackedInstance) {
    populateBeanField(bean, ADDRESS_BOOK_UID   , xml, LINK_ID)
    populateBeanField(bean, "Type"             , xml)
  }
  
  /**
   * Populates a ContactContact bean with the information from the XmlBackedInstance.
   * @param bean the ContactContact to be populated
   * @param xml the XmlBackedInstance to populate the bean from
   */
  public function populateContactContactFromContactContactXML(bean : KeyableBean, xml : XmlBackedInstance) {
    populateBeanField(bean, ADDRESS_BOOK_UID   , xml, LINK_ID)
    populateBeanField(bean, CONTACTCONTACT_RELATIONSHIP_BEAN_FIELD_NAME   , xml)
    populateFkBean(bean, 
            "SourceContact", 
            xml, 
            "SrcABContact", 
            \ b : KeyableBean, x : XmlBackedInstance ->populateRelatedContactFromContactContactXML(b, x))
    populateFkBean(bean, 
            "RelatedContact", 
            xml, 
            "RelABContact", 
            \ b : KeyableBean, x : XmlBackedInstance ->populateRelatedContactFromContactContactXML(b, x))
  }
  
  /**
   * Populates a ContactContact with the AddressBookUID from the ContactContact XmlBackedInstance. Used
   * to create a placeholder bean for related contact array manipulation, where the actual bean doesn't 
   * exist in CC but we need to manipulate the original values array that exists in the Contact.
   * @param bean the ContactContact to have it's AddressBookUID populated
   * @param xml the XmlBackedInstance to populate the bean from
   */
  public function populateRelatedContactFromContactContactXML(bean : KeyableBean, xml : XmlBackedInstance) {
    populateBeanField(bean, ADDRESS_BOOK_UID, xml, LINK_ID)
  }
  
}
