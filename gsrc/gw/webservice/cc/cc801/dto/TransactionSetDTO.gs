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
 * A(n) {@link TransactionSetDTO} is a DTO that represents an instance of {@link entity.TransactionSet} for use by certain WS-I Web Services in the base product. This file is composed of basic getters and setters, plus members that make it easier for server-side code to work with DTOs, like virtual getters that query for entities by PublidID, and methods to copy fields to or from an instance of {@link entity.TransactionSet}.
 * <p>None of these methods constrain how an instance of TransactionSetDTO is created, initialized or used (beyond the normal Gosu type checking): this is consistent with the <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO Design Pattern</a>, which states that "DTOs are simple objects that should not contain any business logic that would require testing". Validation logic that considers whether a DTO field can have a <i>particular</i> value (based on things like effective dates, jurisdictions, line of business, user permissions, the values of other fields, etc.) should not be handled here, but rather by the API that manipulates the TransactionSetDTO.
 * <p>Please read the documentation in the accelerator before reusing this class in any additional WS-I Web Services.</p>
 * <p>Fields are mapped according to the following rules:
 * <ul><li>Primitive values are copied directly</li><li>Typekey fields are copied directly (the WS-I layer translates them to/from WS-I enums)</li><li>Foreign keys fields are represented by the target object's PublicID</li><li>Arraykey fields are represented by an array of the PublicIDs of the elements in the array</li></ul></p>
 * <p>The specific mappings for {@link TransactionSetDTO} are as follows:
 * <table border="1"><tr><th>Field</th><th>Maps to</th></tr><tr><td>ActivityIDs</td><td>TransactionSet.Activities*.PublicID</td></tr><tr><td>ApprovalDate</td><td>TransactionSet.ApprovalDate</td></tr><tr><td>ApprovalStatus</td><td>TransactionSet.ApprovalStatus</td></tr><tr><td>Approved</td><td>TransactionSet.Approved</td></tr><tr><td>CheckGroupIDs</td><td>CheckSet.CheckGroups*.PublicID</td></tr><tr><td>CheckIDs</td><td>CheckSet.Checks*.PublicID</td></tr><tr><td>ClaimID</td><td>TransactionSet.Claim.PublicID</td></tr><tr><td>CreateTime</td><td>TransactionSet.CreateTime</td></tr><tr><td>CreateUserID</td><td>TransactionSet.CreateUser.PublicID</td></tr><tr><td>DocumentIDs</td><td>TransactionSet.Documents*.PublicID</td></tr><tr><td>Editable</td><td>TransactionSet.Editable</td></tr><tr><td>ExceedsApplicableLimit</td><td>TransactionSet.ExceedsApplicableLimit</td></tr><tr><td>ExceedsApplicableLimitIgnoringStatus</td><td>TransactionSet.ExceedsApplicableLimitIgnoringStatus</td></tr><tr><td>ExceedsLimit</td><td>TransactionSet.ExceedsLimit</td></tr><tr><td>ExceedsLimitIgnoringStatus</td><td>TransactionSet.ExceedsLimitIgnoringStatus</td></tr><tr><td>ExposureIDs</td><td>TransactionSet.Exposures*.PublicID</td></tr><tr><td>LastApprovingUserID</td><td>TransactionSet.LastApprovingUser.PublicID</td></tr><tr><td>PublicID</td><td>TransactionSet.PublicID</td></tr><tr><td>RecoveryIDs</td><td>RecoverySet.Recoveries*.PublicID</td></tr><tr><td>RecoveryReserveIDs</td><td>RecoveryReserveSet.RecoveryReserves*.PublicID</td></tr><tr><td>RequestingUserID</td><td>TransactionSet.RequestingUser.PublicID</td></tr><tr><td>ReserveIDs</td><td>CheckSet.Reserves*.PublicID</td></tr><tr><td>Subtype</td><td>TransactionSet.Subtype</td></tr><tr><td>UpdateTime</td><td>TransactionSet.UpdateTime</td></tr><tr><td>UpdateUserID</td><td>TransactionSet.UpdateUser.PublicID</td></tr></table></p>
 * <br/>This file was generated using the following property definitions:<br/><pre>CheckSet#CheckGroups,                                // CheckGroup[]<br/>CheckSet#Checks,                                     // Check[]<br/>CheckSet#Reserves,                                   // CheckSetReserve[]<br/>RecoveryReserveSet#RecoveryReserves,                 // RecoveryReserve[]<br/>RecoverySet#Recoveries,                              // Recovery[]<br/>ReserveSet#Reserves,                                 // Reserve[]<br/>TransactionSet#Activities,                           // Activity[]<br/>TransactionSet#ApprovalDate,                         // java.util.Date<br/>TransactionSet#ApprovalStatus,                       // typekey.ApprovalStatus<br/>TransactionSet#Approved,                             // boolean<br/>TransactionSet#Claim,                                // Claim<br/>TransactionSet#Documents,                            // TransactionSetDocument[]<br/>TransactionSet#Editable,                             // boolean<br/>TransactionSet#ExceedsApplicableLimit,               // boolean<br/>TransactionSet#ExceedsApplicableLimitIgnoringStatus, // boolean<br/>TransactionSet#ExceedsLimit,                         // boolean<br/>TransactionSet#ExceedsLimitIgnoringStatus,           // boolean<br/>TransactionSet#Exposures,                            // Exposure[]<br/>TransactionSet#LastApprovingUser,                    // User<br/>TransactionSet#RequestingUser,                       // User<br/>TransactionSet#Subtype                               // typekey.TransactionSet</pre>
 */
@Export
@WsiExportable("http://guidewire.com/cc/ws/gw/webservice/cc/cc801/dto/TransactionSetDTO")
@Generated("DTOBuilder", "DO NOT edit this class directly! See comments at the top of the file.", "2014-01-28T16:22Z")
final class TransactionSetDTO {
  /** Derived from TransactionSet#Activities*.PublicID */
  var _activityIDs                          : String[]               as ActivityIDs = {}
  var _approvalDate                         : Date                   as ApprovalDate
  var _approvalStatus                       : ApprovalStatus         as ApprovalStatus
  var _approved                             : boolean                as Approved
  /** Derived from CheckSet#CheckGroups*.PublicID */
  var _checkGroupIDs                        : String[]               as CheckGroupIDs = {}
  /** Derived from CheckSet#Checks*.PublicID */
  var _checkIDs                             : String[]               as CheckIDs = {}
  /** Derived from TransactionSet#Claim.PublicID */
  var _claimID                              : String                 as ClaimID
  var _createTime                           : Date                   as CreateTime
  /** Derived from Editable#CreateUser.PublicID */
  var _createUserID                         : String                 as CreateUserID
  /** Derived from TransactionSet#Documents*.PublicID */
  var _documentIDs                          : String[]               as DocumentIDs = {}
  var _editable                             : boolean                as Editable
  var _exceedsApplicableLimit               : boolean                as ExceedsApplicableLimit
  var _exceedsApplicableLimitIgnoringStatus : boolean                as ExceedsApplicableLimitIgnoringStatus
  var _exceedsLimit                         : boolean                as ExceedsLimit
  var _exceedsLimitIgnoringStatus           : boolean                as ExceedsLimitIgnoringStatus
  /** Derived from TransactionSet#Exposures*.PublicID */
  var _exposureIDs                          : String[]               as ExposureIDs = {}
  /** Derived from TransactionSet#LastApprovingUser.PublicID */
  var _lastApprovingUserID                  : String                 as LastApprovingUserID
  var _newActivities                        : ActivityDTO[]          as NewActivities = {}
  var _newChecks                            : CheckDTO[]             as NewChecks = {}
  var _newDocuments                         : DocumentDTO[]          as NewDocuments = {}
  var _newExchangeRate                      : java.math.BigDecimal   as NewExchangeRate
  var _newExchangeRateDescription           : String                 as NewExchangeRateDescription
  var _newExposures                         : ExposureDTO[]          as NewExposures = {}
  var _newRecoveries                        : TransactionDTO[]       as NewRecoveries = {}
  var _newRecoveryReserves                  : TransactionDTO[]       as NewRecoveryReserves = {}
  var _newReserves                          : TransactionDTO[]       as NewReserves = {}
  var _publicID                             : String                 as PublicID
  /** Derived from RecoverySet#Recoveries*.PublicID */
  var _recoveryIDs                          : String[]               as RecoveryIDs = {}
  /** Derived from RecoveryReserveSet#RecoveryReserves*.PublicID */
  var _recoveryReserveIDs                   : String[]               as RecoveryReserveIDs = {}
  /** Derived from TransactionSet#RequestingUser.PublicID */
  var _requestingUserID                     : String                 as RequestingUserID
  /** Derived from CheckSet#Reserves*.PublicID */
  var _reserveIDs                           : String[]               as ReserveIDs = {}
  var _subtype                              : typekey.TransactionSet as Subtype
  var _updateTime                           : Date                   as UpdateTime
  /** Derived from Editable#UpdateUser.PublicID */
  var _updateUserID                         : String                 as UpdateUserID

  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  construct() { }

  /**
   * Copies the platform-managed fields from the supplied TransactionSet
   * @param that The TransactionSet to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  protected function _copyReadOnlyFieldsFrom(that : TransactionSet) {
    // if field is on base class
      _activityIDs                          = that.Activities*.PublicID
      _approved                             = that.Approved
      _createTime                           = that.CreateTime
      _createUserID                         = that.CreateUser.PublicID
      _documentIDs                          = that.Documents*.PublicID
      _editable                             = that.Editable
      _exceedsApplicableLimit               = that.ExceedsApplicableLimit
      _exceedsApplicableLimitIgnoringStatus = that.ExceedsApplicableLimitIgnoringStatus
      _exceedsLimit                         = that.ExceedsLimit
      _exceedsLimitIgnoringStatus           = that.ExceedsLimitIgnoringStatus
      _exposureIDs                          = that.Exposures*.PublicID
      _lastApprovingUserID                  = that.LastApprovingUser.PublicID
      _subtype                              = that.Subtype
      _updateTime                           = that.UpdateTime
      _updateUserID                         = that.UpdateUser.PublicID
    //
    if (that typeis CheckSet) {
      _checkGroupIDs                        = that.CheckGroups*.PublicID
      _checkIDs                             = that.Checks*.PublicID
      _reserveIDs                           = that.Reserves*.PublicID
    }
    if (that typeis RecoveryReserveSet) {
      _recoveryReserveIDs                   = that.RecoveryReserves*.PublicID
    }
    if (that typeis RecoverySet) {
      _recoveryIDs                          = that.Recoveries*.PublicID
    }
  }

  /**
   * Set the fields in this DTO using the supplied TransactionSet
   * @param that The TransactionSet to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function readFrom(that : TransactionSet) : TransactionSetDTO {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      ApprovalDate                          = that.ApprovalDate
      ApprovalStatus                        = that.ApprovalStatus
      ClaimID                               = that.Claim.PublicID
      PublicID                              = that.PublicID
      RequestingUserID                      = that.RequestingUser.PublicID
    //
    return this
  }

  /**
   * Update the supplied TransactionSet using the field values stored in this DTO
   * @param that The TransactionSet to update.
   * @param (Optional) ignoreNullValues If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the TransactionSet, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeTo(that : TransactionSet, ignoreNullValues = true) : TransactionSet {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      if (ApprovalDate                         != null or !ignoreNullValues) that.ApprovalDate                         = ApprovalDate
      if (ApprovalStatus                       != null or !ignoreNullValues) that.ApprovalStatus                       = ApprovalStatus
      if (ClaimID                              != null or !ignoreNullValues) that.Claim                                = Claim
      if (PublicID                             != null or !ignoreNullValues) that.PublicID                             = PublicID
      if (RequestingUserID                     != null or !ignoreNullValues) that.RequestingUser                       = RequestingUser
    //
    return that
  }

  /**
   * Uses the createNew block to create a new TransactionSet, adds it to the supplied bundle, then updates it using the field values stored in this DTO. The ignoreNullValues parameter controls how the fields that are null are treated.
   * @param bundle The bundle in which to create the new TransactionSet.
   * @param createNew (Optional) A block that returns a new instance of TransactionSet. If this is null, the default constructor will be used.
   * @param ignoreNullValues (Optional) If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the TransactionSet, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeToNewEntityIn(bundle : Bundle, createNew : block() : TransactionSet = null, ignoreNullValues = true) : TransactionSet {
    var instance : TransactionSet
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
   * @throws IllegalArgumentException if Subclass is null, since the base class (TransactionSet) is abstract.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final property get ConcreteSubtypeClassName() : String {
    if (Subtype == null) {
      throw new IllegalArgumentException("The subtype field must be set since TransactionSet is abstract and cannot be instantiated!")
    }
    return "entity." + Subtype.Code
  }

  /** Convenience property that returns a {@link Activity[]} of the objects whose PublicIDs are in {@code ActivityIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Activities()                        : Activity[]            { return fetchByID(ActivityIDs) }
  
  /** Convenience property that returns a {@link CheckGroup[]} of the objects whose PublicIDs are in {@code CheckGroupIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CheckGroups()                       : CheckGroup[]          { return fetchByID(CheckGroupIDs) }
  
  /** Convenience property that returns a {@link Check[]} of the objects whose PublicIDs are in {@code CheckIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Checks()                            : Check[]               { return fetchByID(CheckIDs) }
  
  /** Convenience property that returns the {@link Claim} whose PublicID is {@code ClaimID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Claim()                             : Claim                 { return fetchByID(ClaimID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code CreateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CreateUser()                        : User                  { return fetchByID(CreateUserID) }
  
  /** Convenience property that returns a {@link TransactionSetDocument[]} of the objects whose PublicIDs are in {@code DocumentIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Documents()                         : TransactionSetDocument[]{ return fetchByID(DocumentIDs) }
  
  /** Convenience property that returns a {@link Exposure[]} of the objects whose PublicIDs are in {@code ExposureIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Exposures()                         : Exposure[]            { return fetchByID(ExposureIDs) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code LastApprovingUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get LastApprovingUser()                 : User                  { return fetchByID(LastApprovingUserID) }
  
  /** Convenience property that returns a {@link Recovery[]} of the objects whose PublicIDs are in {@code RecoveryIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Recoveries()                        : Recovery[]            { return fetchByID(RecoveryIDs) }
  
  /** Convenience property that returns a {@link RecoveryReserve[]} of the objects whose PublicIDs are in {@code RecoveryReserveIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get RecoveryReserves()                  : RecoveryReserve[]     { return fetchByID(RecoveryReserveIDs) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code RequestingUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get RequestingUser()                    : User                  { return fetchByID(RequestingUserID) }
  
  /** Convenience property that returns a {@link CheckSetReserve[]} of the objects whose PublicIDs are in {@code ReserveIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Reserves()                          : CheckSetReserve[]     { return fetchByID(ReserveIDs) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code UpdateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get UpdateUser()                        : User                  { return fetchByID(UpdateUserID) }

  /**
   * Returns whether the fields tracked by this DTO match the same fields in the other DTO
   * @param that The TransactionSetDTO to compare against.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function equals(that : Object) : boolean {
    if (that typeis TransactionSetDTO) {
      return ApprovalDate                         == that.ApprovalDate
         and ApprovalStatus                       == that.ApprovalStatus
         and ClaimID                              == that.ClaimID
         and NewExchangeRate                      == that.NewExchangeRate
         and NewExchangeRateDescription           == that.NewExchangeRateDescription
         and PublicID                             == that.PublicID
         and RequestingUserID                     == that.RequestingUserID
    }
    return super.equals(that)
  }

  /**
   * Returns the hash code of this object.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function hashCode() : int {
    return {
      ApprovalDate,
      ApprovalStatus,
      ClaimID,
      NewExchangeRate,
      NewExchangeRateDescription,
      PublicID,
      RequestingUserID
    }.reduce(17, \ hashCode, obj -> 31 * hashCode + obj?.hashCode())
  }

  /**
   * Provides a rough idea of the command needed to re-create this DTO. Because it is rough it is probably only  useful for debugging purposes.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function toString() : String {
    var fields = {} as List<String>

    if (ActivityIDs                           != null  ) fields.add(':ActivityIDs                          = ' + ActivityIDs)
    if (ApprovalDate                          != null  ) fields.add(':ApprovalDate                         = ' + StringUtil.enquote(ApprovalDate.toString()) + ' as Date')
    if (ApprovalStatus                        != null  ) fields.add(':ApprovalStatus                       = ApprovalStatus.get("' + ApprovalStatus.Code + '")')
    if (Approved                              == true  ) fields.add(':Approved                             = true')
    if (CheckGroupIDs                         != null  ) fields.add(':CheckGroupIDs                        = ' + CheckGroupIDs)
    if (CheckIDs                              != null  ) fields.add(':CheckIDs                             = ' + CheckIDs)
    if (ClaimID                             .HasContent) fields.add(':ClaimID                              = ' + StringUtil.enquote(ClaimID))
    if (CreateTime                            != null  ) fields.add(':CreateTime                           = ' + StringUtil.enquote(CreateTime.toString()) + ' as Date')
    if (CreateUserID                        .HasContent) fields.add(':CreateUserID                         = ' + StringUtil.enquote(CreateUserID))
    if (DocumentIDs                           != null  ) fields.add(':DocumentIDs                          = ' + DocumentIDs)
    if (Editable                              == true  ) fields.add(':Editable                             = true')
    if (ExceedsApplicableLimit                == true  ) fields.add(':ExceedsApplicableLimit               = true')
    if (ExceedsApplicableLimitIgnoringStatus  == true  ) fields.add(':ExceedsApplicableLimitIgnoringStatus = true')
    if (ExceedsLimit                          == true  ) fields.add(':ExceedsLimit                         = true')
    if (ExceedsLimitIgnoringStatus            == true  ) fields.add(':ExceedsLimitIgnoringStatus           = true')
    if (ExposureIDs                           != null  ) fields.add(':ExposureIDs                          = ' + ExposureIDs)
    if (LastApprovingUserID                 .HasContent) fields.add(':LastApprovingUserID                  = ' + StringUtil.enquote(LastApprovingUserID))
    if (NewActivities                         != null  ) fields.add(':NewActivities                        = ' + NewActivities)
    if (NewChecks                             != null  ) fields.add(':NewChecks                            = ' + NewChecks)
    if (NewDocuments                          != null  ) fields.add(':NewDocuments                         = ' + NewDocuments)
    if (NewExchangeRate                       != null  ) fields.add(':NewExchangeRate                      = ' + NewExchangeRate)
    if (NewExchangeRateDescription          .HasContent) fields.add(':NewExchangeRateDescription           = ' + StringUtil.enquote(NewExchangeRateDescription))
    if (NewExposures                          != null  ) fields.add(':NewExposures                         = ' + NewExposures)
    if (NewRecoveries                         != null  ) fields.add(':NewRecoveries                        = ' + NewRecoveries)
    if (NewRecoveryReserves                   != null  ) fields.add(':NewRecoveryReserves                  = ' + NewRecoveryReserves)
    if (NewReserves                           != null  ) fields.add(':NewReserves                          = ' + NewReserves)
    if (PublicID                            .HasContent) fields.add(':PublicID                             = ' + StringUtil.enquote(PublicID))
    if (RecoveryIDs                           != null  ) fields.add(':RecoveryIDs                          = ' + RecoveryIDs)
    if (RecoveryReserveIDs                    != null  ) fields.add(':RecoveryReserveIDs                   = ' + RecoveryReserveIDs)
    if (RequestingUserID                    .HasContent) fields.add(':RequestingUserID                     = ' + StringUtil.enquote(RequestingUserID))
    if (ReserveIDs                            != null  ) fields.add(':ReserveIDs                           = ' + ReserveIDs)
    if (Subtype                               != null  ) fields.add(':Subtype                              = typekey.TransactionSet.get("' + Subtype.Code + '")')
    if (UpdateTime                            != null  ) fields.add(':UpdateTime                           = ' + StringUtil.enquote(UpdateTime.toString()) + ' as Date')
    if (UpdateUserID                        .HasContent) fields.add(':UpdateUserID                         = ' + StringUtil.enquote(UpdateUserID))

    return "new TransactionSetDTO() {\n  " + fields.join(",\n  ") + "\n}"
  }

  /**
   * return a new TransactionSetDTO that represents the current state of the supplied TransactionSet.
   * @param that The TransactionSet to be represented.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  static function valueOf(that : TransactionSet) : TransactionSetDTO {
    return new TransactionSetDTO().readFrom(that)
  }

  /**
   * Returns all of the TransactionSet instances whose public IDs are in the supplied list, or an empty array if the supplied list is null or empty.
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
   * Returns the TransactionSet whose public ID is in the supplied list, or null if the publicID is null.
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