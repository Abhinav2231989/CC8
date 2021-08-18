package wsi.remote.gw.webservice.vendor.dto

uses org.json.simple.JSONObject
uses org.json.simple.parser.JSONParser
uses wsi.remote.gw.webservice.vendor.vendorportal.servicerequestnotificationapi.ServiceRequestNotificationAPIService
uses gw.api.database.Query
uses java.lang.IllegalArgumentException
uses java.util.Map

@Export
abstract class Notification {
  
  var eventName : String as EventName
  var abuid : String as ABUID
  var specialistPublicID : String as SpecialistPublicID
  var emailAddress : String as EmailAddress
  var serviceRequestNumber : String as ServiceRequestNumber
  var commMethod : SpecialistCommMethod as SpecialistCommMethod

  construct () {}

  construct (serviceRequest : ServiceRequest) {
    this.SpecialistPublicID = serviceRequest.Specialist.PublicID
    this.ABUID = serviceRequest.Specialist.AddressBookUID //May be null but will be set later during prepareForSend
    this.EmailAddress = serviceRequest.Specialist.EmailAddress1
    this.ServiceRequestNumber = serviceRequest.ServiceRequestNumber
    this.SpecialistCommMethod = serviceRequest.SpecialistCommMethod
  }

  /**
  * Create a JSONObject from this notification
  */
  public function toJSON() : JSONObject {
    var obj = new JSONObject()
    obj.put("eventName", this.EventName)
    obj.put("abuid", this.ABUID)
    obj.put("specialistpublicid", this.SpecialistPublicID)
    obj.put("emailAddress", this.EmailAddress)
    obj.put("serviceRequestNumber", this.ServiceRequestNumber)
    obj.put("commMethod", this.SpecialistCommMethod as String)
    return obj
  }


  /**
   * Verify that the notification is sendable, if there is no ABUID we cannot send it to the portal
   */
  function isValidToSend() : boolean {
    if(this.ABUID == null) {
      return false
    }
    if(this.EmailAddress == null) {
      return false
    }
    return true
  }

  /**
   * Populates the Notification from a json message
   */
  protected function populateFromJson(json : String) {
    var parser = new JSONParser()
    var obj = parser.parse(json) as JSONObject
    this.EventName = obj.get("eventName").toString()
    this.ABUID = obj.get("abuid")?.toString()
    this.SpecialistPublicID = obj.get("specialistpublicid").toString()
    this.EmailAddress = obj.get("emailAddress")?.toString()
    this.ServiceRequestNumber = obj.get("serviceRequestNumber").toString()
    this.SpecialistCommMethod = obj.get("commMethod").toString()
  }

  /**
   * Uses the supplied ServiceRequestNotificationAPIService to send the notification to the vendor
   */
  abstract function send(srAPI : ServiceRequestNotificationAPIService)


  /**
   * Called after a notificaiton is reloaded from the message queue, loads missing data
   */
  function prepareForSend() {
    if(!isValidToSend()) {
      var specialist = loadSpecialist()
      this.ABUID = specialist.AddressBookUID
      this.EmailAddress = specialist.EmailAddress1
    }
  }

  /**
  * Creates a Notification of the correct type based upon the event name of the json
  */
  public static function fromJson(json : String) : Notification {
    var parser = new JSONParser()
    var obj = parser.parse(json) as JSONObject

    var eventName = obj.get("eventName").toString()
    if (eventName.startsWith("ServiceRequestOperation") || eventName.startsWith("ServiceRequestInvoiceOperation")) {
      return OperationNotification.fromJSON(json)
    } else if (eventName == "ServiceRequestDocumentToVendorAdded") {
      return NewDocumentNotification.fromJSON(json)
    } else if (eventName == "ServiceRequestMessageToVendorAdded") {
      return NewMessageNotification.fromJSON(json)
    } else {
      throw new IllegalArgumentException("The json string does not match one of the possible notification types")
    }
  }

  //Private Methods

  private function loadSpecialist() : Contact {
    var query = Query.make(Contact)
    query.compare(Contact#PublicID, Equals, this.SpecialistPublicID)
    return query.select().AtMostOneRow
  }
}
