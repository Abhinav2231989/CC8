package gw.plugin.contact.ab800

uses gw.api.contact.ContactRelationships
uses gw.api.contact.ContactSystemUtil
uses gw.api.contact.ContactTokenThreadLocal
uses gw.api.contact.graph.ContactSubgraphTraverser
uses gw.api.contact.sync.ABSyncableGraphIterator
uses gw.api.graph.traverse.TraversalType
uses gw.api.system.CCLoggerCategory
uses gw.api.system.PLConfigParameters
uses gw.api.util.NewClaimWizardUtil
uses gw.contactmapper.ab800.ContactIntegrationMapperFactory
uses gw.entity.IEntityPropertyInfo
uses gw.entity.IEntityType
uses gw.financials.CheckUpdater
uses gw.lang.reflect.IPropertyInfo
uses gw.pl.persistence.core.Bundle
uses gw.plugin.Plugins
uses gw.plugin.contact.ContactCreateResult
uses gw.plugin.contact.ContactSystemPlugin
uses gw.plugin.contact.ContactSystemPluginException
uses gw.plugin.contact.CreatedContactCache
uses gw.plugin.contact.integration.contactpayload.ContactPayload
uses gw.plugin.contact.integration.contactpayload.types.complex.CreateAction
uses gw.plugin.contact.integration.contactpayload.types.complex.RemoveAction
uses gw.plugin.contact.integration.contactpayload.types.complex.TagUpdateAction
uses gw.plugin.contact.integration.contactpayload.types.complex.UpdateAction
uses gw.plugin.contact.search.ContactSearchFilter
uses gw.plugin.contact.search.ContactSearchResult
uses gw.plugin.contact.search.DuplicateSearchResult
uses gw.plugin.integration.utils.ErrorGeneratorImpl
uses gw.plugin.messaging.ContactMessageTransportBase
uses gw.webservice.contactapi.ContactAPIUtil
uses gw.webservice.contactapi.LateBoundABUIDHelper
uses gw.webservice.contactapi.beanmodel.XmlBackedInstance
uses gw.webservice.contactapi.beanmodel.anonymous.elements.XmlBackedInstance_Array
uses gw.webservice.contactapi.beanmodel.anonymous.elements.XmlBackedInstance_Field
uses gw.xml.XmlException
uses gw.xml.convert.XmlValueConverter
uses org.slf4j.Logger
uses org.apache.commons.lang.ObjectUtils
uses wsi.remote.gw.webservice.ab.ab801.abcontactapi.ABContactAPI
uses wsi.remote.gw.webservice.ab.ab801.abcontactapi.faults.AlreadyExecutedException
uses wsi.remote.gw.webservice.ab.ab801.abcontactapi.faults.BadIdentifierException
uses wsi.remote.gw.webservice.ab.ab801.abcontactapi.faults.DataConversionException
uses wsi.remote.gw.webservice.ab.ab801.abcontactapi.faults.EntityStateException
uses wsi.remote.gw.webservice.ab.ab801.abcontactapi.faults.PermissionException
uses wsi.remote.gw.webservice.ab.ab801.abcontactapi.faults.RequiredFieldException
uses wsi.remote.gw.webservice.ab.ab801.abcontactapi.faults.SOAPException
uses wsi.remote.gw.webservice.ab.ab801.abcontactapi.faults.SOAPSenderException
uses wsi.remote.gw.webservice.ab.ab801.abcontactapi.types.complex.AddressBookUIDContainer
uses wsi.remote.gw.webservice.ab.ab801.abcontactapi.types.complex.RelatedContactInfoContainer

uses java.lang.Exception
uses java.lang.IllegalArgumentException
uses java.lang.NullPointerException
uses java.util.Collection
uses java.util.HashMap
uses java.util.HashSet
uses java.util.UUID
uses gw.api.util.LocaleUtil
uses gw.pl.util.ExceptionUtil
uses java.util.Set

/**
 * Implementation of <code>ContactSystemPlugin</code> for integration
 * with Guidewire ContactManager.
 */
@Export
class ABContactSystemPlugin implements ContactSystemPlugin {

  internal static final var LOGGER: Logger = CCLoggerCategory.CONTACT_SYSTEM_PLUGIN
  internal static final var CONTACT_ADDED_EVENT_NAME : String  = "ContactAdded"
  internal static final var CONTACT_UPDATED_EVENT_NAME : String = "ContactChanged"
  internal static final var CONTACT_REMOVED_EVENT_NAME : String = "ContactRemoved"
  internal static final var CLAIM_CONTACT_REMOVED_EVENT_NAME : String = "ClaimContactRemoved"
  internal static final var CONTACT_TAG_UPDATED_EVENT_NAME : String = "ContactTagsUpdated"

  private static final var TRANSACTION_ID_PREFIX = PLConfigParameters.PublicIDPrefix.Value
  private static final var CONTACT_MESSAGE_TRANSPORT_DESTID = DestinationID
  private static final var ABUID_PROP_NAME = Contact#AddressBookUID.PropertyInfo.DisplayName

  private final var _contactRelationships = new ContactRelationships()
  private final var _pluginHelper = new ContactPluginHelper()
  private final var _mapper = ContactIntegrationMapperFactory.mapper()
  private final var _errorGenerator = new ErrorGeneratorImpl("Contact")

  construct() {
  }

  private property get ContactAPI() : ABContactAPI {
    var api = new ABContactAPI()
    api.Config.Guidewire.Locale = LocaleUtil.CurrentLanguage.toString()
    return api
  }

  /**
   * Creates the Contact in ContactManager, subject to approval
   * if the user requesting the change does not have authority
   * to make the change. This method will generate a new transaction
   * id.
   */
  override function createContact(contact:Contact) : ContactCreateResult {
    return createContact(contact, null)
  }

  /**
   * Creates the Contact in ContactManager, subject to approval
   * if the user requesting the change does not have authority
   * to make the change.
   */
  override function createContact(contact : Contact, transactionId:String) : ContactCreateResult {
    return handleErrors(null, contact, \->{

      var isPending = ContactSystemApprovalUtil.operationRequiresApproval(CONTACT_ADDED_EVENT_NAME, contact)
      if(transactionId == null) {
        transactionId = generateTransactionId()
      }
      contact.ensureMinimumTags()
      var traverser = new ContactSubgraphTraverser(contact)
          .withTraversalType(TraversalType.BREADTH_FIRST)
      var visitor = new TemporaryIDContactVisitor()
      traverser.traverse({visitor})

      try {
        var abContactXML = _mapper.populateXMLFromContact(contact)
        createContactXml(contact, abContactXML, isPending, transactionId)
      } finally {
        visitor.removeTempID()
      }

      return new ContactCreateResult(isPending, contact)
    })
  }


  /**
   * Finds any potential duplicates in ContactManager.
   */
  override function findDuplicates(contact : Contact, searchFilter:ContactSearchFilter) : DuplicateSearchResult {
    return handleErrors(null, contact, \ -> {
      var result : DuplicateSearchResult
      contact.ensureMinimumTags()
      var localXmlInstance = _mapper.populateXMLFromContact(contact)
      var abContactXML = _pluginHelper.toRemoteXmlBackedInstance(localXmlInstance)
      LOGGER.trace("findDuplicates, remoteXML : ${abContactXML.asUTFString()}")
      var duplicateResultsXml = ContactAPI.findDuplicates(abContactXML, _pluginHelper.toSearchSpec(searchFilter, true))
      return _pluginHelper.toDuplicateSearchResult(duplicateResultsXml, searchFilter.NumResultsOnly)
    })
  }


  /**
   * Retrieves the Contact from the contact management system, if
   * it exists.
   */
  override function retrieveContact(abUID:String) : Contact {
    return handleErrors(displaykey.Web.Plugin.ContactManager.RetrieveContactError, null, \ -> {
      try {
        return this._retrieveContact(abUID, null)
      } finally {
        CreatedContactCache.clear()
      }
    })
  }

  /**
   * Retrieves the Contact from the contact management system, if
   * it exists, along with the related contacts as specified by the
   * given contact relationships.
   */
  override function retrieveContact(abUID:String, relationships:Collection<ContactBidiRel>) : Contact {
    return handleErrors(displaykey.Web.Plugin.ContactManager.RetrieveContactError, null, \ -> {
      try {
        var contact = _retrieveContact(abUID, null)
        if(contact==null or relationships==null) {
          return contact
        }
        return internalRetrieveRelatedContacts(contact, relationships)
      } finally {
        CreatedContactCache.clear()
      }
    })
  }


  /**
   * Retrieves the related contacts from the contact management system as specified by the given
   * contact relationships.
   */
  override function retrieveRelatedContacts(contact : Contact, relationships:Collection<ContactBidiRel>) : Contact {
    return handleErrors(displaykey.Web.Plugin.ContactManager.RetrieveContactError, contact, \ -> {
      try {
        return internalRetrieveRelatedContacts(contact, relationships)
      } finally {
        CreatedContactCache.clear()
      }
    })

  }


  /**
   * Searches the contact management system according to the given search criteria and filter.
   */
  override function searchContacts(searchCriteria:ContactSearchCriteria, searchFilter:ContactSearchFilter) : ContactSearchResult {
    return handleErrors(null, null, \ -> {
      var remoteCriteria = ContactSearchMapper.convertToABContactAPISearchCriteria(searchCriteria)
      var remoteSpec = _pluginHelper.toSearchSpec(searchFilter, searchCriteria.IncludePendingContacts)
      var result = ContactAPI.searchContact(remoteCriteria, remoteSpec)


      return _pluginHelper.toSearchResult(result, searchFilter.NumResultsOnly)
    })
  }


  /**
   * Returns true if the entity (e.g. Contact) has changes that need to be sent to
   * ContactManager.
   */
  override function hasSyncableChanges(contact: Contact) : boolean {
    return handleErrors(null, contact, \ -> {
      var bundle = contact.Bundle
      var cc = bundle.getRemovedBeansOfType(ContactContact)
      var graphIter = new ABSyncableGraphIterator(contact)
      var hasSyncableChanges = false
      //TODO: change this to look at original values if the contact has originalValuesXML instead of just changed fields
      graphIter.each(\ kb -> {
        var typeInfo = (typeof kb).TypeInfo
        hasSyncableChanges = hasSyncableChanges or kb.ChangedFields.hasMatch(\ o -> {
          var p = typeInfo.getProperty(o.toString())
          return p!=null and isSyncableField(p)
        })
      })
      if(contact.isFieldChanged(Contact#SourceRelatedContacts) || contact.isFieldChanged(Contact#TargetRelatedContacts)) {
        hasSyncableChanges = true
      }
      for (c in cc) {
        if (c.SourceContact == contact or c.RelatedContact == contact) {
          hasSyncableChanges = true
          break
        }
      }
      if(contact.isFieldChanged(Contact#Tags)) {
        hasSyncableChanges = true
      }
      if (gw.api.util.NewClaimWizardUtil.isInNewClaimWizardFinalSave()) {
        hasSyncableChanges = true
      }
      return hasSyncableChanges
    })
  }

  /**
   * Updates the contact in the contact management system, associating the
   * change with the given transaction ID.
   */
  override function updateContact(contact : Contact, transactionId : String) {
    handleErrors(null, contact, \ -> {
      var isPending = ContactSystemApprovalUtil.operationRequiresApproval(CONTACT_UPDATED_EVENT_NAME, contact)
      this.updateContact(contact, isPending, transactionId)
      return null
    })
  }

  /**
   * Updates the contact in the contact management system.
   */
  override function updateContact(contact : Contact) {
    handleErrors(null, contact, \ -> {
      updateContact(contact, null)
      return null
    })
  }


  /**
   * Creates the appropriate event message to be sent later by the transport
   * to ContactManager.
   */
  override function createAsyncUpdate(messageCtx:MessageContext) {
    var payload : String
    var contact = messageCtx.Root typeis ClaimContact ? messageCtx.Root.Contact :  (messageCtx.Root as Contact)
    handleErrors(null, contact, \ -> {
      LOGGER.trace(this.IntrinsicType.Name + " createAsyncUpdate : ${messageCtx.EventName} for ${contact.AddressBookUID}")
      var eventName = messageCtx.EventName
      if(contact.AddressBookUID == null) {
        // not linked or not yet created
        var isPending = ContactSystemApprovalUtil.operationRequiresApproval(eventName, contact)

        // If the contact was created in the new claim wizard, check in the final save to see if
        // we need to treat this as an ADD event instead of an UPDATE event. ADDs are ignored in the
        // draft saves of the new claim wizard, so we need to cehck here if it should be created
        // in the contact system
        if (eventName == CONTACT_UPDATED_EVENT_NAME and NewClaimWizardUtil.isInNewClaimWizardFinalSave()) {
          eventName = CONTACT_ADDED_EVENT_NAME
        }

        switch(eventName) {
          case CONTACT_ADDED_EVENT_NAME:
              if(ContactSystemApprovalUtil.shouldCreateInContactSystem(contact)) {
                if (!ContactAPI.validateCreateContact(_pluginHelper.toRemoteXmlBackedInstance(_mapper.populateXMLFromContact(contact))).Valid){
                  throw new RequiredFieldException("")
                }
                contact.PendingLinkMessage = true
                var createXml = this.getPayloadForContactUpdate(contact, false)
                payload = new ContactPayload(new CreateAction() {
                    :CreateXml = createXml,
                    :IsPendingCreate = isPending
                }).asUTFString()
              } else {
                payload = null
              }
              break
          case CONTACT_UPDATED_EVENT_NAME:
              var lateBoundABUID = LateBoundABUIDHelper.Instance.isLateBound(contact, CONTACT_MESSAGE_TRANSPORT_DESTID)
              if(lateBoundABUID) {
                // contact will be linked by the time the message is sent!
                var tagUpdateXml = ""
                if(contact.isFieldChanged("Tags")) {
                  tagUpdateXml = this.getPayloadForTagOnlyUpdate(contact)
                }
                var updateXml = this.getPayloadForContactUpdate(contact, lateBoundABUID)
                payload = new ContactPayload(new UpdateAction() {
                    :UpdateXml = updateXml,
                    :IsPendingUpdate = isPending,
                    :TagUpdateXml = tagUpdateXml
                }).asUTFString()
              }
        }
      } else {
        if (gw.api.util.NewClaimWizardUtil.isInNewClaimWizardDraftSave()) {
          ContactSystemUtil.calculateAndSetContactFingerprint(contact);
        }

        var linkStatus = ContactSystemUtil.INSTANCE.generateLinkStatus(contact)
        var relationshipsDiffer = linkStatus.DifferentRelationshipsMessage != null
        var isPending = ContactSystemApprovalUtil.operationRequiresApproval(CONTACT_UPDATED_EVENT_NAME, contact)
        LOGGER.trace(this.IntrinsicType.Name + " createAsyncUpdate : ${linkStatus} for ${contact.AddressBookUID}")

        // out of sync means we send a pending update unless we are adding this as a new Contact to CC
        if(!linkStatus.SyncedRemote && !(CONTACT_ADDED_EVENT_NAME == eventName)) {
          isPending = true
        }
        switch(eventName) {
          case CONTACT_TAG_UPDATED_EVENT_NAME:
              LOGGER.debug("Creating tagupdate for Contact: ${contact}")
              var tagUpdateXml = this.getPayloadForTagOnlyUpdate(contact)
              if (tagUpdateXml != null) {
                payload = new ContactPayload(new TagUpdateAction() {
                    :TagUpdateXml = tagUpdateXml
                }).asUTFString()
              }
              break
          case CONTACT_ADDED_EVENT_NAME:
          case CONTACT_UPDATED_EVENT_NAME:
              var tagUpdateXml = ""
              if(contact.isFieldChanged("Tags")) {
                tagUpdateXml = this.getPayloadForTagOnlyUpdate(contact)
              }
              // only generate an update message if the contact's link status is not Synced or not Known.
              if(gw.api.util.NewClaimWizardUtil.isInNewClaimWizardDraftSave() || !linkStatus.Synced || !linkStatus.Known || relationshipsDiffer) {
                var updateXml = this.getPayloadForContactUpdate(contact, false)
                payload = new ContactPayload(new UpdateAction() {
                    :UpdateXml = updateXml,
                    :IsPendingUpdate = isPending,
                    :TagUpdateXml = tagUpdateXml
                }).asUTFString()
              } else {
                if(tagUpdateXml.length > 0) {
                  payload = new ContactPayload(new TagUpdateAction() {
                      :TagUpdateXml = tagUpdateXml
                  }).asUTFString()
                }
              }

              break
          case CLAIM_CONTACT_REMOVED_EVENT_NAME:
              if (linkStatus.PendingCreate) {
                LOGGER.debug("Creating remove for Contact: ${contact}")
                payload = new ContactPayload(new RemoveAction() {
                  :Linkid = contact.AddressBookUID
                }).asUTFString()
              }
              break
          default:
            LOGGER.warn("Received event message that is not handled: ${messageCtx.EventName}")
        }
      }
      if(LOGGER.TraceEnabled) {
        LOGGER.trace("Message payload for event: ${eventName} for contact: ${contact} is: ${payload}")
      }
      if(payload!=null) {
        messageCtx.createMessage(payload)
      }
      return null
    })

  }

  /**
   * Sends the Contact update to ContactManager from the message
   * payload.
   */
  override function sendAsyncUpdate(message:Message, payload:String) {
    LOGGER.trace(this.IntrinsicType.Name + " sendAsyncUpdate")
    var contact = message.Contact
    var xml : XmlBackedInstance
    var sentUpdate = false

    handleErrors(null, contact, \ -> {
      var actionType = ContactPayload.parse(payload).$TypeInstance
      if(actionType typeis CreateAction) {
        var isPending = actionType.IsPendingCreate
        xml = XmlBackedInstance.parse(actionType.CreateXml)
        this.createContactXml(contact, xml, isPending, getTransactionId(message))
      } else if(actionType typeis UpdateAction) {
        // if there's a tag update, send it
        var isPending = actionType.IsPendingUpdate
        sentUpdate = !isPending
        xml = XmlBackedInstance.parse(actionType.UpdateXml)

        xml.removeChild("Tags")

        // Only send the update as a pending if there are non tag changes in the xml
        this.updateContactXml(contact, xml, hasNonTagChanges(xml) ? isPending : false, getTransactionId(message))
        if(actionType.TagUpdateXml.length > 0 and isPending) {
          // We are sending an update here for the tags, but this should only
          // happen the first time a Contact is added in ClaimCenter so
          // we don't need to create an autosync work item - in fact doing
          // so will cause us to lose the changes just made on the local
          // contact!
          xml = XmlBackedInstance.parse(actionType.TagUpdateXml)
          xml = stripAddFromTagAdditionsWithLinkIDSet(xml)
          if(xml.arrayByName("Tags").XmlBackedInstance.Count != 0) {
            var transactionId = getTransactionId(message) + "-" + UUID.randomUUID().toString()
            this.updateContactXml(contact, xml, false, transactionId)
          }
        }
      } else if(actionType typeis TagUpdateAction) {
        xml = XmlBackedInstance.parse(actionType.TagUpdateXml)
        // check if we're trying to add with LinkID already present
        xml = stripAddFromTagAdditionsWithLinkIDSet(xml)
        if(xml.arrayByName("Tags").XmlBackedInstance.Count != 0) {
          this.updateContactXml(contact, xml, false, getTransactionId(message))
          sentUpdate = true
        }
      } else if(actionType typeis RemoveAction) {
        var transID = getTransactionId(message)
        var contactXML = this.getPayloadForContactUpdate(contact, false)
        var abXML = wsi.remote.gw.webservice.ab.ab801.beanmodel.XmlBackedInstance.parse(contactXML)

        removeContact(abXML, transID)
      }
      // need to update the contact AddressBookFingerprint iff we have updated the contact
      // in the contact system

      //if the Contact's primary address has changed, update future checks
      if(sentUpdate and xml.PrimaryAddress!=null and xml.hasChangedPrimaryAddress()) {
        try {
          updateFutureChecks(contact, xml)
        } catch (e:java.lang.Exception) {
          CCLoggerCategory.ADDRESS_SYNC
            .error("Unable to update the check mailing addresses for changed address: ${String.makeSafe(contact.PrimaryAddress as java.lang.String).combineLines()}", e)
        }
      }
      // don't send any updates of ABUIDs back to ContactManager
      if (contact.getAddressBookUID() != null) {
        ContactTokenThreadLocal.setToken("ab", contact.getAddressBookUID(), "Contact")
      }

      //need to sync all other Contacts with same ABUID if we sent an update
      if(sentUpdate && actionType typeis UpdateAction) {
        ContactSystemUtil.createAutoSyncWorkItem(contact.AddressBookUID)
      }

      return null
    })
  }

  override function getSyncableRelationshipsForContactType(type : IEntityType, onlyPrimary : boolean ) : Set<ContactBidiRel>  {
    return handleErrors(null, null, \ -> {
      if(onlyPrimary) {
        return RelationshipSyncConfig.Instance.getSyncableRelationshipsForContactType(type)
      } else {
        return ContactBidiRel.getTypeKeys(true).toSet();
      }
    })
  }

  override function getSyncablePropertiesForType(type : IEntityType ) : Collection<IEntityPropertyInfo> {
    return getPropertiesForType(type, false)
  }

  override function getPersistPropertiesForType(type : IEntityType ) : Collection<IEntityPropertyInfo> {
    return getPropertiesForType(type, true)
  }

  override function getAllMappedPropertiesForType(type: IEntityType): Collection <IEntityPropertyInfo> {
    return handleErrors(null, null, \ -> {
      var propertiesForType = new HashSet<IEntityPropertyInfo>()

      var mapper = ContactIntegrationMapperFactory.mapper()
      var syncPropReferences = mapper.Mappings.map( \ pm -> pm.Property)
      for(propRef in syncPropReferences) {
        if(propRef.RootType.isAssignableFrom(type)) {
          var propInfo = propRef.PropertyInfo
          if(propInfo typeis IEntityPropertyInfo) {
            propertiesForType.add(propInfo)
          }
        }
      }
      return propertiesForType
    })
  }

  //
  //    Private
  //

  private function getPropertiesForType(type : IEntityType, persist : boolean ) : Collection<IEntityPropertyInfo> {
    return handleErrors(null, null, \ -> {
      var propertiesForType = new HashSet<IEntityPropertyInfo>()

      var mapper = ContactIntegrationMapperFactory.mapper()
      var syncPropReferences = persist ? mapper.PersistProperties : mapper.AffectsSyncProperties
      for(propRef in syncPropReferences) {
        if(propRef.RootType.isAssignableFrom(type)) {
          var propInfo = propRef.PropertyInfo
          if(propInfo typeis IEntityPropertyInfo) {
            propertiesForType.add(propInfo)
          }
        }
      }
      return propertiesForType
    })
  }

  private function stripAddFromTagAdditionsWithLinkIDSet(xml : XmlBackedInstance) : XmlBackedInstance {
    var tagArray = xml.arrayByName("Tags")
    for(tag in tagArray.XmlBackedInstance) {
      if(tag.Action == "Add" && tag.LinkID != null && tag.LinkID != "") {
        tag.Action = null
      }
    }
    return xml
  }


  /**
   * Updates all future checks.
   */
  private function updateFutureChecks(contact:Contact, contactXml:XmlBackedInstance) {
       var oldAddress = new Address(contact.Bundle)
       populateOrigAddress(oldAddress, contactXml.PrimaryAddress)
       contact.Bundle.delete(oldAddress) //don't persist
       new CheckUpdater(contact.Bundle).updateMailingAddress(contact, oldAddress, contact.PrimaryAddress)
  }

  /**
   * Populate the address fields using either the original value, if present,
   * or the current value.
   */
  private function populateOrigAddress(addr:Address, xmlAddr:XmlBackedInstance) {
        var converter = new XmlValueConverter()
        xmlAddr.Field.each(\ field -> {
          if(Address.Type.TypeInfo.getProperty(field.Name)!=null) {
            converter.populateField(addr, field.Name, field.OrigValue!=null ? field.OrigValue : field.Value)
          }
        })
  }


  private function getTransactionId(msg:Message) : String {
    return "${TRANSACTION_ID_PREFIX}:${msg.ID}"
  }

  private function isSyncableField(p: IPropertyInfo): boolean {
    var pr= _mapper.AffectsSyncProperties.firstWhere( \ propRef -> propRef.PropertyInfo == p)
    return pr != null
  }


  /**
   * Handle exceptions
   */
  private function handleErrors(message : String, contact : Contact, e : Exception) {
    LOGGER.error("ABContactSystemPlugin-handleErrors: exception is ${e}")

    if (contact != null)
      contact.PendingLinkMessage = false

    // Just log AlreadyExecutedException
    if (e typeis AlreadyExecutedException) {
      LOGGER.error("CM reports already executed exception: ${e.LocalizedMessage}", e)
      return
    }

    var retryable = not (e typeis IllegalArgumentException or
    e typeis EntityStateException or
    e typeis RequiredFieldException or
    e typeis DataConversionException or
    e typeis BadIdentifierException or
    e typeis PermissionException or
    e typeis XmlException or
    e typeis SOAPSenderException)

    if (message == null) {
      message = e typeis RequiredFieldException && contact != null ?
        ContactRequiredFieldMessageMapper.getRequiredFieldMessageForContact(contact) :
        e.Message
    }

    if (not retryable) {
      // Non retryable, just ack the message. Will be fixed by activity
      throw new ContactSystemPluginException(message, e, false, false)
    } else if (e typeis SOAPException) {
      throw new ContactSystemPluginException(message, ExceptionUtil.findExceptionCause(e), true, true) // retryable and should notifyAdmin
    } else  {
      throw e  // Let it through for other type of exception
    }
  }


  private function handleErrors<T>(message : String, contact : Contact, call : block():T) : T {
    try {
      return call()
    }

    catch (e : Exception) {
      handleErrors(message, contact, e)
      return null
    }
  }



  /////////////////////////////////  From InternalContactSystemPlugin  ///////////////////////////////

  private function generateTransactionId() : String {
    return UUID.randomUUID().toString()
  }

  private function createContactXml(contact : Contact, createXml : XmlBackedInstance, isPendingCreate : boolean, transactionId : String) : String {
    var uidContainer:AddressBookUIDContainer
    var api = ContactAPI
    setTransactionId(api, transactionId)
    if(isPendingCreate) {
      uidContainer = api.createContactPendingApproval(_pluginHelper.toRemoteXmlBackedInstance(createXml),
          _pluginHelper.getChangeContext(contact, createXml))
    } else {
      uidContainer = api.createContact(_pluginHelper.toRemoteXmlBackedInstance(createXml))
    }
    updateABUIDs(contact, uidContainer)
    contact.PendingLinkMessage = false

    // update fingerprint
    ContactSystemUtil.calculateAndSetContactFingerprint(contact);
    return contact.AddressBookUID
  }


  /**
   * Calls the remote API to remove the contact
   */
  private function removeContact(xml: wsi.remote.gw.webservice.ab.ab801.beanmodel.XmlBackedInstance, id : String) {

    var api = ContactAPI
    setTransactionId(api, id)
    api.removeContact(xml)
  }

  /**
   * Takes the web service XML-backed instance and converts into into a local Contact.
   */
  private function getContactFromRemote(remoteXmlInstance:wsi.remote.gw.webservice.ab.ab801.beanmodel.XmlBackedInstance, bundle : Bundle) : Contact {
    var contact = _mapper.createEntity(remoteXmlInstance.EntityType, bundle) as Contact
    return _mapper.populateContactFromXML(contact, _pluginHelper.fromRemoteXmlBackedInstance(remoteXmlInstance))
  }

  /**
   * As of CM 7.0.1, contact sync may replace the Contact, so this call is to
   * get the replacement Contact, if present.
   */
  private function retrieveReplacementContact(addressBookId : String) : wsi.remote.gw.webservice.ab.ab801.beanmodel.XmlBackedInstance {
    // check to see if this contact has been replaced with another one
    var remoteXmlBackedInstance : wsi.remote.gw.webservice.ab.ab801.beanmodel.XmlBackedInstance
    var newABUID : String
    var api = ContactAPI
    // ignore BadIdentifierException in case the contact has been deleted
    try {
      newABUID = api.getReplacementContact(addressBookId)
    } catch(bie : BadIdentifierException) {
      bie = null // suppress the unused variable warning
    }

    if(newABUID != null) {
      remoteXmlBackedInstance = api.retrieveContact(newABUID)
    }

    return remoteXmlBackedInstance
  }


  /**
   * Retrieves the given Contact from ContactManager.
   */
  private function _retrieveContact(abUID:String, bundle : Bundle) : Contact {
    var remoteXmlInstance : wsi.remote.gw.webservice.ab.ab801.beanmodel.XmlBackedInstance

    // ignore BadIdentifierException in case the contact has been deleted
    try {
      remoteXmlInstance = ContactAPI.retrieveContact(abUID)
    } catch(bie : BadIdentifierException) {
      bie = null // suppress the unused variable warning
    }

    if(remoteXmlInstance==null) {
      // Check to see if this Contact has been replaced via merge
      remoteXmlInstance = retrieveReplacementContact(abUID)
      if(remoteXmlInstance==null) {
        return null
      }
    }
    return getContactFromRemote(remoteXmlInstance, bundle)
  }


  /**
   * Internal version of retrieve related contacts. This is the delegate method that should be called from other
   * API methods so that the created contact cache is consistent (i.e. DO NOT call retrieveRelatedContacts() from
   * other API methods). This method will not clear the contact cache.
   */
  private function internalRetrieveRelatedContacts(contact:Contact, relationships:Collection<typekey.ContactBidiRel>) : Contact {
    if(contact.AddressBookUID == null) {
      throw new IllegalArgumentException("Cannot retrieve related contacts for ${contact} because this contact is not linked to AddressBook")
    }
    var relatedContactInfo = ContactAPI.retrieveRelatedContacts(contact.AddressBookUID, convertRelationships(relationships).toTypedArray())
    return mergeRelatedContactsIntoContact(contact, relatedContactInfo)
  }

  private function convertRelationships(input:Collection<typekey.ContactBidiRel>) : Collection<String> {
    return input.map(\ tkrel -> {
      return  tkrel.Code
    })
  }

  /**
   * Updates the Contact in ContactManager, subject to approval
   * if the user requesting the change does not have authority
   * to make the change.
   */
  private function updateContact(contact:Contact, isPending : boolean, transactionId:String) {
    if(transactionId==null) {
      transactionId = generateTransactionId()
    }
    var localXml = _mapper.populateXMLFromContact(contact)
    updateContactXml(contact, localXml, isPending, transactionId)
  }

  /**
   * Sends the appropriate update to Contactmanager.
   */
  private function updateContactXml(contact:Contact,
                                      updateXml : XmlBackedInstance,
                                      isPending : boolean,
                                      transactionId: String) {

    var api = ContactAPI
    var isTagUpdate = _mapper.isTagUpdateOnly(updateXml)
    setTransactionId(api, transactionId)
    if(isTagUpdate or !isPending) {
      if(isTagUpdate) {
        _mapper.stripTagUpdateOnly(updateXml)
      }
      var abXml = _pluginHelper.toRemoteXmlBackedInstance(updateXml)
      var abuidContainer = api.updateContact(abXml)
      updateABUIDs(contact, abuidContainer)
    }  else {
       api.updateContactPendingApproval(_pluginHelper.toRemoteXmlBackedInstance(updateXml),
          _pluginHelper.getChangeContext(contact, updateXml))
    }
    ContactSystemUtil.calculateAndSetContactFingerprint(contact);
  }

  /**
   * Generates the message payload for an asynchronous Contact update.
   */
  private function getPayloadForContactUpdate(updateContact : Contact, lateBoundABUID : boolean) : String {
    var syncableRelationships = getSyncableRelationshipsForContactType(typeof updateContact as gw.entity.IEntityType, true)
    var updateXML = ContactIntegrationMapperFactory.mapper()
        .populateXMLFromContact(updateContact, syncableRelationships, lateBoundABUID)
    return updateXML.asUTFString()
  }

  /**
   * Generates the message payload for an asynchronous update of ContactTags.
   */
  private function getPayloadForTagOnlyUpdate(rootContact:Contact) : String {
    var updateXml = ContactIntegrationMapperFactory.mapper()
        .populateTagUpdateXMLFromContact(rootContact)
    // todo - check for actual changes here
    var hasUpdate = false
    if(updateXml != null) {
      var tagArray = updateXml.arrayByName(Contact#Tags.PropertyInfo.Name)
      for(arrayElem in tagArray.XmlBackedInstance) {
         var tagField = arrayElem.fieldByName(ContactTag#Type.PropertyInfo.Name)
         if(!(tagField.Value == tagField.OrigValue) || tagField.OrigValue == null) {
           hasUpdate = true
         }
      }
    }
    if(!hasUpdate) {
      updateXml = null
    }
    return updateXml == null ? null : updateXml.asUTFString()
  }

  /**
   * Gets or creates a local Contact by its ABUID.
   */
  private function getContact(abuid : String, bundle : Bundle) : Contact {
    var contactCache = CreatedContactCache.get()
    var contact = contactCache.getCachedByAddressBookId(abuid)
    if (contact == null) {
      contact = _retrieveContact(abuid, bundle)
      contactCache.cache(contact)
    }
    return contact
  }

  /**
   * Sets the ABUIDs from the returned XML container
   */
  private function updateABUIDs(contact:Contact, abuidContainer:AddressBookUIDContainer) {
    var abuidMap = _pluginHelper.generateMapFromABUIDContainer(abuidContainer)
    var graphIterator = new ABSyncableGraphIterator(contact)
    var contactUpdated = false
    graphIterator.each(\ bean -> {
      if(bean typeis AddressBookLinkable or bean typeis AddressBookConvertable) {
        var type = typeof bean
        var key = _pluginHelper.generateABUIDMapKey(type.RelativeName, bean.PublicID)
        var abuid = abuidMap[key]
        if(abuid!=null) {
          var abuidProp = type.TypeInfo.getProperty(ABUID_PROP_NAME)
          if(abuidProp.Accessor.getValue(bean)==null) {
            abuidProp.Accessor.setValue(bean, abuid)
            contactUpdated = true
          }
        }
      }
    })
  }

  private function createContactContact(addressBookUID : String, sourceContact: Contact, relatedContact : Contact, relationship: ContactRel, bundle : Bundle) : ContactContact {
    var xsdTypeName = _mapper.getNameMapper().getABEntityName(ContactContact.Type.RelativeName)
    var cContact = _mapper.createEntity(xsdTypeName, bundle) as ContactContact

    if (sourceContact == null or relatedContact == null or relationship == null) {
      throw new NullPointerException()
    }
    cContact.AddressBookUID = addressBookUID
    cContact.SourceContact = sourceContact
    cContact.RelatedContact = relatedContact
    cContact.Relationship = relationship
    return cContact
  }

  /**
   * Merges the related contacts in the RelatedContactInfoContainer into the contact, including updating
   * the OriginalValuesXML, if present in the contact.
   */
  private function mergeRelatedContactsIntoContact(contact : Contact, relContacts : RelatedContactInfoContainer) : Contact {
    var createdContactContacts = new HashMap<String, ContactContact>()

    var originalValuesXML = contact.OriginalValuesXML == null ? null
        : contact.OriginalValuesXML.Element as XmlBackedInstance
    var originalValuesRelatedContactArray : XmlBackedInstance_Array
    var addRelatedContactsArrayToOriginalValues = false

    if(originalValuesXML != null) {
      originalValuesRelatedContactArray = originalValuesXML.arrayByName("SourceRelatedContacts")
      if(originalValuesRelatedContactArray == null) {
        originalValuesRelatedContactArray = new XmlBackedInstance_Array()
        originalValuesRelatedContactArray.Name = "SourceRelatedContacts"
        addRelatedContactsArrayToOriginalValues = true
      }
    }

    for (relContactEntry in relContacts.SourceRelatedContacts.Entry) {
      var contactRel = _contactRelationships.getRelationshipType(relContactEntry.Relationship)
      var origCCContact = contact.SourceRelatedContacts.firstWhere(\ c -> (c.AddressBookUID == relContactEntry.LinkID))
      if (origCCContact == null) {
        var relatedContact = getContact(relContactEntry.ContactLinkID, contact.Bundle)
        var contactContact = createdContactContacts.get(relContactEntry.LinkID)
        if (contactContact == null) {
          contactContact = createContactContact(relContactEntry.LinkID, relatedContact, contact, contactRel, contact.Bundle)
          createdContactContacts.put(relContactEntry.LinkID, contactContact)
        }
        contact.addToSourceRelatedContacts(contactContact)
        if(originalValuesRelatedContactArray != null) {
          var xml = ContactIntegrationMapperFactory.mapper().createSourceRelatedContactsXMLFromSourceRelatedContacts(null, contactContact)
          originalValuesRelatedContactArray.XmlBackedInstance.add(xml)
        }
      }
    }
    if(addRelatedContactsArrayToOriginalValues && originalValuesRelatedContactArray.XmlBackedInstance.Count > 0) {
      originalValuesXML.Array.add(originalValuesRelatedContactArray)
    }

    originalValuesRelatedContactArray = null
    addRelatedContactsArrayToOriginalValues = false
    if(originalValuesXML != null) {
      originalValuesRelatedContactArray = originalValuesXML.arrayByName("TargetRelatedContacts")
      if(originalValuesRelatedContactArray == null) {
        originalValuesRelatedContactArray = new XmlBackedInstance_Array()
        originalValuesRelatedContactArray.Name = "TargetRelatedContacts"
        addRelatedContactsArrayToOriginalValues = true
      }
    }
    for (relContactEntry in relContacts.TargetRelatedContacts.Entry) {
      var contactRel = _contactRelationships.getRelationshipType(relContactEntry.Relationship)
      var origCCContact = contact.TargetRelatedContacts.firstWhere(\ c -> (c.AddressBookUID == relContactEntry.LinkID))
      if (origCCContact == null) {
        var relatedContact = getContact(relContactEntry.ContactLinkID, contact.Bundle)
        var contactContact = createdContactContacts.get(relContactEntry.LinkID)
        if (contactContact == null) {
          contactContact = createContactContact(relContactEntry.LinkID, contact, relatedContact, contactRel, contact.Bundle)
          createdContactContacts.put(relContactEntry.LinkID, contactContact)
        }
        contact.addToTargetRelatedContacts(contactContact)
        if(originalValuesRelatedContactArray != null) {
          var xml = _mapper.createTargetRelatedContactsXMLFromTargetRelatedContacts(null, contactContact)
          originalValuesRelatedContactArray.XmlBackedInstance.add(xml)
        }
      }
    }
    if(addRelatedContactsArrayToOriginalValues && originalValuesRelatedContactArray.XmlBackedInstance.Count > 0) {
      originalValuesXML.Array.add(originalValuesRelatedContactArray)
    }
    if(originalValuesXML != null) {
      contact.setOriginalValuesXML(originalValuesXML)
    }
    return contact
  }

  private function getOrCreateRelatedContact(abuid : String, subtype : String) : Contact {
    var contactCache = CreatedContactCache.get()
    var contact = contactCache.getCachedByAddressBookId(abuid)
    if (contact == null) {
      contact = _mapper.createEntity(subtype, null) as Contact
      contact.AddressBookUID = abuid
      contactCache.cache(contact)
    }
    return contact

  }

  private static property get DestinationID() : int {
    var messageTransportPlugin = Plugins.get("ContactMessageTransport")
    if(messageTransportPlugin typeis ContactMessageTransportBase) {
      return  messageTransportPlugin.DestinationID
    } else {
      return 99
    }
  }


  private function setTransactionId(api:ABContactAPI, tid : String) {
    ContactAPIUtil.setTransactionId(api.Config, tid)
  }

  private function hasNonTagChanges(instance: XmlBackedInstance):Boolean {
    for (field in instance.Field) {
      if (not(isExcludedField(field)) and not ObjectUtils.equals(field.OrigValue, field.Value)) {
          return true
      }
    }
    for (fkItem in instance.Fk) {
      var fkInstance = fkItem.XmlBackedInstance
      if (not ObjectUtils.equals(fkItem.OrigValue, fkInstance.LinkID)) {  // if the FK has changed where it points
        return true
      }
      if (hasNonTagChanges(fkInstance)) {
        return true
      }
    }
    for (array in instance.Array) {
      var arrayName = array.Name
      if (arrayName == "Tags"){
        continue
      }
      for (arrayItem in array.XmlBackedInstance) {
        var arrayElemID = arrayItem.LinkID == null ? displaykey.Web.AddressBook.MessageTransport.Info.NewElement : arrayItem.LinkID
        if (arrayItem.Action == "Add" or arrayItem.Action == "Update" or arrayItem.Action == "Remove") {
          return true
        }
        if (hasNonTagChanges(arrayItem)) {
          return true
        }
      }
    }
    return false
  }

  private function isExcludedField(field : XmlBackedInstance_Field) : boolean {
    return (field.Name == "LinkID" or field.Name == "External_PublicID")
  }
}
