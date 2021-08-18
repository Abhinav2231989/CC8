package gw.vendormanagement

@Export
enum ServiceRequestStatus {

  NONE("service_request_empty.png", ""),
  INACTIVE("service_request_gray.png", displaykey.Web.ServiceRequest.Status.Inactive),
  ATTENTION("service_request_alert.png", displaykey.Web.ServiceRequest.Status.Attention),
  COMPLETE("service_request_complete.png", displaykey.Web.ServiceRequest.Status.Complete), 
  GREEN("service_request_green.png", displaykey.Web.ServiceRequest.Status.Green),
  YELLOW("service_request_yellow.png", displaykey.Web.ServiceRequest.Status.Yellow),
  RED("service_request_red.png", displaykey.Web.ServiceRequest.Status.Red)
  
  var _icon : String as readonly Icon
  var _label : String as readonly Label
  
  private construct(iconImg: String, iconLabel: String) {
    _icon = iconImg
    _label = iconLabel
  }
}
