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
 * A(n) {@link ClaimDTO} is a DTO that represents an instance of {@link entity.Claim} for use by certain WS-I Web Services in the base product. This file is composed of basic getters and setters, plus members that make it easier for server-side code to work with DTOs, like virtual getters that query for entities by PublidID, and methods to copy fields to or from an instance of {@link entity.Claim}.
 * <p>None of these methods constrain how an instance of ClaimDTO is created, initialized or used (beyond the normal Gosu type checking): this is consistent with the <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO Design Pattern</a>, which states that "DTOs are simple objects that should not contain any business logic that would require testing". Validation logic that considers whether a DTO field can have a <i>particular</i> value (based on things like effective dates, jurisdictions, line of business, user permissions, the values of other fields, etc.) should not be handled here, but rather by the API that manipulates the ClaimDTO.
 * <p>Please read the documentation in the accelerator before reusing this class in any additional WS-I Web Services.</p>
 * <p>Fields are mapped according to the following rules:
 * <ul><li>Primitive values are copied directly</li><li>Typekey fields are copied directly (the WS-I layer translates them to/from WS-I enums)</li><li>Foreign keys fields are represented by the target object's PublicID</li><li>Arraykey fields are represented by an array of the PublicIDs of the elements in the array</li></ul></p>
 * <p>The specific mappings for {@link ClaimDTO} are as follows:
 * <table border="1"><tr><th>Field</th><th>Maps to</th></tr><tr><td>AssignedGroupID</td><td>Claim.AssignedGroup.PublicID</td></tr><tr><td>AssignedUserID</td><td>Claim.AssignedUser.PublicID</td></tr><tr><td>claimantID</td><td>Claim.claimant.PublicID</td></tr><tr><td>ClaimNumber</td><td>Claim.ClaimNumber</td></tr><tr><td>Closed</td><td>Claim.Closed</td></tr><tr><td>CloseDate</td><td>Claim.CloseDate</td></tr><tr><td>ContactIDs</td><td>Claim.Contacts*.PublicID</td></tr><tr><td>CreateTime</td><td>Claim.CreateTime</td></tr><tr><td>CreateUserID</td><td>Claim.CreateUser.PublicID</td></tr><tr><td>Currency</td><td>Claim.Currency</td></tr><tr><td>Description</td><td>Claim.Description</td></tr><tr><td>doctorIDs</td><td>Claim.doctor*.PublicID</td></tr><tr><td>ExposureIDs</td><td>Claim.Exposures*.PublicID</td></tr><tr><td>Fault</td><td>Claim.Fault</td></tr><tr><td>FaultRating</td><td>Claim.FaultRating</td></tr><tr><td>FirstIntakeDoctorID</td><td>Claim.FirstIntakeDoctor.PublicID</td></tr><tr><td>hospitalID</td><td>Claim.hospital.PublicID</td></tr><tr><td>IncidentIDs</td><td>Claim.Incidents*.PublicID</td></tr><tr><td>LossCause</td><td>Claim.LossCause</td></tr><tr><td>LossDate</td><td>Claim.LossDate</td></tr><tr><td>LossType</td><td>Claim.LossType</td></tr><tr><td>maincontactID</td><td>Claim.maincontact.PublicID</td></tr><tr><td>nursecasemgrID</td><td>Claim.nursecasemgr.PublicID</td></tr><tr><td>PolicyID</td><td>Claim.Policy.PublicID</td></tr><tr><td>PreviousUserID</td><td>Claim.PreviousUser.PublicID</td></tr><tr><td>PrimaryDoctorID</td><td>Claim.PrimaryDoctor.PublicID</td></tr><tr><td>PublicID</td><td>Claim.PublicID</td></tr><tr><td>reporterID</td><td>Claim.reporter.PublicID</td></tr><tr><td>State</td><td>Claim.State</td></tr><tr><td>subrogatorID</td><td>Claim.subrogator.PublicID</td></tr><tr><td>supervisorID</td><td>Claim.supervisor.PublicID</td></tr><tr><td>UpdateTime</td><td>Claim.UpdateTime</td></tr><tr><td>UpdateUserID</td><td>Claim.UpdateUser.PublicID</td></tr><tr><td>witnessIDs</td><td>Claim.witness*.PublicID</td></tr></table></p>
 * <br/>This file was generated using the following property definitions:<br/><pre>Claim#AssignedGroup,     // Group<br/>Claim#AssignedUser,      // User<br/>Claim#claimant,          // Person<br/>Claim#ClaimNumber,       // String<br/>Claim#Closed,            // boolean<br/>Claim#CloseDate,         // java.util.Date<br/>Claim#Contacts,          // ClaimContact[]<br/>Claim#Currency,          // typekey.Currency<br/>Claim#Description,       // String<br/>Claim#doctor,            // Doctor[]<br/>Claim#Exposures,         // Exposure[]<br/>Claim#Fault,             // java.math.BigDecimal<br/>Claim#FaultRating,       // typekey.FaultRating<br/>Claim#FirstIntakeDoctor, // Doctor<br/>Claim#hospital,          // MedicalCareOrg<br/>Claim#Incidents,         // Incident[]<br/>Claim#LossCause,         // typekey.LossCause<br/>Claim#LossDate,          // java.util.Date<br/>Claim#LossType,          // typekey.LossType<br/>Claim#maincontact,       // Person<br/>Claim#nursecasemgr,      // Person<br/>Claim#Policy,            // Policy<br/>Claim#PreviousUser,      // User<br/>Claim#PrimaryDoctor,     // Doctor<br/>Claim#reporter,          // Contact<br/>Claim#State,             // typekey.ClaimState<br/>Claim#subrogator,        // Contact<br/>Claim#supervisor,        // Person<br/>Claim#witness            // Person[]</pre>
 */
@Export
@WsiExportable("http://guidewire.com/cc/ws/gw/webservice/cc/cc801/dto/ClaimDTO")
@Generated("DTOBuilder", "DO NOT edit this class directly! See comments at the top of the file.", "2014-01-28T16:22Z")
final class ClaimDTO {
  /** Derived from Claim#AssignedGroup.PublicID */
  var _assignedGroupID     : String               as AssignedGroupID
  /** Derived from Claim#AssignedUser.PublicID */
  var _assignedUserID      : String               as AssignedUserID
  /** Derived from Claim#claimant.PublicID */
  var _claimantID          : String               as claimantID
  var _claimNumber         : String               as ClaimNumber
  var _closed              : boolean              as Closed
  var _closeDate           : Date                 as CloseDate
  /** Derived from Claim#Contacts*.PublicID */
  var _contactIDs          : String[]             as ContactIDs = {}
  var _createTime          : Date                 as CreateTime
  /** Derived from Editable#CreateUser.PublicID */
  var _createUserID        : String               as CreateUserID
  var _currency            : Currency             as Currency
  var _description         : String               as Description
  /** Derived from Claim#doctor*.PublicID */
  var _doctorIDs           : String[]             as doctorIDs = {}
  /** Derived from Claim#Exposures*.PublicID */
  var _exposureIDs         : String[]             as ExposureIDs = {}
  var _fault               : java.math.BigDecimal as Fault
  var _faultRating         : FaultRating          as FaultRating
  /** Derived from Claim#FirstIntakeDoctor.PublicID */
  var _firstIntakeDoctorID : String               as FirstIntakeDoctorID
  /** Derived from Claim#hospital.PublicID */
  var _hospitalID          : String               as hospitalID
  /** Derived from Claim#Incidents*.PublicID */
  var _incidentIDs         : String[]             as IncidentIDs = {}
  var _lossCause           : LossCause            as LossCause
  var _lossDate            : Date                 as LossDate
  var _lossType            : LossType             as LossType
  /** Derived from Claim#maincontact.PublicID */
  var _maincontactID       : String               as maincontactID
  var _newActivities       : ActivityDTO[]        as NewActivities = {}
  var _newContacts         : ClaimContactDTO[]    as NewContacts = {}
  var _newdoctor           : ContactDTO[]         as Newdoctor = {}
  var _newDocuments        : DocumentDTO[]        as NewDocuments = {}
  var _newExposures        : ExposureDTO[]        as NewExposures = {}
  var _newIncidents        : IncidentDTO[]        as NewIncidents = {}
  var _newNotes            : NoteDTO[]            as NewNotes = {}
  var _newwitness          : ContactDTO[]         as Newwitness = {}
  /** Derived from Claim#nursecasemgr.PublicID */
  var _nursecasemgrID      : String               as nursecasemgrID
  /** Derived from Claim#Policy.PublicID */
  var _policyID            : String               as PolicyID
  /** Derived from Claim#PreviousUser.PublicID */
  var _previousUserID      : String               as PreviousUserID
  /** Derived from Claim#PrimaryDoctor.PublicID */
  var _primaryDoctorID     : String               as PrimaryDoctorID
  var _publicID            : String               as PublicID
  /** Derived from Claim#reporter.PublicID */
  var _reporterID          : String               as reporterID
  var _state               : ClaimState           as State
  /** Derived from Claim#subrogator.PublicID */
  var _subrogatorID        : String               as subrogatorID
  /** Derived from Claim#supervisor.PublicID */
  var _supervisorID        : String               as supervisorID
  var _updateTime          : Date                 as UpdateTime
  /** Derived from Editable#UpdateUser.PublicID */
  var _updateUserID        : String               as UpdateUserID
  /** Derived from Claim#witness*.PublicID */
  var _witnessIDs          : String[]             as witnessIDs = {}

  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  construct() { }

  /**
   * Copies the platform-managed fields from the supplied Claim
   * @param that The Claim to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  protected function _copyReadOnlyFieldsFrom(that : Claim) {
    // if field is on base class
      _closed              = that.Closed
      _contactIDs          = that.Contacts*.PublicID
      _createTime          = that.CreateTime
      _createUserID        = that.CreateUser.PublicID
      _currency            = that.Currency
      _exposureIDs         = that.Exposures*.PublicID
      _incidentIDs         = that.Incidents*.PublicID
      _previousUserID      = that.PreviousUser.PublicID
      _state               = that.State
      _updateTime          = that.UpdateTime
      _updateUserID        = that.UpdateUser.PublicID
      _doctorIDs           = that.doctor*.PublicID
      _witnessIDs          = that.witness*.PublicID
    //
  }

  /**
   * Set the fields in this DTO using the supplied Claim
   * @param that The Claim to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function readFrom(that : Claim) : ClaimDTO {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      AssignedGroupID      = that.AssignedGroup.PublicID
      AssignedUserID       = that.AssignedUser.PublicID
      ClaimNumber          = that.ClaimNumber
      CloseDate            = that.CloseDate
      Description          = that.Description
      Fault                = that.Fault
      FaultRating          = that.FaultRating
      FirstIntakeDoctorID  = that.FirstIntakeDoctor.PublicID
      LossCause            = that.LossCause
      LossDate             = that.LossDate
      LossType             = that.LossType
      PolicyID             = that.Policy.PublicID
      PrimaryDoctorID      = that.PrimaryDoctor.PublicID
      PublicID             = that.PublicID
      claimantID           = that.claimant.PublicID
      hospitalID           = that.hospital.PublicID
      maincontactID        = that.maincontact.PublicID
      nursecasemgrID       = that.nursecasemgr.PublicID
      reporterID           = that.reporter.PublicID
      subrogatorID         = that.subrogator.PublicID
      supervisorID         = that.supervisor.PublicID
    //
    return this
  }

  /**
   * Update the supplied Claim using the field values stored in this DTO
   * @param that The Claim to update.
   * @param (Optional) ignoreNullValues If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Claim, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeTo(that : Claim, ignoreNullValues = true) : Claim {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      if (AssignedGroupID     != null or !ignoreNullValues) that.AssignedGroup       = AssignedGroup
      if (AssignedUserID      != null or !ignoreNullValues) that.AssignedUser        = AssignedUser
      if (ClaimNumber         != null or !ignoreNullValues) that.ClaimNumber         = ClaimNumber
      if (CloseDate           != null or !ignoreNullValues) that.CloseDate           = CloseDate
      if (Description         != null or !ignoreNullValues) that.Description         = Description
      if (Fault               != null or !ignoreNullValues) that.Fault               = Fault
      if (FaultRating         != null or !ignoreNullValues) that.FaultRating         = FaultRating
      if (FirstIntakeDoctorID != null or !ignoreNullValues) that.FirstIntakeDoctor   = FirstIntakeDoctor
      if (LossCause           != null or !ignoreNullValues) that.LossCause           = LossCause
      if (LossDate            != null or !ignoreNullValues) that.LossDate            = LossDate
      if (LossType            != null or !ignoreNullValues) that.LossType            = LossType
      if (PolicyID            != null or !ignoreNullValues) that.Policy              = Policy
      if (PrimaryDoctorID     != null or !ignoreNullValues) that.PrimaryDoctor       = PrimaryDoctor
      if (PublicID            != null or !ignoreNullValues) that.PublicID            = PublicID
      if (claimantID          != null or !ignoreNullValues) that.claimant            = claimant
      if (hospitalID          != null or !ignoreNullValues) that.hospital            = hospital
      if (maincontactID       != null or !ignoreNullValues) that.maincontact         = maincontact
      if (nursecasemgrID      != null or !ignoreNullValues) that.nursecasemgr        = nursecasemgr
      if (reporterID          != null or !ignoreNullValues) that.reporter            = reporter
      if (subrogatorID        != null or !ignoreNullValues) that.subrogator          = subrogator
      if (supervisorID        != null or !ignoreNullValues) that.supervisor          = supervisor
    //
    return that
  }

  /**
   * Uses the createNew block to create a new Claim, adds it to the supplied bundle, then updates it using the field values stored in this DTO. The ignoreNullValues parameter controls how the fields that are null are treated.
   * @param bundle The bundle in which to create the new Claim.
   * @param createNew (Optional) A block that returns a new instance of Claim. If this is null, the default constructor will be used.
   * @param ignoreNullValues (Optional) If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Claim, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeToNewEntityIn(bundle : Bundle, createNew : block() : Claim = null, ignoreNullValues = true) : Claim {
    var instance : Claim
    if (createNew == null) {
      instance = bundle == null
          ? new Claim()
          : new Claim(bundle)
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
  property get AssignedGroup()    : Group               { return fetchByID(AssignedGroupID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code AssignedUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get AssignedUser()     : User                { return fetchByID(AssignedUserID) }
  
  /** Convenience property that returns the {@link Person} whose PublicID is {@code claimantID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get claimant()         : Person              { return fetchByID(claimantID) }
  
  /** Convenience property that returns a {@link ClaimContact[]} of the objects whose PublicIDs are in {@code ContactIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Contacts()         : ClaimContact[]      { return fetchByID(ContactIDs) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code CreateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CreateUser()       : User                { return fetchByID(CreateUserID) }
  
  /** Convenience property that returns a {@link Doctor[]} of the objects whose PublicIDs are in {@code doctorIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get doctor()           : Doctor[]            { return fetchByID(doctorIDs) }
  
  /** Convenience property that returns a {@link Exposure[]} of the objects whose PublicIDs are in {@code ExposureIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Exposures()        : Exposure[]          { return fetchByID(ExposureIDs) }
  
  /** Convenience property that returns the {@link Doctor} whose PublicID is {@code FirstIntakeDoctorID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get FirstIntakeDoctor() : Doctor              { return fetchByID(FirstIntakeDoctorID) }
  
  /** Convenience property that returns the {@link MedicalCareOrg} whose PublicID is {@code hospitalID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get hospital()         : MedicalCareOrg      { return fetchByID(hospitalID) }
  
  /** Convenience property that returns a {@link Incident[]} of the objects whose PublicIDs are in {@code IncidentIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Incidents()        : Incident[]          { return fetchByID(IncidentIDs) }
  
  /** Convenience property that returns the {@link Person} whose PublicID is {@code maincontactID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get maincontact()      : Person              { return fetchByID(maincontactID) }
  
  /** Convenience property that returns the {@link Person} whose PublicID is {@code nursecasemgrID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get nursecasemgr()     : Person              { return fetchByID(nursecasemgrID) }
  
  /** Convenience property that returns the {@link Policy} whose PublicID is {@code PolicyID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Policy()           : Policy              { return fetchByID(PolicyID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code PreviousUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get PreviousUser()     : User                { return fetchByID(PreviousUserID) }
  
  /** Convenience property that returns the {@link Doctor} whose PublicID is {@code PrimaryDoctorID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get PrimaryDoctor()    : Doctor              { return fetchByID(PrimaryDoctorID) }
  
  /** Convenience property that returns the {@link Contact} whose PublicID is {@code reporterID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get reporter()         : Contact             { return fetchByID(reporterID) }
  
  /** Convenience property that returns the {@link Contact} whose PublicID is {@code subrogatorID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get subrogator()       : Contact             { return fetchByID(subrogatorID) }
  
  /** Convenience property that returns the {@link Person} whose PublicID is {@code supervisorID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get supervisor()       : Person              { return fetchByID(supervisorID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code UpdateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get UpdateUser()       : User                { return fetchByID(UpdateUserID) }
  
  /** Convenience property that returns a {@link Person[]} of the objects whose PublicIDs are in {@code witnessIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get witness()          : Person[]            { return fetchByID(witnessIDs) }

  /**
   * Returns whether the fields tracked by this DTO match the same fields in the other DTO
   * @param that The ClaimDTO to compare against.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function equals(that : Object) : boolean {
    if (that typeis ClaimDTO) {
      return AssignedGroupID     == that.AssignedGroupID
         and AssignedUserID      == that.AssignedUserID
         and claimantID          == that.claimantID
         and ClaimNumber         == that.ClaimNumber
         and CloseDate           == that.CloseDate
         and Description         == that.Description
         and Fault               == that.Fault
         and FaultRating         == that.FaultRating
         and FirstIntakeDoctorID == that.FirstIntakeDoctorID
         and hospitalID          == that.hospitalID
         and LossCause           == that.LossCause
         and LossDate            == that.LossDate
         and LossType            == that.LossType
         and maincontactID       == that.maincontactID
         and nursecasemgrID      == that.nursecasemgrID
         and PolicyID            == that.PolicyID
         and PrimaryDoctorID     == that.PrimaryDoctorID
         and PublicID            == that.PublicID
         and reporterID          == that.reporterID
         and subrogatorID        == that.subrogatorID
         and supervisorID        == that.supervisorID
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
      claimantID,
      ClaimNumber,
      CloseDate,
      Description,
      Fault,
      FaultRating,
      FirstIntakeDoctorID,
      hospitalID,
      LossCause,
      LossDate,
      LossType,
      maincontactID,
      nursecasemgrID,
      PolicyID,
      PrimaryDoctorID,
      PublicID,
      reporterID,
      subrogatorID,
      supervisorID
    }.reduce(17, \ hashCode, obj -> 31 * hashCode + obj?.hashCode())
  }

  /**
   * Provides a rough idea of the command needed to re-create this DTO. Because it is rough it is probably only  useful for debugging purposes.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function toString() : String {
    var fields = {} as List<String>

    if (AssignedGroupID    .HasContent) fields.add(':AssignedGroupID     = ' + StringUtil.enquote(AssignedGroupID))
    if (AssignedUserID     .HasContent) fields.add(':AssignedUserID      = ' + StringUtil.enquote(AssignedUserID))
    if (claimantID         .HasContent) fields.add(':claimantID          = ' + StringUtil.enquote(claimantID))
    if (ClaimNumber        .HasContent) fields.add(':ClaimNumber         = ' + StringUtil.enquote(ClaimNumber))
    if (Closed               == true  ) fields.add(':Closed              = true')
    if (CloseDate            != null  ) fields.add(':CloseDate           = ' + StringUtil.enquote(CloseDate.toString()) + ' as Date')
    if (ContactIDs           != null  ) fields.add(':ContactIDs          = ' + ContactIDs)
    if (CreateTime           != null  ) fields.add(':CreateTime          = ' + StringUtil.enquote(CreateTime.toString()) + ' as Date')
    if (CreateUserID       .HasContent) fields.add(':CreateUserID        = ' + StringUtil.enquote(CreateUserID))
    if (Currency             != null  ) fields.add(':Currency            = Currency.get("' + Currency.Code + '")')
    if (Description        .HasContent) fields.add(':Description         = ' + StringUtil.enquote(Description))
    if (doctorIDs            != null  ) fields.add(':doctorIDs           = ' + doctorIDs)
    if (ExposureIDs          != null  ) fields.add(':ExposureIDs         = ' + ExposureIDs)
    if (Fault                != null  ) fields.add(':Fault               = ' + Fault)
    if (FaultRating          != null  ) fields.add(':FaultRating         = FaultRating.get("' + FaultRating.Code + '")')
    if (FirstIntakeDoctorID.HasContent) fields.add(':FirstIntakeDoctorID = ' + StringUtil.enquote(FirstIntakeDoctorID))
    if (hospitalID         .HasContent) fields.add(':hospitalID          = ' + StringUtil.enquote(hospitalID))
    if (IncidentIDs          != null  ) fields.add(':IncidentIDs         = ' + IncidentIDs)
    if (LossCause            != null  ) fields.add(':LossCause           = LossCause.get("' + LossCause.Code + '")')
    if (LossDate             != null  ) fields.add(':LossDate            = ' + StringUtil.enquote(LossDate.toString()) + ' as Date')
    if (LossType             != null  ) fields.add(':LossType            = LossType.get("' + LossType.Code + '")')
    if (maincontactID      .HasContent) fields.add(':maincontactID       = ' + StringUtil.enquote(maincontactID))
    if (NewActivities        != null  ) fields.add(':NewActivities       = ' + NewActivities)
    if (NewContacts          != null  ) fields.add(':NewContacts         = ' + NewContacts)
    if (Newdoctor            != null  ) fields.add(':Newdoctor           = ' + Newdoctor)
    if (NewDocuments         != null  ) fields.add(':NewDocuments        = ' + NewDocuments)
    if (NewExposures         != null  ) fields.add(':NewExposures        = ' + NewExposures)
    if (NewIncidents         != null  ) fields.add(':NewIncidents        = ' + NewIncidents)
    if (NewNotes             != null  ) fields.add(':NewNotes            = ' + NewNotes)
    if (Newwitness           != null  ) fields.add(':Newwitness          = ' + Newwitness)
    if (nursecasemgrID     .HasContent) fields.add(':nursecasemgrID      = ' + StringUtil.enquote(nursecasemgrID))
    if (PolicyID           .HasContent) fields.add(':PolicyID            = ' + StringUtil.enquote(PolicyID))
    if (PreviousUserID     .HasContent) fields.add(':PreviousUserID      = ' + StringUtil.enquote(PreviousUserID))
    if (PrimaryDoctorID    .HasContent) fields.add(':PrimaryDoctorID     = ' + StringUtil.enquote(PrimaryDoctorID))
    if (PublicID           .HasContent) fields.add(':PublicID            = ' + StringUtil.enquote(PublicID))
    if (reporterID         .HasContent) fields.add(':reporterID          = ' + StringUtil.enquote(reporterID))
    if (State                != null  ) fields.add(':State               = ClaimState.get("' + State.Code + '")')
    if (subrogatorID       .HasContent) fields.add(':subrogatorID        = ' + StringUtil.enquote(subrogatorID))
    if (supervisorID       .HasContent) fields.add(':supervisorID        = ' + StringUtil.enquote(supervisorID))
    if (UpdateTime           != null  ) fields.add(':UpdateTime          = ' + StringUtil.enquote(UpdateTime.toString()) + ' as Date')
    if (UpdateUserID       .HasContent) fields.add(':UpdateUserID        = ' + StringUtil.enquote(UpdateUserID))
    if (witnessIDs           != null  ) fields.add(':witnessIDs          = ' + witnessIDs)

    return "new ClaimDTO() {\n  " + fields.join(",\n  ") + "\n}"
  }

  /**
   * return a new ClaimDTO that represents the current state of the supplied Claim.
   * @param that The Claim to be represented.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  static function valueOf(that : Claim) : ClaimDTO {
    return new ClaimDTO().readFrom(that)
  }

  /**
   * Returns all of the Claim instances whose public IDs are in the supplied list, or an empty array if the supplied list is null or empty.
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
   * Returns the Claim whose public ID is in the supplied list, or null if the publicID is null.
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