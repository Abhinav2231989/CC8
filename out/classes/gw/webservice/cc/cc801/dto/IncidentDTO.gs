package gw.webservice.cc.cc801.dto

uses gw.api.database.Query
uses gw.api.util.StringUtil
uses gw.api.webservice.exception.BadIdentifierException
uses gw.lang.reflect.ReflectUtil
uses gw.pl.persistence.core.Bundle
uses gw.xml.ws.annotation.WsiExportable
uses java.util.Date
uses javax.annotation.Generated

/**
 * <p style="border: 1px solid black; padding: 10px">This Data Transfer Object ("DTO") class is used to generate a WSDL to serialize and deserialize information across the network. Any change to the public properties of this DTO class will change the WSDL, thus breaking any existing clients. So once the corresponding WSDL is in use this DTO should only be changed with extreme caution, as it will require existing clients to be rebuilt and redeployed.<br/><br/>
DTOs which are a simple mapping from the domain model may be auto-generated using the "WSI DTO Generator", available from the customer portal. This generator can significantly speed up initial coding of such DTOs. Always remember, however, that DTOs are a network interface and a simple mapping from the domain model may not provide the best results. Remember too that once a DTO has been used in a deployed WSDL, re-running the generator may break existing clients (see above). Please read the documentation in the accelerator for guidance.</p><br/>
 * A(n) {@link IncidentDTO} is a DTO that represents an instance of {@link entity.Incident} for use by certain WS-I Web Services in the base product. This file is composed of basic getters and setters, plus members that make it easier for server-side code to work with DTOs, like virtual getters that query for entities by PublidID, and methods to copy fields to or from an instance of {@link entity.Incident}.
 * <p>None of these methods constrain how an instance of IncidentDTO is created, initialized or used (beyond the normal Gosu type checking): this is consistent with the <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO Design Pattern</a>, which states that "DTOs are simple objects that should not contain any business logic that would require testing". Validation logic that considers whether a DTO field can have a <i>particular</i> value (based on things like effective dates, jurisdictions, line of business, user permissions, the values of other fields, etc.) should not be handled here, but rather by the API that manipulates the IncidentDTO.
 * <p>Please read the documentation in the accelerator before reusing this class in any additional WS-I Web Services.</p>
 * <p>Fields are mapped according to the following rules:
 * <ul><li>Primitive values are copied directly</li><li>Typekey fields are copied directly (the WS-I layer translates them to/from WS-I enums)</li><li>Foreign keys fields are represented by the target object's PublicID</li><li>Arraykey fields are represented by an array of the PublicIDs of the elements in the array</li></ul></p>
 * <p>The specific mappings for {@link IncidentDTO} are as follows:
 * <table border="1"><tr><th>Field</th><th>Maps to</th></tr><tr><td>AmbulanceUsed</td><td>InjuryIncident.AmbulanceUsed</td></tr><tr><td>ClaimID</td><td>Incident.Claim.PublicID</td></tr><tr><td>CreateTime</td><td>Incident.CreateTime</td></tr><tr><td>CreateUserID</td><td>Incident.CreateUser.PublicID</td></tr><tr><td>Description</td><td>Incident.Description</td></tr><tr><td>DetailedInjuryType</td><td>InjuryIncident.DetailedInjuryType</td></tr><tr><td>DisabledDueToAccident</td><td>InjuryIncident.DisabledDueToAccident</td></tr><tr><td>driverID</td><td>VehicleIncident.driver.PublicID</td></tr><tr><td>ExposureIDs</td><td>Incident.Exposures*.PublicID</td></tr><tr><td>GeneralInjuryType</td><td>InjuryIncident.GeneralInjuryType</td></tr><tr><td>injuredID</td><td>InjuryIncident.injured.PublicID</td></tr><tr><td>LocationAddressID</td><td>MobilePropertyIncident.LocationAddress.PublicID</td></tr><tr><td>LossDesc</td><td>MobilePropertyIncident.LossDesc</td></tr><tr><td>LossOccured</td><td>MobilePropertyIncident.LossOccured</td></tr><tr><td>LossofUse</td><td>PropertyIncident.LossofUse</td></tr><tr><td>MedicalTreatmentType</td><td>InjuryIncident.MedicalTreatmentType</td></tr><tr><td>PropertyDesc</td><td>PropertyIncident.PropertyDesc</td></tr><tr><td>PublicID</td><td>Incident.PublicID</td></tr><tr><td>Severity</td><td>Incident.Severity</td></tr><tr><td>Subtype</td><td>Incident.Subtype</td></tr><tr><td>TypeofPropertyIDs</td><td>PropertyIncident.TypeofProperty*.PublicID</td></tr><tr><td>UpdateTime</td><td>Incident.UpdateTime</td></tr><tr><td>UpdateUserID</td><td>Incident.UpdateUser.PublicID</td></tr><tr><td>VehicleID</td><td>VehicleIncident.Vehicle.PublicID</td></tr></table></p>
 * <br/>This file was generated using the following property definitions:<br/><pre>Incident#Claim,                         // Claim<br/>Incident#Description,                   // String<br/>Incident#Exposures,                     // Exposure[]<br/>Incident#Severity,                      // typekey.SeverityType<br/>Incident#Subtype,                       // typekey.Incident<br/>InjuryIncident#AmbulanceUsed,           // Boolean<br/>InjuryIncident#DetailedInjuryType,      // typekey.DetailedInjuryType<br/>InjuryIncident#DisabledDueToAccident,   // typekey.DisabledDueToAccident<br/>InjuryIncident#GeneralInjuryType,       // typekey.InjuryType<br/>InjuryIncident#injured,                 // Person<br/>InjuryIncident#MedicalTreatmentType,    // typekey.MedicalTreatmentType<br/>MobilePropertyIncident#LocationAddress, // Address<br/>MobilePropertyIncident#LossDesc,        // String<br/>MobilePropertyIncident#LossOccured,     // typekey.LossOccured<br/>PropertyIncident#LossofUse,             // Boolean<br/>PropertyIncident#PropertyDesc,          // String<br/>PropertyIncident#TypeofProperty,        // TypeofProperty[]<br/>VehicleIncident#driver,                 // Person<br/>VehicleIncident#Vehicle                 // Vehicle</pre>
 */
@Export
@WsiExportable("http://guidewire.com/cc/ws/gw/webservice/cc/cc801/dto/IncidentDTO")
@Generated("DTOBuilder", "DO NOT edit this class directly! See comments at the top of the file.", "2014-01-28T16:22Z")
final class IncidentDTO {
  var _ambulanceUsed         : Boolean               as AmbulanceUsed
  /** Derived from Incident#Claim.PublicID */
  var _claimID               : String                as ClaimID
  var _createTime            : Date                  as CreateTime
  /** Derived from Editable#CreateUser.PublicID */
  var _createUserID          : String                as CreateUserID
  var _description           : String                as Description
  var _detailedInjuryType    : DetailedInjuryType    as DetailedInjuryType
  var _disabledDueToAccident : DisabledDueToAccident as DisabledDueToAccident
  /** Derived from VehicleIncident#driver.PublicID */
  var _driverID              : String                as driverID
  /** Derived from Incident#Exposures*.PublicID */
  var _exposureIDs           : String[]              as ExposureIDs = {}
  var _generalInjuryType     : InjuryType            as GeneralInjuryType
  /** Derived from InjuryIncident#injured.PublicID */
  var _injuredID             : String                as injuredID
  /** Derived from MobilePropertyIncident#LocationAddress.PublicID */
  var _locationAddressID     : String                as LocationAddressID
  var _lossDesc              : String                as LossDesc
  var _lossOccured           : LossOccured           as LossOccured
  var _lossofUse             : Boolean               as LossofUse
  var _medicalTreatmentType  : MedicalTreatmentType  as MedicalTreatmentType
  var _newExposures          : ExposureDTO[]         as NewExposures = {}
  var _propertyDesc          : String                as PropertyDesc
  var _publicID              : String                as PublicID
  var _severity              : SeverityType          as Severity
  var _subtype               : typekey.Incident      as Subtype
  /** Derived from PropertyIncident#TypeofProperty*.PublicID */
  var _typeofPropertyIDs     : String[]              as TypeofPropertyIDs = {}
  var _updateTime            : Date                  as UpdateTime
  /** Derived from Editable#UpdateUser.PublicID */
  var _updateUserID          : String                as UpdateUserID
  /** Derived from VehicleIncident#Vehicle.PublicID */
  var _vehicleID             : String                as VehicleID

  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  construct() { }

  /**
   * Copies the platform-managed fields from the supplied Incident
   * @param that The Incident to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  protected function _copyReadOnlyFieldsFrom(that : Incident) {
    // if field is on base class
      _createTime            = that.CreateTime
      _createUserID          = that.CreateUser.PublicID
      _exposureIDs           = that.Exposures*.PublicID
      _subtype               = that.Subtype
      _updateTime            = that.UpdateTime
      _updateUserID          = that.UpdateUser.PublicID
    //
    if (that typeis PropertyIncident) {
      _typeofPropertyIDs     = that.TypeofProperty*.PublicID
    }
  }

  /**
   * Set the fields in this DTO using the supplied Incident
   * @param that The Incident to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function readFrom(that : Incident) : IncidentDTO {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      ClaimID                = that.Claim.PublicID
      Description            = that.Description
      PublicID               = that.PublicID
      Severity               = that.Severity
    //
    if (that typeis InjuryIncident) {
      AmbulanceUsed          = that.AmbulanceUsed
      DetailedInjuryType     = that.DetailedInjuryType
      DisabledDueToAccident  = that.DisabledDueToAccident
      GeneralInjuryType      = that.GeneralInjuryType
      MedicalTreatmentType   = that.MedicalTreatmentType
      injuredID              = that.injured.PublicID
    }
    if (that typeis MobilePropertyIncident) {
      LocationAddressID      = that.LocationAddress.PublicID
      LossDesc               = that.LossDesc
      LossOccured            = that.LossOccured
    }
    if (that typeis PropertyIncident) {
      LossofUse              = that.LossofUse
      PropertyDesc           = that.PropertyDesc
    }
    if (that typeis VehicleIncident) {
      VehicleID              = that.Vehicle.PublicID
      driverID               = that.driver.PublicID
    }
    return this
  }

  /**
   * Update the supplied Incident using the field values stored in this DTO
   * @param that The Incident to update.
   * @param (Optional) ignoreNullValues If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Incident, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeTo(that : Incident, ignoreNullValues = true) : Incident {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      if (ClaimID               != null or !ignoreNullValues) that.Claim                 = Claim
      if (Description           != null or !ignoreNullValues) that.Description           = Description
      if (PublicID              != null or !ignoreNullValues) that.PublicID              = PublicID
      if (Severity              != null or !ignoreNullValues) that.Severity              = Severity
    //
    if (that typeis InjuryIncident) {
      if (AmbulanceUsed         != null or !ignoreNullValues) that.AmbulanceUsed         = AmbulanceUsed
      if (DetailedInjuryType    != null or !ignoreNullValues) that.DetailedInjuryType    = DetailedInjuryType
      if (DisabledDueToAccident != null or !ignoreNullValues) that.DisabledDueToAccident = DisabledDueToAccident
      if (GeneralInjuryType     != null or !ignoreNullValues) that.GeneralInjuryType     = GeneralInjuryType
      if (MedicalTreatmentType  != null or !ignoreNullValues) that.MedicalTreatmentType  = MedicalTreatmentType
      if (injuredID             != null or !ignoreNullValues) that.injured               = injured
    }
    if (that typeis MobilePropertyIncident) {
      if (LocationAddressID     != null or !ignoreNullValues) that.LocationAddress       = LocationAddress
      if (LossDesc              != null or !ignoreNullValues) that.LossDesc              = LossDesc
      if (LossOccured           != null or !ignoreNullValues) that.LossOccured           = LossOccured
    }
    if (that typeis PropertyIncident) {
      if (LossofUse             != null or !ignoreNullValues) that.LossofUse             = LossofUse
      if (PropertyDesc          != null or !ignoreNullValues) that.PropertyDesc          = PropertyDesc
    }
    if (that typeis VehicleIncident) {
      if (VehicleID             != null or !ignoreNullValues) that.Vehicle               = Vehicle
      if (driverID              != null or !ignoreNullValues) that.driver                = driver
    }
    return that
  }

  /**
   * Uses the createNew block to create a new Incident, adds it to the supplied bundle, then updates it using the field values stored in this DTO. The ignoreNullValues parameter controls how the fields that are null are treated.
   * @param bundle The bundle in which to create the new Incident.
   * @param createNew (Optional) A block that returns a new instance of Incident. If this is null, the default constructor will be used.
   * @param ignoreNullValues (Optional) If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Incident, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeToNewEntityIn(bundle : Bundle, createNew : block() : Incident = null, ignoreNullValues = true) : Incident {
    var instance : Incident
    if (createNew == null) {
      instance = bundle == null
          ? ReflectUtil.construct(ConcreteSubtypeClassName, {})
          : ReflectUtil.construct(ConcreteSubtypeClassName, {bundle})
    }
    else {
      instance = createNew()

      if (bundle != null) {
        instance = bundle.add(instance)
      }
    }
    return writeTo(instance, ignoreNullValues)
  }

  /**
   * Returns the name of the instantiable subclass referred to by the Subtype typekey, or the base class Incident if there is none.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final property get ConcreteSubtypeClassName() : String {
    return "entity." + (Subtype.Code ?: "Incident")
  }

  /** Convenience property that returns the {@link Claim} whose PublicID is {@code ClaimID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Claim()              : Claim                { return fetchByID(ClaimID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code CreateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CreateUser()         : User                 { return fetchByID(CreateUserID) }
  
  /** Convenience property that returns the {@link Person} whose PublicID is {@code driverID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get driver()             : Person               { return fetchByID(driverID) }
  
  /** Convenience property that returns a {@link Exposure[]} of the objects whose PublicIDs are in {@code ExposureIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Exposures()          : Exposure[]           { return fetchByID(ExposureIDs) }
  
  /** Convenience property that returns the {@link Person} whose PublicID is {@code injuredID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get injured()            : Person               { return fetchByID(injuredID) }
  
  /** Convenience property that returns the {@link Address} whose PublicID is {@code LocationAddressID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get LocationAddress()    : Address              { return fetchByID(LocationAddressID) }
  
  /** Convenience property that returns a {@link TypeofProperty[]} of the objects whose PublicIDs are in {@code TypeofPropertyIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get TypeofProperty()     : TypeofProperty[]     { return fetchByID(TypeofPropertyIDs) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code UpdateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get UpdateUser()         : User                 { return fetchByID(UpdateUserID) }
  
  /** Convenience property that returns the {@link Vehicle} whose PublicID is {@code VehicleID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Vehicle()            : Vehicle              { return fetchByID(VehicleID) }

  /**
   * Returns whether the fields tracked by this DTO match the same fields in the other DTO
   * @param that The IncidentDTO to compare against.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function equals(that : Object) : boolean {
    if (that typeis IncidentDTO) {
      return AmbulanceUsed         == that.AmbulanceUsed
         and ClaimID               == that.ClaimID
         and Description           == that.Description
         and DetailedInjuryType    == that.DetailedInjuryType
         and DisabledDueToAccident == that.DisabledDueToAccident
         and driverID              == that.driverID
         and GeneralInjuryType     == that.GeneralInjuryType
         and injuredID             == that.injuredID
         and LocationAddressID     == that.LocationAddressID
         and LossDesc              == that.LossDesc
         and LossOccured           == that.LossOccured
         and LossofUse             == that.LossofUse
         and MedicalTreatmentType  == that.MedicalTreatmentType
         and PropertyDesc          == that.PropertyDesc
         and PublicID              == that.PublicID
         and Severity              == that.Severity
         and VehicleID             == that.VehicleID
    }
    return super.equals(that)
  }

  /**
   * Returns the hash code of this object.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function hashCode() : int {
    return {
      AmbulanceUsed,
      ClaimID,
      Description,
      DetailedInjuryType,
      DisabledDueToAccident,
      driverID,
      GeneralInjuryType,
      injuredID,
      LocationAddressID,
      LossDesc,
      LossOccured,
      LossofUse,
      MedicalTreatmentType,
      PropertyDesc,
      PublicID,
      Severity,
      VehicleID
    }.reduce(17, \ hashCode, obj -> 31 * hashCode + obj?.hashCode())
  }

  /**
   * Provides a rough idea of the command needed to re-create this DTO. Because it is rough it is probably only  useful for debugging purposes.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function toString() : String {
    var fields = {} as List<String>

    if (AmbulanceUsed          != null  ) fields.add(':AmbulanceUsed         = ' + AmbulanceUsed)
    if (ClaimID              .HasContent) fields.add(':ClaimID               = ' + StringUtil.enquote(ClaimID))
    if (CreateTime             != null  ) fields.add(':CreateTime            = ' + StringUtil.enquote(CreateTime.toString()) + ' as Date')
    if (CreateUserID         .HasContent) fields.add(':CreateUserID          = ' + StringUtil.enquote(CreateUserID))
    if (Description          .HasContent) fields.add(':Description           = ' + StringUtil.enquote(Description))
    if (DetailedInjuryType     != null  ) fields.add(':DetailedInjuryType    = DetailedInjuryType.get("' + DetailedInjuryType.Code + '")')
    if (DisabledDueToAccident  != null  ) fields.add(':DisabledDueToAccident = DisabledDueToAccident.get("' + DisabledDueToAccident.Code + '")')
    if (driverID             .HasContent) fields.add(':driverID              = ' + StringUtil.enquote(driverID))
    if (ExposureIDs            != null  ) fields.add(':ExposureIDs           = ' + ExposureIDs)
    if (GeneralInjuryType      != null  ) fields.add(':GeneralInjuryType     = InjuryType.get("' + GeneralInjuryType.Code + '")')
    if (injuredID            .HasContent) fields.add(':injuredID             = ' + StringUtil.enquote(injuredID))
    if (LocationAddressID    .HasContent) fields.add(':LocationAddressID     = ' + StringUtil.enquote(LocationAddressID))
    if (LossDesc             .HasContent) fields.add(':LossDesc              = ' + StringUtil.enquote(LossDesc))
    if (LossOccured            != null  ) fields.add(':LossOccured           = LossOccured.get("' + LossOccured.Code + '")')
    if (LossofUse              != null  ) fields.add(':LossofUse             = ' + LossofUse)
    if (MedicalTreatmentType   != null  ) fields.add(':MedicalTreatmentType  = MedicalTreatmentType.get("' + MedicalTreatmentType.Code + '")')
    if (NewExposures           != null  ) fields.add(':NewExposures          = ' + NewExposures)
    if (PropertyDesc         .HasContent) fields.add(':PropertyDesc          = ' + StringUtil.enquote(PropertyDesc))
    if (PublicID             .HasContent) fields.add(':PublicID              = ' + StringUtil.enquote(PublicID))
    if (Severity               != null  ) fields.add(':Severity              = SeverityType.get("' + Severity.Code + '")')
    if (Subtype                != null  ) fields.add(':Subtype               = typekey.Incident.get("' + Subtype.Code + '")')
    if (TypeofPropertyIDs      != null  ) fields.add(':TypeofPropertyIDs     = ' + TypeofPropertyIDs)
    if (UpdateTime             != null  ) fields.add(':UpdateTime            = ' + StringUtil.enquote(UpdateTime.toString()) + ' as Date')
    if (UpdateUserID         .HasContent) fields.add(':UpdateUserID          = ' + StringUtil.enquote(UpdateUserID))
    if (VehicleID            .HasContent) fields.add(':VehicleID             = ' + StringUtil.enquote(VehicleID))

    return "new IncidentDTO() {\n  " + fields.join(",\n  ") + "\n}"
  }

  /**
   * return a new IncidentDTO that represents the current state of the supplied Incident.
   * @param that The Incident to be represented.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  static function valueOf(that : Incident) : IncidentDTO {
    return new IncidentDTO().readFrom(that)
  }

  /**
   * Returns all of the Incident instances whose public IDs are in the supplied list, or an empty array if the supplied list is null or empty.
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
   * Returns the Incident whose public ID is in the supplied list, or null if the publicID is null.
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