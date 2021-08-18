package gw.webservice.cc.cc801.dto

uses gw.api.database.Query
uses gw.api.util.StringUtil
uses gw.api.webservice.exception.BadIdentifierException
uses gw.lang.reflect.ReflectUtil
uses gw.pl.persistence.core.Bundle
uses gw.xml.ws.annotation.WsiExportable
uses java.lang.IllegalArgumentException
uses java.lang.Long
uses java.util.Date
uses javax.annotation.Generated

/**
 * <p style="border: 1px solid black; padding: 10px">This Data Transfer Object ("DTO") class is used to generate a WSDL to serialize and deserialize information across the network. Any change to the public properties of this DTO class will change the WSDL, thus breaking any existing clients. So once the corresponding WSDL is in use this DTO should only be changed with extreme caution, as it will require existing clients to be rebuilt and redeployed.<br/><br/>
DTOs which are a simple mapping from the domain model may be auto-generated using the "WSI DTO Generator", available from the customer portal. This generator can significantly speed up initial coding of such DTOs. Always remember, however, that DTOs are a network interface and a simple mapping from the domain model may not provide the best results. Remember too that once a DTO has been used in a deployed WSDL, re-running the generator may break existing clients (see above). Please read the documentation in the accelerator for guidance.</p><br/>
 * A(n) {@link TransactionDTO} is a DTO that represents an instance of {@link entity.Transaction} for use by certain WS-I Web Services in the base product. This file is composed of basic getters and setters, plus members that make it easier for server-side code to work with DTOs, like virtual getters that query for entities by PublidID, and methods to copy fields to or from an instance of {@link entity.Transaction}.
 * <p>None of these methods constrain how an instance of TransactionDTO is created, initialized or used (beyond the normal Gosu type checking): this is consistent with the <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO Design Pattern</a>, which states that "DTOs are simple objects that should not contain any business logic that would require testing". Validation logic that considers whether a DTO field can have a <i>particular</i> value (based on things like effective dates, jurisdictions, line of business, user permissions, the values of other fields, etc.) should not be handled here, but rather by the API that manipulates the TransactionDTO.
 * <p>Please read the documentation in the accelerator before reusing this class in any additional WS-I Web Services.</p>
 * <p>Fields are mapped according to the following rules:
 * <ul><li>Primitive values are copied directly</li><li>Typekey fields are copied directly (the WS-I layer translates them to/from WS-I enums)</li><li>Foreign keys fields are represented by the target object's PublicID</li><li>Arraykey fields are represented by an array of the PublicIDs of the elements in the array</li></ul></p>
 * <p>The specific mappings for {@link TransactionDTO} are as follows:
 * <table border="1"><tr><th>Field</th><th>Maps to</th></tr><tr><td>Amount</td><td>Transaction.Amount</td></tr><tr><td>CheckID</td><td>Payment.Check.PublicID</td></tr><tr><td>ClaimContactID</td><td>Recovery.ClaimContact.PublicID</td></tr><tr><td>ClaimID</td><td>Transaction.Claim.PublicID</td></tr><tr><td>Comments</td><td>Transaction.Comments</td></tr><tr><td>CostCategory</td><td>Transaction.CostCategory</td></tr><tr><td>CostType</td><td>Transaction.CostType</td></tr><tr><td>CreateTime</td><td>Transaction.CreateTime</td></tr><tr><td>CreateUserID</td><td>Transaction.CreateUser.PublicID</td></tr><tr><td>Currency</td><td>Transaction.Currency</td></tr><tr><td>Deletable</td><td>Transaction.Deletable</td></tr><tr><td>DoesNotErodeReserves</td><td>Payment.DoesNotErodeReserves</td></tr><tr><td>Editable</td><td>Transaction.Editable</td></tr><tr><td>ExposureID</td><td>Transaction.Exposure.PublicID</td></tr><tr><td>LineItemIDs</td><td>Transaction.LineItems*.PublicID</td></tr><tr><td>LoadCommandID</td><td>Transaction.LoadCommandID</td></tr><tr><td>MatterID</td><td>Payment.Matter.PublicID</td></tr><tr><td>NotApproved</td><td>Transaction.NotApproved</td></tr><tr><td>OffsetIDs</td><td>Transaction.Offsets*.PublicID</td></tr><tr><td>OnsetIDs</td><td>Transaction.Onsets*.PublicID</td></tr><tr><td>PaymentType</td><td>Payment.PaymentType</td></tr><tr><td>PublicID</td><td>Transaction.PublicID</td></tr><tr><td>RecoveryCategory</td><td>Transaction.RecoveryCategory</td></tr><tr><td>ReserveLineID</td><td>Transaction.ReserveLine.PublicID</td></tr><tr><td>ReservingCurrency</td><td>Transaction.ReservingCurrency</td></tr><tr><td>Status</td><td>Transaction.Status</td></tr><tr><td>SubmitDate</td><td>Transaction.SubmitDate</td></tr><tr><td>Subtype</td><td>Transaction.Subtype</td></tr><tr><td>TAccountTransactionIDs</td><td>Transaction.TAccountTransactions*.PublicID</td></tr><tr><td>TransactionDate</td><td>Transaction.TransactionDate</td></tr><tr><td>TransactionSetID</td><td>Transaction.TransactionSet.PublicID</td></tr><tr><td>TransactionTypeName</td><td>Transaction.TransactionTypeName</td></tr><tr><td>UpdateTime</td><td>Transaction.UpdateTime</td></tr><tr><td>UpdateUserID</td><td>Transaction.UpdateUser.PublicID</td></tr></table></p>
 * <br/>This file was generated using the following property definitions:<br/><pre>Payment#Check,                    // Check<br/>Payment#DoesNotErodeReserves,     // Boolean<br/>Payment#Matter,                   // Matter<br/>Payment#PaymentType,              // typekey.PaymentType<br/>Recovery#ClaimContact,            // ClaimContact<br/>Transaction#Amount,               // java.math.BigDecimal<br/>Transaction#Claim,                // Claim<br/>Transaction#Comments,             // String<br/>Transaction#CostCategory,         // typekey.CostCategory<br/>Transaction#CostType,             // typekey.CostType<br/>Transaction#Currency,             // typekey.Currency<br/>Transaction#Deletable,            // boolean<br/>Transaction#Editable,             // boolean<br/>Transaction#Exposure,             // Exposure<br/>Transaction#LineItems,            // TransactionLineItem[]<br/>Transaction#LoadCommandID,        // Long<br/>Transaction#NotApproved,          // boolean<br/>Transaction#Offsets,              // TransactionOffset[]<br/>Transaction#Onsets,               // TransactionOnset[]<br/>Transaction#RecoveryCategory,     // typekey.RecoveryCategory<br/>Transaction#ReserveLine,          // ReserveLine<br/>Transaction#ReservingCurrency,    // typekey.Currency<br/>Transaction#Status,               // typekey.TransactionStatus<br/>Transaction#SubmitDate,           // java.util.Date<br/>Transaction#Subtype,              // typekey.Transaction<br/>Transaction#TAccountTransactions, // TAccountTransaction[]<br/>Transaction#TransactionDate,      // java.util.Date<br/>Transaction#TransactionSet,       // TransactionSet<br/>Transaction#TransactionTypeName   // String</pre>
 */
@Export
@WsiExportable("http://guidewire.com/cc/ws/gw/webservice/cc/cc801/dto/TransactionDTO")
@Generated("DTOBuilder", "DO NOT edit this class directly! See comments at the top of the file.", "2014-01-28T16:22Z")
final class TransactionDTO {
  var _amount                 : java.math.BigDecimal     as Amount
  /** Derived from Payment#Check.PublicID */
  var _checkID                : String                   as CheckID
  /** Derived from Recovery#ClaimContact.PublicID */
  var _claimContactID         : String                   as ClaimContactID
  /** Derived from Transaction#Claim.PublicID */
  var _claimID                : String                   as ClaimID
  var _comments               : String                   as Comments
  var _costCategory           : CostCategory             as CostCategory
  var _costType               : CostType                 as CostType
  var _createTime             : Date                     as CreateTime
  /** Derived from Editable#CreateUser.PublicID */
  var _createUserID           : String                   as CreateUserID
  var _currency               : Currency                 as Currency
  var _deletable              : boolean                  as Deletable
  var _doesNotErodeReserves   : Boolean                  as DoesNotErodeReserves
  var _editable               : boolean                  as Editable
  /** Derived from Transaction#Exposure.PublicID */
  var _exposureID             : String                   as ExposureID
  /** Derived from Transaction#LineItems*.PublicID */
  var _lineItemIDs            : String[]                 as LineItemIDs = {}
  var _loadCommandID          : Long                     as LoadCommandID
  /** Derived from Payment#Matter.PublicID */
  var _matterID               : String                   as MatterID
  var _newLineItems           : TransactionLineItemDTO[] as NewLineItems = {}
  var _notApproved            : boolean                  as NotApproved
  /** Derived from Transaction#Offsets*.PublicID */
  var _offsetIDs              : String[]                 as OffsetIDs = {}
  /** Derived from Transaction#Onsets*.PublicID */
  var _onsetIDs               : String[]                 as OnsetIDs = {}
  var _paymentType            : PaymentType              as PaymentType
  var _publicID               : String                   as PublicID
  var _recoveryCategory       : RecoveryCategory         as RecoveryCategory
  /** Derived from Transaction#ReserveLine.PublicID */
  var _reserveLineID          : String                   as ReserveLineID
  var _reservingCurrency      : Currency                 as ReservingCurrency
  var _status                 : TransactionStatus        as Status
  var _submitDate             : Date                     as SubmitDate
  var _subtype                : typekey.Transaction      as Subtype
  /** Derived from Transaction#TAccountTransactions*.PublicID */
  var _tAccountTransactionIDs : String[]                 as TAccountTransactionIDs = {}
  var _transactionDate        : Date                     as TransactionDate
  /** Derived from Transaction#TransactionSet.PublicID */
  var _transactionSetID       : String                   as TransactionSetID
  var _transactionTypeName    : String                   as TransactionTypeName
  var _updateTime             : Date                     as UpdateTime
  /** Derived from Editable#UpdateUser.PublicID */
  var _updateUserID           : String                   as UpdateUserID

  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  construct() { }

  /**
   * Copies the platform-managed fields from the supplied Transaction
   * @param that The Transaction to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  protected function _copyReadOnlyFieldsFrom(that : Transaction) {
    // if field is on base class
      _amount                 = that.Amount
      _createTime             = that.CreateTime
      _createUserID           = that.CreateUser.PublicID
      _deletable              = that.Deletable
      _editable               = that.Editable
      _lineItemIDs            = that.LineItems*.PublicID
      _loadCommandID          = that.LoadCommandID
      _notApproved            = that.NotApproved
      _offsetIDs              = that.Offsets*.PublicID
      _onsetIDs               = that.Onsets*.PublicID
      _subtype                = that.Subtype
      _tAccountTransactionIDs = that.TAccountTransactions*.PublicID
      _transactionDate        = that.TransactionDate
      _transactionTypeName    = that.TransactionTypeName
      _updateTime             = that.UpdateTime
      _updateUserID           = that.UpdateUser.PublicID
    //
  }

  /**
   * Set the fields in this DTO using the supplied Transaction
   * @param that The Transaction to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function readFrom(that : Transaction) : TransactionDTO {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      ClaimID                 = that.Claim.PublicID
      Comments                = that.Comments
      CostCategory            = that.CostCategory
      CostType                = that.CostType
      Currency                = that.Currency
      ExposureID              = that.Exposure.PublicID
      PublicID                = that.PublicID
      RecoveryCategory        = that.RecoveryCategory
      ReserveLineID           = that.ReserveLine.PublicID
      ReservingCurrency       = that.ReservingCurrency
      Status                  = that.Status
      SubmitDate              = that.SubmitDate
      TransactionSetID        = that.TransactionSet.PublicID
    //
    if (that typeis Payment) {
      CheckID                 = that.Check.PublicID
      DoesNotErodeReserves    = that.DoesNotErodeReserves
      MatterID                = that.Matter.PublicID
      PaymentType             = that.PaymentType
    }
    if (that typeis Recovery) {
      ClaimContactID          = that.ClaimContact.PublicID
    }
    return this
  }

  /**
   * Update the supplied Transaction using the field values stored in this DTO
   * @param that The Transaction to update.
   * @param (Optional) ignoreNullValues If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Transaction, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeTo(that : Transaction, ignoreNullValues = true) : Transaction {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      if (ClaimID                != null or !ignoreNullValues) that.Claim                  = Claim
      if (Comments               != null or !ignoreNullValues) that.Comments               = Comments
      if (CostCategory           != null or !ignoreNullValues) that.CostCategory           = CostCategory
      if (CostType               != null or !ignoreNullValues) that.CostType               = CostType
      if (Currency               != null or !ignoreNullValues) that.Currency               = Currency
      if (ExposureID             != null or !ignoreNullValues) that.Exposure               = Exposure
      if (PublicID               != null or !ignoreNullValues) that.PublicID               = PublicID
      if (RecoveryCategory       != null or !ignoreNullValues) that.RecoveryCategory       = RecoveryCategory
      if (ReserveLineID          != null or !ignoreNullValues) that.ReserveLine            = ReserveLine
      if (ReservingCurrency      != null or !ignoreNullValues) that.ReservingCurrency      = ReservingCurrency
      if (Status                 != null or !ignoreNullValues) that.Status                 = Status
      if (SubmitDate             != null or !ignoreNullValues) that.SubmitDate             = SubmitDate
      if (TransactionSetID       != null or !ignoreNullValues) that.TransactionSet         = TransactionSet
    //
    if (that typeis Payment) {
      if (CheckID                != null or !ignoreNullValues) that.Check                  = Check
      if (DoesNotErodeReserves   != null or !ignoreNullValues) that.DoesNotErodeReserves   = DoesNotErodeReserves
      if (MatterID               != null or !ignoreNullValues) that.Matter                 = Matter
      if (PaymentType            != null or !ignoreNullValues) that.PaymentType            = PaymentType
    }
    if (that typeis Recovery) {
      if (ClaimContactID         != null or !ignoreNullValues) that.ClaimContact           = ClaimContact
    }
    return that
  }

  /**
   * Uses the createNew block to create a new Transaction, adds it to the supplied bundle, then updates it using the field values stored in this DTO. The ignoreNullValues parameter controls how the fields that are null are treated.
   * @param bundle The bundle in which to create the new Transaction.
   * @param createNew (Optional) A block that returns a new instance of Transaction. If this is null, the default constructor will be used.
   * @param ignoreNullValues (Optional) If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Transaction, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeToNewEntityIn(bundle : Bundle, createNew : block() : Transaction = null, ignoreNullValues = true) : Transaction {
    var instance : Transaction
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
   * @throws IllegalArgumentException if Subclass is null, since the base class (Transaction) is abstract.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final property get ConcreteSubtypeClassName() : String {
    if (Subtype == null) {
      throw new IllegalArgumentException("The subtype field must be set since Transaction is abstract and cannot be instantiated!")
    }
    return "entity." + Subtype.Code
  }

  /** Convenience property that returns the {@link Check} whose PublicID is {@code CheckID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Check()               : Check                   { return fetchByID(CheckID) }
  
  /** Convenience property that returns the {@link ClaimContact} whose PublicID is {@code ClaimContactID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get ClaimContact()        : ClaimContact            { return fetchByID(ClaimContactID) }
  
  /** Convenience property that returns the {@link Claim} whose PublicID is {@code ClaimID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Claim()               : Claim                   { return fetchByID(ClaimID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code CreateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CreateUser()          : User                    { return fetchByID(CreateUserID) }
  
  /** Convenience property that returns the {@link Exposure} whose PublicID is {@code ExposureID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Exposure()            : Exposure                { return fetchByID(ExposureID) }
  
  /** Convenience property that returns a {@link TransactionLineItem[]} of the objects whose PublicIDs are in {@code LineItemIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get LineItems()           : TransactionLineItem[]   { return fetchByID(LineItemIDs) }
  
  /** Convenience property that returns the {@link Matter} whose PublicID is {@code MatterID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Matter()              : Matter                  { return fetchByID(MatterID) }
  
  /** Convenience property that returns a {@link TransactionOffset[]} of the objects whose PublicIDs are in {@code OffsetIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Offsets()             : TransactionOffset[]     { return fetchByID(OffsetIDs) }
  
  /** Convenience property that returns a {@link TransactionOnset[]} of the objects whose PublicIDs are in {@code OnsetIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Onsets()              : TransactionOnset[]      { return fetchByID(OnsetIDs) }
  
  /** Convenience property that returns the {@link ReserveLine} whose PublicID is {@code ReserveLineID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get ReserveLine()         : ReserveLine             { return fetchByID(ReserveLineID) }
  
  /** Convenience property that returns a {@link TAccountTransaction[]} of the objects whose PublicIDs are in {@code TAccountTransactionIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get TAccountTransactions() : TAccountTransaction[]   { return fetchByID(TAccountTransactionIDs) }
  
  /** Convenience property that returns the {@link TransactionSet} whose PublicID is {@code TransactionSetID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get TransactionSet()      : TransactionSet          { return fetchByID(TransactionSetID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code UpdateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get UpdateUser()          : User                    { return fetchByID(UpdateUserID) }

  /**
   * Returns whether the fields tracked by this DTO match the same fields in the other DTO
   * @param that The TransactionDTO to compare against.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function equals(that : Object) : boolean {
    if (that typeis TransactionDTO) {
      return CheckID                == that.CheckID
         and ClaimContactID         == that.ClaimContactID
         and ClaimID                == that.ClaimID
         and Comments               == that.Comments
         and CostCategory           == that.CostCategory
         and CostType               == that.CostType
         and Currency               == that.Currency
         and DoesNotErodeReserves   == that.DoesNotErodeReserves
         and ExposureID             == that.ExposureID
         and MatterID               == that.MatterID
         and PaymentType            == that.PaymentType
         and PublicID               == that.PublicID
         and RecoveryCategory       == that.RecoveryCategory
         and ReserveLineID          == that.ReserveLineID
         and ReservingCurrency      == that.ReservingCurrency
         and Status                 == that.Status
         and SubmitDate             == that.SubmitDate
         and TransactionSetID       == that.TransactionSetID
    }
    return super.equals(that)
  }

  /**
   * Returns the hash code of this object.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function hashCode() : int {
    return {
      CheckID,
      ClaimContactID,
      ClaimID,
      Comments,
      CostCategory,
      CostType,
      Currency,
      DoesNotErodeReserves,
      ExposureID,
      MatterID,
      PaymentType,
      PublicID,
      RecoveryCategory,
      ReserveLineID,
      ReservingCurrency,
      Status,
      SubmitDate,
      TransactionSetID
    }.reduce(17, \ hashCode, obj -> 31 * hashCode + obj?.hashCode())
  }

  /**
   * Provides a rough idea of the command needed to re-create this DTO. Because it is rough it is probably only  useful for debugging purposes.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function toString() : String {
    var fields = {} as List<String>

    if (Amount                  != null  ) fields.add(':Amount                 = ' + Amount)
    if (CheckID               .HasContent) fields.add(':CheckID                = ' + StringUtil.enquote(CheckID))
    if (ClaimContactID        .HasContent) fields.add(':ClaimContactID         = ' + StringUtil.enquote(ClaimContactID))
    if (ClaimID               .HasContent) fields.add(':ClaimID                = ' + StringUtil.enquote(ClaimID))
    if (Comments              .HasContent) fields.add(':Comments               = ' + StringUtil.enquote(Comments))
    if (CostCategory            != null  ) fields.add(':CostCategory           = CostCategory.get("' + CostCategory.Code + '")')
    if (CostType                != null  ) fields.add(':CostType               = CostType.get("' + CostType.Code + '")')
    if (CreateTime              != null  ) fields.add(':CreateTime             = ' + StringUtil.enquote(CreateTime.toString()) + ' as Date')
    if (CreateUserID          .HasContent) fields.add(':CreateUserID           = ' + StringUtil.enquote(CreateUserID))
    if (Currency                != null  ) fields.add(':Currency               = Currency.get("' + Currency.Code + '")')
    if (Deletable               == true  ) fields.add(':Deletable              = true')
    if (DoesNotErodeReserves    != null  ) fields.add(':DoesNotErodeReserves   = ' + DoesNotErodeReserves)
    if (Editable                == true  ) fields.add(':Editable               = true')
    if (ExposureID            .HasContent) fields.add(':ExposureID             = ' + StringUtil.enquote(ExposureID))
    if (LineItemIDs             != null  ) fields.add(':LineItemIDs            = ' + LineItemIDs)
    if (LoadCommandID           != null  ) fields.add(':LoadCommandID          = ' + LoadCommandID)
    if (MatterID              .HasContent) fields.add(':MatterID               = ' + StringUtil.enquote(MatterID))
    if (NewLineItems            != null  ) fields.add(':NewLineItems           = ' + NewLineItems)
    if (NotApproved             == true  ) fields.add(':NotApproved            = true')
    if (OffsetIDs               != null  ) fields.add(':OffsetIDs              = ' + OffsetIDs)
    if (OnsetIDs                != null  ) fields.add(':OnsetIDs               = ' + OnsetIDs)
    if (PaymentType             != null  ) fields.add(':PaymentType            = PaymentType.get("' + PaymentType.Code + '")')
    if (PublicID              .HasContent) fields.add(':PublicID               = ' + StringUtil.enquote(PublicID))
    if (RecoveryCategory        != null  ) fields.add(':RecoveryCategory       = RecoveryCategory.get("' + RecoveryCategory.Code + '")')
    if (ReserveLineID         .HasContent) fields.add(':ReserveLineID          = ' + StringUtil.enquote(ReserveLineID))
    if (ReservingCurrency       != null  ) fields.add(':ReservingCurrency      = Currency.get("' + ReservingCurrency.Code + '")')
    if (Status                  != null  ) fields.add(':Status                 = TransactionStatus.get("' + Status.Code + '")')
    if (SubmitDate              != null  ) fields.add(':SubmitDate             = ' + StringUtil.enquote(SubmitDate.toString()) + ' as Date')
    if (Subtype                 != null  ) fields.add(':Subtype                = typekey.Transaction.get("' + Subtype.Code + '")')
    if (TAccountTransactionIDs  != null  ) fields.add(':TAccountTransactionIDs = ' + TAccountTransactionIDs)
    if (TransactionDate         != null  ) fields.add(':TransactionDate        = ' + StringUtil.enquote(TransactionDate.toString()) + ' as Date')
    if (TransactionSetID      .HasContent) fields.add(':TransactionSetID       = ' + StringUtil.enquote(TransactionSetID))
    if (TransactionTypeName   .HasContent) fields.add(':TransactionTypeName    = ' + StringUtil.enquote(TransactionTypeName))
    if (UpdateTime              != null  ) fields.add(':UpdateTime             = ' + StringUtil.enquote(UpdateTime.toString()) + ' as Date')
    if (UpdateUserID          .HasContent) fields.add(':UpdateUserID           = ' + StringUtil.enquote(UpdateUserID))

    return "new TransactionDTO() {\n  " + fields.join(",\n  ") + "\n}"
  }

  /**
   * return a new TransactionDTO that represents the current state of the supplied Transaction.
   * @param that The Transaction to be represented.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  static function valueOf(that : Transaction) : TransactionDTO {
    return new TransactionDTO().readFrom(that)
  }

  /**
   * Returns all of the Transaction instances whose public IDs are in the supplied list, or an empty array if the supplied list is null or empty.
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
   * Returns the Transaction whose public ID is in the supplied list, or null if the publicID is null.
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