package gw.api.financials

uses java.util.Date
uses gw.api.database.Query
uses gw.api.webservice.cc.financials.bulkpay.BulkInvoiceAPIImpl
uses java.util.ArrayList

/**
 * Created with IntelliJ IDEA.
 * User: AbhinavShaurya
 * Date: 1/9/21
 * Time: 8:27 PM
 * To change this template use File | Settings | File Templates.
 */
class BulkInvoiceHelperSample {

    static function createBulkInvoice(bulkInvoice : BulkInvoice) {
      var bulkInvoiceAPI  = new BulkInvoiceAPIImpl()
      var clm =Claim.finder.findClaimByClaimNumber("000-00-000604")
      var bulkInvItemArray = new ArrayList<BulkInvoiceItem>()
      var bulkInvoiceItem = new BulkInvoiceItem()
      bulkInvoiceItem.Claim = clm
      bulkInvoiceItem.Status = typekey.BulkInvoiceItemStatus.TC_DRAFT
      bulkInvoiceItem.CostType =  CostType.TC_CLAIMCOST
      bulkInvoiceItem.CostCategory = CostCategory.TC_INDEMNITY
      bulkInvoiceItem.PaymentType = typekey.PaymentType.TC_PARTIAL
      bulkInvoiceItem.ReservingCurrency = clm.Currency
      bulkInvoiceItem.ClaimNumber =  clm.ClaimNumber
      bulkInvoiceItem.Amount = new CurrencyAmount(1bd, clm.Currency)
      bulkInvoiceItem.BulkInvoice = bulkInvoice
      bulkInvoiceItem.setNonEroding(false)
      bulkInvItemArray.add(bulkInvoiceItem)
      bulkInvoice.InvoiceItems= bulkInvItemArray
      gw.transaction.Transaction.runWithNewBundle(\bundle -> {
        var payee = Query.make(Contact).select().firstWhere( \ elt -> elt.AddressBookUID!= null)
        var bulkInvoiceP = populateBulkInvoice(bulkInvoice, payee)
        var bulkInvoiceNew = bulkInvoiceAPI.createBulkInvoice(bulkInvoiceP)
        bulkInvoiceAPI.addItems(bulkInvoice.PublicID, bulkInvItemArray)
      },"su")
    }

    public static function populateBulkInvoice(bulkInvoice : BulkInvoice, payee : Contact) : BulkInvoice {

      bulkInvoice.Payee = payee
      bulkInvoice.AccountName ="new Account"
      bulkInvoice.InvoiceNumber=String.valueOf(gw.api.system.database.SequenceUtil.next(1, "INV"))
      bulkInvoice.PaymentMethod = PaymentMethod.TC_CHECK
      bulkInvoice.DeliveryMethod = DeliveryMethod.TC_NO_CHECK_NEEDED
      bulkInvoice.DefaultPaymentType = PaymentType.TC_PARTIAL
      bulkInvoice.ReceivedDate =  Date.CurrentDate.addBusinessDays(-1)
      bulkInvoice.SplitEqually = false
      bulkInvoice.Currency = Currency.TC_USD
      bulkInvoice.ScheduledSendDate = gw.api.util.DateUtil.currentDate()
      bulkInvoice.CheckInstructions = CheckHandlingInstructions.TC_DEFAULT
      bulkInvoice.PublicID = String.valueOf(gw.api.system.database.SequenceUtil.next(1, "bulkInvoicePublicIdSeq"))
      bulkInvoice.PayTo = "PARA0111"

      return bulkInvoice
    }
}