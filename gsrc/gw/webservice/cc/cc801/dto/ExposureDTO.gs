package gw.webservice.cc.cc801.dto

uses gw.api.database.Query
uses gw.api.util.StringUtil
uses gw.api.webservice.exception.BadIdentifierException
uses gw.pl.persistence.core.Bundle
uses gw.xml.ws.annotation.WsiExportable
uses java.lang.Integer
uses java.util.Date
uses javax.annotation.Generated

/**
 * <p style="border: 1px solid black; padding: 10px">This Data Transfer Object ("DTO") class is used to generate a WSDL to serialize and deserialize information across the network. Any change to the public properties of this DTO class will change the WSDL, thus breaking any existing clients. So once the corresponding WSDL is in use this DTO should only be changed with extreme caution, as it will require existing clients to be rebuilt and redeployed.<br/><br/>
DTOs which are a simple mapping from the domain model may be auto-generated using the "WSI DTO Generator", available from the customer portal. This generator can significantly speed up initial coding of such DTOs. Always remember, however, that DTOs are a network interface and a simple mapping from the domain model may not provide the best results. Remember too that once a DTO has been used in a deployed WSDL, re-running the generator may break existing clients (see above). Please read the documentation in the accelerator for guidance.</p><br/>
 * A(n) {@link ExposureDTO} is a DTO that represents an instance of {@link entity.Exposure} for use by certain WS-I Web Services in the base product. This file is composed of basic getters and setters, plus members that make it easier for server-side code to work with DTOs, like virtual getters that query for entities by PublidID, and methods to copy fields to or from an instance of {@link entity.Exposure}.
 * <p>None of these methods constrain how an instance of ExposureDTO is created, initialized or used (beyond the normal Gosu type checking): this is consistent with the <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO Design Pattern</a>, which states that "DTOs are simple objects that should not contain any business logic that would require testing". Validation logic that considers whether a DTO field can have a <i>particular</i> value (based on things like effective dates, jurisdictions, line of business, user permissions, the values of other fields, etc.) should not be handled here, but rather by the API that manipulates the ExposureDTO.
 * <p>Please read the documentation in the accelerator before reusing this class in any additional WS-I Web Services.</p>
 * <p>Fields are mapped according to the following rules:
 * <ul><li>Primitive values are copied directly</li><li>Typekey fields are copied directly (the WS-I layer translates them to/from WS-I enums)</li><li>Foreign keys fields are represented by the target object's PublicID</li><li>Arraykey fields are represented by an array of the PublicIDs of the elements in the array</li></ul></p>
 * <p>The specific mappings for {@link ExposureDTO} are as follows:
 * <table border="1"><tr><th>Field</th><th>Maps to</th></tr><tr><td>AssignedGroupID</td><td>Exposure.AssignedGroup.PublicID</td></tr><tr><td>AssignedUserID</td><td>Exposure.AssignedUser.PublicID</td></tr><tr><td>ClaimantID</td><td>Exposure.Claimant.PublicID</td></tr><tr><td>ClaimID</td><td>Exposure.Claim.PublicID</td></tr><tr><td>ClaimOrder</td><td>Exposure.ClaimOrder</td></tr><tr><td>CloseDate</td><td>Exposure.CloseDate</td></tr><tr><td>CoverageID</td><td>Exposure.Coverage.PublicID</td></tr><tr><td>CoverageSubType</td><td>Exposure.CoverageSubType</td></tr><tr><td>CreateTime</td><td>Exposure.CreateTime</td></tr><tr><td>CreateUserID</td><td>Exposure.CreateUser.PublicID</td></tr><tr><td>doctorIDs</td><td>Exposure.doctor*.PublicID</td></tr><tr><td>ExposureType</td><td>Exposure.ExposureType</td></tr><tr><td>IncidentID</td><td>Exposure.Incident.PublicID</td></tr><tr><td>LossCategory</td><td>Exposure.LossCategory</td></tr><tr><td>LossParty</td><td>Exposure.LossParty</td></tr><tr><td>PrimaryCoverage</td><td>Exposure.PrimaryCoverage</td></tr><tr><td>PrimaryDoctorID</td><td>Exposure.PrimaryDoctor.PublicID</td></tr><tr><td>PublicID</td><td>Exposure.PublicID</td></tr><tr><td>Segment</td><td>Exposure.Segment</td></tr><tr><td>State</td><td>Exposure.State</td></tr><tr><td>Strategy</td><td>Exposure.Strategy</td></tr><tr><td>UpdateTime</td><td>Exposure.UpdateTime</td></tr><tr><td>UpdateUserID</td><td>Exposure.UpdateUser.PublicID</td></tr><tr><td>ValidationLevel</td><td>Exposure.ValidationLevel</td></tr></table></p>
 * <br/>This file was generated using the following property definitions:<br/><pre>Exposure#AssignedGroup,   // Group<br/>Exposure#AssignedUser,    // User<br/>Exposure#Claim,           // Claim<br/>Exposure#Claimant,        // Contact<br/>Exposure#ClaimOrder,      // Integer<br/>Exposure#CloseDate,       // java.util.Date<br/>Exposure#Coverage,        // Coverage<br/>Exposure#CoverageSubType, // typekey.CoverageSubtype<br/>Exposure#doctor,          // Doctor[]<br/>Exposure#ExposureType,    // typekey.ExposureType<br/>Exposure#Incident,        // Incident<br/>Exposure#LossCategory,    // typekey.LossCategory<br/>Exposure#LossParty,       // typekey.LossPartyType<br/>Exposure#PrimaryCoverage, // typekey.CoverageType<br/>Exposure#PrimaryDoctor,   // Doctor<br/>Exposure#Segment,         // typekey.ClaimSegment<br/>Exposure#State,           // typekey.ExposureState<br/>Exposure#Strategy,        // typekey.ClaimStrategy<br/>Exposure#ValidationLevel  // typekey.ValidationLevel</pre>
 */
@Export
@WsiExportable("http://guidewire.com/cc/ws/gw/webservice/cc/cc801/dto/ExposureDTO")
@Generated("DTOBuilder", "DO NOT edit this class directly! See comments at the top of the file.", "2014-01-28T16:22Z")
final class ExposureDTO {
  /** Derived from Exposure#AssignedGroup.PublicID */
  var _assignedGroupID : String          as AssignedGroupID
  /** Derived from Exposure#AssignedUser.PublicID */
  var _assignedUserID  : String          as AssignedUserID
  /** Derived from Exposure#Claimant.PublicID */
  var _claimantID      : String          as ClaimantID
  /** Derived from Exposure#Claim.PublicID */
  var _claimID         : String          as ClaimID
  var _claimOrder      : Integer         as ClaimOrder
  var _closeDate       : Date            as CloseDate
  /** Derived from Exposure#Coverage.PublicID */
  var _coverageID      : String          as CoverageID
  var _coverageSubType : CoverageSubtype as CoverageSubType
  var _createTime      : Date            as CreateTime
  /** Derived from Editable#CreateUser.PublicID */
  var _createUserID    : String          as CreateUserID
  /** Derived from Exposure#doctor*.PublicID */
  var _doctorIDs       : String[]        as doctorIDs = {}
  var _exposureType    : ExposureType    as ExposureType
  /** Derived from Exposure#Incident.PublicID */
  var _incidentID      : String          as IncidentID
  var _lossCategory    : LossCategory    as LossCategory
  var _lossParty       : LossPartyType   as LossParty
  var _newActivities   : ActivityDTO[]   as NewActivities = {}
  var _newdoctor       : ContactDTO[]    as Newdoctor = {}
  var _newDocuments    : DocumentDTO[]   as NewDocuments = {}
  var _newNotes        : NoteDTO[]       as NewNotes = {}
  var _primaryCoverage : CoverageType    as PrimaryCoverage
  /** Derived from Exposure#PrimaryDoctor.PublicID */
  var _primaryDoctorID : String          as PrimaryDoctorID
  var _publicID        : String          as PublicID
  var _segment         : ClaimSegment    as Segment
  var _state           : ExposureState   as State
  var _strategy        : ClaimStrategy   as Strategy
  var _updateTime      : Date            as UpdateTime
  /** Derived from Editable#UpdateUser.PublicID */
  var _updateUserID    : String          as UpdateUserID
  var _validationLevel : ValidationLevel as ValidationLevel

  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  construct() { }

  /**
   * Copies the platform-managed fields from the supplied Exposure
   * @param that The Exposure to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  protected function _copyReadOnlyFieldsFrom(that : Exposure) {
    // if field is on base class
      _createTime      = that.CreateTime
      _createUserID    = that.CreateUser.PublicID
      _updateTime      = that.UpdateTime
      _updateUserID    = that.UpdateUser.PublicID
      _doctorIDs       = that.doctor*.PublicID
    //
  }

  /**
   * Set the fields in this DTO using the supplied Exposure
   * @param that The Exposure to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function readFrom(that : Exposure) : ExposureDTO {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      AssignedGroupID  = that.AssignedGroup.PublicID
      AssignedUserID   = that.AssignedUser.PublicID
      ClaimID          = that.Claim.PublicID
      ClaimOrder       = that.ClaimOrder
      ClaimantID       = that.Claimant.PublicID
      CloseDate        = that.CloseDate
      CoverageID       = that.Coverage.PublicID
      CoverageSubType  = that.CoverageSubType
      ExposureType     = that.ExposureType
      IncidentID       = that.Incident.PublicID
      LossCategory     = that.LossCategory
      LossParty        = that.LossParty
      PrimaryCoverage  = that.PrimaryCoverage
      PrimaryDoctorID  = that.PrimaryDoctor.PublicID
      PublicID         = that.PublicID
      Segment          = that.Segment
      State            = that.State
      Strategy         = that.Strategy
      ValidationLevel  = that.ValidationLevel
    //
    return this
  }

  /**
   * Update the supplied Exposure using the field values stored in this DTO
   * @param that The Exposure to update.
   * @param (Optional) ignoreNullValues If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Exposure, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeTo(that : Exposure, ignoreNullValues = true) : Exposure {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      if (AssignedGroupID != null or !ignoreNullValues) that.AssignedGroup   = AssignedGroup
      if (AssignedUserID  != null or !ignoreNullValues) that.AssignedUser    = AssignedUser
      if (ClaimID         != null or !ignoreNullValues) that.Claim           = Claim
      if (ClaimOrder      != null or !ignoreNullValues) that.ClaimOrder      = ClaimOrder
      if (ClaimantID      != null or !ignoreNullValues) that.Claimant        = Claimant
      if (CloseDate       != null or !ignoreNullValues) that.CloseDate       = CloseDate
      if (CoverageID      != null or !ignoreNullValues) that.Coverage        = Coverage
      if (CoverageSubType != null or !ignoreNullValues) that.CoverageSubType = CoverageSubType
      if (ExposureType    != null or !ignoreNullValues) that.ExposureType    = ExposureType
      if (IncidentID      != null or !ignoreNullValues) that.Incident        = Incident
      if (LossCategory    != null or !ignoreNullValues) that.LossCategory    = LossCategory
      if (LossParty       != null or !ignoreNullValues) that.LossParty       = LossParty
      if (PrimaryCoverage != null or !ignoreNullValues) that.PrimaryCoverage = PrimaryCoverage
      if (PrimaryDoctorID != null or !ignoreNullValues) that.PrimaryDoctor   = PrimaryDoctor
      if (PublicID        != null or !ignoreNullValues) that.PublicID        = PublicID
      if (Segment         != null or !ignoreNullValues) that.Segment         = Segment
      if (State           != null or !ignoreNullValues) that.State           = State
      if (Strategy        != null or !ignoreNullValues) that.Strategy        = Strategy
      if (ValidationLevel != null or !ignoreNullValues) that.ValidationLevel = ValidationLevel
    //
    return that
  }

  /**
   * Uses the createNew block to create a new Exposure, adds it to the supplied bundle, then updates it using the field values stored in this DTO. The ignoreNullValues parameter controls how the fields that are null are treated.
   * @param bundle The bundle in which to create the new Exposure.
   * @param createNew (Optional) A block that returns a new instance of Exposure. If this is null, the default constructor will be used.
   * @param ignoreNullValues (Optional) If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Exposure, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeToNewEntityIn(bundle : Bundle, createNew : block() : Exposure = null, ignoreNullValues = true) : Exposure {
    var instance : Exposure
    if (createNew == null) {
      instance = bundle == null
          ? new Exposure()
          : new Exposure(bundle)
    }
    else {
      instance = createNew()

      if (bundle != null) {
        instance = bundle.add(instance)
      }
    }
    return writeTo(instance, ignoreNullValues)
  }

  /** Convenience property that returns the {@link Group} whose PublicID is {@code AssignedGroupID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get AssignedGroup() : Group          { return fetchByID(AssignedGroupID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code AssignedUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get AssignedUser() : User           { return fetchByID(AssignedUserID) }
  
  /** Convenience property that returns the {@link Contact} whose PublicID is {@code ClaimantID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Claimant()     : Contact        { return fetchByID(ClaimantID) }
  
  /** Convenience property that returns the {@link Claim} whose PublicID is {@code ClaimID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Claim()        : Claim          { return fetchByID(ClaimID) }
  
  /** Convenience property that returns the {@link Coverage} whose PublicID is {@code CoverageID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Coverage()     : Coverage       { return fetchByID(CoverageID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code CreateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CreateUser()   : User           { return fetchByID(CreateUserID) }
  
  /** Convenience property that returns a {@link Doctor[]} of the objects whose PublicIDs are in {@code doctorIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get doctor()       : Doctor[]       { return fetchByID(doctorIDs) }
  
  /** Convenience property that returns the {@link Incident} whose PublicID is {@code IncidentID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Incident()     : Incident       { return fetchByID(IncidentID) }
  
  /** Convenience property that returns the {@link Doctor} whose PublicID is {@code PrimaryDoctorID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get PrimaryDoctor() : Doctor         { return fetchByID(PrimaryDoctorID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code UpdateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get UpdateUser()   : User           { return fetchByID(UpdateUserID) }

  /**
   * Returns whether the fields tracked by this DTO match the same fields in the other DTO
   * @param that The ExposureDTO to compare against.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function equals(that : Object) : boolean {
    if (that typeis ExposureDTO) {
      return AssignedGroupID == that.AssignedGroupID
         and AssignedUserID  == that.AssignedUserID
         and ClaimantID      == that.ClaimantID
         and ClaimID         == that.ClaimID
         and ClaimOrder      == that.ClaimOrder
         and CloseDate       == that.CloseDate
         and CoverageID      == that.CoverageID
         and CoverageSubType == that.CoverageSubType
         and ExposureType    == that.ExposureType
         and IncidentID      == that.IncidentID
         and LossCategory    == that.LossCategory
         and LossParty       == that.LossParty
         and PrimaryCoverage == that.PrimaryCoverage
         and PrimaryDoctorID == that.PrimaryDoctorID
         and PublicID        == that.PublicID
         and Segment         == that.Segment
         and State           == that.State
         and Strategy        == that.Strategy
         and ValidationLevel == that.ValidationLevel
    }
    return super.equals(that)
  }

  /**
   * Returns the hash code of this object.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function hashCode() : int {
    return {
      AssignedGroupID,
      AssignedUserID,
      ClaimantID,
      ClaimID,
      ClaimOrder,
      CloseDate,
      CoverageID,
      CoverageSubType,
      ExposureType,
      IncidentID,
      LossCategory,
      LossParty,
      PrimaryCoverage,
      PrimaryDoctorID,
      PublicID,
      Segment,
      State,
      Strategy,
      ValidationLevel
    }.reduce(17, \ hashCode, obj -> 31 * hashCode + obj?.hashCode())
  }

  /**
   * Provides a rough idea of the command needed to re-create this DTO. Because it is rough it is probably only  useful for debugging purposes.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function toString() : String {
    var fields = {} as List<String>

    if (AssignedGroupID.HasContent) fields.add(':AssignedGroupID = ' + StringUtil.enquote(AssignedGroupID))
    if (AssignedUserID .HasContent) fields.add(':AssignedUserID  = ' + StringUtil.enquote(AssignedUserID))
    if (ClaimantID     .HasContent) fields.add(':ClaimantID      = ' + StringUtil.enquote(ClaimantID))
    if (ClaimID        .HasContent) fields.add(':ClaimID         = ' + StringUtil.enquote(ClaimID))
    if (ClaimOrder       != null  ) fields.add(':ClaimOrder      = ' + ClaimOrder)
    if (CloseDate        != null  ) fields.add(':CloseDate       = ' + StringUtil.enquote(CloseDate.toString()) + ' as Date')
    if (CoverageID     .HasContent) fields.add(':CoverageID      = ' + StringUtil.enquote(CoverageID))
    if (CoverageSubType  != null  ) fields.add(':CoverageSubType = CoverageSubtype.get("' + CoverageSubType.Code + '")')
    if (CreateTime       != null  ) fields.add(':CreateTime      = ' + StringUtil.enquote(CreateTime.toString()) + ' as Date')
    if (CreateUserID   .HasContent) fields.add(':CreateUserID    = ' + StringUtil.enquote(CreateUserID))
    if (doctorIDs        != null  ) fields.add(':doctorIDs       = ' + doctorIDs)
    if (ExposureType     != null  ) fields.add(':ExposureType    = ExposureType.get("' + ExposureType.Code + '")')
    if (IncidentID     .HasContent) fields.add(':IncidentID      = ' + StringUtil.enquote(IncidentID))
    if (LossCategory     != null  ) fields.add(':LossCategory    = LossCategory.get("' + LossCategory.Code + '")')
    if (LossParty        != null  ) fields.add(':LossParty       = LossPartyType.get("' + LossParty.Code + '")')
    if (NewActivities    != null  ) fields.add(':NewActivities   = ' + NewActivities)
    if (Newdoctor        != null  ) fields.add(':Newdoctor       = ' + Newdoctor)
    if (NewDocuments     != null  ) fields.add(':NewDocuments    = ' + NewDocuments)
    if (NewNotes         != null  ) fields.add(':NewNotes        = ' + NewNotes)
    if (PrimaryCoverage  != null  ) fields.add(':PrimaryCoverage = CoverageType.get("' + PrimaryCoverage.Code + '")')
    if (PrimaryDoctorID.HasContent) fields.add(':PrimaryDoctorID = ' + StringUtil.enquote(PrimaryDoctorID))
    if (PublicID       .HasContent) fields.add(':PublicID        = ' + StringUtil.enquote(PublicID))
    if (Segment          != null  ) fields.add(':Segment         = ClaimSegment.get("' + Segment.Code + '")')
    if (State            != null  ) fields.add(':State           = ExposureState.get("' + State.Code + '")')
    if (Strategy         != null  ) fields.add(':Strategy        = ClaimStrategy.get("' + Strategy.Code + '")')
    if (UpdateTime       != null  ) fields.add(':UpdateTime      = ' + StringUtil.enquote(UpdateTime.toString()) + ' as Date')
    if (UpdateUserID   .HasContent) fields.add(':UpdateUserID    = ' + StringUtil.enquote(UpdateUserID))
    if (ValidationLevel  != null  ) fields.add(':ValidationLevel = ValidationLevel.get("' + ValidationLevel.Code + '")')

    return "new ExposureDTO() {\n  " + fields.join(",\n  ") + "\n}"
  }

  /**
   * return a new ExposureDTO that represents the current state of the supplied Exposure.
   * @param that The Exposure to be represented.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  static function valueOf(that : Exposure) : ExposureDTO {
    return new ExposureDTO().readFrom(that)
  }

  /**
   * Returns all of the Exposure instances whose public IDs are in the supplied list, or an empty array if the supplied list is null or empty.
   * @param publicIDs A list of the PublicIDs.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  private static function fetchByID<T extends KeyableBean>(publicIDs : String[]) : T[] {
    var results : T[] = {}
    if (publicIDs.HasElements) {
      results = Query.make(T)
          .compareIn(T#PublicID, publicIDs)
          .select()
          .toTypedArray()
      var badIDs = publicIDs.subtract(results*.PublicID)
      if (badIDs.HasElements) throw BadIdentifierException.badPublicId(T, "{" + badIDs.join(", ") + "}")
    }
    return results
  }

  /**
   * Returns the Exposure whose public ID is in the supplied list, or null if the publicID is null.
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