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
 * A(n) {@link PolicyDTO} is a DTO that represents an instance of {@link entity.Policy} for use by certain WS-I Web Services in the base product. This file is composed of basic getters and setters, plus members that make it easier for server-side code to work with DTOs, like virtual getters that query for entities by PublidID, and methods to copy fields to or from an instance of {@link entity.Policy}.
 * <p>None of these methods constrain how an instance of PolicyDTO is created, initialized or used (beyond the normal Gosu type checking): this is consistent with the <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO Design Pattern</a>, which states that "DTOs are simple objects that should not contain any business logic that would require testing". Validation logic that considers whether a DTO field can have a <i>particular</i> value (based on things like effective dates, jurisdictions, line of business, user permissions, the values of other fields, etc.) should not be handled here, but rather by the API that manipulates the PolicyDTO.
 * <p>Please read the documentation in the accelerator before reusing this class in any additional WS-I Web Services.</p>
 * <p>Fields are mapped according to the following rules:
 * <ul><li>Primitive values are copied directly</li><li>Typekey fields are copied directly (the WS-I layer translates them to/from WS-I enums)</li><li>Foreign keys fields are represented by the target object's PublicID</li><li>Arraykey fields are represented by an array of the PublicIDs of the elements in the array</li></ul></p>
 * <p>The specific mappings for {@link PolicyDTO} are as follows:
 * <table border="1"><tr><th>Field</th><th>Maps to</th></tr><tr><td>CreateTime</td><td>Policy.CreateTime</td></tr><tr><td>CreateUserID</td><td>Policy.CreateUser.PublicID</td></tr><tr><td>Currency</td><td>Policy.Currency</td></tr><tr><td>EffectiveDate</td><td>Policy.EffectiveDate</td></tr><tr><td>ExpirationDate</td><td>Policy.ExpirationDate</td></tr><tr><td>PolicyNumber</td><td>Policy.PolicyNumber</td></tr><tr><td>PolicyType</td><td>Policy.PolicyType</td></tr><tr><td>ProducerCode</td><td>Policy.ProducerCode</td></tr><tr><td>PublicID</td><td>Policy.PublicID</td></tr><tr><td>Status</td><td>Policy.Status</td></tr><tr><td>TotalVehicles</td><td>Policy.TotalVehicles</td></tr><tr><td>UpdateTime</td><td>Policy.UpdateTime</td></tr><tr><td>UpdateUserID</td><td>Policy.UpdateUser.PublicID</td></tr><tr><td>VehicleIDs</td><td>Policy.Vehicles*.PublicID</td></tr><tr><td>Verified</td><td>Policy.Verified</td></tr></table></p>
 * <br/>This file was generated using the following property definitions:<br/><pre>Policy#Currency,       // typekey.Currency<br/>Policy#EffectiveDate,  // java.util.Date<br/>Policy#ExpirationDate, // java.util.Date<br/>Policy#PolicyNumber,   // String<br/>Policy#PolicyType,     // typekey.PolicyType<br/>Policy#ProducerCode,   // String<br/>Policy#Status,         // typekey.PolicyStatus<br/>Policy#TotalVehicles,  // Integer<br/>Policy#Vehicles,       // VehicleRU[]<br/>Policy#Verified        // Boolean</pre>
 */
@Export
@WsiExportable("http://guidewire.com/cc/ws/gw/webservice/cc/cc801/dto/PolicyDTO")
@Generated("DTOBuilder", "DO NOT edit this class directly! See comments at the top of the file.", "2014-01-28T16:22Z")
final class PolicyDTO {
  var _createTime     : Date         as CreateTime
  /** Derived from Editable#CreateUser.PublicID */
  var _createUserID   : String       as CreateUserID
  var _currency       : Currency     as Currency
  var _effectiveDate  : Date         as EffectiveDate
  var _expirationDate : Date         as ExpirationDate
  var _policyNumber   : String       as PolicyNumber
  var _policyType     : PolicyType   as PolicyType
  var _producerCode   : String       as ProducerCode
  var _publicID       : String       as PublicID
  var _status         : PolicyStatus as Status
  var _totalVehicles  : Integer      as TotalVehicles
  var _updateTime     : Date         as UpdateTime
  /** Derived from Editable#UpdateUser.PublicID */
  var _updateUserID   : String       as UpdateUserID
  /** Derived from Policy#Vehicles*.PublicID */
  var _vehicleIDs     : String[]     as VehicleIDs = {}
  var _verified       : Boolean      as Verified

  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  construct() { }

  /**
   * Copies the platform-managed fields from the supplied Policy
   * @param that The Policy to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  protected function _copyReadOnlyFieldsFrom(that : Policy) {
    // if field is on base class
      _createTime     = that.CreateTime
      _createUserID   = that.CreateUser.PublicID
      _updateTime     = that.UpdateTime
      _updateUserID   = that.UpdateUser.PublicID
      _vehicleIDs     = that.Vehicles*.PublicID
    //
  }

  /**
   * Set the fields in this DTO using the supplied Policy
   * @param that The Policy to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function readFrom(that : Policy) : PolicyDTO {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      Currency        = that.Currency
      EffectiveDate   = that.EffectiveDate
      ExpirationDate  = that.ExpirationDate
      PolicyNumber    = that.PolicyNumber
      PolicyType      = that.PolicyType
      ProducerCode    = that.ProducerCode
      PublicID        = that.PublicID
      Status          = that.Status
      TotalVehicles   = that.TotalVehicles
      Verified        = that.Verified
    //
    return this
  }

  /**
   * Update the supplied Policy using the field values stored in this DTO
   * @param that The Policy to update.
   * @param (Optional) ignoreNullValues If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Policy, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeTo(that : Policy, ignoreNullValues = true) : Policy {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      if (Currency       != null or !ignoreNullValues) that.Currency       = Currency
      if (EffectiveDate  != null or !ignoreNullValues) that.EffectiveDate  = EffectiveDate
      if (ExpirationDate != null or !ignoreNullValues) that.ExpirationDate = ExpirationDate
      if (PolicyNumber   != null or !ignoreNullValues) that.PolicyNumber   = PolicyNumber
      if (PolicyType     != null or !ignoreNullValues) that.PolicyType     = PolicyType
      if (ProducerCode   != null or !ignoreNullValues) that.ProducerCode   = ProducerCode
      if (PublicID       != null or !ignoreNullValues) that.PublicID       = PublicID
      if (Status         != null or !ignoreNullValues) that.Status         = Status
      if (TotalVehicles  != null or !ignoreNullValues) that.TotalVehicles  = TotalVehicles
      if (Verified       != null or !ignoreNullValues) that.Verified       = Verified
    //
    return that
  }

  /**
   * Uses the createNew block to create a new Policy, adds it to the supplied bundle, then updates it using the field values stored in this DTO. The ignoreNullValues parameter controls how the fields that are null are treated.
   * @param bundle The bundle in which to create the new Policy.
   * @param createNew (Optional) A block that returns a new instance of Policy. If this is null, the default constructor will be used.
   * @param ignoreNullValues (Optional) If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Policy, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeToNewEntityIn(bundle : Bundle, createNew : block() : Policy = null, ignoreNullValues = true) : Policy {
    var instance : Policy
    if (createNew == null) {
      instance = bundle == null
          ? new Policy()
          : new Policy(bundle)
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
  property get CreateUser()  : User        { return fetchByID(CreateUserID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code UpdateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get UpdateUser()  : User        { return fetchByID(UpdateUserID) }
  
  /** Convenience property that returns a {@link VehicleRU[]} of the objects whose PublicIDs are in {@code VehicleIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Vehicles()    : VehicleRU[] { return fetchByID(VehicleIDs) }

  /**
   * Returns whether the fields tracked by this DTO match the same fields in the other DTO
   * @param that The PolicyDTO to compare against.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function equals(that : Object) : boolean {
    if (that typeis PolicyDTO) {
      return Currency       == that.Currency
         and EffectiveDate  == that.EffectiveDate
         and ExpirationDate == that.ExpirationDate
         and PolicyNumber   == that.PolicyNumber
         and PolicyType     == that.PolicyType
         and ProducerCode   == that.ProducerCode
         and PublicID       == that.PublicID
         and Status         == that.Status
         and TotalVehicles  == that.TotalVehicles
         and Verified       == that.Verified
    }
    return super.equals(that)
  }

  /**
   * Returns the hash code of this object.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function hashCode() : int {
    return {
      Currency,
      EffectiveDate,
      ExpirationDate,
      PolicyNumber,
      PolicyType,
      ProducerCode,
      PublicID,
      Status,
      TotalVehicles,
      Verified
    }.reduce(17, \ hashCode, obj -> 31 * hashCode + obj?.hashCode())
  }

  /**
   * Provides a rough idea of the command needed to re-create this DTO. Because it is rough it is probably only  useful for debugging purposes.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function toString() : String {
    var fields = {} as List<String>

    if (CreateTime      != null  ) fields.add(':CreateTime     = ' + StringUtil.enquote(CreateTime.toString()) + ' as Date')
    if (CreateUserID  .HasContent) fields.add(':CreateUserID   = ' + StringUtil.enquote(CreateUserID))
    if (Currency        != null  ) fields.add(':Currency       = Currency.get("' + Currency.Code + '")')
    if (EffectiveDate   != null  ) fields.add(':EffectiveDate  = ' + StringUtil.enquote(EffectiveDate.toString()) + ' as Date')
    if (ExpirationDate  != null  ) fields.add(':ExpirationDate = ' + StringUtil.enquote(ExpirationDate.toString()) + ' as Date')
    if (PolicyNumber  .HasContent) fields.add(':PolicyNumber   = ' + StringUtil.enquote(PolicyNumber))
    if (PolicyType      != null  ) fields.add(':PolicyType     = PolicyType.get("' + PolicyType.Code + '")')
    if (ProducerCode  .HasContent) fields.add(':ProducerCode   = ' + StringUtil.enquote(ProducerCode))
    if (PublicID      .HasContent) fields.add(':PublicID       = ' + StringUtil.enquote(PublicID))
    if (Status          != null  ) fields.add(':Status         = PolicyStatus.get("' + Status.Code + '")')
    if (TotalVehicles   != null  ) fields.add(':TotalVehicles  = ' + TotalVehicles)
    if (UpdateTime      != null  ) fields.add(':UpdateTime     = ' + StringUtil.enquote(UpdateTime.toString()) + ' as Date')
    if (UpdateUserID  .HasContent) fields.add(':UpdateUserID   = ' + StringUtil.enquote(UpdateUserID))
    if (VehicleIDs      != null  ) fields.add(':VehicleIDs     = ' + VehicleIDs)
    if (Verified        != null  ) fields.add(':Verified       = ' + Verified)

    return "new PolicyDTO() {\n  " + fields.join(",\n  ") + "\n}"
  }

  /**
   * return a new PolicyDTO that represents the current state of the supplied Policy.
   * @param that The Policy to be represented.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  static function valueOf(that : Policy) : PolicyDTO {
    return new PolicyDTO().readFrom(that)
  }

  /**
   * Returns all of the Policy instances whose public IDs are in the supplied list, or an empty array if the supplied list is null or empty.
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
   * Returns the Policy whose public ID is in the supplied list, or null if the publicID is null.
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