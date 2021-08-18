package gw.webservice.cc.cc801.dto

uses gw.api.database.Query
uses gw.api.util.StringUtil
uses gw.api.webservice.exception.BadIdentifierException
uses gw.pl.persistence.core.Bundle
uses gw.xml.ws.annotation.WsiExportable
uses java.lang.Integer
uses java.lang.Long
uses java.util.Date
uses javax.annotation.Generated

/**
 * <p style="border: 1px solid black; padding: 10px">This Data Transfer Object ("DTO") class is used to generate a WSDL to serialize and deserialize information across the network. Any change to the public properties of this DTO class will change the WSDL, thus breaking any existing clients. So once the corresponding WSDL is in use this DTO should only be changed with extreme caution, as it will require existing clients to be rebuilt and redeployed.<br/><br/>
DTOs which are a simple mapping from the domain model may be auto-generated using the "WSI DTO Generator", available from the customer portal. This generator can significantly speed up initial coding of such DTOs. Always remember, however, that DTOs are a network interface and a simple mapping from the domain model may not provide the best results. Remember too that once a DTO has been used in a deployed WSDL, re-running the generator may break existing clients (see above). Please read the documentation in the accelerator for guidance.</p><br/>
 * A(n) {@link AddressDTO} is a DTO that represents an instance of {@link entity.Address} for use by certain WS-I Web Services in the base product. This file is composed of basic getters and setters, plus members that make it easier for server-side code to work with DTOs, like virtual getters that query for entities by PublidID, and methods to copy fields to or from an instance of {@link entity.Address}.
 * <p>None of these methods constrain how an instance of AddressDTO is created, initialized or used (beyond the normal Gosu type checking): this is consistent with the <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO Design Pattern</a>, which states that "DTOs are simple objects that should not contain any business logic that would require testing". Validation logic that considers whether a DTO field can have a <i>particular</i> value (based on things like effective dates, jurisdictions, line of business, user permissions, the values of other fields, etc.) should not be handled here, but rather by the API that manipulates the AddressDTO.
 * <p>Please read the documentation in the accelerator before reusing this class in any additional WS-I Web Services.</p>
 * <p>Fields are mapped according to the following rules:
 * <ul><li>Primitive values are copied directly</li><li>Typekey fields are copied directly (the WS-I layer translates them to/from WS-I enums)</li><li>Foreign keys fields are represented by the target object's PublicID</li><li>Arraykey fields are represented by an array of the PublicIDs of the elements in the array</li></ul></p>
 * <p>The specific mappings for {@link AddressDTO} are as follows:
 * <table border="1"><tr><th>Field</th><th>Maps to</th></tr><tr><td>AddressBookUID</td><td>Address.AddressBookUID</td></tr><tr><td>AddressLine1</td><td>Address.AddressLine1</td></tr><tr><td>AddressLine1Kanji</td><td>Address.AddressLine1Kanji</td></tr><tr><td>AddressLine2</td><td>Address.AddressLine2</td></tr><tr><td>AddressLine2Kanji</td><td>Address.AddressLine2Kanji</td></tr><tr><td>AddressLine3</td><td>Address.AddressLine3</td></tr><tr><td>AddressType</td><td>Address.AddressType</td></tr><tr><td>BatchGeocode</td><td>Address.BatchGeocode</td></tr><tr><td>BeanVersion</td><td>Address.BeanVersion</td></tr><tr><td>CEDEX</td><td>Address.CEDEX</td></tr><tr><td>CEDEXBureau</td><td>Address.CEDEXBureau</td></tr><tr><td>City</td><td>Address.City</td></tr><tr><td>CityKanji</td><td>Address.CityKanji</td></tr><tr><td>CityStateZip</td><td>Address.CityStateZip</td></tr><tr><td>Country</td><td>Address.Country</td></tr><tr><td>County</td><td>Address.County</td></tr><tr><td>CreateTime</td><td>Address.CreateTime</td></tr><tr><td>CreateUserID</td><td>Address.CreateUser.PublicID</td></tr><tr><td>Description</td><td>Address.Description</td></tr><tr><td>FailureGeocoding</td><td>Address.FailureGeocoding</td></tr><tr><td>GeocodeStatus</td><td>Address.GeocodeStatus</td></tr><tr><td>Latitude</td><td>Address.Latitude</td></tr><tr><td>LoadCommandID</td><td>Address.LoadCommandID</td></tr><tr><td>Longitude</td><td>Address.Longitude</td></tr><tr><td>NeverGeocoded</td><td>Address.NeverGeocoded</td></tr><tr><td>PostalCode</td><td>Address.PostalCode</td></tr><tr><td>PublicID</td><td>Address.PublicID</td></tr><tr><td>State</td><td>Address.State</td></tr><tr><td>SuccessfullyGeocoded</td><td>Address.SuccessfullyGeocoded</td></tr><tr><td>UpdateTime</td><td>Address.UpdateTime</td></tr><tr><td>UpdateUserID</td><td>Address.UpdateUser.PublicID</td></tr><tr><td>ValidUntil</td><td>Address.ValidUntil</td></tr></table></p>
 * <br/>This file was generated using the following property definitions:<br/><pre>Address#AddressBookUID,       // String<br/>Address#AddressLine1,         // String<br/>Address#AddressLine1Kanji,    // String<br/>Address#AddressLine2,         // String<br/>Address#AddressLine2Kanji,    // String<br/>Address#AddressLine3,         // String<br/>Address#AddressType,          // typekey.AddressType<br/>Address#BatchGeocode,         // Boolean<br/>Address#BeanVersion,          // Integer<br/>Address#CEDEX,                // Boolean<br/>Address#CEDEXBureau,          // String<br/>Address#City,                 // String<br/>Address#CityKanji,            // String<br/>Address#CityStateZip,         // String<br/>Address#Country,              // typekey.Country<br/>Address#County,               // String<br/>Address#Description,          // String<br/>Address#FailureGeocoding,     // boolean<br/>Address#GeocodeStatus,        // typekey.GeocodeStatus<br/>Address#Latitude,             // java.math.BigDecimal<br/>Address#LoadCommandID,        // Long<br/>Address#Longitude,            // java.math.BigDecimal<br/>Address#NeverGeocoded,        // boolean<br/>Address#PostalCode,           // String<br/>Address#State,                // typekey.State<br/>Address#SuccessfullyGeocoded, // boolean<br/>Address#ValidUntil            // java.util.Date</pre>
 */
@Export
@WsiExportable("http://guidewire.com/cc/ws/gw/webservice/cc/cc801/dto/AddressDTO")
@Generated("DTOBuilder", "DO NOT edit this class directly! See comments at the top of the file.", "2014-01-28T16:22Z")
final class AddressDTO {
  var _addressBookUID       : String               as AddressBookUID
  var _addressLine1         : String               as AddressLine1
  var _addressLine1Kanji    : String               as AddressLine1Kanji
  var _addressLine2         : String               as AddressLine2
  var _addressLine2Kanji    : String               as AddressLine2Kanji
  var _addressLine3         : String               as AddressLine3
  var _addressType          : AddressType          as AddressType
  var _batchGeocode         : Boolean              as BatchGeocode
  var _beanVersion          : Integer              as BeanVersion
  var _CEDEX                : Boolean              as CEDEX
  var _cEDEXBureau          : String               as CEDEXBureau
  var _city                 : String               as City
  var _cityKanji            : String               as CityKanji
  var _cityStateZip         : String               as CityStateZip
  var _country              : Country              as Country
  var _county               : String               as County
  var _createTime           : Date                 as CreateTime
  /** Derived from Editable#CreateUser.PublicID */
  var _createUserID         : String               as CreateUserID
  var _description          : String               as Description
  var _failureGeocoding     : boolean              as FailureGeocoding
  var _geocodeStatus        : GeocodeStatus        as GeocodeStatus
  var _latitude             : java.math.BigDecimal as Latitude
  var _loadCommandID        : Long                 as LoadCommandID
  var _longitude            : java.math.BigDecimal as Longitude
  var _neverGeocoded        : boolean              as NeverGeocoded
  var _postalCode           : String               as PostalCode
  var _publicID             : String               as PublicID
  var _state                : State                as State
  var _successfullyGeocoded : boolean              as SuccessfullyGeocoded
  var _updateTime           : Date                 as UpdateTime
  /** Derived from Editable#UpdateUser.PublicID */
  var _updateUserID         : String               as UpdateUserID
  var _validUntil           : Date                 as ValidUntil

  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  construct() { }

  /**
   * Copies the platform-managed fields from the supplied Address
   * @param that The Address to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  protected function _copyReadOnlyFieldsFrom(that : Address) {
    // if field is on base class
      _beanVersion          = that.BeanVersion
      _cityStateZip         = that.CityStateZip
      _createTime           = that.CreateTime
      _createUserID         = that.CreateUser.PublicID
      _failureGeocoding     = that.FailureGeocoding
      _latitude             = that.Latitude
      _loadCommandID        = that.LoadCommandID
      _longitude            = that.Longitude
      _neverGeocoded        = that.NeverGeocoded
      _successfullyGeocoded = that.SuccessfullyGeocoded
      _updateTime           = that.UpdateTime
      _updateUserID         = that.UpdateUser.PublicID
    //
  }

  /**
   * Set the fields in this DTO using the supplied Address
   * @param that The Address to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function readFrom(that : Address) : AddressDTO {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      AddressBookUID        = that.AddressBookUID
      AddressLine1          = that.AddressLine1
      AddressLine1Kanji     = that.AddressLine1Kanji
      AddressLine2          = that.AddressLine2
      AddressLine2Kanji     = that.AddressLine2Kanji
      AddressLine3          = that.AddressLine3
      AddressType           = that.AddressType
      BatchGeocode          = that.BatchGeocode
      CEDEX                 = that.CEDEX
      CEDEXBureau           = that.CEDEXBureau
      City                  = that.City
      CityKanji             = that.CityKanji
      Country               = that.Country
      County                = that.County
      Description           = that.Description
      GeocodeStatus         = that.GeocodeStatus
      PostalCode            = that.PostalCode
      PublicID              = that.PublicID
      State                 = that.State
      ValidUntil            = that.ValidUntil
    //
    return this
  }

  /**
   * Update the supplied Address using the field values stored in this DTO
   * @param that The Address to update.
   * @param (Optional) ignoreNullValues If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Address, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeTo(that : Address, ignoreNullValues = true) : Address {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      if (AddressBookUID       != null or !ignoreNullValues) that.AddressBookUID       = AddressBookUID
      if (AddressLine1         != null or !ignoreNullValues) that.AddressLine1         = AddressLine1
      if (AddressLine1Kanji    != null or !ignoreNullValues) that.AddressLine1Kanji    = AddressLine1Kanji
      if (AddressLine2         != null or !ignoreNullValues) that.AddressLine2         = AddressLine2
      if (AddressLine2Kanji    != null or !ignoreNullValues) that.AddressLine2Kanji    = AddressLine2Kanji
      if (AddressLine3         != null or !ignoreNullValues) that.AddressLine3         = AddressLine3
      if (AddressType          != null or !ignoreNullValues) that.AddressType          = AddressType
      if (BatchGeocode         != null or !ignoreNullValues) that.BatchGeocode         = BatchGeocode
      if (CEDEX                != null or !ignoreNullValues) that.CEDEX                = CEDEX
      if (CEDEXBureau          != null or !ignoreNullValues) that.CEDEXBureau          = CEDEXBureau
      if (City                 != null or !ignoreNullValues) that.City                 = City
      if (CityKanji            != null or !ignoreNullValues) that.CityKanji            = CityKanji
      if (Country              != null or !ignoreNullValues) that.Country              = Country
      if (County               != null or !ignoreNullValues) that.County               = County
      if (Description          != null or !ignoreNullValues) that.Description          = Description
      if (GeocodeStatus        != null or !ignoreNullValues) that.GeocodeStatus        = GeocodeStatus
      if (PostalCode           != null or !ignoreNullValues) that.PostalCode           = PostalCode
      if (PublicID             != null or !ignoreNullValues) that.PublicID             = PublicID
      if (State                != null or !ignoreNullValues) that.State                = State
      if (ValidUntil           != null or !ignoreNullValues) that.ValidUntil           = ValidUntil
    //
    return that
  }

  /**
   * Uses the createNew block to create a new Address, adds it to the supplied bundle, then updates it using the field values stored in this DTO. The ignoreNullValues parameter controls how the fields that are null are treated.
   * @param bundle The bundle in which to create the new Address.
   * @param createNew (Optional) A block that returns a new instance of Address. If this is null, the default constructor will be used.
   * @param ignoreNullValues (Optional) If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Address, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeToNewEntityIn(bundle : Bundle, createNew : block() : Address = null, ignoreNullValues = true) : Address {
    var instance : Address
    if (createNew == null) {
      instance = bundle == null
          ? new Address()
          : new Address(bundle)
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
  property get CreateUser()        : User                { return fetchByID(CreateUserID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code UpdateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get UpdateUser()        : User                { return fetchByID(UpdateUserID) }

  /**
   * Returns whether the fields tracked by this DTO match the same fields in the other DTO
   * @param that The AddressDTO to compare against.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function equals(that : Object) : boolean {
    if (that typeis AddressDTO) {
      return AddressBookUID       == that.AddressBookUID
         and AddressLine1         == that.AddressLine1
         and AddressLine1Kanji    == that.AddressLine1Kanji
         and AddressLine2         == that.AddressLine2
         and AddressLine2Kanji    == that.AddressLine2Kanji
         and AddressLine3         == that.AddressLine3
         and AddressType          == that.AddressType
         and BatchGeocode         == that.BatchGeocode
         and CEDEX                == that.CEDEX
         and CEDEXBureau          == that.CEDEXBureau
         and City                 == that.City
         and CityKanji            == that.CityKanji
         and Country              == that.Country
         and County               == that.County
         and Description          == that.Description
         and GeocodeStatus        == that.GeocodeStatus
         and PostalCode           == that.PostalCode
         and PublicID             == that.PublicID
         and State                == that.State
         and ValidUntil           == that.ValidUntil
    }
    return super.equals(that)
  }

  /**
   * Returns the hash code of this object.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function hashCode() : int {
    return {
      AddressBookUID,
      AddressLine1,
      AddressLine1Kanji,
      AddressLine2,
      AddressLine2Kanji,
      AddressLine3,
      AddressType,
      BatchGeocode,
      CEDEX,
      CEDEXBureau,
      City,
      CityKanji,
      Country,
      County,
      Description,
      GeocodeStatus,
      PostalCode,
      PublicID,
      State,
      ValidUntil
    }.reduce(17, \ hashCode, obj -> 31 * hashCode + obj?.hashCode())
  }

  /**
   * Provides a rough idea of the command needed to re-create this DTO. Because it is rough it is probably only  useful for debugging purposes.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function toString() : String {
    var fields = {} as List<String>

    if (AddressBookUID      .HasContent) fields.add(':AddressBookUID       = ' + StringUtil.enquote(AddressBookUID))
    if (AddressLine1        .HasContent) fields.add(':AddressLine1         = ' + StringUtil.enquote(AddressLine1))
    if (AddressLine1Kanji   .HasContent) fields.add(':AddressLine1Kanji    = ' + StringUtil.enquote(AddressLine1Kanji))
    if (AddressLine2        .HasContent) fields.add(':AddressLine2         = ' + StringUtil.enquote(AddressLine2))
    if (AddressLine2Kanji   .HasContent) fields.add(':AddressLine2Kanji    = ' + StringUtil.enquote(AddressLine2Kanji))
    if (AddressLine3        .HasContent) fields.add(':AddressLine3         = ' + StringUtil.enquote(AddressLine3))
    if (AddressType           != null  ) fields.add(':AddressType          = AddressType.get("' + AddressType.Code + '")')
    if (BatchGeocode          != null  ) fields.add(':BatchGeocode         = ' + BatchGeocode)
    if (BeanVersion           != null  ) fields.add(':BeanVersion          = ' + BeanVersion)
    if (CEDEX                 != null  ) fields.add(':CEDEX                = ' + CEDEX)
    if (CEDEXBureau         .HasContent) fields.add(':CEDEXBureau          = ' + StringUtil.enquote(CEDEXBureau))
    if (City                .HasContent) fields.add(':City                 = ' + StringUtil.enquote(City))
    if (CityKanji           .HasContent) fields.add(':CityKanji            = ' + StringUtil.enquote(CityKanji))
    if (CityStateZip        .HasContent) fields.add(':CityStateZip         = ' + StringUtil.enquote(CityStateZip))
    if (Country               != null  ) fields.add(':Country              = Country.get("' + Country.Code + '")')
    if (County              .HasContent) fields.add(':County               = ' + StringUtil.enquote(County))
    if (CreateTime            != null  ) fields.add(':CreateTime           = ' + StringUtil.enquote(CreateTime.toString()) + ' as Date')
    if (CreateUserID        .HasContent) fields.add(':CreateUserID         = ' + StringUtil.enquote(CreateUserID))
    if (Description         .HasContent) fields.add(':Description          = ' + StringUtil.enquote(Description))
    if (FailureGeocoding      == true  ) fields.add(':FailureGeocoding     = true')
    if (GeocodeStatus         != null  ) fields.add(':GeocodeStatus        = GeocodeStatus.get("' + GeocodeStatus.Code + '")')
    if (Latitude              != null  ) fields.add(':Latitude             = ' + Latitude)
    if (LoadCommandID         != null  ) fields.add(':LoadCommandID        = ' + LoadCommandID)
    if (Longitude             != null  ) fields.add(':Longitude            = ' + Longitude)
    if (NeverGeocoded         == true  ) fields.add(':NeverGeocoded        = true')
    if (PostalCode          .HasContent) fields.add(':PostalCode           = ' + StringUtil.enquote(PostalCode))
    if (PublicID            .HasContent) fields.add(':PublicID             = ' + StringUtil.enquote(PublicID))
    if (State                 != null  ) fields.add(':State                = State.get("' + State.Code + '")')
    if (SuccessfullyGeocoded  == true  ) fields.add(':SuccessfullyGeocoded = true')
    if (UpdateTime            != null  ) fields.add(':UpdateTime           = ' + StringUtil.enquote(UpdateTime.toString()) + ' as Date')
    if (UpdateUserID        .HasContent) fields.add(':UpdateUserID         = ' + StringUtil.enquote(UpdateUserID))
    if (ValidUntil            != null  ) fields.add(':ValidUntil           = ' + StringUtil.enquote(ValidUntil.toString()) + ' as Date')

    return "new AddressDTO() {\n  " + fields.join(",\n  ") + "\n}"
  }

  /**
   * return a new AddressDTO that represents the current state of the supplied Address.
   * @param that The Address to be represented.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  static function valueOf(that : Address) : AddressDTO {
    return new AddressDTO().readFrom(that)
  }

  /**
   * Returns the Address whose public ID is in the supplied list, or null if the publicID is null.
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