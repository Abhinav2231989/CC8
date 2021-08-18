package gw.plugin.pcintegration.pc702

uses gw.api.util.mapping.ObjectConverter
uses java.util.Calendar
uses gw.api.util.CurrencyUtil
uses gw.plugin.pcintegration.pc702.PCObjectConverterFactory
uses soap.pcintegrationPC702.entity.CCPCSearchCriteria
uses soap.pcintegrationPC702.entity.CCPolicy
uses soap.pcintegrationPC702.entity.CCPolicySummary
uses gw.api.util.mapping.NameTranslator

/**
 * Handles the conversion of the CC search criteria to a PC search criteria and the 
 * conversion of objects returned from PC.
 */
@Export
class PolicySearchConverter 
{
  public static var INSTANCE : PolicySearchConverter = new PolicySearchConverter()

  private var _pcToCC : ObjectConverter
  private var _nameTranslator : NameTranslator as readonly NameMapper
  
  public construct() 
  {
    var converterFactory = new PCObjectConverterFactory()
    _nameTranslator = converterFactory.PCNameTranslator
    _pcToCC = converterFactory.getPCToCC()
  }
  
  /**
   * Given a cc PolicySearchCriteria (as created in the policy search UI), translates
   * to the soap object which the policy service uses.
   */
  public function createPCSearchCriteria( ccCriteria : PolicySearchCriteria ) : CCPCSearchCriteria
  {
    var pcCriteria = new CCPCSearchCriteria()

    pcCriteria.PolicyNumber = ccCriteria.PolicyNumber

    if( ccCriteria.PolicyType != null )
    {
      pcCriteria.ProductCode = ccCriteria.PolicyType.Code
    }

    var lossDate = ccCriteria.LossDate
    if( lossDate != null )
    {
      var lossCalendar = Calendar.getInstance()
      lossCalendar.Time = lossDate
      pcCriteria.AsOfDate = lossCalendar
    }
    
    pcCriteria.CompanyName = ccCriteria.CompanyName
    pcCriteria.LastName = ccCriteria.LastName
    pcCriteria.FirstName = ccCriteria.FirstName
    pcCriteria.TaxID = ccCriteria.TaxIdString

    pcCriteria.PrimaryInsuredCity = ccCriteria.InsuredAddress.City 
    pcCriteria.PrimaryInsuredState = ccCriteria.InsuredAddress.State as String
    pcCriteria.PrimaryInsuredPostalCode = ccCriteria.InsuredAddress.PostalCode
    pcCriteria.PrimaryInsuredCountry = ccCriteria.InsuredAddress.Country.Code

    pcCriteria.IncludeArchived = ccCriteria.IncludeArchived

/* Other potentially useful fields    
    ccCriteria.Vin
    ccCriteria.PropertyAddress    

    pcCriteria.AccountNumber
*/

    return pcCriteria
  }
  
  /**
   * Converts the policy object returned from PC into a CC policy entity (recursively converting
   * the entire object map).
   */
  public function convertPCPolicy(pcPolicy : CCPolicy) : Policy 
  {
    var policy = _pcToCC.convert( pcPolicy, CCPolicy ) as Policy
    if (policy != null) {
      ensureCurrencyNotNull(policy)
      ensureRiskUnitCoveragesLinkedToPolicy(policy)
      ensureCurrencyIsSetForAllCoverages(policy)
    }
    return policy
  }

  private function ensureCurrencyNotNull(policy : Policy) {
    if( policy.Currency == null ) {
      policy.Currency = CurrencyUtil.getDefaultCurrency()
    }
  }
  
  private function ensureRiskUnitCoveragesLinkedToPolicy(policy : Policy) {
    for (riskUnit in policy.RiskUnits) {
      for (coverage in riskUnit.Coverages) {
        coverage.Policy = policy
      }
    }
  }

  internal function ensureCurrencyIsSetForAllCoverages(policy : Policy) {
    policy.AllCoverages.each( \ coverage ->  {
      if(coverage.Currency == null) {
        coverage.Currency = policy.Currency
      }
    })
  }

  /**
   * Converts the policysummary array returned from PC into an array of CC policysummary 
   * entities.
   */
  public function convertPCPolicySummary(pcSummaries : CCPolicySummary[]) : PolicySummary[]
  {
    return _pcToCC.convert( pcSummaries, CCPolicySummary[] ) as PolicySummary[]
  }
    
}
