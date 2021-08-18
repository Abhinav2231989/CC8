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
 * A(n) {@link ActivityPatternDTO} is a DTO that represents an instance of {@link entity.ActivityPattern} for use by certain WS-I Web Services in the base product. This file is composed of basic getters and setters, plus members that make it easier for server-side code to work with DTOs, like virtual getters that query for entities by PublidID, and methods to copy fields to or from an instance of {@link entity.ActivityPattern}.
 * <p>None of these methods constrain how an instance of ActivityPatternDTO is created, initialized or used (beyond the normal Gosu type checking): this is consistent with the <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO Design Pattern</a>, which states that "DTOs are simple objects that should not contain any business logic that would require testing". Validation logic that considers whether a DTO field can have a <i>particular</i> value (based on things like effective dates, jurisdictions, line of business, user permissions, the values of other fields, etc.) should not be handled here, but rather by the API that manipulates the ActivityPatternDTO.
 * <p>Please read the documentation in the accelerator before reusing this class in any additional WS-I Web Services.</p>
 * <p>Fields are mapped according to the following rules:
 * <ul><li>Primitive values are copied directly</li><li>Typekey fields are copied directly (the WS-I layer translates them to/from WS-I enums)</li><li>Foreign keys fields are represented by the target object's PublicID</li><li>Arraykey fields are represented by an array of the PublicIDs of the elements in the array</li></ul></p>
 * <p>The specific mappings for {@link ActivityPatternDTO} are as follows:
 * <table border="1"><tr><th>Field</th><th>Maps to</th></tr><tr><td>ActivityClass</td><td>ActivityPattern.ActivityClass</td></tr><tr><td>Category</td><td>ActivityPattern.Category</td></tr><tr><td>Code</td><td>ActivityPattern.Code</td></tr><tr><td>CreateTime</td><td>ActivityPattern.CreateTime</td></tr><tr><td>CreateUserID</td><td>ActivityPattern.CreateUser.PublicID</td></tr><tr><td>Description</td><td>ActivityPattern.Description</td></tr><tr><td>OrganizationID</td><td>ActivityPattern.Organization.PublicID</td></tr><tr><td>PublicID</td><td>ActivityPattern.PublicID</td></tr><tr><td>Subject</td><td>ActivityPattern.Subject</td></tr><tr><td>SystemPattern</td><td>ActivityPattern.SystemPattern</td></tr><tr><td>Type</td><td>ActivityPattern.Type</td></tr><tr><td>UpdateTime</td><td>ActivityPattern.UpdateTime</td></tr><tr><td>UpdateUserID</td><td>ActivityPattern.UpdateUser.PublicID</td></tr></table></p>
 * <br/>This file was generated using the following property definitions:<br/><pre>ActivityPattern#ActivityClass, // typekey.ActivityClass<br/>ActivityPattern#Category,      // typekey.ActivityCategory<br/>ActivityPattern#Code,          // String<br/>ActivityPattern#Description,   // String<br/>ActivityPattern#Organization,  // Organization<br/>ActivityPattern#Subject,       // String<br/>ActivityPattern#SystemPattern, // Boolean<br/>ActivityPattern#Type           // typekey.ActivityType</pre>
 */
@Export
@WsiExportable("http://guidewire.com/cc/ws/gw/webservice/cc/cc801/dto/ActivityPatternDTO")
@Generated("DTOBuilder", "DO NOT edit this class directly! See comments at the top of the file.", "2014-01-28T16:22Z")
final class ActivityPatternDTO {
  var _activityClass  : ActivityClass    as ActivityClass
  var _category       : ActivityCategory as Category
  var _code           : String           as Code
  var _createTime     : Date             as CreateTime
  /** Derived from Editable#CreateUser.PublicID */
  var _createUserID   : String           as CreateUserID
  var _description    : String           as Description
  /** Derived from ActivityPattern#Organization.PublicID */
  var _organizationID : String           as OrganizationID
  var _publicID       : String           as PublicID
  var _subject        : String           as Subject
  var _systemPattern  : Boolean          as SystemPattern
  var _type           : ActivityType     as Type
  var _updateTime     : Date             as UpdateTime
  /** Derived from Editable#UpdateUser.PublicID */
  var _updateUserID   : String           as UpdateUserID

  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  construct() { }

  /**
   * Copies the platform-managed fields from the supplied ActivityPattern
   * @param that The ActivityPattern to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  protected function _copyReadOnlyFieldsFrom(that : ActivityPattern) {
    // if field is on base class
      _createTime     = that.CreateTime
      _createUserID   = that.CreateUser.PublicID
      _systemPattern  = that.SystemPattern
      _updateTime     = that.UpdateTime
      _updateUserID   = that.UpdateUser.PublicID
    //
  }

  /**
   * Set the fields in this DTO using the supplied ActivityPattern
   * @param that The ActivityPattern to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function readFrom(that : ActivityPattern) : ActivityPatternDTO {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      ActivityClass   = that.ActivityClass
      Category        = that.Category
      Code            = that.Code
      Description     = that.Description
      OrganizationID  = that.Organization.PublicID
      PublicID        = that.PublicID
      Subject         = that.Subject
      Type            = that.Type
    //
    return this
  }

  /**
   * Update the supplied ActivityPattern using the field values stored in this DTO
   * @param that The ActivityPattern to update.
   * @param (Optional) ignoreNullValues If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the ActivityPattern, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeTo(that : ActivityPattern, ignoreNullValues = true) : ActivityPattern {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      if (ActivityClass  != null or !ignoreNullValues) that.ActivityClass  = ActivityClass
      if (Category       != null or !ignoreNullValues) that.Category       = Category
      if (Code           != null or !ignoreNullValues) that.Code           = Code
      if (Description    != null or !ignoreNullValues) that.Description    = Description
      if (OrganizationID != null or !ignoreNullValues) that.Organization   = Organization
      if (PublicID       != null or !ignoreNullValues) that.PublicID       = PublicID
      if (Subject        != null or !ignoreNullValues) that.Subject        = Subject
      if (Type           != null or !ignoreNullValues) that.Type           = Type
    //
    return that
  }

  /**
   * Uses the createNew block to create a new ActivityPattern, adds it to the supplied bundle, then updates it using the field values stored in this DTO. The ignoreNullValues parameter controls how the fields that are null are treated.
   * @param bundle The bundle in which to create the new ActivityPattern.
   * @param createNew (Optional) A block that returns a new instance of ActivityPattern. If this is null, the default constructor will be used.
   * @param ignoreNullValues (Optional) If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the ActivityPattern, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeToNewEntityIn(bundle : Bundle, createNew : block() : ActivityPattern = null, ignoreNullValues = true) : ActivityPattern {
    var instance : ActivityPattern
    if (createNew == null) {
      instance = bundle == null
          ? new ActivityPattern()
          : new ActivityPattern(bundle)
    }
    else {
      instance = createNew()

      if (bundle != null) {
        instance = bundle.add(instance)
      }
    }
    return writeTo(instance, ignoreNullValues)
  }

  /** Convenience property that returns the {@link User} whose PublicID is {@code CreateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CreateUser()  : User            { return fetchByID(CreateUserID) }
  
  /** Convenience property that returns the {@link Organization} whose PublicID is {@code OrganizationID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Organization() : Organization    { return fetchByID(OrganizationID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code UpdateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get UpdateUser()  : User            { return fetchByID(UpdateUserID) }

  /**
   * Returns whether the fields tracked by this DTO match the same fields in the other DTO
   * @param that The ActivityPatternDTO to compare against.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function equals(that : Object) : boolean {
    if (that typeis ActivityPatternDTO) {
      return ActivityClass  == that.ActivityClass
         and Category       == that.Category
         and Code           == that.Code
         and Description    == that.Description
         and OrganizationID == that.OrganizationID
         and PublicID       == that.PublicID
         and Subject        == that.Subject
         and Type           == that.Type
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
      Category,
      Code,
      Description,
      OrganizationID,
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

    if (ActivityClass   != null  ) fields.add(':ActivityClass  = ActivityClass.get("' + ActivityClass.Code + '")')
    if (Category        != null  ) fields.add(':Category       = ActivityCategory.get("' + Category.Code + '")')
    if (Code          .HasContent) fields.add(':Code           = ' + StringUtil.enquote(Code))
    if (CreateTime      != null  ) fields.add(':CreateTime     = ' + StringUtil.enquote(CreateTime.toString()) + ' as Date')
    if (CreateUserID  .HasContent) fields.add(':CreateUserID   = ' + StringUtil.enquote(CreateUserID))
    if (Description   .HasContent) fields.add(':Description    = ' + StringUtil.enquote(Description))
    if (OrganizationID.HasContent) fields.add(':OrganizationID = ' + StringUtil.enquote(OrganizationID))
    if (PublicID      .HasContent) fields.add(':PublicID       = ' + StringUtil.enquote(PublicID))
    if (Subject       .HasContent) fields.add(':Subject        = ' + StringUtil.enquote(Subject))
    if (SystemPattern   != null  ) fields.add(':SystemPattern  = ' + SystemPattern)
    if (Type            != null  ) fields.add(':Type           = ActivityType.get("' + Type.Code + '")')
    if (UpdateTime      != null  ) fields.add(':UpdateTime     = ' + StringUtil.enquote(UpdateTime.toString()) + ' as Date')
    if (UpdateUserID  .HasContent) fields.add(':UpdateUserID   = ' + StringUtil.enquote(UpdateUserID))

    return "new ActivityPatternDTO() {\n  " + fields.join(",\n  ") + "\n}"
  }

  /**
   * return a new ActivityPatternDTO that represents the current state of the supplied ActivityPattern.
   * @param that The ActivityPattern to be represented.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  static function valueOf(that : ActivityPattern) : ActivityPatternDTO {
    return new ActivityPatternDTO().readFrom(that)
  }

  /**
   * Returns the ActivityPattern whose public ID is in the supplied list, or null if the publicID is null.
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