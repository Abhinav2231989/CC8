package gw.plugin.pcintegration.v2.mapping
uses gw.api.util.mapping.IFieldMapper
uses gw.api.util.mapping.ObjectConverter
uses gw.lang.reflect.IPropertyInfo
uses java.lang.IllegalArgumentException
uses gw.api.util.DisplayableException
uses com.guidewire.cc.domain.claim.ClaimContactRoleOwner
uses java.lang.Throwable

/**
 * This mapper should be used for mapping to virtual Contact[] properties on the Policy.  These
 * properties do not have a direct setter, so they need to be set by adding each contact to the
 * Policy with the appropriate role.
 */
@Export
class ContactArrayFieldMapper implements IFieldMapper
{
  construct()
  {
  }
  
  override function mapField( converter : ObjectConverter, 
                              source : Object, 
                              target : Object, 
                              sourceProperty : IPropertyInfo )
  {
    try 
    {
      if( !ClaimContactRoleOwner.Type.isAssignableFrom(typeof target) ) 
      {
        throw new IllegalArgumentException( "Cannot use ContactArrayFieldMapper to map to an entity " +
                                             "that is not a ClaimContactRoleOwner: " + (typeof target))
      }
      var targetPropertyValue = converter.convert( source[sourceProperty.Name], sourceProperty.FeatureType )
      if( targetPropertyValue == null ) 
      {
        return
      }
      if( !Contact[].Type.isAssignableFrom( typeof targetPropertyValue ) )
      {
        throw new IllegalArgumentException( "The ContactArrayFieldMapper cannot be used for the " +
                                            "non-Contact[] property:" + sourceProperty.Name )
      }
      
      var role = getRoleType( sourceProperty )
      var roleOwner = target as ClaimContactRoleOwner
      for( var contact in (targetPropertyValue as Contact[]) ) 
      {
        roleOwner.addRole( role, contact )
      }
    }
    catch( e : Throwable ) 
    {
      throw new DisplayableException( displaykey.Mapping.Error.SourceFieldMappingFailure(sourceProperty.OwnersType, sourceProperty.Description), e )
    }
  }
  
  private function getRoleType( sourceProperty : IPropertyInfo ) : ContactRole 
  {
    var role : ContactRole
    try
    {
      role = sourceProperty.Name as ContactRole
    }
    catch( e : Throwable )
    {
      if( IllegalArgumentException.Type.isAssignableFrom( typeof e ) ) {
        throw new IllegalArgumentException( "Could not map field " + sourceProperty.OwnersType + 
                                            "." +  sourceProperty.Description +
                                            " using the ContactArrayFieldMapper because the field " +
                                            "name does not correspond to a ContactRole typecode.", e)
      }
      else
      {
        throw e
      }
    }
    return role
  }
}
