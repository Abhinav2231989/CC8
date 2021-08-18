package gw.pcf.specialhandling
uses java.util.Map
uses java.util.HashMap
uses java.util.Collections
uses gw.api.util.Logger
uses gw.plugin.Plugins
uses gw.plugin.email.IEmailTemplateSource
uses java.lang.Exception
uses gw.api.util.DisplayableException

@Export
class EmailTemplateUtil {

  public static function getEmailTemplateDisplayName(templateFilename : String)  : String {

    if (templateFilename == null) {
      return null
    }
  
    var template = EmailTemplatePlugin.getEmailTemplate(templateFilename)
    if (template == null) {
      Logger.logError(displaykey.Web.Email.TemplateNotFound + " - " + templateFilename)
      return displaykey.Web.Email.TemplateNotFound
    }
  
    return template.getName()
  }
  
  public static function buildEmailTemplateDisplayNameMap(templateNames : List<String>) : Map<String, String> {
    if (templateNames == null or templateNames.Empty) {
      return Collections.emptyMap<String, String>();
    }
    
    var templateFileNamesToTemplateNameMap = new HashMap<String, String>()

    for (templateToLookup in templateNames) {
      if (null != templateToLookup) {
        var template = EmailTemplatePlugin.getEmailTemplate(templateToLookup)
        templateFileNamesToTemplateNameMap.put(templateToLookup, (null != template ? template.Name : displaykey.Web.Email.TemplateNotFound))
      }
    }

    return templateFileNamesToTemplateNameMap
  }

  internal static property get EmailTemplatePlugin() : IEmailTemplateSource {
    try {
      return Plugins.get(IEmailTemplateSource)
    } catch (e : Exception) {
      throw new DisplayableException(displaykey.Web.Email.NoTemplateSourcePlugin, e);
    }
  }
}
