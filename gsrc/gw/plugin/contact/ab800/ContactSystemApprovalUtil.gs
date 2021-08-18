package gw.plugin.contact.ab800

/**
 * This class provides methods that control
 * <ul>
 * <li>if a Contact created in CC should be created in the remote ContactSystem</li>
 * <li>if a Contact create/update in CC should be applied immediately or if it requires approval in the Contact System
 * before being applied</li>
 * </ul>
 */
@Export
class ContactSystemApprovalUtil {

  public static function shouldCreateInContactSystem(theContact : Contact) : boolean {
    var shouldCreate = false
    // Only create contacts in the Contact System if they are on a claim.
    // Since we are creating the contact, there should be a ClaimContact
    // in the same bundle as the contact if it's on a claim.
    var cc = findClaimContactInBundle(theContact)
    if(cc != null) {
      // we are creating a claim contact - verify against it.

      // Only create vendors in the Contact System. If you want non vendors created in the Contact System then
      // change this code to allow the tag types, roles, subtypes on the Contacts that you want created.
      // We assume that clients will be coming from the Policy System already linked to the Contact System so
      // we shouldn't have to explicitly allow creation of the Contacts with the Client tag.
      theContact.ensureMinimumTags()
      if(theContact.TagTypes.contains(ContactTagType.TC_VENDOR)) {
        shouldCreate = true
      }

      // Sample to ignore Contacts by filtering the roles on the Claim Contact, assuming the logic above
      // has been changed to allow Contacts with these roles to be sent.
      /*
      // If there's only one role and that role is agent then don't send it.
      if(cc.Roles.Count == 1) {
        var ccRole = cc.Roles[0]
        if(ccRole.Role == ContactRole.TC_AGENT) {
          shouldCreate = false
        }
      }
      // if the Contact has the role of Witness as one of its roles don't send it.
      if(cc.Roles.hasMatch( \ elt -> elt.Role == ContactRole.TC_WITNESS)) {
        // if you want to send Contacts with the Witness role change the next line to shouldCreate = true
        shouldCreate = false
      }
      */
      ABContactSystemPlugin.LOGGER.trace("Found claimcontact for ${theContact}, shouldCreate is " + shouldCreate)
    } else {
      // not a claim contact - don't create
      ABContactSystemPlugin.LOGGER.trace("Did not find claimcontact for ${theContact}, not creating in CM")
      shouldCreate = false
    }
    return shouldCreate
  }


  public static function operationRequiresApproval(eventName : String, theContact : Contact) : boolean {
    var requiresApproval = false
    // only check vendor contacts for permissions
    if(theContact.TagTypes.contains(ContactTagType.TC_VENDOR)) {
      switch(eventName) {
        case ABContactSystemPlugin.CONTACT_UPDATED_EVENT_NAME:
            if(not perm.Contact.editab(theContact)) {
              requiresApproval = true
            }
            break
        case ABContactSystemPlugin.CONTACT_ADDED_EVENT_NAME:
            if(not perm.Contact.createab(theContact.IntrinsicType)) {
              requiresApproval = true
            }
            break
          default:
          requiresApproval = false
      }
    }
    return requiresApproval
  }

  private static function findClaimContactInBundle(theContact : Contact) : ClaimContact {
    var bundle = theContact.Bundle
    var claimContactsInBundle = bundle.getBeansByRootType(ClaimContact.Type)
    for(claimContact in claimContactsInBundle) {
      var cc = claimContact as ClaimContact
      if(cc.Contact.ID == theContact.ID) {
        return cc
      }
    }
    return null
  }
}