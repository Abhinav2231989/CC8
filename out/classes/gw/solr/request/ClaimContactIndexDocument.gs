package gw.solr.request

uses com.guidewire.cc.system.config.CCConfigResourceKeys
uses org.json.simple.JSONObject
uses gw.solr.utils.CCACLInfo


/**
 * <br/><br/><i>Experimental.  Do not use without consulting Guidewire.</i>
 */
@Export
class ClaimContactIndexDocument extends AbstractIndexDocument {
  
  static function createKey(claimContact : ClaimContact) : ClaimContactIndexDocument {
    var document = new ClaimContactIndexDocument()
    document.constructDocument(claimContact, true, null)
    return document
  }

  static function createDocument(claimContact : ClaimContact, aclInfo : CCACLInfo) : ClaimContactIndexDocument {
    var document = new ClaimContactIndexDocument()
    document.constructDocument(claimContact, false, aclInfo)
    return document
  }
  
  static function createKey(jsonDoc : JSONObject) : ClaimContactIndexDocument {
    var document = new ClaimContactIndexDocument()
    document.constructDocument(jsonDoc, true)
    return document
  }
  
  construct() {
    super(CCConfigResourceKeys.CLAIMCONTACT_SEARCH_CONFIG.File)
  }
  
  function constructDocument(claimContact : ClaimContact, keyFieldsOnly : boolean, aclInfo : CCACLInfo) {
    addIndexData(claimContact)
    if (aclInfo != null) {
      addIndexData("ACLInfo", aclInfo)
      // must add referenced beans for consistency version tracking
      addReferencedBeans(aclInfo.ReferencedBeans)
    }
    populateIndexData(keyFieldsOnly)
  }
  
  function constructDocument(jsonDoc : JSONObject, keyFieldsOnly : boolean) {
    populateIndexData(jsonDoc, keyFieldsOnly)
  }

}
