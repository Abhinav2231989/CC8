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
 * A(n) {@link CheckDTO} is a DTO that represents an instance of {@link entity.Check} for use by certain WS-I Web Services in the base product. This file is composed of basic getters and setters, plus members that make it easier for server-side code to work with DTOs, like virtual getters that query for entities by PublidID, and methods to copy fields to or from an instance of {@link entity.Check}.
 * <p>None of these methods constrain how an instance of CheckDTO is created, initialized or used (beyond the normal Gosu type checking): this is consistent with the <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO Design Pattern</a>, which states that "DTOs are simple objects that should not contain any business logic that would require testing". Validation logic that considers whether a DTO field can have a <i>particular</i> value (based on things like effective dates, jurisdictions, line of business, user permissions, the values of other fields, etc.) should not be handled here, but rather by the API that manipulates the CheckDTO.
 * <p>Please read the documentation in the accelerator before reusing this class in any additional WS-I Web Services.</p>
 * <p>Fields are mapped according to the following rules:
 * <ul><li>Primitive values are copied directly</li><li>Typekey fields are copied directly (the WS-I layer translates them to/from WS-I enums)</li><li>Foreign keys fields are represented by the target object's PublicID</li><li>Arraykey fields are represented by an array of the PublicIDs of the elements in the array</li></ul></p>
 * <p>The specific mappings for {@link CheckDTO} are as follows:
 * <table border="1"><tr><th>Field</th><th>Maps to</th></tr><tr><td>AccountName</td><td>Check.AccountName</td></tr><tr><td>BankAccount</td><td>Check.BankAccount</td></tr><tr><td>BankAccountNumber</td><td>Check.BankAccountNumber</td></tr><tr><td>BankAccountType</td><td>Check.BankAccountType</td></tr><tr><td>BankName</td><td>Check.BankName</td></tr><tr><td>BankRoutingNumber</td><td>Check.BankRoutingNumber</td></tr><tr><td>CheckBatching</td><td>Check.CheckBatching</td></tr><tr><td>CheckInstructions</td><td>Check.CheckInstructions</td></tr><tr><td>CheckNumber</td><td>Check.CheckNumber</td></tr><tr><td>CheckSetID</td><td>Check.CheckSet.PublicID</td></tr><tr><td>CheckType</td><td>Check.CheckType</td></tr><tr><td>ClaimContactID</td><td>Check.ClaimContact.PublicID</td></tr><tr><td>ClaimID</td><td>Check.Claim.PublicID</td></tr><tr><td>Comments</td><td>Check.Comments</td></tr><tr><td>CreateTime</td><td>Check.CreateTime</td></tr><tr><td>CreateUserID</td><td>Check.CreateUser.PublicID</td></tr><tr><td>DateOfService</td><td>Check.DateOfService</td></tr><tr><td>DeductionIDs</td><td>Check.Deductions*.PublicID</td></tr><tr><td>DeductionType</td><td>Check.DeductionType</td></tr><tr><td>DeliveryMethod</td><td>Check.DeliveryMethod</td></tr><tr><td>EnteredTime</td><td>Check.EnteredTime</td></tr><tr><td>GroupID</td><td>Check.Group.PublicID</td></tr><tr><td>InvoiceNumber</td><td>Check.InvoiceNumber</td></tr><tr><td>IsPrimary</td><td>Check.IsPrimary</td></tr><tr><td>IssueDate</td><td>Check.IssueDate</td></tr><tr><td>MailTo</td><td>Check.MailTo</td></tr><tr><td>MailToAddress</td><td>Check.MailToAddress</td></tr><tr><td>Memo</td><td>Check.Memo</td></tr><tr><td>PayeeIDs</td><td>Check.Payees*.PublicID</td></tr><tr><td>PaymentIDs</td><td>Check.Payments*.PublicID</td></tr><tr><td>PaymentMethod</td><td>Check.PaymentMethod</td></tr><tr><td>PayTo</td><td>Check.PayTo</td></tr><tr><td>PendEscalationForBulk</td><td>Check.PendEscalationForBulk</td></tr><tr><td>PortionID</td><td>Check.Portion.PublicID</td></tr><tr><td>PublicID</td><td>Check.PublicID</td></tr><tr><td>RecurringCheckID</td><td>Check.RecurringCheck.PublicID</td></tr><tr><td>Reportability</td><td>Check.Reportability</td></tr><tr><td>ReportableAmount</td><td>Check.ReportableAmount</td></tr><tr><td>ScheduledSendDate</td><td>Check.ScheduledSendDate</td></tr><tr><td>ServicePdEnd</td><td>Check.ServicePdEnd</td></tr><tr><td>ServicePdStart</td><td>Check.ServicePdStart</td></tr><tr><td>ServiceRequestInvoiceIDs</td><td>Check.ServiceRequestInvoices*.PublicID</td></tr><tr><td>Status</td><td>Check.Status</td></tr><tr><td>UpdateTime</td><td>Check.UpdateTime</td></tr><tr><td>UpdateUserID</td><td>Check.UpdateUser.PublicID</td></tr></table></p>
 * <br/>This file was generated using the following property definitions:<br/><pre>Check#AccountName,            // String<br/>Check#BankAccount,            // typekey.BankAccount<br/>Check#BankAccountNumber,      // String<br/>Check#BankAccountType,        // typekey.BankAccountType<br/>Check#BankName,               // String<br/>Check#BankRoutingNumber,      // String<br/>Check#CheckBatching,          // typekey.CheckBatching<br/>Check#CheckInstructions,      // typekey.CheckHandlingInstructions<br/>Check#CheckNumber,            // String<br/>Check#CheckSet,               // CheckSet<br/>Check#CheckType,              // typekey.CheckType<br/>Check#Claim,                  // Claim<br/>Check#ClaimContact,           // ClaimContact<br/>Check#Comments,               // String<br/>Check#DateOfService,          // java.util.Date<br/>Check#Deductions,             // Deduction[]<br/>Check#DeductionType,          // typekey.DeductionType<br/>Check#DeliveryMethod,         // typekey.DeliveryMethod<br/>Check#EnteredTime,            // java.util.Date<br/>Check#Group,                  // CheckGroup<br/>Check#InvoiceNumber,          // String<br/>Check#IsPrimary,              // Boolean<br/>Check#IssueDate,              // java.util.Date<br/>Check#MailTo,                 // String<br/>Check#MailToAddress,          // String<br/>Check#Memo,                   // String<br/>Check#Payees,                 // CheckPayee[]<br/>Check#PaymentMethod,          // typekey.PaymentMethod<br/>Check#Payments,               // Payment[]<br/>Check#PayTo,                  // String<br/>Check#PendEscalationForBulk,  // Boolean<br/>Check#Portion,                // CheckPortion<br/>Check#RecurringCheck,         // RecurringCheck<br/>Check#Reportability,          // typekey.ReportabilityType<br/>Check#ReportableAmount,       // gw.api.financials.CurrencyAmount<br/>Check#ScheduledSendDate,      // java.util.Date<br/>Check#ServicePdEnd,           // java.util.Date<br/>Check#ServicePdStart,         // java.util.Date<br/>Check#ServiceRequestInvoices, // ServiceRequestInvoice[]<br/>Check#Status                  // typekey.TransactionStatus</pre>
 */
@Export
@WsiExportable("http://guidewire.com/cc/ws/gw/webservice/cc/cc801/dto/CheckDTO")
@Generated("DTOBuilder", "DO NOT edit this class directly! See comments at the top of the file.", "2014-01-28T16:22Z")
final class CheckDTO {
  var _accountName              : String                           as AccountName
  var _bankAccount              : BankAccount                      as BankAccount
  var _bankAccountNumber        : String                           as BankAccountNumber
  var _bankAccountType          : BankAccountType                  as BankAccountType
  var _bankName                 : String                           as BankName
  var _bankRoutingNumber        : String                           as BankRoutingNumber
  var _checkBatching            : CheckBatching                    as CheckBatching
  var _checkInstructions        : CheckHandlingInstructions        as CheckInstructions
  var _checkNumber              : String                           as CheckNumber
  /** Derived from Check#CheckSet.PublicID */
  var _checkSetID               : String                           as CheckSetID
  var _checkType                : CheckType                        as CheckType
  /** Derived from Check#ClaimContact.PublicID */
  var _claimContactID           : String                           as ClaimContactID
  /** Derived from Check#Claim.PublicID */
  var _claimID                  : String                           as ClaimID
  var _comments                 : String                           as Comments
  var _createTime               : Date                             as CreateTime
  /** Derived from Editable#CreateUser.PublicID */
  var _createUserID             : String                           as CreateUserID
  var _dateOfService            : Date                             as DateOfService
  /** Derived from Check#Deductions*.PublicID */
  var _deductionIDs             : String[]                         as DeductionIDs = {}
  var _deductionType            : DeductionType                    as DeductionType
  var _deliveryMethod           : DeliveryMethod                   as DeliveryMethod
  var _enteredTime              : Date                             as EnteredTime
  /** Derived from Check#Group.PublicID */
  var _groupID                  : String                           as GroupID
  var _invoiceNumber            : String                           as InvoiceNumber
  var _isPrimary                : Boolean                          as IsPrimary
  var _issueDate                : Date                             as IssueDate
  var _mailTo                   : String                           as MailTo
  var _mailToAddress            : String                           as MailToAddress
  var _memo                     : String                           as Memo
  var _newAdditionalPayees      : CheckPayeeDTO[]                  as NewAdditionalPayees = {}
  var _newJointPayees           : CheckPayeeDTO[]                  as NewJointPayees = {}
  var _newPayees                : CheckPayeeDTO[]                  as NewPayees = {}
  var _newPayments              : TransactionDTO[]                 as NewPayments = {}
  var _newPrimaryPayee          : CheckPayeeDTO                    as NewPrimaryPayee
  /** Derived from Check#Payees*.PublicID */
  var _payeeIDs                 : String[]                         as PayeeIDs = {}
  /** Derived from Check#Payments*.PublicID */
  var _paymentIDs               : String[]                         as PaymentIDs = {}
  var _paymentMethod            : PaymentMethod                    as PaymentMethod
  var _payTo                    : String                           as PayTo
  var _pendEscalationForBulk    : Boolean                          as PendEscalationForBulk
  /** Derived from Check#Portion.PublicID */
  var _portionID                : String                           as PortionID
  var _publicID                 : String                           as PublicID
  /** Derived from Check#RecurringCheck.PublicID */
  var _recurringCheckID         : String                           as RecurringCheckID
  var _reportability            : ReportabilityType                as Reportability
  var _reportableAmount         : gw.api.financials.CurrencyAmount as ReportableAmount
  var _scheduledSendDate        : Date                             as ScheduledSendDate
  var _servicePdEnd             : Date                             as ServicePdEnd
  var _servicePdStart           : Date                             as ServicePdStart
  /** Derived from Check#ServiceRequestInvoices*.PublicID */
  var _serviceRequestInvoiceIDs : String[]                         as ServiceRequestInvoiceIDs = {}
  var _status                   : TransactionStatus                as Status
  var _updateTime               : Date                             as UpdateTime
  /** Derived from Editable#UpdateUser.PublicID */
  var _updateUserID             : String                           as UpdateUserID

  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  construct() { }

  /**
   * Copies the platform-managed fields from the supplied Check
   * @param that The Check to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  protected function _copyReadOnlyFieldsFrom(that : Check) {
    // if field is on base class
      _createTime               = that.CreateTime
      _createUserID             = that.CreateUser.PublicID
      _deductionIDs             = that.Deductions*.PublicID
      _payeeIDs                 = that.Payees*.PublicID
      _paymentIDs               = that.Payments*.PublicID
      _serviceRequestInvoiceIDs = that.ServiceRequestInvoices*.PublicID
      _updateTime               = that.UpdateTime
      _updateUserID             = that.UpdateUser.PublicID
    //
  }

  /**
   * Set the fields in this DTO using the supplied Check
   * @param that The Check to copy from.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function readFrom(that : Check) : CheckDTO {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      AccountName               = that.AccountName
      BankAccount               = that.BankAccount
      BankAccountNumber         = that.BankAccountNumber
      BankAccountType           = that.BankAccountType
      BankName                  = that.BankName
      BankRoutingNumber         = that.BankRoutingNumber
      CheckBatching             = that.CheckBatching
      CheckInstructions         = that.CheckInstructions
      CheckNumber               = that.CheckNumber
      CheckSetID                = that.CheckSet.PublicID
      CheckType                 = that.CheckType
      ClaimContactID            = that.ClaimContact.PublicID
      ClaimID                   = that.Claim.PublicID
      Comments                  = that.Comments
      DateOfService             = that.DateOfService
      DeductionType             = that.DeductionType
      DeliveryMethod            = that.DeliveryMethod
      EnteredTime               = that.EnteredTime
      GroupID                   = that.Group.PublicID
      InvoiceNumber             = that.InvoiceNumber
      IsPrimary                 = that.IsPrimary
      IssueDate                 = that.IssueDate
      MailTo                    = that.MailTo
      MailToAddress             = that.MailToAddress
      Memo                      = that.Memo
      PayTo                     = that.PayTo
      PaymentMethod             = that.PaymentMethod
      PendEscalationForBulk     = that.PendEscalationForBulk
      PortionID                 = that.Portion.PublicID
      PublicID                  = that.PublicID
      RecurringCheckID          = that.RecurringCheck.PublicID
      Reportability             = that.Reportability
      ReportableAmount          = that.ReportableAmount
      ScheduledSendDate         = that.ScheduledSendDate
      ServicePdEnd              = that.ServicePdEnd
      ServicePdStart            = that.ServicePdStart
      Status                    = that.Status
    //
    return this
  }

  /**
   * Update the supplied Check using the field values stored in this DTO
   * @param that The Check to update.
   * @param (Optional) ignoreNullValues If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Check, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeTo(that : Check, ignoreNullValues = true) : Check {
    _copyReadOnlyFieldsFrom(that)

    // if field is on base class
      if (AccountName              != null or !ignoreNullValues) that.AccountName              = AccountName
      if (BankAccount              != null or !ignoreNullValues) that.BankAccount              = BankAccount
      if (BankAccountNumber        != null or !ignoreNullValues) that.BankAccountNumber        = BankAccountNumber
      if (BankAccountType          != null or !ignoreNullValues) that.BankAccountType          = BankAccountType
      if (BankName                 != null or !ignoreNullValues) that.BankName                 = BankName
      if (BankRoutingNumber        != null or !ignoreNullValues) that.BankRoutingNumber        = BankRoutingNumber
      if (CheckBatching            != null or !ignoreNullValues) that.CheckBatching            = CheckBatching
      if (CheckInstructions        != null or !ignoreNullValues) that.CheckInstructions        = CheckInstructions
      if (CheckNumber              != null or !ignoreNullValues) that.CheckNumber              = CheckNumber
      if (CheckSetID               != null or !ignoreNullValues) that.CheckSet                 = CheckSet
      if (CheckType                != null or !ignoreNullValues) that.CheckType                = CheckType
      if (ClaimContactID           != null or !ignoreNullValues) that.ClaimContact             = ClaimContact
      if (ClaimID                  != null or !ignoreNullValues) that.Claim                    = Claim
      if (Comments                 != null or !ignoreNullValues) that.Comments                 = Comments
      if (DateOfService            != null or !ignoreNullValues) that.DateOfService            = DateOfService
      if (DeductionType            != null or !ignoreNullValues) that.DeductionType            = DeductionType
      if (DeliveryMethod           != null or !ignoreNullValues) that.DeliveryMethod           = DeliveryMethod
      if (EnteredTime              != null or !ignoreNullValues) that.EnteredTime              = EnteredTime
      if (GroupID                  != null or !ignoreNullValues) that.Group                    = Group
      if (InvoiceNumber            != null or !ignoreNullValues) that.InvoiceNumber            = InvoiceNumber
      if (IsPrimary                != null or !ignoreNullValues) that.IsPrimary                = IsPrimary
      if (IssueDate                != null or !ignoreNullValues) that.IssueDate                = IssueDate
      if (MailTo                   != null or !ignoreNullValues) that.MailTo                   = MailTo
      if (MailToAddress            != null or !ignoreNullValues) that.MailToAddress            = MailToAddress
      if (Memo                     != null or !ignoreNullValues) that.Memo                     = Memo
      if (PayTo                    != null or !ignoreNullValues) that.PayTo                    = PayTo
      if (PaymentMethod            != null or !ignoreNullValues) that.PaymentMethod            = PaymentMethod
      if (PendEscalationForBulk    != null or !ignoreNullValues) that.PendEscalationForBulk    = PendEscalationForBulk
      if (PortionID                != null or !ignoreNullValues) that.Portion                  = Portion
      if (PublicID                 != null or !ignoreNullValues) that.PublicID                 = PublicID
      if (RecurringCheckID         != null or !ignoreNullValues) that.RecurringCheck           = RecurringCheck
      if (Reportability            != null or !ignoreNullValues) that.Reportability            = Reportability
      if (ReportableAmount         != null or !ignoreNullValues) that.ReportableAmount         = ReportableAmount
      if (ScheduledSendDate        != null or !ignoreNullValues) that.ScheduledSendDate        = ScheduledSendDate
      if (ServicePdEnd             != null or !ignoreNullValues) that.ServicePdEnd             = ServicePdEnd
      if (ServicePdStart           != null or !ignoreNullValues) that.ServicePdStart           = ServicePdStart
      if (Status                   != null or !ignoreNullValues) that.Status                   = Status
    //
    return that
  }

  /**
   * Uses the createNew block to create a new Check, adds it to the supplied bundle, then updates it using the field values stored in this DTO. The ignoreNullValues parameter controls how the fields that are null are treated.
   * @param bundle The bundle in which to create the new Check.
   * @param createNew (Optional) A block that returns a new instance of Check. If this is null, the default constructor will be used.
   * @param ignoreNullValues (Optional) If {@code true}, only those fields that are non-null are used (i.e. the null-valued fields are treated as if they were unspecified). If {@code false}, every DTO field will be used to update the Check, even those that are null. Usually you will want this to be {@code true}.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  final function writeToNewEntityIn(bundle : Bundle, createNew : block() : Check = null, ignoreNullValues = true) : Check {
    var instance : Check
    if (createNew == null) {
      instance = bundle == null
          ? new Check()
          : new Check(bundle)
    }
    else {
      instance = createNew()

      if (bundle != null) {
        instance = bundle.add(instance)
      }
    }
    return writeTo(instance, ignoreNullValues)
  }

  /** Convenience property that returns the {@link CheckSet} whose PublicID is {@code CheckSetID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CheckSet()              : CheckSet                        { return fetchByID(CheckSetID) }
  
  /** Convenience property that returns the {@link ClaimContact} whose PublicID is {@code ClaimContactID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get ClaimContact()          : ClaimContact                    { return fetchByID(ClaimContactID) }
  
  /** Convenience property that returns the {@link Claim} whose PublicID is {@code ClaimID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Claim()                 : Claim                           { return fetchByID(ClaimID) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code CreateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get CreateUser()            : User                            { return fetchByID(CreateUserID) }
  
  /** Convenience property that returns a {@link Deduction[]} of the objects whose PublicIDs are in {@code DeductionIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Deductions()            : Deduction[]                     { return fetchByID(DeductionIDs) }
  
  /** Convenience property that returns the {@link CheckGroup} whose PublicID is {@code GroupID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Group()                 : CheckGroup                      { return fetchByID(GroupID) }
  
  /** Convenience property that returns a {@link CheckPayee[]} of the objects whose PublicIDs are in {@code PayeeIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Payees()                : CheckPayee[]                    { return fetchByID(PayeeIDs) }
  
  /** Convenience property that returns a {@link Payment[]} of the objects whose PublicIDs are in {@code PaymentIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Payments()              : Payment[]                       { return fetchByID(PaymentIDs) }
  
  /** Convenience property that returns the {@link CheckPortion} whose PublicID is {@code PortionID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get Portion()               : CheckPortion                    { return fetchByID(PortionID) }
  
  /** Convenience property that returns the {@link RecurringCheck} whose PublicID is {@code RecurringCheckID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get RecurringCheck()        : RecurringCheck                  { return fetchByID(RecurringCheckID) }
  
  /** Convenience property that returns a {@link ServiceRequestInvoice[]} of the objects whose PublicIDs are in {@code ServiceRequestInvoiceIDs}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get ServiceRequestInvoices() : ServiceRequestInvoice[]         { return fetchByID(ServiceRequestInvoiceIDs) }
  
  /** Convenience property that returns the {@link User} whose PublicID is {@code UpdateUserID}, or {@code null} if PublicID is {@code null}. This property is only available on the server--it is not exposed through the WS-I layer. */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  property get UpdateUser()            : User                            { return fetchByID(UpdateUserID) }

  /**
   * Returns whether the fields tracked by this DTO match the same fields in the other DTO
   * @param that The CheckDTO to compare against.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function equals(that : Object) : boolean {
    if (that typeis CheckDTO) {
      return AccountName              == that.AccountName
         and BankAccount              == that.BankAccount
         and BankAccountNumber        == that.BankAccountNumber
         and BankAccountType          == that.BankAccountType
         and BankName                 == that.BankName
         and BankRoutingNumber        == that.BankRoutingNumber
         and CheckBatching            == that.CheckBatching
         and CheckInstructions        == that.CheckInstructions
         and CheckNumber              == that.CheckNumber
         and CheckSetID               == that.CheckSetID
         and CheckType                == that.CheckType
         and ClaimContactID           == that.ClaimContactID
         and ClaimID                  == that.ClaimID
         and Comments                 == that.Comments
         and DateOfService            == that.DateOfService
         and DeductionType            == that.DeductionType
         and DeliveryMethod           == that.DeliveryMethod
         and EnteredTime              == that.EnteredTime
         and GroupID                  == that.GroupID
         and InvoiceNumber            == that.InvoiceNumber
         and IsPrimary                == that.IsPrimary
         and IssueDate                == that.IssueDate
         and MailTo                   == that.MailTo
         and MailToAddress            == that.MailToAddress
         and Memo                     == that.Memo
         and NewPrimaryPayee          == that.NewPrimaryPayee
         and PaymentMethod            == that.PaymentMethod
         and PayTo                    == that.PayTo
         and PendEscalationForBulk    == that.PendEscalationForBulk
         and PortionID                == that.PortionID
         and PublicID                 == that.PublicID
         and RecurringCheckID         == that.RecurringCheckID
         and Reportability            == that.Reportability
         and ReportableAmount         == that.ReportableAmount
         and ScheduledSendDate        == that.ScheduledSendDate
         and ServicePdEnd             == that.ServicePdEnd
         and ServicePdStart           == that.ServicePdStart
         and Status                   == that.Status
    }
    return super.equals(that)
  }

  /**
   * Returns the hash code of this object.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function hashCode() : int {
    return {
      AccountName,
      BankAccount,
      BankAccountNumber,
      BankAccountType,
      BankName,
      BankRoutingNumber,
      CheckBatching,
      CheckInstructions,
      CheckNumber,
      CheckSetID,
      CheckType,
      ClaimContactID,
      ClaimID,
      Comments,
      DateOfService,
      DeductionType,
      DeliveryMethod,
      EnteredTime,
      GroupID,
      InvoiceNumber,
      IsPrimary,
      IssueDate,
      MailTo,
      MailToAddress,
      Memo,
      NewPrimaryPayee,
      PaymentMethod,
      PayTo,
      PendEscalationForBulk,
      PortionID,
      PublicID,
      RecurringCheckID,
      Reportability,
      ReportableAmount,
      ScheduledSendDate,
      ServicePdEnd,
      ServicePdStart,
      Status
    }.reduce(17, \ hashCode, obj -> 31 * hashCode + obj?.hashCode())
  }

  /**
   * Provides a rough idea of the command needed to re-create this DTO. Because it is rough it is probably only  useful for debugging purposes.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  override final function toString() : String {
    var fields = {} as List<String>

    if (AccountName             .HasContent) fields.add(':AccountName              = ' + StringUtil.enquote(AccountName))
    if (BankAccount               != null  ) fields.add(':BankAccount              = BankAccount.get("' + BankAccount.Code + '")')
    if (BankAccountNumber       .HasContent) fields.add(':BankAccountNumber        = ' + StringUtil.enquote(BankAccountNumber))
    if (BankAccountType           != null  ) fields.add(':BankAccountType          = BankAccountType.get("' + BankAccountType.Code + '")')
    if (BankName                .HasContent) fields.add(':BankName                 = ' + StringUtil.enquote(BankName))
    if (BankRoutingNumber       .HasContent) fields.add(':BankRoutingNumber        = ' + StringUtil.enquote(BankRoutingNumber))
    if (CheckBatching             != null  ) fields.add(':CheckBatching            = CheckBatching.get("' + CheckBatching.Code + '")')
    if (CheckInstructions         != null  ) fields.add(':CheckInstructions        = CheckHandlingInstructions.get("' + CheckInstructions.Code + '")')
    if (CheckNumber             .HasContent) fields.add(':CheckNumber              = ' + StringUtil.enquote(CheckNumber))
    if (CheckSetID              .HasContent) fields.add(':CheckSetID               = ' + StringUtil.enquote(CheckSetID))
    if (CheckType                 != null  ) fields.add(':CheckType                = CheckType.get("' + CheckType.Code + '")')
    if (ClaimContactID          .HasContent) fields.add(':ClaimContactID           = ' + StringUtil.enquote(ClaimContactID))
    if (ClaimID                 .HasContent) fields.add(':ClaimID                  = ' + StringUtil.enquote(ClaimID))
    if (Comments                .HasContent) fields.add(':Comments                 = ' + StringUtil.enquote(Comments))
    if (CreateTime                != null  ) fields.add(':CreateTime               = ' + StringUtil.enquote(CreateTime.toString()) + ' as Date')
    if (CreateUserID            .HasContent) fields.add(':CreateUserID             = ' + StringUtil.enquote(CreateUserID))
    if (DateOfService             != null  ) fields.add(':DateOfService            = ' + StringUtil.enquote(DateOfService.toString()) + ' as Date')
    if (DeductionIDs              != null  ) fields.add(':DeductionIDs             = ' + DeductionIDs)
    if (DeductionType             != null  ) fields.add(':DeductionType            = DeductionType.get("' + DeductionType.Code + '")')
    if (DeliveryMethod            != null  ) fields.add(':DeliveryMethod           = DeliveryMethod.get("' + DeliveryMethod.Code + '")')
    if (EnteredTime               != null  ) fields.add(':EnteredTime              = ' + StringUtil.enquote(EnteredTime.toString()) + ' as Date')
    if (GroupID                 .HasContent) fields.add(':GroupID                  = ' + StringUtil.enquote(GroupID))
    if (InvoiceNumber           .HasContent) fields.add(':InvoiceNumber            = ' + StringUtil.enquote(InvoiceNumber))
    if (IsPrimary                 != null  ) fields.add(':IsPrimary                = ' + IsPrimary)
    if (IssueDate                 != null  ) fields.add(':IssueDate                = ' + StringUtil.enquote(IssueDate.toString()) + ' as Date')
    if (MailTo                  .HasContent) fields.add(':MailTo                   = ' + StringUtil.enquote(MailTo))
    if (MailToAddress           .HasContent) fields.add(':MailToAddress            = ' + StringUtil.enquote(MailToAddress))
    if (Memo                    .HasContent) fields.add(':Memo                     = ' + StringUtil.enquote(Memo))
    if (NewAdditionalPayees       != null  ) fields.add(':NewAdditionalPayees      = ' + NewAdditionalPayees)
    if (NewJointPayees            != null  ) fields.add(':NewJointPayees           = ' + NewJointPayees)
    if (NewPayees                 != null  ) fields.add(':NewPayees                = ' + NewPayees)
    if (NewPayments               != null  ) fields.add(':NewPayments              = ' + NewPayments)
    if (NewPrimaryPayee           != null  ) fields.add(':NewPrimaryPayee          = ' + NewPrimaryPayee)
    if (PayeeIDs                  != null  ) fields.add(':PayeeIDs                 = ' + PayeeIDs)
    if (PaymentIDs                != null  ) fields.add(':PaymentIDs               = ' + PaymentIDs)
    if (PaymentMethod             != null  ) fields.add(':PaymentMethod            = PaymentMethod.get("' + PaymentMethod.Code + '")')
    if (PayTo                   .HasContent) fields.add(':PayTo                    = ' + StringUtil.enquote(PayTo))
    if (PendEscalationForBulk     != null  ) fields.add(':PendEscalationForBulk    = ' + PendEscalationForBulk)
    if (PortionID               .HasContent) fields.add(':PortionID                = ' + StringUtil.enquote(PortionID))
    if (PublicID                .HasContent) fields.add(':PublicID                 = ' + StringUtil.enquote(PublicID))
    if (RecurringCheckID        .HasContent) fields.add(':RecurringCheckID         = ' + StringUtil.enquote(RecurringCheckID))
    if (Reportability             != null  ) fields.add(':Reportability            = ReportabilityType.get("' + Reportability.Code + '")')
    if (ReportableAmount          != null  ) fields.add(':ReportableAmount         = ' + ReportableAmount)
    if (ScheduledSendDate         != null  ) fields.add(':ScheduledSendDate        = ' + StringUtil.enquote(ScheduledSendDate.toString()) + ' as Date')
    if (ServicePdEnd              != null  ) fields.add(':ServicePdEnd             = ' + StringUtil.enquote(ServicePdEnd.toString()) + ' as Date')
    if (ServicePdStart            != null  ) fields.add(':ServicePdStart           = ' + StringUtil.enquote(ServicePdStart.toString()) + ' as Date')
    if (ServiceRequestInvoiceIDs  != null  ) fields.add(':ServiceRequestInvoiceIDs = ' + ServiceRequestInvoiceIDs)
    if (Status                    != null  ) fields.add(':Status                   = TransactionStatus.get("' + Status.Code + '")')
    if (UpdateTime                != null  ) fields.add(':UpdateTime               = ' + StringUtil.enquote(UpdateTime.toString()) + ' as Date')
    if (UpdateUserID            .HasContent) fields.add(':UpdateUserID             = ' + StringUtil.enquote(UpdateUserID))

    return "new CheckDTO() {\n  " + fields.join(",\n  ") + "\n}"
  }

  /**
   * return a new CheckDTO that represents the current state of the supplied Check.
   * @param that The Check to be represented.
   */
  @Generated("DTOBuilder", "DO NOT edit this method directly! See comments at the top of the file.", "2014-01-28T16:22Z")
  static function valueOf(that : Check) : CheckDTO {
    return new CheckDTO().readFrom(that)
  }

  /**
   * Returns all of the Check instances whose public IDs are in the supplied list, or an empty array if the supplied list is null or empty.
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
   * Returns the Check whose public ID is in the supplied list, or null if the publicID is null.
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