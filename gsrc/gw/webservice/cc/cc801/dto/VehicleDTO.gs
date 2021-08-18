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
 * A(n) {@link VehicleDTO} is a DTO that represents an instance of {@link entity.Vehicle} for use by certain WS-I Web Services in the base product. This file is composed of basic getters and setters, plus members that make it easier for server-side code to work with DTOs, like virtual getters that query for entities by PublidID, and methods to copy fields to or from an instance of {@link entity.Vehicle}.
 * <p>None of these methods constrain how an instance of VehicleDTO is created, initialized or used (beyond the normal Gosu type checking): this is consistent with the <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO Design Pattern</a>, which states that "DTOs are simple objects that should not contain any business logic that would require testing". Validation logic that considers whether a DTO field can have a <i>particular</i> value (based on things like effective dates, jurisdictions, line of business, user permissions, the values of other fields, etc.) should not be handled here, but rather by the API that manipulates the VehicleDTO.
 * <p>Please read the documentation in the accelerator before reusing this class in any additional WS-I Web Services.</p>
 * <p>Fields are mapped according to the following rules:
 * <ul><li>Primitive values are copied directly</li><li>Typekey fields are copied directly (the WS-I layer translates them to/from WS-I enums)</li><li>Foreign keys fields are represented by the target object's PublicID</li><li>Arraykey fields are represented by an array of the PublicIDs of the elements in the array</li></ul></p>
 * <p>The specific mappings for {@link VehicleDTO} are as follows:
 * <table border="1"><tr><th>Field</th><th>Maps to</th></tr><tr><td>CreateTime</td><td>Vehicle.CreateTime</td></tr><tr><td>CreateUserID</td><td>Vehicle.CreateUser.PublicID</td></tr><tr><td>LicensePlate</td><td>Vehicle.LicensePlate</td></tr><tr><td>Make</td><td>Vehicle.Make</td></tr><tr><td>Manufacturer</td><td>Vehicle.Manufacturer</td></tr><tr><td>Model</td><td>Vehicle.Model</td></tr><tr><td>PublicID</td><td>Vehicle.PublicID</td></tr><tr><td>State</td><td>Vehicle.State</td></tr><tr><td>UpdateTime</td><td>Vehicle.UpdateTime</td></tr><tr><td>UpdateUserID</td><td>Vehicle.UpdateUser.PublicID</td></tr><tr><td>Vin</td><td>Vehicle.Vin</td></tr><tr><td>Year</td><td>Vehicle.Year</td></tr></table></p>
 * <br/>This file was generated using the following property definitions:<br/><pre>Vehicle#LicensePlate, // String<br/>Vehicle#Make,         // String<br/>Vehicle#Manufacturer, // typekey.VehicleManufacturer<br/>Vehicle#Model,        // String<br/>Vehicle#State,        // typekey.Jurisdiction<br/>Vehicle#Vin,          // String<br/>Vehicle#Year          // Integer</pre>
 */
@Export
@WsiExportable("http://guidewire.com/cc/ws/gw/webservice/cc/cc801/dto/VehicleDTO")
@Generated("DTOBuilder", "DO NOT edit this class directly! See comments at the top of the file.", "2014-01-28T16:22Z")
final class VehicleDTO {
  var _createTime   : Date                as CreateTime
  /** Derived from Editable#CreateUser.PublicID */
  var _createUserID : String              as CreateUserID
  var _licensePlate : String              as LicensePlate
  var _make         : String              as Make
  var _manufacturer : VehicleManufacturer as Manufacturer
  var _model        : String              as Model
  var _publicID     : String              as PublicID
  var _state        : Jurisdiction        as State
  var _updateTime   : Date                as UpdateTime
  /** Derived from Editable#UpdateUser.PublicID */
  var _updateUserID : String              as UpdateUserID
  var _vin          : String              as Vin
  var _year         : Integer             as Year

  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  construct() { }

  /**
   * Copies the platform-managed fields from the supplied Vehicle
   * @param that The Vehicle to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  protected function _copyReadOnlyFieldsFrom(that : Vehicle) {
    // if field is on base class
      _createTime   = that.CreateTime
      _createUserID = that.CreateUser.PublicID
      _updateTime   = that.UpdateTime
      _updateUserID = that.UpdateUser.PublicID
    //
  }

  /**
   * Set the fields in this DTO using the supplied Vehicle
   * @param that The Vehicle to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function readFrom(that : Vehicle) : VehicleDTO {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      LicensePlate  = that.LicensePlate
      Make          = that.Make
      Manufacturer  = that.Manufacturer
      Model         = that.Model
      PublicID      = that.PublicID
      State         = that.State
      Vin           = that.Vin
      Year          = that.Year
    //
    return this
  }

  /**
   * Update the supplied Vehicle using the field values stored in this DTO
   * @param that The Vehicle to update.
   * @param (Optional) ignoreNullValues If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Vehicle, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeTo(that : Vehicle, ignoreNullValues = true) : Vehicle {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      if (LicensePlate != null or !ignoreNullValues) that.LicensePlate = LicensePlate
      if (Make         != null or !ignoreNullValues) that.Make         = Make
      if (Manufacturer != null or !ignoreNullValues) that.Manufacturer = Manufacturer
      if (Model        != null or !ignoreNullValues) that.Model        = Model
      if (PublicID     != null or !ignoreNullValues) that.PublicID     = PublicID
      if (State        != null or !ignoreNullValues) that.State        = State
      if (Vin          != null or !ignoreNullValues) that.Vin          = Vin
      if (Year         != null or !ignoreNullValues) that.Year         = Year
    //
    return that
  }

  /**
   * Uses the createNew block to create a new Vehicle, adds it to the supplied bundle, then updates it using the field values stored in this DTO. The ignoreNullValues parameter controls how the fields that are null are treated.
   * @param bundle The bundle in which to create the new Vehicle.
   * @param createNew (Optional) A block that returns a new instance of Vehicle. If this is null, the default constructor will be used.
   * @param ignoreNullValues (Optional) If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Vehicle, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeToNewEntityIn(bundle : Bundle, createNew : block() : Vehicle = null, ignoreNullValues = true) : Vehicle {
    var instance : Vehicle
    if (createNew == null) {
      instance = bundle == null
          ? new Vehicle()
          : new Vehicle(bundle)
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
  property get CreateUser() : User               { return fetchByID(CreateUserID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code UpdateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get UpdateUser() : User               { return fetchByID(UpdateUserID) }

  /**
   * Returns whether the fields tracked by this DTO match the same fields in the other DTO
   * @param that The VehicleDTO to compare against.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function equals(that : Object) : boolean {
    if (that typeis VehicleDTO) {
      return LicensePlate == that.LicensePlate
         and Make         == that.Make
         and Manufacturer == that.Manufacturer
         and Model        == that.Model
         and PublicID     == that.PublicID
         and State        == that.State
         and Vin          == that.Vin
         and Year         == that.Year
    }
    return super.equals(that)
  }

  /**
   * Returns the hash code of this object.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function hashCode() : int {
    return {
      LicensePlate,
      Make,
      Manufacturer,
      Model,
      PublicID,
      State,
      Vin,
      Year
    }.reduce(17, \ hashCode, obj -> 31 * hashCode + obj?.hashCode())
  }

  /**
   * Provides a rough idea of the command needed to re-create this DTO. Because it is rough it is probably only  useful for debugging purposes.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function toString() : String {
    var fields = {} as List<String>

    if (CreateTime    != null  ) fields.add(':CreateTime   = ' + StringUtil.enquote(CreateTime.toString()) + ' as Date')
    if (CreateUserID.HasContent) fields.add(':CreateUserID = ' + StringUtil.enquote(CreateUserID))
    if (LicensePlate.HasContent) fields.add(':LicensePlate = ' + StringUtil.enquote(LicensePlate))
    if (Make        .HasContent) fields.add(':Make         = ' + StringUtil.enquote(Make))
    if (Manufacturer  != null  ) fields.add(':Manufacturer = VehicleManufacturer.get("' + Manufacturer.Code + '")')
    if (Model       .HasContent) fields.add(':Model        = ' + StringUtil.enquote(Model))
    if (PublicID    .HasContent) fields.add(':PublicID     = ' + StringUtil.enquote(PublicID))
    if (State         != null  ) fields.add(':State        = Jurisdiction.get("' + State.Code + '")')
    if (UpdateTime    != null  ) fields.add(':UpdateTime   = ' + StringUtil.enquote(UpdateTime.toString()) + ' as Date')
    if (UpdateUserID.HasContent) fields.add(':UpdateUserID = ' + StringUtil.enquote(UpdateUserID))
    if (Vin         .HasContent) fields.add(':Vin          = ' + StringUtil.enquote(Vin))
    if (Year          != null  ) fields.add(':Year         = ' + Year)

    return "new VehicleDTO() {\n  " + fields.join(",\n  ") + "\n}"
  }

  /**
   * return a new VehicleDTO that represents the current state of the supplied Vehicle.
   * @param that The Vehicle to be represented.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  static function valueOf(that : Vehicle) : VehicleDTO {
    return new VehicleDTO().readFrom(that)
  }

  /**
   * Returns the Vehicle whose public ID is in the supplied list, or null if the publicID is null.
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