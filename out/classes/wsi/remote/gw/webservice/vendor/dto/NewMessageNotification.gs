package wsi.remote.gw.webservice.vendor.dto

uses org.json.simple.JSONObject
uses org.json.simple.parser.JSONParser
uses wsi.remote.gw.webservice.vendor.vendorportal.servicerequestnotificationapi.ServiceRequestNotificationAPIService
uses java.util.Map

@Export
class NewMessageNotification extends Notification {

  var messageType : String as MessageType
  var messageSubject : String as MessageSubject
  var messageBody : String as MessageBody

  construct () {}

  construct(srMessage : ServiceRequestMessage) {
    super(srMessage.ServiceRequest)
    this.MessageType = srMessage.Type.DisplayName
    this.MessageSubject = srMessage.Title
    this.MessageBody = srMessage.Body
  }

  /**
   * Create a JSONObject from this notification
   */
  override public function toJSON() : JSONObject {
    var obj = super.toJSON()
    obj.put("messageType", this.MessageType)
    obj.put("messageSubject", this.MessageSubject)
    obj.put("messageBody", this.MessageBody)
    return obj
  }

  /**
   * Create a NewMessageNotification from the supplied json message
   */
  static function fromJSON(json : String) : NewMessageNotification {
     var parser = new JSONParser()
     var newMesNotification = new NewMessageNotification()
     newMesNotification.populateFromJson(json)
     var obj = parser.parse(json) as JSONObject
     newMesNotification.MessageType = obj.get("messageType").toString()
     newMesNotification.MessageSubject = obj.get("messageSubject").toString()
     newMesNotification.MessageBody = obj.get("messageBody").toString()
     return newMesNotification 
  }

  override function send(srAPI : ServiceRequestNotificationAPIService) {
    srAPI.async_sendNewMessageNotification(this.ABUID, this.EmailAddress, this.ServiceRequestNumber, this.MessageSubject, this.MessageType, this.MessageBody).start()
  }
}
