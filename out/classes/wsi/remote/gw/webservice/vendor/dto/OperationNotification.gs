package wsi.remote.gw.webservice.vendor.dto

uses org.json.simple.JSONObject
uses org.json.simple.parser.JSONParser
uses wsi.remote.gw.webservice.vendor.vendorportal.servicerequestnotificationapi.ServiceRequestNotificationAPIService

uses java.util.Map

@Export
class OperationNotification extends Notification {
  
  var operation: ServiceRequestOperation as Operation
  var invoicePublicID: String as InvoicePublicID

  construct () {}

  construct(serviceRequest : ServiceRequest, serviceRequestOp : ServiceRequestOperation) {
    super(serviceRequest)
    this.Operation = serviceRequestOp
  }

  construct(serviceRequestInv : ServiceRequestInvoice, serviceRequestOp : ServiceRequestOperation) {
    this(serviceRequestInv.ServiceRequest, serviceRequestOp)
    this.InvoicePublicID = serviceRequestInv.PublicID
  }

  /**
   * Create a JSONObject from this notification
   */
  override public function toJSON() : JSONObject {
    var obj = super.toJSON()
    obj.put("operationCode", this.Operation as String)
    if (InvoicePublicID != null) {
      obj.put("invoicePublicID", this.InvoicePublicID)
    }
    return obj
  }

  /**
   * Create a OperationNotification from the supplied json message
   */
  static function fromJSON(json : String) : OperationNotification {
     var parser = new JSONParser()
     var newOpNotification = new OperationNotification()
     newOpNotification.populateFromJson(json)
     var obj = parser.parse(json) as JSONObject
     newOpNotification.Operation = obj.get("operationCode").toString()
     if (obj.containsKey("invoicePublicID")) {
       newOpNotification.InvoicePublicID = obj.get("invoicePublicID").toString()
     }
     return newOpNotification
  }

  override function send(srAPI : ServiceRequestNotificationAPIService) {
    srAPI.async_sendOperationNotification(this.ABUID, this.EmailAddress, this.ServiceRequestNumber, this.Operation.Code, this.InvoicePublicID).start()
  }
}
