package gw.webservice.cc.cc801.dto

uses gw.api.database.Query
uses gw.api.util.StringUtil
uses gw.api.webservice.exception.BadIdentifierException
uses gw.pl.persistence.core.Bundle
uses gw.xml.ws.annotation.WsiExportable
uses java.lang.Long
uses java.util.Date
uses javax.annotation.Generated

/**
 * <p style="border: 1px solid black; padding: 10px">This Data Transfer Object ("DTO") class is used to generate a WSDL to serialize and deserialize information across the network. Any change to the public properties of this DTO class will change the WSDL, thus breaking any existing clients. So once the corresponding WSDL is in use this DTO should only be changed with extreme caution, as it will require existing clients to be rebuilt and redeployed.<br/><br/>
DTOs which are a simple mapping from the domain model may be auto-generated using the "WSI DTO Generator", available from the customer portal. This generator can significantly speed up initial coding of such DTOs. Always remember, however, that DTOs are a network interface and a simple mapping from the domain model may not provide the best results. Remember too that once a DTO has been used in a deployed WSDL, re-running the generator may break existing clients (see above). Please read the documentation in the accelerator for guidance.</p><br/>
 * A(n) {@link ClaimInfoDTO} is a DTO that represents an instance of {@link entity.ClaimInfo} for use by certain WS-I Web Services in the base product. This file is composed of basic getters and setters, plus members that make it easier for server-side code to work with DTOs, like virtual getters that query for entities by PublidID, and methods to copy fields to or from an instance of {@link entity.ClaimInfo}.
 * <p>None of these methods constrain how an instance of ClaimInfoDTO is created, initialized or used (beyond the normal Gosu type checking): this is consistent with the <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO Design Pattern</a>, which states that "DTOs are simple objects that should not contain any business logic that would require testing". Validation logic that considers whether a DTO field can have a <i>particular</i> value (based on things like effective dates, jurisdictions, line of business, user permissions, the values of other fields, etc.) should not be handled here, but rather by the API that manipulates the ClaimInfoDTO.
 * <p>Please read the documentation in the accelerator before reusing this class in any additional WS-I Web Services.</p>
 * <p>Fields are mapped according to the following rules:
 * <ul><li>Primitive values are copied directly</li><li>Typekey fields are copied directly (the WS-I layer translates them to/from WS-I enums)</li><li>Foreign keys fields are represented by the target object's PublicID</li><li>Arraykey fields are represented by an array of the PublicIDs of the elements in the array</li></ul></p>
 * <p>The specific mappings for {@link ClaimInfoDTO} are as follows:
 * <table border="1"><tr><th>Field</th><th>Maps to</th></tr><tr><td>AccessIDs</td><td>ClaimInfo.Access*.PublicID</td></tr><tr><td>AdjusterID</td><td>ClaimInfo.Adjuster.PublicID</td></tr><tr><td>AssignedGroupID</td><td>ClaimInfo.AssignedGroup.PublicID</td></tr><tr><td>AssigneeDisplayName</td><td>ClaimInfo.AssigneeDisplayName</td></tr><tr><td>ClaimAggregateLimitRptIDs</td><td>ClaimInfo.ClaimAggregateLimitRpts*.PublicID</td></tr><tr><td>ClaimantNames</td><td>ClaimInfo.ClaimantNames</td></tr><tr><td>ClaimCurrency</td><td>ClaimInfo.ClaimCurrency</td></tr><tr><td>ClaimID</td><td>ClaimInfo.Claim.PublicID</td></tr><tr><td>ClaimInAssociationIDs</td><td>ClaimInfo.ClaimInAssociations*.PublicID</td></tr><tr><td>ClaimNumber</td><td>ClaimInfo.ClaimNumber</td></tr><tr><td>ContactIDs</td><td>ClaimInfo.Contacts*.PublicID</td></tr><tr><td>CoverageLineMatchDataIDs</td><td>ClaimInfo.CoverageLineMatchData*.PublicID</td></tr><tr><td>CoverageLineMatchDataInfoValid</td><td>ClaimInfo.CoverageLineMatchDataInfoValid</td></tr><tr><td>CreateTime</td><td>ClaimInfo.CreateTime</td></tr><tr><td>CreateUserID</td><td>ClaimInfo.CreateUser.PublicID</td></tr><tr><td>Currency</td><td>ClaimInfo.Currency</td></tr><tr><td>InsuredID</td><td>ClaimInfo.Insured.PublicID</td></tr><tr><td>JurisdictionState</td><td>ClaimInfo.JurisdictionState</td></tr><tr><td>LoadCommandID</td><td>ClaimInfo.LoadCommandID</td></tr><tr><td>LossDate</td><td>ClaimInfo.LossDate</td></tr><tr><td>LossLocationCode</td><td>ClaimInfo.LossLocationCode</td></tr><tr><td>LossLocationID</td><td>ClaimInfo.LossLocation.PublicID</td></tr><tr><td>NoticeDate</td><td>ClaimInfo.NoticeDate</td></tr><tr><td>PolicyNumber</td><td>ClaimInfo.PolicyNumber</td></tr><tr><td>PolicyPeriodIDs</td><td>ClaimInfo.PolicyPeriods*.PublicID</td></tr><tr><td>PublicID</td><td>ClaimInfo.PublicID</td></tr><tr><td>PurgeDate</td><td>ClaimInfo.PurgeDate</td></tr><tr><td>UpdateTime</td><td>ClaimInfo.UpdateTime</td></tr><tr><td>UpdateUserID</td><td>ClaimInfo.UpdateUser.PublicID</td></tr></table></p>
 * <br/>This file was generated using the following property definitions:<br/><pre>ClaimInfo#Access,                         // ClaimInfoAccess[]<br/>ClaimInfo#Adjuster,                       // User<br/>ClaimInfo#AssignedGroup,                  // Group<br/>ClaimInfo#AssigneeDisplayName,            // String<br/>ClaimInfo#Claim,                          // Claim<br/>ClaimInfo#ClaimAggregateLimitRpts,        // ClaimAggregateLimitRpt[]<br/>ClaimInfo#ClaimantNames,                  // String[]<br/>ClaimInfo#ClaimCurrency,                  // typekey.Currency<br/>ClaimInfo#ClaimInAssociations,            // ClaimInAssociation[]<br/>ClaimInfo#ClaimNumber,                    // String<br/>ClaimInfo#Contacts,                       // ContactInfo[]<br/>ClaimInfo#CoverageLineMatchData,          // CoverageLineMatchDataInfo[]<br/>ClaimInfo#CoverageLineMatchDataInfoValid, // Boolean<br/>ClaimInfo#Currency,                       // typekey.Currency<br/>ClaimInfo#Insured,                        // ContactInfo<br/>ClaimInfo#JurisdictionState,              // typekey.Jurisdiction<br/>ClaimInfo#LoadCommandID,                  // Long<br/>ClaimInfo#LossDate,                       // java.util.Date<br/>ClaimInfo#LossLocation,                   // LocationInfo<br/>ClaimInfo#LossLocationCode,               // String<br/>ClaimInfo#NoticeDate,                     // java.util.Date<br/>ClaimInfo#PolicyNumber,                   // String<br/>ClaimInfo#PolicyPeriods,                  // java.util.List<entity.PolicyPeriod><br/>ClaimInfo#PurgeDate                       // java.util.Date</pre>
 */
@Export
@WsiExportable("http://guidewire.com/cc/ws/gw/webservice/cc/cc801/dto/ClaimInfoDTO")
@Generated("DTOBuilder", "DO NOT edit this class directly! See comments at the top of the file.", "2014-01-28T16:22Z")
final class ClaimInfoDTO {
  /** Derived from ClaimInfo#Access*.PublicID */
  var _accessIDs                      : String[]           as AccessIDs = {}
  /** Derived from ClaimInfo#Adjuster.PublicID */
  var _adjusterID                     : String             as AdjusterID
  /** Derived from ClaimInfo#AssignedGroup.PublicID */
  var _assignedGroupID                : String             as AssignedGroupID
  var _assigneeDisplayName            : String             as AssigneeDisplayName
  /** Derived from ClaimInfo#ClaimAggregateLimitRpts*.PublicID */
  var _claimAggregateLimitRptIDs      : String[]           as ClaimAggregateLimitRptIDs = {}
  var _claimantNames                  : String[]           as ClaimantNames = {}
  var _claimCurrency                  : Currency           as ClaimCurrency
  /** Derived from ClaimInfo#Claim.PublicID */
  var _claimID                        : String             as ClaimID
  /** Derived from ClaimInfo#ClaimInAssociations*.PublicID */
  var _claimInAssociationIDs          : String[]           as ClaimInAssociationIDs = {}
  var _claimNumber                    : String             as ClaimNumber
  /** Derived from ClaimInfo#Contacts*.PublicID */
  var _contactIDs                     : String[]           as ContactIDs = {}
  /** Derived from ClaimInfo#CoverageLineMatchData*.PublicID */
  var _coverageLineMatchDataIDs       : String[]           as CoverageLineMatchDataIDs = {}
  var _coverageLineMatchDataInfoValid : Boolean            as CoverageLineMatchDataInfoValid
  var _createTime                     : Date               as CreateTime
  /** Derived from Editable#CreateUser.PublicID */
  var _createUserID                   : String             as CreateUserID
  var _currency                       : Currency           as Currency
  /** Derived from ClaimInfo#Insured.PublicID */
  var _insuredID                      : String             as InsuredID
  var _jurisdictionState              : Jurisdiction       as JurisdictionState
  var _loadCommandID                  : Long               as LoadCommandID
  var _lossDate                       : Date               as LossDate
  var _lossLocationCode               : String             as LossLocationCode
  /** Derived from ClaimInfo#LossLocation.PublicID */
  var _lossLocationID                 : String             as LossLocationID
  var _noticeDate                     : Date               as NoticeDate
  var _policyNumber                   : String             as PolicyNumber
  /** Derived from ClaimInfo#PolicyPeriods*.PublicID */
  var _policyPeriodIDs                : java.lang.String[] as PolicyPeriodIDs = {}
  var _publicID                       : String             as PublicID
  var _purgeDate                      : Date               as PurgeDate
  var _updateTime                     : Date               as UpdateTime
  /** Derived from Editable#UpdateUser.PublicID */
  var _updateUserID                   : String             as UpdateUserID

  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  construct() { }

  /**
   * Copies the platform-managed fields from the supplied ClaimInfo
   * @param that The ClaimInfo to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  protected function _copyReadOnlyFieldsFrom(that : ClaimInfo) {
    // if field is on base class
      _accessIDs                      = that.Access*.PublicID
      _adjusterID                     = that.Adjuster.PublicID
      _assignedGroupID                = that.AssignedGroup.PublicID
      _assigneeDisplayName            = that.AssigneeDisplayName
      _claimAggregateLimitRptIDs      = that.ClaimAggregateLimitRpts*.PublicID
      _claimCurrency                  = that.ClaimCurrency
      _claimID                        = that.Claim.PublicID
      _claimInAssociationIDs          = that.ClaimInAssociations*.PublicID
      _claimantNames                  = that.ClaimantNames
      _contactIDs                     = that.Contacts*.PublicID
      _coverageLineMatchDataIDs       = that.CoverageLineMatchData*.PublicID
      _coverageLineMatchDataInfoValid = that.CoverageLineMatchDataInfoValid
      _createTime                     = that.CreateTime
      _createUserID                   = that.CreateUser.PublicID
      _currency                       = that.Currency
      _insuredID                      = that.Insured.PublicID
      _loadCommandID                  = that.LoadCommandID
      _lossDate                       = that.LossDate
      _lossLocationID                 = that.LossLocation.PublicID
      _noticeDate                     = that.NoticeDate
      _policyPeriodIDs                = that.PolicyPeriods*.PublicID
      _updateTime                     = that.UpdateTime
      _updateUserID                   = that.UpdateUser.PublicID
    //
  }

  /**
   * Set the fields in this DTO using the supplied ClaimInfo
   * @param that The ClaimInfo to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function readFrom(that : ClaimInfo) : ClaimInfoDTO {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      ClaimNumber                     = that.ClaimNumber
      JurisdictionState               = that.JurisdictionState
      LossLocationCode                = that.LossLocationCode
      PolicyNumber                    = that.PolicyNumber
      PublicID                        = that.PublicID
      PurgeDate                       = that.PurgeDate
    //
    return this
  }

  /**
   * Update the supplied ClaimInfo using the field values stored in this DTO
   * @param that The ClaimInfo to update.
   * @param (Optional) ignoreNullValues If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the ClaimInfo, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeTo(that : ClaimInfo, ignoreNullValues = true) : ClaimInfo {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      if (ClaimNumber                    != null or !ignoreNullValues) that.ClaimNumber                    = ClaimNumber
      if (JurisdictionState              != null or !ignoreNullValues) that.JurisdictionState              = JurisdictionState
      if (LossLocationCode               != null or !ignoreNullValues) that.LossLocationCode               = LossLocationCode
      if (PolicyNumber                   != null or !ignoreNullValues) that.PolicyNumber                   = PolicyNumber
      if (PublicID                       != null or !ignoreNullValues) that.PublicID                       = PublicID
      if (PurgeDate                      != null or !ignoreNullValues) that.PurgeDate                      = PurgeDate
    //
    return that
  }

  /**
   * Uses the createNew block to create a new ClaimInfo, adds it to the supplied bundle, then updates it using the field values stored in this DTO. The ignoreNullValues parameter controls how the fields that are null are treated.
   * @param bundle The bundle in which to create the new ClaimInfo.
   * @param createNew (Optional) A block that returns a new instance of ClaimInfo. If this is null, the default constructor will be used.
   * @param ignoreNullValues (Optional) If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the ClaimInfo, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeToNewEntityIn(bundle : Bundle, createNew : block() : ClaimInfo = null, ignoreNullValues = true) : ClaimInfo {
    var instance : ClaimInfo
    if (createNew == null) {
      instance = bundle == null
          ? new ClaimInfo()
          : new ClaimInfo(bundle)
    }
    else {
      instance = createNew()

      if (bundle != null) {
        instance = bundle.add(instance)
      }
    }
    return writeTo(instance, ignoreNullValues)
  }

  /** Convenience property that returns a {@link ClaimInfoAccess[]} of the objects whose PublicIDs are in {@code AccessIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Access()                      : ClaimInfoAccess[] { return fetchByID(AccessIDs) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code AdjusterID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Adjuster()                    : User              { return fetchByID(AdjusterID) }
  
  /** Convenience property that returns the {@link Group} whose PublicID is {@code AssignedGroupID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get AssignedGroup()               : Group             { return fetchByID(AssignedGroupID) }
  
  /** Convenience property that returns a {@link ClaimAggregateLimitRpt[]} of the objects whose PublicIDs are in {@code ClaimAggregateLimitRptIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get ClaimAggregateLimitRpts()     : ClaimAggregateLimitRpt[]{ return fetchByID(ClaimAggregateLimitRptIDs) }
  
  /** Convenience property that returns the {@link Claim} whose PublicID is {@code ClaimID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Claim()                       : Claim             { return fetchByID(ClaimID) }
  
  /** Convenience property that returns a {@link ClaimInAssociation[]} of the objects whose PublicIDs are in {@code ClaimInAssociationIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get ClaimInAssociations()         : ClaimInAssociation[]{ return fetchByID(ClaimInAssociationIDs) }
  
  /** Convenience property that returns a {@link ContactInfo[]} of the objects whose PublicIDs are in {@code ContactIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Contacts()                    : ContactInfo[]     { return fetchByID(ContactIDs) }
  
  /** Convenience property that returns a {@link CoverageLineMatchDataInfo[]} of the objects whose PublicIDs are in {@code CoverageLineMatchDataIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CoverageLineMatchData()       : CoverageLineMatchDataInfo[]{ return fetchByID(CoverageLineMatchDataIDs) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code CreateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CreateUser()                  : User              { return fetchByID(CreateUserID) }
  
  /** Convenience property that returns the {@link ContactInfo} whose PublicID is {@code InsuredID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Insured()                     : ContactInfo       { return fetchByID(InsuredID) }
  
  /** Convenience property that returns the {@link LocationInfo} whose PublicID is {@code LossLocationID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get LossLocation()                : LocationInfo      { return fetchByID(LossLocationID) }
  
  /** Convenience property that returns a {@link List<PolicyPeriod>} of the objects whose PublicIDs are in {@code PolicyPeriodIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get PolicyPeriods()               : PolicyPeriod[]    { return fetchByID(PolicyPeriodIDs) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code UpdateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get UpdateUser()                  : User              { return fetchByID(UpdateUserID) }

  /**
   * Returns whether the fields tracked by this DTO match the same fields in the other DTO
   * @param that The ClaimInfoDTO to compare against.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function equals(that : Object) : boolean {
    if (that typeis ClaimInfoDTO) {
      return ClaimNumber                    == that.ClaimNumber
         and JurisdictionState              == that.JurisdictionState
         and LossLocationCode               == that.LossLocationCode
         and PolicyNumber                   == that.PolicyNumber
         and PublicID                       == that.PublicID
         and PurgeDate                      == that.PurgeDate
    }
    return super.equals(that)
  }

  /**
   * Returns the hash code of this object.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function hashCode() : int {
    return {
      ClaimNumber,
      JurisdictionState,
      LossLocationCode,
      PolicyNumber,
      PublicID,
      PurgeDate
    }.reduce(17, \ hashCode, obj -> 31 * hashCode + obj?.hashCode())
  }

  /**
   * Provides a rough idea of the command needed to re-create this DTO. Because it is rough it is probably only  useful for debugging purposes.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function toString() : String {
    var fields = {} as List<String>

    if (AccessIDs                       != null  ) fields.add(':AccessIDs                      = ' + AccessIDs)
    if (AdjusterID                    .HasContent) fields.add(':AdjusterID                     = ' + StringUtil.enquote(AdjusterID))
    if (AssignedGroupID               .HasContent) fields.add(':AssignedGroupID                = ' + StringUtil.enquote(AssignedGroupID))
    if (AssigneeDisplayName           .HasContent) fields.add(':AssigneeDisplayName            = ' + StringUtil.enquote(AssigneeDisplayName))
    if (ClaimAggregateLimitRptIDs       != null  ) fields.add(':ClaimAggregateLimitRptIDs      = ' + ClaimAggregateLimitRptIDs)
    if (ClaimantNames                   != null  ) fields.add(':ClaimantNames                  = ' + ClaimantNames)
    if (ClaimCurrency                   != null  ) fields.add(':ClaimCurrency                  = Currency.get("' + ClaimCurrency.Code + '")')
    if (ClaimID                       .HasContent) fields.add(':ClaimID                        = ' + StringUtil.enquote(ClaimID))
    if (ClaimInAssociationIDs           != null  ) fields.add(':ClaimInAssociationIDs          = ' + ClaimInAssociationIDs)
    if (ClaimNumber                   .HasContent) fields.add(':ClaimNumber                    = ' + StringUtil.enquote(ClaimNumber))
    if (ContactIDs                      != null  ) fields.add(':ContactIDs                     = ' + ContactIDs)
    if (CoverageLineMatchDataIDs        != null  ) fields.add(':CoverageLineMatchDataIDs       = ' + CoverageLineMatchDataIDs)
    if (CoverageLineMatchDataInfoValid  != null  ) fields.add(':CoverageLineMatchDataInfoValid = ' + CoverageLineMatchDataInfoValid)
    if (CreateTime                      != null  ) fields.add(':CreateTime                     = ' + StringUtil.enquote(CreateTime.toString()) + ' as Date')
    if (CreateUserID                  .HasContent) fields.add(':CreateUserID                   = ' + StringUtil.enquote(CreateUserID))
    if (Currency                        != null  ) fields.add(':Currency                       = Currency.get("' + Currency.Code + '")')
    if (InsuredID                     .HasContent) fields.add(':InsuredID                      = ' + StringUtil.enquote(InsuredID))
    if (JurisdictionState               != null  ) fields.add(':JurisdictionState              = Jurisdiction.get("' + JurisdictionState.Code + '")')
    if (LoadCommandID                   != null  ) fields.add(':LoadCommandID                  = ' + LoadCommandID)
    if (LossDate                        != null  ) fields.add(':LossDate                       = ' + StringUtil.enquote(LossDate.toString()) + ' as Date')
    if (LossLocationCode              .HasContent) fields.add(':LossLocationCode               = ' + StringUtil.enquote(LossLocationCode))
    if (LossLocationID                .HasContent) fields.add(':LossLocationID                 = ' + StringUtil.enquote(LossLocationID))
    if (NoticeDate                      != null  ) fields.add(':NoticeDate                     = ' + StringUtil.enquote(NoticeDate.toString()) + ' as Date')
    if (PolicyNumber                  .HasContent) fields.add(':PolicyNumber                   = ' + StringUtil.enquote(PolicyNumber))
    if (PolicyPeriodIDs                 != null  ) fields.add(':PolicyPeriodIDs                = ' + PolicyPeriodIDs)
    if (PublicID                      .HasContent) fields.add(':PublicID                       = ' + StringUtil.enquote(PublicID))
    if (PurgeDate                       != null  ) fields.add(':PurgeDate                      = ' + StringUtil.enquote(PurgeDate.toString()) + ' as Date')
    if (UpdateTime                      != null  ) fields.add(':UpdateTime                     = ' + StringUtil.enquote(UpdateTime.toString()) + ' as Date')
    if (UpdateUserID                  .HasContent) fields.add(':UpdateUserID                   = ' + StringUtil.enquote(UpdateUserID))

    return "new ClaimInfoDTO() {\n  " + fields.join(",\n  ") + "\n}"
  }

  /**
   * return a new ClaimInfoDTO that represents the current state of the supplied ClaimInfo.
   * @param that The ClaimInfo to be represented.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  static function valueOf(that : ClaimInfo) : ClaimInfoDTO {
    return new ClaimInfoDTO().readFrom(that)
  }

  /**
   * Returns all of the ClaimInfo instances whose public IDs are in the supplied list, or an empty array if the supplied list is null or empty.
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
   * Returns the ClaimInfo whose public ID is in the supplied list, or null if the publicID is null.
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