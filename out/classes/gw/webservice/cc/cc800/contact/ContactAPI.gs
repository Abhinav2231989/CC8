package gw.webservice.cc.cc800.contact

uses gw.api.contact.ContactRetireHelper
uses gw.api.contact.ContactSystemUtil
uses gw.api.database.IQueryBeanResult
uses gw.api.database.Query
uses gw.api.server.AvailabilityLevel
uses gw.api.system.CCLoggerCategory
uses gw.api.webservice.exception.BadIdentifierException
uses gw.api.webservice.exception.RequiredFieldException
uses gw.api.webservice.exception.SOAPSenderException
uses gw.lang.Export
uses gw.lang.Throws
uses gw.transaction.Transaction
uses gw.webservice.contactapi.ab800.ABClientAPI
uses gw.webservice.contactapi.ab800.ABClientAPIAddressBookUIDContainer
uses gw.webservice.contactapi.ab800.ABClientAPIPendingChangeContext
uses org.slf4j.Logger
uses gw.webservice.contactapi.beanmodel.XmlBackedInstance
uses gw.webservice.contactapi.beanmodel.anonymous.elements.XmlBackedInstance_Field
uses org.apache.commons.lang.ObjectUtils
uses gw.xml.ws.annotation.WsiCheckDuplicateExternalTransaction
uses gw.api.contact.ContactRetireContext

/**
 * This API provide external system ability to interact with contacts in ClaimCenter.
 */
@Export
@gw.xml.ws.annotation.WsiWebService( "http://guidewire.com/cc/ws/gw/webservice/cc/cc800/contact/ContactAPI" )
@gw.xml.ws.annotation.WsiAvailability(AvailabilityLevel.MAINTENANCE)
class ContactAPI implements ABClientAPI {

  public static final var MAX_CONTACT_LIMIT : int = 10
  var _logger : Logger = CCLoggerCategory.CC_CONTACT_API_PLUGIN
    
  construct() { }

  /**
   * Update a contact in the client system.
   *
   * The caller must set the transaction id in the soap request headers.  This can be done using
   * ContactAPIUtil.setTransactionId().
   *
   * @param contactXML the updates expressed as a SOAP object
   */
  @Throws(BadIdentifierException, "If an object cannot be found for a given ID")
  @Throws(RequiredFieldException, "If required fields are missing")
  @Throws(SOAPSenderException, "Other sender error")
  @WsiCheckDuplicateExternalTransaction
  override function updateContact(contactXML : gw.webservice.contactapi.beanmodel.XmlBackedInstance) {
    var abuidToUpdate : String
    
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
   * The caller must set the transaction id in the soap request headers.  This can be done using
   * ContactAPIUtil.setTransactionId().
   *
   * @param keptContactABUID the UID of the contact to keep
   * @param deletedContactABUID the UID of contact to be replaced
   */
  @Throws(RequiredFieldException, "If required fields are missing")
  @WsiCheckDuplicateExternalTransaction
  override function mergeContacts(keptContactABUID : String, deletedContactABUID : String) {
    // deletedContactABUID field must be specified
    if (deletedContactABUID == null) {
      throw new RequiredFieldException(displaykey.Webservice.Error.MissingRequiredField("deletedContactABUID"))
    }

    // keptContactABUID field must be specified    
    if (keptContactABUID == null) {
      throw new RequiredFieldException(displaykey.Webservice.Error.MissingRequiredField("keptContactABUID"))
    }
    
    _logger.debug("ContactAPI merge, deletedContact: ${deletedContactABUID} ; keptContact ${keptContactABUID}")
    // 3) Create an autosync worker item to update all local contacts with deltedContactABUID with keptContactABUID
    ContactSystemUtil.createAutoSyncWorkItem(deletedContactABUID, keptContactABUID)
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
    ContactSystemUtil.createAutoSyncWorkItem(addressBookUID)
  }
  
  /**
   * Removes the specified contact.
   *
   * The caller must set the transaction id in the soap request headers.  This can be done using
   * ContactAPIUtil.setTransactionId().
   *
   * @param addressBookUID the <code>AddressBookUID</code> of the <code>Contact</code>
   */
  @WsiCheckDuplicateExternalTransaction
  override function removeContact(addressBookUID : String) {
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
        if (!ContactRetireHelper.computeCanRetireContact(contact, new ContactRetireContext())) {
          deleteOK = false
          break
        } else {
          ContactRetireHelper.createContactRetireWorkItem(contact)
        }
      }
    }
    return deleteOK
  }
  
  /**
   * Notification from ContactManager that a pending contact update has been rejected.
   * This method needs to inform the user who generated the update that is has been 
   * rejected via an activity.
   * 
   * @param context the context information about the pending update that was rejected
   */
  override function pendingUpdateRejected(context : ABClientAPIPendingChangeContext) {    
    _logger.info("PendingUpdateRejected for contact : ${context.AddressBookUID}, user: ${context.UserDisplayName}, resolution: ${context.Resolution}, resolution reason: ${context.ResolutionReason}")
    createRejectionActivity(context, ActivityPattern.finder.getActivityPatternByCode("pending_update_rejected"))
  }

  /**
   * Notification from ContactManager that a pending contact create has been rejected.
   * This method needs to inform the user who generated the create that is has been 
   * rejected via an activity.
   * 
   * @param context the context information about the pending create that was rejected
   */
  override function pendingCreateRejected(context : ABClientAPIPendingChangeContext) {
    _logger.info("PendingCreateRejected for contact : ${context.AddressBookUID}, user: ${context.UserDisplayName}, resolution: ${context.Resolution}, resolution reason: ${context.ResolutionReason}")
    createRejectionActivity(context, ActivityPattern.finder.getActivityPatternByCode("pending_create_rejected"))
  }

  /**
   * Notification from ContactManager that a pending contact create has been approved.
   * 
   * @param context the context information about the pending create that was approved
   */
  override function pendingCreateApproved(context : ABClientAPIPendingChangeContext) {
    _logger.info("PendingCreateApproved for contact : ${context.AddressBookUID}, user: ${context.UserDisplayName}, resolution: ${context.Resolution}, resolution reason: ${context.ResolutionReason}")
  }

  /**
   * Notification from ContactManager that a pending contact update has been approved.
   * This method needs to update the CC contact graph entities created as part of the 
   * update operation with the AddressBookUIDs assigned to those entities by ContactManager.
   * 
   * @param context the context information about the pending update that was approved
   * @param abuidContainer the AddressBookUIDs created for the new entities created in this update
   */
  override function pendingUpdateApproved(context : ABClientAPIPendingChangeContext, abuidContainer : ABClientAPIAddressBookUIDContainer) {
    _logger.info("PendingUpdateApproved for contact : ${context.AddressBookUID}, user: ${context.UserDisplayName}, resolution: ${context.Resolution}, resolution reason: ${context.ResolutionReason}")
    _logger.info("Update Approved Contact AddressBookUID: ${abuidContainer.ContactABUID}")
    for(abuidTuple in abuidContainer.AddressBookUIDTuples) {
      _logger.info("type : ${abuidTuple.EntityType}, addressbookUID : ${abuidTuple.LinkID}, public id : ${abuidTuple.External_PublicID}")
    }
    if (context.AddressBookUID.HasContent) {
      autoSyncContactWithABUID(context.AddressBookUID)
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Private functions
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private function findContactsByAddressBookUID(addressBookUID : String) : IQueryBeanResult<Contact> {
    return Query.make(Contact)
                .compare("AddressBookUID", Equals, addressBookUID)
                .select()  
  }
  
  private function createRejectionActivity(context: ABClientAPIPendingChangeContext, pattern: ActivityPattern ){
    
    //find user
    var query = new Query<User>(User)
    var selectedUser = query.select().where(\ u -> u.Credential.UserName == context.Username).first()
    
    var selectedClaim : Claim
    if (context.RootEntityID.HasContent) {
      var ccQuery = new Query<Claim>(Claim)
      selectedClaim = ccQuery.select().where(\ c -> c.PublicID == context.RootEntityID).first()  
    }
    
    //find claim contact
    var contactQuery = new Query<ClaimContact>(ClaimContact)
    var claimContact = contactQuery.select().where(\ c -> c.Contact.PublicID == context.PublicID).first()

    if (claimContact == null) {
      claimContact = contactQuery.select().where(\ c -> c.Contact.AddressBookUID == context.AddressBookUID and c.Claim.PublicID == context.RootEntityID).first()
    }

    //if no claim contacts found, no more activities created, return
    if (claimContact == null) {
      return
    }

    if (selectedClaim == null) {
      selectedClaim = claimContact.Claim
    }

    if (selectedClaim == null) {
      return
    }

    var group : Group

    //When a user has one group, the Activity is assigned to the user and group
    if ((selectedUser.AllGroups.Count == 2 and selectedUser.AllGroups.contains(selectedUser.RootGroup)) or selectedUser.AllGroups.Count == 1 and !selectedUser.AllGroups.contains(selectedUser.RootGroup)) {
      for (g in selectedUser.AllGroups) {
        if (g == selectedUser.RootGroup)
          continue
        else {
          group = g as Group
          break 
        }
      }

    //When a user has no groups and the contact is associated with a Claim, the Activity is assigned to the Claim owner
    } else if ((selectedUser.AllGroups.Count == 1 && selectedUser.AllGroups.contains(selectedUser.RootGroup)) or selectedUser.AllGroups.Count == 0) {
      if (selectedClaim != null) {
        selectedUser = selectedClaim.AssignedUser
        group = selectedClaim.AssignedGroup
      } else {
        selectedUser = claimContact.Claim.AssignedUser
        group = claimContact.Claim.AssignedGroup        
      }

    } 
    // When a user has multiple groups
    else {
      //the contact is associated with a Claim for one of those groups, the Activity is assigned to the user and that claim group
      for (g in selectedUser.AllGroups){ 
        if ((g as Group) == selectedUser.RootGroup)
          continue          
        
          if (claimContact.Claim.AssignedGroup == g as Group) {
            group = g as Group
            break
          }
        
        
        if (group != null) {
          break
        }
      }
      
      //the contact is NOT associated with a Claim for any of those groups, the Activity is assigned to the user and any group
      if (group == null) {
        for (g in selectedUser.AllGroups) {
          if ((g as Group) == selectedUser.RootGroup)
            continue
          group = g as Group
          break
        }
      }
    } 
    
    var explanation = displaykey.Web.AddressBook.ContactDetail.PendingChange.Explanation(context.Resolution.toString().capitalize())//"Rejection Reason: ${context.Resolution.toString().capitalize()}"
    if (context.ResolutionReason.HasContent) {
      explanation = displaykey.Web.AddressBook.ContactDetail.PendingChange.ExplanationWithReason(context.Resolution.toString().capitalize(), context.ResolutionReason)//"\nDescription: ${context.ResolutionReason}"
    }

    if (context.Resolution != ContactChangeResolution.TC_ALREADY_APPLIED) {
      Transaction.runWithNewBundle(\ bundle -> {
        var activity = new Activity(bundle)
        activity.setActivityPattern(pattern, null, null)
        activity.Claim = selectedClaim
        claimContact = bundle.add(claimContact)
        activity.RelatedTo = claimContact.Contact
        activity.Description = explanation
        activity.Status = ActivityStatus.TC_OPEN
        activity.assign(group, selectedUser)

        if (pattern == ActivityPattern.finder.getActivityPatternByCode("pending_update_rejected") and context.ChangeXML != null) {
          var note = activity.newNote()
          note.Subject = displaykey.Web.AddressBook.ContactDetail.PendingChange.NoteSubject
          note.Body = createNote(XmlBackedInstance.parse(context.ChangeXML))
          note.Claim = selectedClaim
        }
      })
    }

    if (pattern == ActivityPattern.finder.getActivityPatternByCode("pending_update_rejected")) {
      Transaction.runWithNewBundle(\ bundle -> {
        claimContact = bundle.add(claimContact)
        ContactSystemUtil.INSTANCE.syncToContactSystem(claimContact.Contact)
      })
    }
  }

  private function createNote(instance: XmlBackedInstance) : String {
    return appendInstanceChanges(instance, "Contact")
  }

  private function appendInstanceChanges(instance: XmlBackedInstance, objectPath:String):String {

    var noteText = ""

    for (field in instance.Field) {
      if (not(isExcludedField(field)) and not ObjectUtils.equals(field.OrigValue, field.Value)) {
        if (field.OrigValue == null) {
          noteText += displaykey.Web.AddressBook.MessageTransport.Info.AddField("${field.Name}", field.Value) + "\n"
        } else if (field.Value == null) {
          noteText += displaykey.Web.AddressBook.MessageTransport.Info.RemoveField("${field.Name}", field.OrigValue) + "\n"
        } else {
          noteText += displaykey.Web.AddressBook.MessageTransport.Info.UpdateField("${field.Name}", field.OrigValue, field.Value) + "\n"
        }
      }
    }
    for (fkItem in instance.Fk) {
      var fkInstance = fkItem.XmlBackedInstance
      if (not ObjectUtils.equals(fkItem.OrigValue, fkInstance.LinkID)) {  // if the FK has changed where it points
        if (fkItem.OrigValue == null) {
          noteText += displaykey.Web.AddressBook.MessageTransport.Info.AddForeignKey("${fkItem.Name}", fkInstance.LinkID) + "\n"
        } else if (fkInstance.LinkID == null) {
          noteText += displaykey.Web.AddressBook.MessageTransport.Info.RemoveForeignKey("${fkItem.Name}", fkItem.OrigValue) + "\n"
        } else {
          noteText += displaykey.Web.AddressBook.MessageTransport.Info.UpdateForeignKey("${fkItem.Name}", fkItem.OrigValue, fkInstance.LinkID) + "\n"
        }
      }
      noteText += appendInstanceChanges(fkInstance, "${objectPath}.${fkItem.Name}")
    }
    for (array in instance.Array) {
      var arrayName = array.Name
      for (arrayItem in array.XmlBackedInstance) {
        var arrayElemID = arrayItem.LinkID == null ? displaykey.Web.AddressBook.MessageTransport.Info.NewElement : arrayItem.LinkID
        if (arrayItem.Action == "Add") {
          noteText += displaykey.Web.AddressBook.MessageTransport.Info.AddArrayElement("${arrayName}") + "\n"
        } else if (arrayItem.Action == "Update") {
          noteText += displaykey.Web.AddressBook.MessageTransport.Info.UpdateArrayElement("${arrayName}[${arrayElemID}]") + "\n"
        } else if (arrayItem.Action == "Remove") {
          noteText += displaykey.Web.AddressBook.MessageTransport.Info.RemoveArrayElement("${arrayName}[${arrayElemID}]") + "\n"
        } else if (arrayItem.Action != null) {
          noteText += "Unrecognized array action: ${arrayItem.Action}\n"
        }
        noteText += appendInstanceChanges(arrayItem, "${objectPath}.${arrayName}[${arrayElemID}]")
      }
    }
    return noteText
  }

  private function isExcludedField(field : XmlBackedInstance_Field) : boolean {
    return (field.Name == "LinkID" or field.Name == "External_PublicID" or field.Name == "GeocodeStatus")
  }
}
