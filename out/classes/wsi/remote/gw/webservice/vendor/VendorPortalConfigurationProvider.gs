package wsi.remote.gw.webservice.vendor

uses gw.xml.ws.IWsiWebserviceConfigurationProvider
uses gw.xml.ws.WsdlConfig
uses javax.xml.namespace.QName

@Export
class VendorPortalConfigurationProvider implements IWsiWebserviceConfigurationProvider {
  /**
   * Configures the authentication to the vendor portal.
   */
  override function configure(serviceName : QName, portName : QName, config : WsdlConfig) {
    //Custom authentication to the Portal WebService
  }

}
