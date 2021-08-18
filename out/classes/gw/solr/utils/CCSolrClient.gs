package gw.solr.utils

uses com.guidewire.cc.system.config.CCConfigResourceKeys
uses com.guidewire.cc.system.locale.CCDisplayKeys
uses com.guidewire.pl.system.dependency.PLDependencies
uses gw.api.system.CCLoggerCategory
uses gw.plugin.solr.SolrSearchStore
uses gw.solr.GWSolrBatchLoader
uses gw.util.concurrent.LockingLazyVar
uses org.apache.solr.client.solrj.SolrQuery
uses org.apache.solr.client.solrj.SolrServer
uses org.apache.solr.client.solrj.request.UpdateRequest
uses org.apache.solr.common.SolrDocumentList
uses org.apache.solr.common.params.CommonParams

uses java.io.File
uses java.lang.IllegalArgumentException
uses java.lang.Integer
uses java.util.HashMap
uses java.util.Map

/**
 * Utility for calling APIs on the remote/embedded Solr web application.
 */
@Export
class CCSolrClient {
  
  public static var ACTIVE_INDEX:String = CCSolrUtils.CC_CLAIM_CONTACT_DOCUMENT_TYPE + SolrSearchStore.ACTIVE.suffix()
  public static var ARCHIVE_INDEX:String = CCSolrUtils.CC_CLAIM_CONTACT_DOCUMENT_TYPE + SolrSearchStore.ARCHIVE.suffix()

  private static final var messageDestName = CCDisplayKeys.Java_MessageDestination_SolrMessageTransport_ClaimContact_Name.localize()
  var _logger = CCLoggerCategory.APPLICATION

  private static final var messageDestID = new LockingLazyVar<Integer>() {
    override public function init() : Integer {
      var destId:Integer = null;
      for (var destinationConfig in PLDependencies.getMessagingConfiguration().getDestinations()) {
        if (messageDestName.equalsIgnoreCase(destinationConfig.getName())) {
          destId = destinationConfig.getDestID();
          break;
        }
      }
      return destId;
    };
  };

  function getSolrServer(indexName:String) : SolrServer {
    return PLDependencies.getSolrServerMgr().findServer(indexName)
  }

  function getServerStatus(indexName:String) : SolrStatus {
    var solrServer = getSolrServer(indexName)
    var status = new SolrStatus()
    try {
      var response = solrServer.ping()
      status.ServerOK = (response.Status==0)
      //status message
      // status.StatusMessage =
    } catch(e:java.lang.Throwable) {
      status.ServerOK = false
      status.StatusMessage = e.Message
    }
    return status
  }
  
  /**
   * Returns the document count for the given index.
   */
  function getDocumentCount(indexName:String) : int {
    return getCountForQuery(indexName, "*:*")
  }
  
  /**
   * Runs the given query and returns the Solr document results.
   * @param indexName The document index to query
   * @param queryStr The Solr query to execute
   * @return The list of Solr documents
   */
  function query(indexName:String, queryStr:String) : SolrDocumentList {
    return query(indexName, queryStr, {})
  }
  
  /**
   * Runs the given query and returns the Solr document results, restricted
   * by the given limit. The actual number found by the query is retrievable
   * by calling org.apache.solr.common.SolrDocumentList#getNumFound().
   * @param limit The maximum number of documents to return
   * @returns The document list
   */
  function query(indexName:String, queryStr:String, limit:int) : SolrDocumentList {
    var params = new HashMap<String,String>()
    params[CommonParams.ROWS] = String.valueOf(limit)
    return query(indexName, queryStr, params)
  }
  
  /**
   * Runs the given query and returns the XML results.
   * @param indexName The document index to query
   * @param queryStr The Solr query to execute
   * @return The list of Solr documents
   */
  function query(indexName:String, queryStr:String, params:Map<String,String>) : SolrDocumentList {
    var solrServer = getSolrServer(indexName)
    var q = new SolrQuery(queryStr)
    params.eachKeyAndValue( \ k, val -> q.set(k, {val}))
    var response = solrServer.query(q)
    return response.Results
  }

  /**
   * Returns the number of search results for the given query.
   * @param indexName The document index to query
   * @param queryStr The Solr query to execute
   */
  function getCountForQuery(indexName:String, queryStr:String) : int {
    var docList = query(indexName, queryStr, 0)
    return (docList.NumFound as java.lang.Number).intValue()
  }
  
  /**
   * Drops the given index in Solr.
   * @param indexName The name of the index to drop
   * @return true if delete was processed succesfully (status is 0)
   */
  function dropIndex(indexName:String) : boolean {
    var solrServer = getSolrServer(indexName)
    var rq = new UpdateRequest()
    rq.deleteByQuery("*:*")
    var response = rq.process(solrServer)
    return response.Status == 0
  }

  function commit(solrServer:SolrServer) {
    solrServer.commit()
    }

  function commit(indexName:String) {
    commit(getSolrServer(indexName))
  }
  
  /**
   * Drops the given index and re-indexes it from the currently
   * configured database.
   * @param docName The name of the index to re-index
   */
  function bulkLoad(docName:String) : boolean {
    var config = CCConfigResourceKeys.SOLR_DOC_CONFIG_DIR.Dir.getFile(docName + File.separator + "batchload-config.xml")
    if(not config.exists()) {
      throw new IllegalArgumentException("Cannot find ${config.AbsolutePath} for document ${docName}")
    }
    try {
      GWSolrBatchLoader.performSolrFullImport(config.AbsolutePath, messageDestID.get())
      return true
    } catch(e:java.lang.Exception) {
       _logger.error("Data import for document '${docName}' failed.", e)
       return false
    }
  }
}
