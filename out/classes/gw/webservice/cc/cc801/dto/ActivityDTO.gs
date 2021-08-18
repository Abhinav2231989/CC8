package gw.webservice.cc.cc801.dto

uses gw.api.database.Query
uses gw.api.util.StringUtil
uses gw.api.webservice.exception.BadIdentifierException
uses gw.pl.persistence.core.Bundle
uses gw.xml.ws.annotation.WsiExportable
uses java.util.Date
uses javax.annotation.Generated

/**
 * <p style="border: 1px solid black; padding: 10px">This Data Transfer Object ("DTO") class is used to generate a WSDL to serialize and deserialize information across the network. Any change to the public properties of this DTO class will change the WSDL, thus breaking any existing clients. So once the corresponding WSDL is in use this DTO should only be changed with extreme caution, as it will require existing clients to be rebuilt and redeployed.<br/><br/>
DTOs which are a simple mapping from the domain model may be auto-generated using the "WSI DTO Generator", available from the customer portal. This generator can significantly speed up initial coding of such DTOs. Always remember, however, that DTOs are a network interface and a simple mapping from the domain model may not provide the best results. Remember too that once a DTO has been used in a deployed WSDL, re-running the generator may break existing clients (see above). Please read the documentation in the accelerator for guidance.</p><br/>
 * A(n) {@link ActivityDTO} is a DTO that represents an instance of {@link entity.Activity} for use by certain WS-I Web Services in the base product. This file is composed of basic getters and setters, plus members that make it easier for server-side code to work with DTOs, like virtual getters that query for entities by PublidID, and methods to copy fields to or from an instance of {@link entity.Activity}.
 * <p>None of these methods constrain how an instance of ActivityDTO is created, initialized or used (beyond the normal Gosu type checking): this is consistent with the <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO Design Pattern</a>, which states that "DTOs are simple objects that should not contain any business logic that would require testing". Validation logic that considers whether a DTO field can have a <i>particular</i> value (based on things like effective dates, jurisdictions, line of business, user permissions, the values of other fields, etc.) should not be handled here, but rather by the API that manipulates the ActivityDTO.
 * <p>Please read the documentation in the accelerator before reusing this class in any additional WS-I Web Services.</p>
 * <p>Fields are mapped according to the following rules:
 * <ul><li>Primitive values are copied directly</li><li>Typekey fields are copied directly (the WS-I layer translates them to/from WS-I enums)</li><li>Foreign keys fields are represented by the target object's PublicID</li><li>Arraykey fields are represented by an array of the PublicIDs of the elements in the array</li></ul></p>
 * <p>The specific mappings for {@link ActivityDTO} are as follows:
 * <table border="1"><tr><th>Field</th><th>Maps to</th></tr><tr><td>ActivityClass</td><td>Activity.ActivityClass</td></tr><tr><td>ActivityPatternID</td><td>Activity.ActivityPattern.PublicID</td></tr><tr><td>ActivityStatus</td><td>Activity.ActivityStatus</td></tr><tr><td>ApprovalIssue</td><td>Activity.ApprovalIssue</td></tr><tr><td>AssignedGroupID</td><td>Activity.AssignedGroup.PublicID</td></tr><tr><td>AssignedUserID</td><td>Activity.AssignedUser.PublicID</td></tr><tr><td>ClaimantID</td><td>Activity.Claimant.PublicID</td></tr><tr><td>ClaimID</td><td>Activity.Claim.PublicID</td></tr><tr><td>CreateTime</td><td>Activity.CreateTime</td></tr><tr><td>CreateUserID</td><td>Activity.CreateUser.PublicID</td></tr><tr><td>Description</td><td>Activity.Description</td></tr><tr><td>ExposureID</td><td>Activity.Exposure.PublicID</td></tr><tr><td>PublicID</td><td>Activity.PublicID</td></tr><tr><td>Subject</td><td>Activity.Subject</td></tr><tr><td>Type</td><td>Activity.Type</td></tr><tr><td>UpdateTime</td><td>Activity.UpdateTime</td></tr><tr><td>UpdateUserID</td><td>Activity.UpdateUser.PublicID</td></tr></table></p>
 * <br/>This file was generated using the following property definitions:<br/><pre>Activity#ActivityClass,   // typekey.ActivityClass<br/>Activity#ActivityPattern, // ActivityPattern<br/>Activity#ActivityStatus,  // String<br/>Activity#ApprovalIssue,   // String<br/>Activity#AssignedGroup,   // Group<br/>Activity#AssignedUser,    // User<br/>Activity#Claim,           // Claim<br/>Activity#Claimant,        // Contact<br/>Activity#Description,     // String<br/>Activity#Exposure,        // Exposure<br/>Activity#Subject,         // String<br/>Activity#Type             // typekey.ActivityType</pre>
 */
@Export
@WsiExportable("http://guidewire.com/cc/ws/gw/webservice/cc/cc801/dto/ActivityDTO")
@Generated("DTOBuilder", "DO NOT edit this class directly! See comments at the top of the file.", "2014-01-28T16:22Z")
final class ActivityDTO {
  var _activityClass     : ActivityClass as ActivityClass
  /** Derived from Activity#ActivityPattern.PublicID */
  var _activityPatternID : String        as ActivityPatternID
  var _activityStatus    : String        as ActivityStatus
  var _approvalIssue     : String        as ApprovalIssue
  /** Derived from Activity#AssignedGroup.PublicID */
  var _assignedGroupID   : String        as AssignedGroupID
  /** Derived from Activity#AssignedUser.PublicID */
  var _assignedUserID    : String        as AssignedUserID
  /** Derived from Activity#Claimant.PublicID */
  var _claimantID        : String        as ClaimantID
  /** Derived from Activity#Claim.PublicID */
  var _claimID           : String        as ClaimID
  var _createTime        : Date          as CreateTime
  /** Derived from Editable#CreateUser.PublicID */
  var _createUserID      : String        as CreateUserID
  var _description       : String        as Description
  /** Derived from Activity#Exposure.PublicID */
  var _exposureID        : String        as ExposureID
  var _newNotes          : NoteDTO[]     as NewNotes = {}
  var _publicID          : String        as PublicID
  var _subject           : String        as Subject
  var _type              : ActivityType  as Type
  var _updateTime        : Date          as UpdateTime
  /** Derived from Editable#UpdateUser.PublicID */
  var _updateUserID      : String        as UpdateUserID

  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  construct() { }

  /**
   * Copies the platform-managed fields from the supplied Activity
   * @param that The Activity to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  protected function _copyReadOnlyFieldsFrom(that : Activity) {
    // if field is on base class
      _activityStatus    = that.ActivityStatus
      _createTime        = that.CreateTime
      _createUserID      = that.CreateUser.PublicID
      _updateTime        = that.UpdateTime
      _updateUserID      = that.UpdateUser.PublicID
    //
  }

  /**
   * Set the fields in this DTO using the supplied Activity
   * @param that The Activity to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function readFrom(that : Activity) : ActivityDTO {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      ActivityClass      = that.ActivityClass
      ActivityPatternID  = that.ActivityPattern.PublicID
      ApprovalIssue      = that.ApprovalIssue
      AssignedGroupID    = that.AssignedGroup.PublicID
      AssignedUserID     = that.AssignedUser.PublicID
      ClaimID            = that.Claim.PublicID
      ClaimantID         = that.Claimant.PublicID
      Description        = that.Description
      ExposureID         = that.Exposure.PublicID
      PublicID           = that.PublicID
      Subject            = that.Subject
      Type               = that.Type
    //
    return this
  }

  /**
   * Update the supplied Activity using the field values stored in this DTO
   * @param that The Activity to update.
   * @param (Optional) ignoreNullValues If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Activity, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeTo(that : Activity, ignoreNullValues = true) : Activity {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      if (ActivityClass     != null or !ignoreNullValues) that.ActivityClass     = ActivityClass
      if (ActivityPatternID != null or !ignoreNullValues) that.ActivityPattern   = ActivityPattern
      if (ApprovalIssue     != null or !ignoreNullValues) that.ApprovalIssue     = ApprovalIssue
      if (AssignedGroupID   != null or !ignoreNullValues) that.AssignedGroup     = AssignedGroup
      if (AssignedUserID    != null or !ignoreNullValues) that.AssignedUser      = AssignedUser
      if (ClaimID           != null or !ignoreNullValues) that.Claim             = Claim
      if (ClaimantID        != null or !ignoreNullValues) that.Claimant          = Claimant
      if (Description       != null or !ignoreNullValues) that.Description       = Description
      if (ExposureID        != null or !ignoreNullValues) that.Exposure          = Exposure
      if (PublicID          != null or !ignoreNullValues) that.PublicID          = PublicID
      if (Subject           != null or !ignoreNullValues) that.Subject           = Subject
      if (Type              != null or !ignoreNullValues) that.Type              = Type
    //
    return that
  }

  /**
   * Uses the createNew block to create a new Activity, adds it to the supplied bundle, then updates it using the field values stored in this DTO. The ignoreNullValues parameter controls how the fields that are null are treated.
   * @param bundle The bundle in which to create the new Activity.
   * @param createNew (Optional) A block that returns a new instance of Activity. If this is null, the default constructor will be used.
   * @param ignoreNullValues (Optional) If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Activity, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeToNewEntityIn(bundle : Bundle, createNew : block() : Activity = null, ignoreNullValues = true) : Activity {
    var instance : Activity
    if (createNew == null) {
      instance = bundle == null
          ? new Activity()
          : new Activity(bundle)
    }
    else {
      instance = createNew()

      if (bundle != null) {
        instance = bundle.add(instance)
      }
    }
    return writeTo(instance, ignoreNullValues)
  }

  /** Convenience property that returns the {@link ActivityPattern} whose PublicID is {@code ActivityPatternID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get ActivityPattern() : ActivityPattern{ return fetchByID(ActivityPatternID) }
  
  /** Convenience property that returns the {@link Group} whose PublicID is {@code AssignedGroupID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get AssignedGroup()  : Group        { return fetchByID(AssignedGroupID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code AssignedUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get AssignedUser()   : User         { return fetchByID(AssignedUserID) }
  
  /** Convenience property that returns the {@link Contact} whose PublicID is {@code ClaimantID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Claimant()       : Contact      { return fetchByID(ClaimantID) }
  
  /** Convenience property that returns the {@link Claim} whose PublicID is {@code ClaimID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Claim()          : Claim        { return fetchByID(ClaimID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code CreateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CreateUser()     : User         { return fetchByID(CreateUserID) }
  
  /** Convenience property that returns the {@link Exposure} whose PublicID is {@code ExposureID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Exposure()       : Exposure     { return fetchByID(ExposureID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code UpdateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get UpdateUser()     : User         { return fetchByID(UpdateUserID) }

  /**
   * Returns whether the fields tracked by this DTO match the same fields in the other DTO
   * @param that The ActivityDTO to compare against.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function equals(that : Object) : boolean {
    if (that typeis ActivityDTO) {
      return ActivityClass     == that.ActivityClass
         and ActivityPatternID == that.ActivityPatternID
         and ApprovalIssue     == that.ApprovalIssue
         and AssignedGroupID   == that.AssignedGroupID
         and AssignedUserID    == that.AssignedUserID
         and ClaimantID        == that.ClaimantID
         and ClaimID           == that.ClaimID
         and Description       == that.Description
         and ExposureID        == that.ExposureID
         and PublicID          == that.PublicID
         and Subject           == that.Subject
         and Type              == that.Type
    }
    return super.equals(that)
  }

  /**
   * Returns the hash code of this object.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function hashCode() : int {
    return {
      ActivityClass,
      ActivityPatternID,
      ApprovalIssue,
      AssignedGroupID,
      AssignedUserID,
      ClaimantID,
      ClaimID,
      Description,
      ExposureID,
      PublicID,
      Subject,
      Type
    }.reduce(17, \ hashCode, obj -> 31 * hashCode + obj?.hashCode())
  }

  /**
   * Provides a rough idea of the command needed to re-create this DTO. Because it is rough it is probably only  useful for debugging purposes.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function toString() : String {
    var fields = {} as List<String>

    if (ActivityClass      != null  ) fields.add(':ActivityClass     = ActivityClass.get("' + ActivityClass.Code + '")')
    if (ActivityPatternID.HasContent) fields.add(':ActivityPatternID = ' + StringUtil.enquote(ActivityPatternID))
    if (ActivityStatus   .HasContent) fields.add(':ActivityStatus    = ' + StringUtil.enquote(ActivityStatus))
    if (ApprovalIssue    .HasContent) fields.add(':ApprovalIssue     = ' + StringUtil.enquote(ApprovalIssue))
    if (AssignedGroupID  .HasContent) fields.add(':AssignedGroupID   = ' + StringUtil.enquote(AssignedGroupID))
    if (AssignedUserID   .HasContent) fields.add(':AssignedUserID    = ' + StringUtil.enquote(AssignedUserID))
    if (ClaimantID       .HasContent) fields.add(':ClaimantID        = ' + StringUtil.enquote(ClaimantID))
    if (ClaimID          .HasContent) fields.add(':ClaimID           = ' + StringUtil.enquote(ClaimID))
    if (CreateTime         != null  ) fields.add(':CreateTime        = ' + StringUtil.enquote(CreateTime.toString()) + ' as Date')
    if (CreateUserID     .HasContent) fields.add(':CreateUserID      = ' + StringUtil.enquote(CreateUserID))
    if (Description      .HasContent) fields.add(':Description       = ' + StringUtil.enquote(Description))
    if (ExposureID       .HasContent) fields.add(':ExposureID        = ' + StringUtil.enquote(ExposureID))
    if (NewNotes           != null  ) fields.add(':NewNotes          = ' + NewNotes)
    if (PublicID         .HasContent) fields.add(':PublicID          = ' + StringUtil.enquote(PublicID))
    if (Subject          .HasContent) fields.add(':Subject           = ' + StringUtil.enquote(Subject))
    if (Type               != null  ) fields.add(':Type              = ActivityType.get("' + Type.Code + '")')
    if (UpdateTime         != null  ) fields.add(':UpdateTime        = ' + StringUtil.enquote(UpdateTime.toString()) + ' as Date')
    if (UpdateUserID     .HasContent) fields.add(':UpdateUserID      = ' + StringUtil.enquote(UpdateUserID))

    return "new ActivityDTO() {\n  " + fields.join(",\n  ") + "\n}"
  }

  /**
   * return a new ActivityDTO that represents the current state of the supplied Activity.
   * @param that The Activity to be represented.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  static function valueOf(that : Activity) : ActivityDTO {
    return new ActivityDTO().readFrom(that)
  }

  /**
   * Returns the Activity whose public ID is in the supplied list, or null if the publicID is null.
   * @param publicIDs A list of the PublicIDs.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  private static function fetchByID<T extends KeyableBean>(publicID : String) : T {
    var result : T
    if (publicID != null) {
      result = Query.make(T)
          .compare(T#PublicID, Equals, publicID)
          .select()
          .AtMostOneRow
      if (result == null) throw BadIdentifierException.badPublicId(T, publicID)
    }
    return result
  }

}