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
 * A(n) {@link ClaimContactRoleDTO} is a DTO that represents an instance of {@link entity.ClaimContactRole} for use by certain WS-I Web Services in the base product. This file is composed of basic getters and setters, plus members that make it easier for server-side code to work with DTOs, like virtual getters that query for entities by PublidID, and methods to copy fields to or from an instance of {@link entity.ClaimContactRole}.
 * <p>None of these methods constrain how an instance of ClaimContactRoleDTO is created, initialized or used (beyond the normal Gosu type checking): this is consistent with the <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO Design Pattern</a>, which states that "DTOs are simple objects that should not contain any business logic that would require testing". Validation logic that considers whether a DTO field can have a <i>particular</i> value (based on things like effective dates, jurisdictions, line of business, user permissions, the values of other fields, etc.) should not be handled here, but rather by the API that manipulates the ClaimContactRoleDTO.
 * <p>Please read the documentation in the accelerator before reusing this class in any additional WS-I Web Services.</p>
 * <p>Fields are mapped according to the following rules:
 * <ul><li>Primitive values are copied directly</li><li>Typekey fields are copied directly (the WS-I layer translates them to/from WS-I enums)</li><li>Foreign keys fields are represented by the target object's PublicID</li><li>Arraykey fields are represented by an array of the PublicIDs of the elements in the array</li></ul></p>
 * <p>The specific mappings for {@link ClaimContactRoleDTO} are as follows:
 * <table border="1"><tr><th>Field</th><th>Maps to</th></tr><tr><td>Active</td><td>ClaimContactRole.Active</td></tr><tr><td>ClaimContactID</td><td>ClaimContactRole.ClaimContact.PublicID</td></tr><tr><td>Comments</td><td>ClaimContactRole.Comments</td></tr><tr><td>ContactID</td><td>ClaimContactRole.Contact.PublicID</td></tr><tr><td>CoveredPartyType</td><td>ClaimContactRole.CoveredPartyType</td></tr><tr><td>CreateTime</td><td>ClaimContactRole.CreateTime</td></tr><tr><td>CreateUserID</td><td>ClaimContactRole.CreateUser.PublicID</td></tr><tr><td>EvaluationID</td><td>ClaimContactRole.Evaluation.PublicID</td></tr><tr><td>ExposureID</td><td>ClaimContactRole.Exposure.PublicID</td></tr><tr><td>IncidentID</td><td>ClaimContactRole.Incident.PublicID</td></tr><tr><td>MatterID</td><td>ClaimContactRole.Matter.PublicID</td></tr><tr><td>NegotiationID</td><td>ClaimContactRole.Negotiation.PublicID</td></tr><tr><td>PartyNumber</td><td>ClaimContactRole.PartyNumber</td></tr><tr><td>PolicyID</td><td>ClaimContactRole.Policy.PublicID</td></tr><tr><td>PublicID</td><td>ClaimContactRole.PublicID</td></tr><tr><td>Role</td><td>ClaimContactRole.Role</td></tr><tr><td>UpdateTime</td><td>ClaimContactRole.UpdateTime</td></tr><tr><td>UpdateUserID</td><td>ClaimContactRole.UpdateUser.PublicID</td></tr><tr><td>WitnessPerspective</td><td>ClaimContactRole.WitnessPerspective</td></tr><tr><td>WitnessPosition</td><td>ClaimContactRole.WitnessPosition</td></tr><tr><td>WitnessStatementInd</td><td>ClaimContactRole.WitnessStatementInd</td></tr></table></p>
 * <br/>This file was generated using the following property definitions:<br/><pre>ClaimContactRole#Active,              // Boolean<br/>ClaimContactRole#ClaimContact,        // ClaimContact<br/>ClaimContactRole#Comments,            // String<br/>ClaimContactRole#Contact,             // Contact<br/>ClaimContactRole#CoveredPartyType,    // typekey.CoveredPartyType<br/>ClaimContactRole#Evaluation,          // Evaluation<br/>ClaimContactRole#Exposure,            // Exposure<br/>ClaimContactRole#Incident,            // Incident<br/>ClaimContactRole#Matter,              // Matter<br/>ClaimContactRole#Negotiation,         // Negotiation<br/>ClaimContactRole#PartyNumber,         // Integer<br/>ClaimContactRole#Policy,              // Policy<br/>ClaimContactRole#Role,                // typekey.ContactRole<br/>ClaimContactRole#WitnessPerspective,  // String<br/>ClaimContactRole#WitnessPosition,     // typekey.WitnessPosition<br/>ClaimContactRole#WitnessStatementInd  // typekey.YesNo</pre>
 */
@Export
@WsiExportable("http://guidewire.com/cc/ws/gw/webservice/cc/cc801/dto/ClaimContactRoleDTO")
@Generated("DTOBuilder", "DO NOT edit this class directly! See comments at the top of the file.", "2014-01-28T16:22Z")
final class ClaimContactRoleDTO {
  var _active              : Boolean          as Active
  /** Derived from ClaimContactRole#ClaimContact.PublicID */
  var _claimContactID      : String           as ClaimContactID
  var _comments            : String           as Comments
  /** Derived from ClaimContactRole#Contact.PublicID */
  var _contactID           : String           as ContactID
  var _coveredPartyType    : CoveredPartyType as CoveredPartyType
  var _createTime          : Date             as CreateTime
  /** Derived from Editable#CreateUser.PublicID */
  var _createUserID        : String           as CreateUserID
  /** Derived from ClaimContactRole#Evaluation.PublicID */
  var _evaluationID        : String           as EvaluationID
  /** Derived from ClaimContactRole#Exposure.PublicID */
  var _exposureID          : String           as ExposureID
  /** Derived from ClaimContactRole#Incident.PublicID */
  var _incidentID          : String           as IncidentID
  /** Derived from ClaimContactRole#Matter.PublicID */
  var _matterID            : String           as MatterID
  /** Derived from ClaimContactRole#Negotiation.PublicID */
  var _negotiationID       : String           as NegotiationID
  var _partyNumber         : Integer          as PartyNumber
  /** Derived from ClaimContactRole#Policy.PublicID */
  var _policyID            : String           as PolicyID
  var _publicID            : String           as PublicID
  var _role                : ContactRole      as Role
  var _updateTime          : Date             as UpdateTime
  /** Derived from Editable#UpdateUser.PublicID */
  var _updateUserID        : String           as UpdateUserID
  var _witnessPerspective  : String           as WitnessPerspective
  var _witnessPosition     : WitnessPosition  as WitnessPosition
  var _witnessStatementInd : YesNo            as WitnessStatementInd

  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  construct() { }

  /**
   * Copies the platform-managed fields from the supplied ClaimContactRole
   * @param that The ClaimContactRole to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  protected function _copyReadOnlyFieldsFrom(that : ClaimContactRole) {
    // if field is on base class
      _createTime          = that.CreateTime
      _createUserID        = that.CreateUser.PublicID
      _updateTime          = that.UpdateTime
      _updateUserID        = that.UpdateUser.PublicID
    //
  }

  /**
   * Set the fields in this DTO using the supplied ClaimContactRole
   * @param that The ClaimContactRole to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function readFrom(that : ClaimContactRole) : ClaimContactRoleDTO {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      Active               = that.Active
      ClaimContactID       = that.ClaimContact.PublicID
      Comments             = that.Comments
      ContactID            = that.Contact.PublicID
      CoveredPartyType     = that.CoveredPartyType
      EvaluationID         = that.Evaluation.PublicID
      ExposureID           = that.Exposure.PublicID
      IncidentID           = that.Incident.PublicID
      MatterID             = that.Matter.PublicID
      NegotiationID        = that.Negotiation.PublicID
      PartyNumber          = that.PartyNumber
      PolicyID             = that.Policy.PublicID
      PublicID             = that.PublicID
      Role                 = that.Role
      WitnessPerspective   = that.WitnessPerspective
      WitnessPosition      = that.WitnessPosition
      WitnessStatementInd  = that.WitnessStatementInd
    //
    return this
  }

  /**
   * Update the supplied ClaimContactRole using the field values stored in this DTO
   * @param that The ClaimContactRole to update.
   * @param (Optional) ignoreNullValues If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the ClaimContactRole, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeTo(that : ClaimContactRole, ignoreNullValues = true) : ClaimContactRole {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      if (Active              != null or !ignoreNullValues) that.Active              = Active
      if (ClaimContactID      != null or !ignoreNullValues) that.ClaimContact        = ClaimContact
      if (Comments            != null or !ignoreNullValues) that.Comments            = Comments
      if (ContactID           != null or !ignoreNullValues) that.Contact             = Contact
      if (CoveredPartyType    != null or !ignoreNullValues) that.CoveredPartyType    = CoveredPartyType
      if (EvaluationID        != null or !ignoreNullValues) that.Evaluation          = Evaluation
      if (ExposureID          != null or !ignoreNullValues) that.Exposure            = Exposure
      if (IncidentID          != null or !ignoreNullValues) that.Incident            = Incident
      if (MatterID            != null or !ignoreNullValues) that.Matter              = Matter
      if (NegotiationID       != null or !ignoreNullValues) that.Negotiation         = Negotiation
      if (PartyNumber         != null or !ignoreNullValues) that.PartyNumber         = PartyNumber
      if (PolicyID            != null or !ignoreNullValues) that.Policy              = Policy
      if (PublicID            != null or !ignoreNullValues) that.PublicID            = PublicID
      if (Role                != null or !ignoreNullValues) that.Role                = Role
      if (WitnessPerspective  != null or !ignoreNullValues) that.WitnessPerspective  = WitnessPerspective
      if (WitnessPosition     != null or !ignoreNullValues) that.WitnessPosition     = WitnessPosition
      if (WitnessStatementInd != null or !ignoreNullValues) that.WitnessStatementInd = WitnessStatementInd
    //
    return that
  }

  /**
   * Uses the createNew block to create a new ClaimContactRole, adds it to the supplied bundle, then updates it using the field values stored in this DTO. The ignoreNullValues parameter controls how the fields that are null are treated.
   * @param bundle The bundle in which to create the new ClaimContactRole.
   * @param createNew (Optional) A block that returns a new instance of ClaimContactRole. If this is null, the default constructor will be used.
   * @param ignoreNullValues (Optional) If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the ClaimContactRole, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeToNewEntityIn(bundle : Bundle, createNew : block() : ClaimContactRole = null, ignoreNullValues = true) : ClaimContactRole {
    var instance : ClaimContactRole
    if (createNew == null) {
      instance = bundle == null
          ? new ClaimContactRole()
          : new ClaimContactRole(bundle)
    }
    else {
      instance = createNew()

      if (bundle != null) {
        instance = bundle.add(instance)
      }
    }
    return writeTo(instance, ignoreNullValues)
  }

  /** Convenience property that returns the {@link ClaimContact} whose PublicID is {@code ClaimContactID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get ClaimContact()     : ClaimContact    { return fetchByID(ClaimContactID) }
  
  /** Convenience property that returns the {@link Contact} whose PublicID is {@code ContactID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Contact()          : Contact         { return fetchByID(ContactID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code CreateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CreateUser()       : User            { return fetchByID(CreateUserID) }
  
  /** Convenience property that returns the {@link Evaluation} whose PublicID is {@code EvaluationID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Evaluation()       : Evaluation      { return fetchByID(EvaluationID) }
  
  /** Convenience property that returns the {@link Exposure} whose PublicID is {@code ExposureID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Exposure()         : Exposure        { return fetchByID(ExposureID) }
  
  /** Convenience property that returns the {@link Incident} whose PublicID is {@code IncidentID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Incident()         : Incident        { return fetchByID(IncidentID) }
  
  /** Convenience property that returns the {@link Matter} whose PublicID is {@code MatterID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Matter()           : Matter          { return fetchByID(MatterID) }
  
  /** Convenience property that returns the {@link Negotiation} whose PublicID is {@code NegotiationID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Negotiation()      : Negotiation     { return fetchByID(NegotiationID) }
  
  /** Convenience property that returns the {@link Policy} whose PublicID is {@code PolicyID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Policy()           : Policy          { return fetchByID(PolicyID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code UpdateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get UpdateUser()       : User            { return fetchByID(UpdateUserID) }

  /**
   * Returns whether the fields tracked by this DTO match the same fields in the other DTO
   * @param that The ClaimContactRoleDTO to compare against.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function equals(that : Object) : boolean {
    if (that typeis ClaimContactRoleDTO) {
      return Active              == that.Active
         and ClaimContactID      == that.ClaimContactID
         and Comments            == that.Comments
         and ContactID           == that.ContactID
         and CoveredPartyType    == that.CoveredPartyType
         and EvaluationID        == that.EvaluationID
         and ExposureID          == that.ExposureID
         and IncidentID          == that.IncidentID
         and MatterID            == that.MatterID
         and NegotiationID       == that.NegotiationID
         and PartyNumber         == that.PartyNumber
         and PolicyID            == that.PolicyID
         and PublicID            == that.PublicID
         and Role                == that.Role
         and WitnessPerspective  == that.WitnessPerspective
         and WitnessPosition     == that.WitnessPosition
         and WitnessStatementInd == that.WitnessStatementInd
    }
    return super.equals(that)
  }

  /**
   * Returns the hash code of this object.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function hashCode() : int {
    return {
      Active,
      ClaimContactID,
      Comments,
      ContactID,
      CoveredPartyType,
      EvaluationID,
      ExposureID,
      IncidentID,
      MatterID,
      NegotiationID,
      PartyNumber,
      PolicyID,
      PublicID,
      Role,
      WitnessPerspective,
      WitnessPosition,
      WitnessStatementInd
    }.reduce(17, \ hashCode, obj -> 31 * hashCode + obj?.hashCode())
  }

  /**
   * Provides a rough idea of the command needed to re-create this DTO. Because it is rough it is probably only  useful for debugging purposes.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function toString() : String {
    var fields = {} as List<String>

    if (Active               != null  ) fields.add(':Active              = ' + Active)
    if (ClaimContactID     .HasContent) fields.add(':ClaimContactID      = ' + StringUtil.enquote(ClaimContactID))
    if (Comments           .HasContent) fields.add(':Comments            = ' + StringUtil.enquote(Comments))
    if (ContactID          .HasContent) fields.add(':ContactID           = ' + StringUtil.enquote(ContactID))
    if (CoveredPartyType     != null  ) fields.add(':CoveredPartyType    = CoveredPartyType.get("' + CoveredPartyType.Code + '")')
    if (CreateTime           != null  ) fields.add(':CreateTime          = ' + StringUtil.enquote(CreateTime.toString()) + ' as Date')
    if (CreateUserID       .HasContent) fields.add(':CreateUserID        = ' + StringUtil.enquote(CreateUserID))
    if (EvaluationID       .HasContent) fields.add(':EvaluationID        = ' + StringUtil.enquote(EvaluationID))
    if (ExposureID         .HasContent) fields.add(':ExposureID          = ' + StringUtil.enquote(ExposureID))
    if (IncidentID         .HasContent) fields.add(':IncidentID          = ' + StringUtil.enquote(IncidentID))
    if (MatterID           .HasContent) fields.add(':MatterID            = ' + StringUtil.enquote(MatterID))
    if (NegotiationID      .HasContent) fields.add(':NegotiationID       = ' + StringUtil.enquote(NegotiationID))
    if (PartyNumber          != null  ) fields.add(':PartyNumber         = ' + PartyNumber)
    if (PolicyID           .HasContent) fields.add(':PolicyID            = ' + StringUtil.enquote(PolicyID))
    if (PublicID           .HasContent) fields.add(':PublicID            = ' + StringUtil.enquote(PublicID))
    if (Role                 != null  ) fields.add(':Role                = ContactRole.get("' + Role.Code + '")')
    if (UpdateTime           != null  ) fields.add(':UpdateTime          = ' + StringUtil.enquote(UpdateTime.toString()) + ' as Date')
    if (UpdateUserID       .HasContent) fields.add(':UpdateUserID        = ' + StringUtil.enquote(UpdateUserID))
    if (WitnessPerspective .HasContent) fields.add(':WitnessPerspective  = ' + StringUtil.enquote(WitnessPerspective))
    if (WitnessPosition      != null  ) fields.add(':WitnessPosition     = WitnessPosition.get("' + WitnessPosition.Code + '")')
    if (WitnessStatementInd  != null  ) fields.add(':WitnessStatementInd = YesNo.get("' + WitnessStatementInd.Code + '")')

    return "new ClaimContactRoleDTO() {\n  " + fields.join(",\n  ") + "\n}"
  }

  /**
   * return a new ClaimContactRoleDTO that represents the current state of the supplied ClaimContactRole.
   * @param that The ClaimContactRole to be represented.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  static function valueOf(that : ClaimContactRole) : ClaimContactRoleDTO {
    return new ClaimContactRoleDTO().readFrom(that)
  }

  /**
   * Returns the ClaimContactRole whose public ID is in the supplied list, or null if the publicID is null.
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