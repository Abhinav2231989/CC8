package gw.plugin.pcintegration.v2

uses com.guidewire.cc.system.config.CCConfigResourceKeys
uses com.guidewire.modules.ConfigFileAccess
uses gw.api.util.mapping.NameTranslator
uses gw.api.util.mapping.ObjectConverter
uses gw.api.util.mapping.ObjectConverterImpl

uses java.lang.RuntimeException
uses java.lang.Throwable

/**
 * Generates instances of ObjectConverter configured to translate from pc to cc and from cc to
 * pc.  The ObjectConverter reflectively walks an object map and translates each object and 
 * field using the NameTranslator, which can be configured with an xml file.
 */
@Export
class PCObjectConverterFactory 
{
  var _pcToCCTranslator : NameTranslator

  construct() 
  {
    try 
    {
      var pcToCcFile = CCConfigResourceKeys.PCTOCC_DATAMAPPING_V2.getFile()
      _pcToCCTranslator = new PolicyNameTranslatorImpl( pcToCcFile, "soap.pcintegrationV2.entity", "entity" )
    } 
    catch( e : Throwable ) 
    {
      throw new RuntimeException( "Can't create PCObjectConverterFactory", e )
    }
  }

  property get PCNameTranslator() : NameTranslator {
    return _pcToCCTranslator
  }
 
  function getPCToCC() : ObjectConverter 
  {
    return new ObjectConverterImpl( _pcToCCTranslator, "typekey." )
  }
}
