package gw.solr.utils

uses gw.solr.utils.PLSolrUtils
uses gw.plugin.solr.SolrSearchStore


/**
 * <i>Experimental.  Do not use without consulting Guidewire.</i>
 */
@Export
class CCSolrUtils extends PLSolrUtils {

  /**
   * Application ID for ClaimCenter
   *
   * <br/><br/><i>Experimental.  Do not use without consulting Guidewire.</i>
   */
  public static final var APPID : String = "cc"
  
  /**
   * Solr core prefix
   *
   * <br/><br/><i>Experimental.  Do not use without consulting Guidewire.</i>
   */
  public static final var CC_CORE_PREFIX : String = APPID + "-gwsolr"

  // You should have one documentId and one documentType declared for each document type. The documentType should be of the
  // form <appId>_<documentId>, for example, cc_claimContact.

  /**
   * Document ID for claim contact documents
   *
   * <br/><br/><i>Experimental.  Do not use without consulting Guidewire.</i>
   */
  public static final var CLAIM_CONTACT_DOCUMENTID : String = "claimcontact"
  
  /**
   * Document type identifier string
   *
   * <br/><br/><i>Experimental.  Do not use without consulting Guidewire.</i>
   */
  public static final var CC_CLAIM_CONTACT_DOCUMENT_TYPE : String = APPID + "_" + CLAIM_CONTACT_DOCUMENTID


  public final static var CC_CLAIM_CONTACT_ACTIVE_DOCUMENT_TYPE : String = CC_CLAIM_CONTACT_DOCUMENT_TYPE + SolrSearchStore.ACTIVE.suffix()
      
  public final static var CC_CLAIM_CONTACT_ARCHIVE_DOCUMENT_TYPE : String = CC_CLAIM_CONTACT_DOCUMENT_TYPE + SolrSearchStore.ARCHIVE.suffix()
  
  /**
   * Document index for archived claims.
   */
  public static final var CC_CLAIM_CONTACT_ARCHIVE:String = CC_CLAIM_CONTACT_DOCUMENT_TYPE + SolrSearchStore.ARCHIVE.suffix()
}
