package gw.plugin.pcintegration.pc702

uses gw.api.soap.GWAuthenticationHandler
uses gw.api.util.DisplayableException
uses gw.plugin.InitializablePlugin
uses gw.plugin.policy.search.IPolicySearchAdapter
uses soap.pcintegrationPC702.api.CCPolicySearchIntegration
uses soap.pcintegrationPC702.entity.CCPCFilteringCriteria

uses java.lang.Throwable
uses java.util.ArrayList
uses java.util.Calendar
uses java.util.Date
uses java.util.HashSet
uses java.util.Map


/**
 * Implementation of the PolicySearchAdapter that calls into PC.
 */
@Export
class PolicySearchPCPlugin implements IPolicySearchAdapter, InitializablePlugin 
{
  static final var unsupportedPolicyTypes = new HashSet<String>() { PolicyType.TC_FARMOWNERS.Code,
                                                                    PolicyType.TC_PROF_LIABILITY.Code,
                                                                    PolicyType.TC_TRAVEL_PER.Code }

  var _username : String
  var _password : String
  
  construct() 
  {
  }

  /**
   * Retrieves the policy indicated by policySummary from the PC instance.
   */
  override function retrievePolicyFromPolicySummary( policySummary : PolicySummary ) : PolicyRetrievalResultSet 
  {
    if( policySummary.PolicyType != null && !isSupportedPolicyType( policySummary.PolicyType ) )
    {
      throw new DisplayableException(displaykey.Java.PolicyRefresh.UnsupportedPolicyType(policySummary.PolicyType))
    }
    
    var pcFilter = new CCPCFilteringCriteria()
    pcFilter.PolicySystemIDs = createRiskUnitFilter(policySummary)
    return retrievePolicy( policySummary.PolicyNumber, policySummary.LossDate, pcFilter )
  }
  
  /**
   * Retrieves the policy again from the PC instance.
   */
  override function retrievePolicyFromPolicy( policy : Policy ) : PolicyRetrievalResultSet 
  {
    if( policy.PolicyType != null && !isSupportedPolicyType( policy.PolicyType ) )
    {
      throw new DisplayableException(displaykey.Java.PolicyRefresh.UnsupportedPolicyType(policy.PolicyType))
    }
    return retrievePolicy( policy.PolicyNumber, policy.Claim.LossDate, new CCPCFilteringCriteria() )
  }
  
  /**
   * Search for policies on the PC instance given the search criteria.
   */
  override function searchPolicies( criteria : PolicySearchCriteria ) : PolicySearchResultSet 
  {
    if( criteria.PolicyType != null && !isSupportedPolicyType( criteria.PolicyType ) )
    {
      throw new DisplayableException(displaykey.Java.PolicyRefresh.UnsupportedPolicyType(criteria.PolicyType))
    }
    var pcCriteria = PolicySearchConverter.INSTANCE.createPCSearchCriteria( criteria )

    // Just create an empty filter by default
    var pcFilter = new CCPCFilteringCriteria()

    var pcSummaries = getPolicySearchService().searchForPolicies( pcCriteria, pcFilter )
    var ccSummaries = PolicySearchConverter.INSTANCE.convertPCPolicySummary( pcSummaries )
    ccSummaries.each(\ s -> { s.LossDate = criteria.LossDate})

    var resultSet = new PolicySearchResultSet()
    resultSet.Summaries = ccSummaries
    return resultSet
  }
  
  /**
   * Retrieves the policy summary for the policy from the PC instance.
   */
  override function retrievePolicySummaryFromPolicy(policy : Policy) : PolicySummary {
    var criteria = new PolicySearchCriteria()
    criteria.LossDate = policy.Claim.LossDate
    criteria.PolicyNumber = policy.PolicyNumber
    
    var results = searchPolicies(criteria)
    var numResults = results.Summaries.Count
    if (numResults == 0)
      return null
    var policySummary = results.Summaries[0]
    policySummary.LossDate = criteria.LossDate
    return policySummary
  }
  
  
  
  /**
   * Called on initialization to set parameters from the plugin definition.  Part of the
   * InitializablePlugin interface.
   */
  override function setParameters( params : Map )
  {
    _username = params.get( "username" ) as String
    _password = params.get( "password" ) as String    
  }

  // create the list of risk unit psids to pass to the policy system as a filter
  private function createRiskUnitFilter(policySummary : PolicySummary) : String[] {
    if (!policySummary.CanSelectRiskUnits)
      return null

    // set the policy system id filter based on policySummary selections
    var psidFilter = new ArrayList<String>()
    for (var vehicle in policySummary.Vehicles) {
      if (vehicle.Selected)
        psidFilter.add(vehicle.PolicySystemId)
    }
    for (var aProperty in policySummary.Properties) {
      if (aProperty.Selected)
        psidFilter.add(aProperty.PolicySystemId)
    }
    
    return psidFilter as java.lang.String[]
  }

  // lazily initializes the policy search service
  private function getPolicySearchService() : CCPolicySearchIntegration
  {
    var pcSearchService = new CCPolicySearchIntegration()
    pcSearchService.addHandler( new GWAuthenticationHandler( _username, _password ) )
    return pcSearchService
  }

  /**
   * retrieves the policy indicated by the policynumber and lossDate
   */
  private function retrievePolicy( policyNumber : String, lossDate: Date, pcFilter : CCPCFilteringCriteria ) : PolicyRetrievalResultSet 
  {
    if (lossDate == null) {
      throw new DisplayableException(displaykey.Java.PolicyItemHandler.LossDateRequired)
    }

    var resultSet = new PolicyRetrievalResultSet()

    var cal = Calendar.getInstance()
    cal.setTime( lossDate )

    try 
    {
      var pcPolicy = getPolicySearchService().retrievePolicy( policyNumber, cal, pcFilter )
      resultSet.Result = PolicySearchConverter.INSTANCE.convertPCPolicy( pcPolicy )
    }
    catch( e : Throwable )
    {
      throw new DisplayableException( displaykey.Java.PolicyRefresh.ErrorRetrieving, e )
    }
    
    if(PolicyStatus.TC_ARCHIVED.equals(resultSet.Result.Status)) {
      throw new DisplayableException(displaykey.Java.PolicyRefresh.PolicyIsArchived)
    }
    resultSet.NotUnique = false
    return resultSet
  }

  private function isSupportedPolicyType( policyType : PolicyType ) : boolean
  {
    return !unsupportedPolicyTypes.contains(policyType.Code)  
  }
}
