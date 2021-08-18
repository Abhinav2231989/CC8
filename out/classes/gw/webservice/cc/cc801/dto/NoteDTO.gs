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
 * A(n) {@link NoteDTO} is a DTO that represents an instance of {@link entity.Note} for use by certain WS-I Web Services in the base product. This file is composed of basic getters and setters, plus members that make it easier for server-side code to work with DTOs, like virtual getters that query for entities by PublidID, and methods to copy fields to or from an instance of {@link entity.Note}.
 * <p>None of these methods constrain how an instance of NoteDTO is created, initialized or used (beyond the normal Gosu type checking): this is consistent with the <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO Design Pattern</a>, which states that "DTOs are simple objects that should not contain any business logic that would require testing". Validation logic that considers whether a DTO field can have a <i>particular</i> value (based on things like effective dates, jurisdictions, line of business, user permissions, the values of other fields, etc.) should not be handled here, but rather by the API that manipulates the NoteDTO.
 * <p>Please read the documentation in the accelerator before reusing this class in any additional WS-I Web Services.</p>
 * <p>Fields are mapped according to the following rules:
 * <ul><li>Primitive values are copied directly</li><li>Typekey fields are copied directly (the WS-I layer translates them to/from WS-I enums)</li><li>Foreign keys fields are represented by the target object's PublicID</li><li>Arraykey fields are represented by an array of the PublicIDs of the elements in the array</li></ul></p>
 * <p>The specific mappings for {@link NoteDTO} are as follows:
 * <table border="1"><tr><th>Field</th><th>Maps to</th></tr><tr><td>ActivityID</td><td>Note.Activity.PublicID</td></tr><tr><td>AuthoringDate</td><td>Note.AuthoringDate</td></tr><tr><td>Body</td><td>Note.Body</td></tr><tr><td>ClaimContactID</td><td>Note.ClaimContact.PublicID</td></tr><tr><td>ClaimID</td><td>Note.Claim.PublicID</td></tr><tr><td>Confidential</td><td>Note.Confidential</td></tr><tr><td>CreateTime</td><td>Note.CreateTime</td></tr><tr><td>CreateUserID</td><td>Note.CreateUser.PublicID</td></tr><tr><td>ExposureID</td><td>Note.Exposure.PublicID</td></tr><tr><td>Language</td><td>Note.Language</td></tr><tr><td>MatterID</td><td>Note.Matter.PublicID</td></tr><tr><td>PublicID</td><td>Note.PublicID</td></tr><tr><td>SecurityType</td><td>Note.SecurityType</td></tr><tr><td>Subject</td><td>Note.Subject</td></tr><tr><td>Topic</td><td>Note.Topic</td></tr><tr><td>UpdateTime</td><td>Note.UpdateTime</td></tr><tr><td>UpdateUserID</td><td>Note.UpdateUser.PublicID</td></tr></table></p>
 * <br/>This file was generated using the following property definitions:<br/><pre>Note#Activity,      // Activity<br/>Note#AuthoringDate, // java.util.Date<br/>Note#Body,          // String<br/>Note#Claim,         // Claim<br/>Note#ClaimContact,  // ClaimContact<br/>Note#Confidential,  // Boolean<br/>Note#Exposure,      // Exposure<br/>Note#Language,      // typekey.LanguageType<br/>Note#Matter,        // Matter<br/>Note#SecurityType,  // typekey.NoteSecurityType<br/>Note#Subject,       // String<br/>Note#Topic          // typekey.NoteTopicType</pre>
 */
@Export
@WsiExportable("http://guidewire.com/cc/ws/gw/webservice/cc/cc801/dto/NoteDTO")
@Generated("DTOBuilder", "DO NOT edit this class directly! See comments at the top of the file.", "2014-01-28T16:22Z")
final class NoteDTO {
  /** Derived from Note#Activity.PublicID */
  var _activityID     : String           as ActivityID
  var _authoringDate  : Date             as AuthoringDate
  var _body           : String           as Body
  /** Derived from Note#ClaimContact.PublicID */
  var _claimContactID : String           as ClaimContactID
  /** Derived from Note#Claim.PublicID */
  var _claimID        : String           as ClaimID
  var _confidential   : Boolean          as Confidential
  var _createTime     : Date             as CreateTime
  /** Derived from Editable#CreateUser.PublicID */
  var _createUserID   : String           as CreateUserID
  /** Derived from Note#Exposure.PublicID */
  var _exposureID     : String           as ExposureID
  var _language       : LanguageType     as Language
  /** Derived from Note#Matter.PublicID */
  var _matterID       : String           as MatterID
  var _publicID       : String           as PublicID
  var _securityType   : NoteSecurityType as SecurityType
  var _subject        : String           as Subject
  var _topic          : NoteTopicType    as Topic
  var _updateTime     : Date             as UpdateTime
  /** Derived from Editable#UpdateUser.PublicID */
  var _updateUserID   : String           as UpdateUserID

  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  construct() { }

  /**
   * Copies the platform-managed fields from the supplied Note
   * @param that The Note to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  protected function _copyReadOnlyFieldsFrom(that : Note) {
    // if field is on base class
      _createTime     = that.CreateTime
      _createUserID   = that.CreateUser.PublicID
      _updateTime     = that.UpdateTime
      _updateUserID   = that.UpdateUser.PublicID
    //
  }

  /**
   * Set the fields in this DTO using the supplied Note
   * @param that The Note to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function readFrom(that : Note) : NoteDTO {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      ActivityID      = that.Activity.PublicID
      AuthoringDate   = that.AuthoringDate
      Body            = that.Body
      ClaimContactID  = that.ClaimContact.PublicID
      ClaimID         = that.Claim.PublicID
      Confidential    = that.Confidential
      ExposureID      = that.Exposure.PublicID
      Language        = that.Language
      MatterID        = that.Matter.PublicID
      PublicID        = that.PublicID
      SecurityType    = that.SecurityType
      Subject         = that.Subject
      Topic           = that.Topic
    //
    return this
  }

  /**
   * Update the supplied Note using the field values stored in this DTO
   * @param that The Note to update.
   * @param (Optional) ignoreNullValues If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Note, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeTo(that : Note, ignoreNullValues = true) : Note {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      if (ActivityID     != null or !ignoreNullValues) that.Activity       = Activity
      if (AuthoringDate  != null or !ignoreNullValues) that.AuthoringDate  = AuthoringDate
      if (Body           != null or !ignoreNullValues) that.Body           = Body
      if (ClaimContactID != null or !ignoreNullValues) that.ClaimContact   = ClaimContact
      if (ClaimID        != null or !ignoreNullValues) that.Claim          = Claim
      if (Confidential   != null or !ignoreNullValues) that.Confidential   = Confidential
      if (ExposureID     != null or !ignoreNullValues) that.Exposure       = Exposure
      if (Language       != null or !ignoreNullValues) that.Language       = Language
      if (MatterID       != null or !ignoreNullValues) that.Matter         = Matter
      if (PublicID       != null or !ignoreNullValues) that.PublicID       = PublicID
      if (SecurityType   != null or !ignoreNullValues) that.SecurityType   = SecurityType
      if (Subject        != null or !ignoreNullValues) that.Subject        = Subject
      if (Topic          != null or !ignoreNullValues) that.Topic          = Topic
    //
    return that
  }

  /**
   * Uses the createNew block to create a new Note, adds it to the supplied bundle, then updates it using the field values stored in this DTO. The ignoreNullValues parameter controls how the fields that are null are treated.
   * @param bundle The bundle in which to create the new Note.
   * @param createNew (Optional) A block that returns a new instance of Note. If this is null, the default constructor will be used.
   * @param ignoreNullValues (Optional) If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Note, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeToNewEntityIn(bundle : Bundle, createNew : block() : Note = null, ignoreNullValues = true) : Note {
    var instance : Note
    if (createNew == null) {
      instance = bundle == null
          ? new Note()
          : new Note(bundle)
    }
    else {
      instance = createNew()

      if (bundle != null) {
        instance = bundle.add(instance)
      }
    }
    return writeTo(instance, ignoreNullValues)
  }

  /** Convenience property that returns the {@link Activity} whose PublicID is {@code ActivityID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Activity()    : Activity        { return fetchByID(ActivityID) }
  
  /** Convenience property that returns the {@link ClaimContact} whose PublicID is {@code ClaimContactID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get ClaimContact() : ClaimContact    { return fetchByID(ClaimContactID) }
  
  /** Convenience property that returns the {@link Claim} whose PublicID is {@code ClaimID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Claim()       : Claim           { return fetchByID(ClaimID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code CreateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CreateUser()  : User            { return fetchByID(CreateUserID) }
  
  /** Convenience property that returns the {@link Exposure} whose PublicID is {@code ExposureID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Exposure()    : Exposure        { return fetchByID(ExposureID) }
  
  /** Convenience property that returns the {@link Matter} whose PublicID is {@code MatterID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Matter()      : Matter          { return fetchByID(MatterID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code UpdateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get UpdateUser()  : User            { return fetchByID(UpdateUserID) }

  /**
   * Returns whether the fields tracked by this DTO match the same fields in the other DTO
   * @param that The NoteDTO to compare against.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function equals(that : Object) : boolean {
    if (that typeis NoteDTO) {
      return ActivityID     == that.ActivityID
         and AuthoringDate  == that.AuthoringDate
         and Body           == that.Body
         and ClaimContactID == that.ClaimContactID
         and ClaimID        == that.ClaimID
         and Confidential   == that.Confidential
         and ExposureID     == that.ExposureID
         and Language       == that.Language
         and MatterID       == that.MatterID
         and PublicID       == that.PublicID
         and SecurityType   == that.SecurityType
         and Subject        == that.Subject
         and Topic          == that.Topic
    }
    return super.equals(that)
  }

  /**
   * Returns the hash code of this object.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function hashCode() : int {
    return {
      ActivityID,
      AuthoringDate,
      Body,
      ClaimContactID,
      ClaimID,
      Confidential,
      ExposureID,
      Language,
      MatterID,
      PublicID,
      SecurityType,
      Subject,
      Topic
    }.reduce(17, \ hashCode, obj -> 31 * hashCode + obj?.hashCode())
  }

  /**
   * Provides a rough idea of the command needed to re-create this DTO. Because it is rough it is probably only  useful for debugging purposes.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function toString() : String {
    var fields = {} as List<String>

    if (ActivityID    .HasContent) fields.add(':ActivityID     = ' + StringUtil.enquote(ActivityID))
    if (AuthoringDate   != null  ) fields.add(':AuthoringDate  = ' + StringUtil.enquote(AuthoringDate.toString()) + ' as Date')
    if (Body          .HasContent) fields.add(':Body           = ' + StringUtil.enquote(Body))
    if (ClaimContactID.HasContent) fields.add(':ClaimContactID = ' + StringUtil.enquote(ClaimContactID))
    if (ClaimID       .HasContent) fields.add(':ClaimID        = ' + StringUtil.enquote(ClaimID))
    if (Confidential    != null  ) fields.add(':Confidential   = ' + Confidential)
    if (CreateTime      != null  ) fields.add(':CreateTime     = ' + StringUtil.enquote(CreateTime.toString()) + ' as Date')
    if (CreateUserID  .HasContent) fields.add(':CreateUserID   = ' + StringUtil.enquote(CreateUserID))
    if (ExposureID    .HasContent) fields.add(':ExposureID     = ' + StringUtil.enquote(ExposureID))
    if (Language        != null  ) fields.add(':Language       = LanguageType.get("' + Language.Code + '")')
    if (MatterID      .HasContent) fields.add(':MatterID       = ' + StringUtil.enquote(MatterID))
    if (PublicID      .HasContent) fields.add(':PublicID       = ' + StringUtil.enquote(PublicID))
    if (SecurityType    != null  ) fields.add(':SecurityType   = NoteSecurityType.get("' + SecurityType.Code + '")')
    if (Subject       .HasContent) fields.add(':Subject        = ' + StringUtil.enquote(Subject))
    if (Topic           != null  ) fields.add(':Topic          = NoteTopicType.get("' + Topic.Code + '")')
    if (UpdateTime      != null  ) fields.add(':UpdateTime     = ' + StringUtil.enquote(UpdateTime.toString()) + ' as Date')
    if (UpdateUserID  .HasContent) fields.add(':UpdateUserID   = ' + StringUtil.enquote(UpdateUserID))

    return "new NoteDTO() {\n  " + fields.join(",\n  ") + "\n}"
  }

  /**
   * return a new NoteDTO that represents the current state of the supplied Note.
   * @param that The Note to be represented.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  static function valueOf(that : Note) : NoteDTO {
    return new NoteDTO().readFrom(that)
  }

  /**
   * Returns the Note whose public ID is in the supplied list, or null if the publicID is null.
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