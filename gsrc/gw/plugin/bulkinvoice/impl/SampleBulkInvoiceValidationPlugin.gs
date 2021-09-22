package gw.plugin.bulkinvoice.impl;

uses gw.plugin.financials.IBulkInvoiceValidationPlugin

@Export
class SampleBulkInvoiceValidationPlugin implements IBulkInvoiceValidationPlugin {

  public override function validateBulkInvoice(bulkInvoice : BulkInvoice) : BIValidationAlert[] {
    // you have full access to the BulkInvoice's fields and the contained BulkInvoiceItems
    // i.e., var items   = bulkInvoice.InvoiceItems;
    //testing again  now
    // As a convenience for testing, we'll generate two validation alerts if the InvoiceNumber contains the word "fail"
    if (bulkInvoice.InvoiceNumber != null  and  bulkInvoice.InvoiceNumber.containsIgnoreCase("fail")) {
      var alert1 = new BIValidationAlert()
      // The BIValidationAlertType typelist is extendable. So be careful .ok
      alert1.AlertType = BIValidationAlertType.TC_UNSPECIFIED
      // This message will be displayed in the UI, and so should be meaningful to the user
      alert1.AlertMsg = "1st Failure"

      var alert2 = new BIValidationAlert()
      alert2.AlertType = null
      alert2.AlertMsg = "2nd Failure"

      return { alert1, alert2 }
    } else {
      // if validation succedded, return an empty array
      return {}
    }
  }

}
