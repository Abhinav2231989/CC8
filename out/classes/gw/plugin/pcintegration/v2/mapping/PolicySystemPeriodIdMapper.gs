package gw.plugin.pcintegration.v2.mapping
uses gw.api.util.mapping.IFieldMapper
uses gw.api.util.mapping.ObjectConverter
uses gw.lang.reflect.IPropertyInfo
uses java.lang.Long

/**
 * This mapper is needed because between v2 and v700 the datatype of the PolicySystemPeriodId changed 
 * from int to long as part of the move to 64-bit entitiy IDs
 */
@Export
class PolicySystemPeriodIdMapper implements IFieldMapper {

  construct() {

  }

  override function mapField(converter : ObjectConverter, 
                              source : Object, 
                              target : Object, 
                              sourceProperty : IPropertyInfo) {
    var sourcePolicySystemPeriodId = sourceProperty.Accessor.getValue(source)
    target[sourceProperty.Name] = sourcePolicySystemPeriodId as Long
  }

}
