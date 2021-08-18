package gw.webservice.cc.cc801.dto

uses gw.api.database.Query
uses gw.api.util.StringUtil
uses gw.api.webservice.exception.BadIdentifierException
uses gw.lang.reflect.ReflectUtil
uses gw.pl.persistence.core.Bundle
uses gw.xml.ws.annotation.WsiExportable
uses java.lang.IllegalArgumentException
uses java.util.Date
uses javax.annotation.Generated

/**
 * <p style="border: 1px solid black; padding: 10px">This Data Transfer Object ("DTO") class is used to generate a WSDL to serialize and deserialize information across the network. Any change to the public properties of this DTO class will change the WSDL, thus breaking any existing clients. So once the corresponding WSDL is in use this DTO should only be changed with extreme caution, as it will require existing clients to be rebuilt and redeployed.<br/><br/>
DTOs which are a simple mapping from the domain model may be auto-generated using the "WSI DTO Generator", available from the customer portal. This generator can significantly speed up initial coding of such DTOs. Always remember, however, that DTOs are a network interface and a simple mapping from the domain model may not provide the best results. Remember too that once a DTO has been used in a deployed WSDL, re-running the generator may break existing clients (see above). Please read the documentation in the accelerator for guidance.</p><br/>
 * A(n) {@link CoverageDTO} is a DTO that represents an instance of {@link entity.Coverage} for use by certain WS-I Web Services in the base product. This file is composed of basic getters and setters, plus members that make it easier for server-side code to work with DTOs, like virtual getters that query for entities by PublidID, and methods to copy fields to or from an instance of {@link entity.Coverage}.
 * <p>None of these methods constrain how an instance of CoverageDTO is created, initialized or used (beyond the normal Gosu type checking): this is consistent with the <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO Design Pattern</a>, which states that "DTOs are simple objects that should not contain any business logic that would require testing". Validation logic that considers whether a DTO field can have a <i>particular</i> value (based on things like effective dates, jurisdictions, line of business, user permissions, the values of other fields, etc.) should not be handled here, but rather by the API that manipulates the CoverageDTO.
 * <p>Please read the documentation in the accelerator before reusing this class in any additional WS-I Web Services.</p>
 * <p>Fields are mapped according to the following rules:
 * <ul><li>Primitive values are copied directly</li><li>Typekey fields are copied directly (the WS-I layer translates them to/from WS-I enums)</li><li>Foreign keys fields are represented by the target object's PublicID</li><li>Arraykey fields are represented by an array of the PublicIDs of the elements in the array</li></ul></p>
 * <p>The specific mappings for {@link CoverageDTO} are as follows:
 * <table border="1"><tr><th>Field</th><th>Maps to</th></tr><tr><td>CovTermIDs</td><td>Coverage.CovTerms*.PublicID</td></tr><tr><td>CreateTime</td><td>Coverage.CreateTime</td></tr><tr><td>CreateUserID</td><td>Coverage.CreateUser.PublicID</td></tr><tr><td>Deductible</td><td>Coverage.Deductible</td></tr><tr><td>EffectiveDate</td><td>Coverage.EffectiveDate</td></tr><tr><td>ExpirationDate</td><td>Coverage.ExpirationDate</td></tr><tr><td>ExposureLimit</td><td>Coverage.ExposureLimit</td></tr><tr><td>IncidentLimit</td><td>Coverage.IncidentLimit</td></tr><tr><td>PolicyID</td><td>Coverage.Policy.PublicID</td></tr><tr><td>PublicID</td><td>Coverage.PublicID</td></tr><tr><td>State</td><td>Coverage.State</td></tr><tr><td>Subtype</td><td>Coverage.Subtype</td></tr><tr><td>Type</td><td>Coverage.Type</td></tr><tr><td>UpdateTime</td><td>Coverage.UpdateTime</td></tr><tr><td>UpdateUserID</td><td>Coverage.UpdateUser.PublicID</td></tr></table></p>
 * <br/>This file was generated using the following property definitions:<br/><pre>Coverage#CovTerms,       // CovTerm[]<br/>Coverage#Deductible,     // gw.api.financials.CurrencyAmount<br/>Coverage#EffectiveDate,  // java.util.Date<br/>Coverage#ExpirationDate, // java.util.Date<br/>Coverage#ExposureLimit,  // gw.api.financials.CurrencyAmount<br/>Coverage#IncidentLimit,  // gw.api.financials.CurrencyAmount<br/>Coverage#Policy,         // Policy<br/>Coverage#State,          // typekey.State<br/>Coverage#Subtype,        // typekey.Coverage<br/>Coverage#Type            // typekey.CoverageType</pre>
 */
@Export
@WsiExportable("http://guidewire.com/cc/ws/gw/webservice/cc/cc801/dto/CoverageDTO")
@Generated("DTOBuilder", "DO NOT edit this class directly! See comments at the top of the file.", "2014-01-28T16:22Z")
final class CoverageDTO {
  /** Derived from Coverage#CovTerms*.PublicID */
  var _covTermIDs     : String[]                         as CovTermIDs = {}
  var _createTime     : Date                             as CreateTime
  /** Derived from Editable#CreateUser.PublicID */
  var _createUserID   : String                           as CreateUserID
  var _deductible     : gw.api.financials.CurrencyAmount as Deductible
  var _effectiveDate  : Date                             as EffectiveDate
  var _expirationDate : Date                             as ExpirationDate
  var _exposureLimit  : gw.api.financials.CurrencyAmount as ExposureLimit
  var _incidentLimit  : gw.api.financials.CurrencyAmount as IncidentLimit
  /** Derived from Coverage#Policy.PublicID */
  var _policyID       : String                           as PolicyID
  var _publicID       : String                           as PublicID
  var _state          : State                            as State
  var _subtype        : typekey.Coverage                 as Subtype
  var _type           : CoverageType                     as Type
  var _updateTime     : Date                             as UpdateTime
  /** Derived from Editable#UpdateUser.PublicID */
  var _updateUserID   : String                           as UpdateUserID

  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  construct() { }

  /**
   * Copies the platform-managed fields from the supplied Coverage
   * @param that The Coverage to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  protected function _copyReadOnlyFieldsFrom(that : Coverage) {
    // if field is on base class
      _covTermIDs     = that.CovTerms*.PublicID
      _createTime     = that.CreateTime
      _createUserID   = that.CreateUser.PublicID
      _subtype        = that.Subtype
      _updateTime     = that.UpdateTime
      _updateUserID   = that.UpdateUser.PublicID
    //
  }

  /**
   * Set the fields in this DTO using the supplied Coverage
   * @param that The Coverage to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function readFrom(that : Coverage) : CoverageDTO {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      Deductible      = that.Deductible
      EffectiveDate   = that.EffectiveDate
      ExpirationDate  = that.ExpirationDate
      ExposureLimit   = that.ExposureLimit
      IncidentLimit   = that.IncidentLimit
      PolicyID        = that.Policy.PublicID
      PublicID        = that.PublicID
      State           = that.State
      Type            = that.Type
    //
    return this
  }

  /**
   * Update the supplied Coverage using the field values stored in this DTO
   * @param that The Coverage to update.
   * @param (Optional) ignoreNullValues If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Coverage, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeTo(that : Coverage, ignoreNullValues = true) : Coverage {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      if (Deductible     != null or !ignoreNullValues) that.Deductible     = Deductible
      if (EffectiveDate  != null or !ignoreNullValues) that.EffectiveDate  = EffectiveDate
      if (ExpirationDate != null or !ignoreNullValues) that.ExpirationDate = ExpirationDate
      if (ExposureLimit  != null or !ignoreNullValues) that.ExposureLimit  = ExposureLimit
      if (IncidentLimit  != null or !ignoreNullValues) that.IncidentLimit  = IncidentLimit
      if (PolicyID       != null or !ignoreNullValues) that.Policy         = Policy
      if (PublicID       != null or !ignoreNullValues) that.PublicID       = PublicID
      if (State          != null or !ignoreNullValues) that.State          = State
      if (Type           != null or !ignoreNullValues) that.Type           = Type
    //
    return that
  }

  /**
   * Uses the createNew block to create a new Coverage, adds it to the supplied bundle, then updates it using the field values stored in this DTO. The ignoreNullValues parameter controls how the fields that are null are treated.
   * @param bundle The bundle in which to create the new Coverage.
   * @param createNew (Optional) A block that returns a new instance of Coverage. If this is null, the default constructor will be used.
   * @param ignoreNullValues (Optional) If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Coverage, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeToNewEntityIn(bundle : Bundle, createNew : block() : Coverage = null, ignoreNullValues = true) : Coverage {
    var instance : Coverage
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
   * Returns the name of the instantiable subclass referred to by the Subtype typekey.
   * @throws IllegalArgumentException if Subclass is null, since the base class (Coverage) is abstract.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final property get ConcreteSubtypeClassName() : String {
    if (Subtype == null) {
      throw new IllegalArgumentException("The subtype field must be set since Coverage is abstract and cannot be instantiated!")
    }
    return "entity." + Subtype.Code
  }

  /** Convenience property that returns a {@link CovTerm[]} of the objects whose PublicIDs are in {@code CovTermIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CovTerms()    : CovTerm[]                       { return fetchByID(CovTermIDs) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code CreateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CreateUser()  : User                            { return fetchByID(CreateUserID) }
  
  /** Convenience property that returns the {@link Policy} whose PublicID is {@code PolicyID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Policy()      : Policy                          { return fetchByID(PolicyID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code UpdateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get UpdateUser()  : User                            { return fetchByID(UpdateUserID) }

  /**
   * Returns whether the fields tracked by this DTO match the same fields in the other DTO
   * @param that The CoverageDTO to compare against.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function equals(that : Object) : boolean {
    if (that typeis CoverageDTO) {
      return Deductible     == that.Deductible
         and EffectiveDate  == that.EffectiveDate
         and ExpirationDate == that.ExpirationDate
         and ExposureLimit  == that.ExposureLimit
         and IncidentLimit  == that.IncidentLimit
         and PolicyID       == that.PolicyID
         and PublicID       == that.PublicID
         and State          == that.State
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
      Deductible,
      EffectiveDate,
      ExpirationDate,
      ExposureLimit,
      IncidentLimit,
      PolicyID,
      PublicID,
      State,
      Type
    }.reduce(17, \ hashCode, obj -> 31 * hashCode + obj?.hashCode())
  }

  /**
   * Provides a rough idea of the command needed to re-create this DTO. Because it is rough it is probably only  useful for debugging purposes.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function toString() : String {
    var fields = {} as List<String>

    if (CovTermIDs      != null  ) fields.add(':CovTermIDs     = ' + CovTermIDs)
    if (CreateTime      != null  ) fields.add(':CreateTime     = ' + StringUtil.enquote(CreateTime.toString()) + ' as Date')
    if (CreateUserID  .HasContent) fields.add(':CreateUserID   = ' + StringUtil.enquote(CreateUserID))
    if (Deductible      != null  ) fields.add(':Deductible     = ' + Deductible)
    if (EffectiveDate   != null  ) fields.add(':EffectiveDate  = ' + StringUtil.enquote(EffectiveDate.toString()) + ' as Date')
    if (ExpirationDate  != null  ) fields.add(':ExpirationDate = ' + StringUtil.enquote(ExpirationDate.toString()) + ' as Date')
    if (ExposureLimit   != null  ) fields.add(':ExposureLimit  = ' + ExposureLimit)
    if (IncidentLimit   != null  ) fields.add(':IncidentLimit  = ' + IncidentLimit)
    if (PolicyID      .HasContent) fields.add(':PolicyID       = ' + StringUtil.enquote(PolicyID))
    if (PublicID      .HasContent) fields.add(':PublicID       = ' + StringUtil.enquote(PublicID))
    if (State           != null  ) fields.add(':State          = State.get("' + State.Code + '")')
    if (Subtype         != null  ) fields.add(':Subtype        = typekey.Coverage.get("' + Subtype.Code + '")')
    if (Type            != null  ) fields.add(':Type           = CoverageType.get("' + Type.Code + '")')
    if (UpdateTime      != null  ) fields.add(':UpdateTime     = ' + StringUtil.enquote(UpdateTime.toString()) + ' as Date')
    if (UpdateUserID  .HasContent) fields.add(':UpdateUserID   = ' + StringUtil.enquote(UpdateUserID))

    return "new CoverageDTO() {\n  " + fields.join(",\n  ") + "\n}"
  }

  /**
   * return a new CoverageDTO that represents the current state of the supplied Coverage.
   * @param that The Coverage to be represented.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  static function valueOf(that : Coverage) : CoverageDTO {
    return new CoverageDTO().readFrom(that)
  }

  /**
   * Returns all of the Coverage instances whose public IDs are in the supplied list, or an empty array if the supplied list is null or empty.
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
   * Returns the Coverage whose public ID is in the supplied list, or null if the publicID is null.
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