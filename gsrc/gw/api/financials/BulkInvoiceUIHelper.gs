package gw.api.financials

uses gw.api.webservice.cc.financials.bulkpay.BulkInvoiceAPIImpl
uses java.util.ArrayList
uses gw.plugin.util.SequenceUtil
uses java.util.Date
uses gw.api.database.Query

/**
 * This class provides helpful methods for all the pages related to BulkInvoice.
 */
@Export
class BulkInvoiceUIHelper {



  /**
  * Callback that gets invoked just before submitting a BulkInvoice. This OOTB implementation updates the RequestingUser
  * of the BulkInvoice to the currently logged in user, if they are determined to be different. This is to handle the
  * cases where one user creates the BulkInvoice and another one (say, an admin) submits it.
  */
  static function beforeSubmit(bulkInvoice : BulkInvoice) {
    print("Tresting22222------------121212121212:another try from fork usig jra trying now at 20:42 ")
    print("Bit bucket testing push using YML file to sync in github-testing bugfixbranch using git and bitbuckeytsync")
    var currentUser = User.util.CurrentUser
    if (currentUser != bulkInvoice.RequestingUser) {
      gw.transaction.Transaction.runWithNewBundle( \ bundle -> {
        bundle.add(bulkInvoice).RequestingUser = currentUser
      })
    }
  }


}