package wsi.remote.gw.webservice.vendor.dto

uses org.json.simple.JSONObject
uses org.json.simple.parser.JSONParser
uses wsi.remote.gw.webservice.vendor.vendorportal.servicerequestnotificationapi.ServiceRequestNotificationAPIService

@Export
class NewDocumentNotification extends Notification {

  
  var documentName : String as DocumentName

  construct () {}

  construct(srDocument : ServiceRequestDocumentLink) {
    super(srDocument.ServiceRequest)
    this.DocumentName = srDocument.LinkedDocument.DisplayName
  }

  /**
  * Create a JSONObject from this notification
  */
  public override function toJSON() : JSONObject {
    var obj = super.toJSON()
    obj.put("documentName", this.DocumentName)
    return obj
  }

  /**
  * Create a NewDocumentNotification from the supplied json message
  */
  static function fromJSON(json : String) : NewDocumentNotification {
     var parser = new JSONParser()
     var newDocNotification = new NewDocumentNotification()
     newDocNotification.populateFromJson(json)
     var obj = parser.parse(json) as JSONObject
     newDocNotification.DocumentName = obj.get("documentName").toString()
     return newDocNotification 
  }

  override function send(srAPI : ServiceRequestNotificationAPIService) {
    srAPI.async_sendNewDocumentNotification(this.ABUID, this.EmailAddress, this.ServiceRequestNumber, this.DocumentName).start()
  }
}
