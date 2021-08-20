package gw.plugin.bulkinvoice.impl

uses java.util.ArrayList
uses gw.plugin.financials.IBulkInvoiceValidationPlugin

/**
 * Created with IntelliJ IDEA.
 * User: ashaurya
 * To change this template use File | Settings | File Templates.
 */
@Export
class BulkInvoiceValidationPlugin implements IBulkInvoiceValidationPlugin {
  public override function validateBulkInvoice(bulkInvoice: BulkInvoice): BIValidationAlert[] {
    var alerts = new ArrayList()
    var items = bulkInvoice.InvoiceItems;

    //CHECK THE ENTIRE INVOICE FOR VALIDITY

    items.each(\item -> {
      if (item.Claim.IncidentReport){
        var invoiceNumEmptyAlert = new BIValidationAlert()
        invoiceNumEmptyAlert.AlertType = BIValidationAlertType.TC_UNSPECIFIED
        invoiceNumEmptyAlert.AlertMsg = "Claim Cannot be incident only"
        alerts.add(invoiceNumEmptyAlert)
      }

      if (item.Claim.State == ClaimState.TC_CLOSED){
        var invoiceNumEmptyAlert = new BIValidationAlert()
        invoiceNumEmptyAlert.AlertType = BIValidationAlertType.TC_UNSPECIFIED
        invoiceNumEmptyAlert.AlertMsg = "Claim Cannot be closed"
        alerts.add(invoiceNumEmptyAlert)
      }
    })


    return alerts
  }
}
