package gw.plugin.pcintegration.pc702.mapping

uses gw.api.system.CCLoggerCategory
uses gw.api.util.mapping.ObjectConverter
uses gw.api.util.phone.GWPhoneNumber
uses gw.datatype.IDataType
uses gw.lang.reflect.IPropertyInfo
uses gw.plugin.Plugins
uses gw.plugin.integration.mapping.IFieldMapper
uses gw.plugin.phone.IPhoneNormalizerPlugin

uses java.lang.IllegalArgumentException

/**
 * FieldMapper for mapping legacy phone strings to the new
 * phone number format. Note that the type of property handled
 * by this mapper must be a "phone" type.
 */
@Export
class PhoneNumberMapper implements IFieldMapper {

  var phoneNumberPlugin:IPhoneNormalizerPlugin

  construct() {
    phoneNumberPlugin = Plugins.get(IPhoneNormalizerPlugin)
  }

  /**
   * Parses a legacy non-normalized phone string into the correct
   * <code>gw.api.util.phone.GWPhoneNumber</code>, settting the appropriate
   * fields for that phone on the target.
   */
  override function mapField(converter: ObjectConverter,
                             source: java.lang.Object,
                             target: java.lang.Object,
                             propertyInfo: IPropertyInfo) {

     var tprop = (typeof target).TypeInfo.getProperty(propertyInfo.Name)
     var dt = gw.datatype.DataTypes.get(tprop)
     if(dt.Name!="phone") {
        throw new IllegalArgumentException("${typeof this} cannot map field ${propertyInfo.Name} of type '${dt.Name}'. Mapped field must be 'phone' type")
     }
     var accessor = propertyInfo.Accessor
     var nonNormalizedPhone = accessor.getValue(source) as String
     if(nonNormalizedPhone!=null) {
       var phone = phoneNumberPlugin.parsePhoneNumber(nonNormalizedPhone)
       if(phone.Possible) {
          setPhoneFields(phone, dt, propertyInfo, target)
       } else {
          setPhoneCountryCode(PhoneCountryCode.TC_UNPARSEABLE, dt, target)
          target[propertyInfo.Name] = phone.NationalNumber
          setPhoneExtension(phone.Extension, dt, target)
       }
     }
  }

  private function setPhoneFields(phone:GWPhoneNumber, dt:IDataType, propertyInfo:IPropertyInfo, target:Object) {
    target[propertyInfo.Name] = phone.NationalNumber
    setPhoneCountryCode(phone.CountryCode, dt, target)
    setPhoneExtension(phone.Extension, dt, target)
  }

  private function setPhoneCountryCode(code:PhoneCountryCode, dt:IDataType, target:Object) {
    var countryCodeField = dt.Parameters["phonecountrycodeProperty"]
    if(countryCodeField!=null) {
      target[countryCodeField] = code
    } else {
      CCLoggerCategory.APPLICATION.warn("Unable to set country code for phone for field '${countryCodeField}' on type ${typeof target}")
    }
  }

  private function setPhoneExtension(extension:String, dt:IDataType, target:Object) {
    var extensionField = dt.Parameters["extensionProperty"]
    if(extensionField!=null) {
      target[extensionField] = extension
    } else {
      CCLoggerCategory.APPLICATION.warn("Unable to set extension for phone for field '${extensionField}' on type ${typeof target}")
    }
  }
}