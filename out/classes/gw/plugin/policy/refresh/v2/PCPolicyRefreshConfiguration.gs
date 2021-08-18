package gw.plugin.policy.refresh.v2

uses gw.plugin.policy.refresh.PolicyRefreshConfigurationBase
uses gw.api.policy.refresh.PolicyExtractor
uses gw.api.policy.refresh.pcintegration.PCPolicyGraph
uses soap.pcintegrationV2.entity.CCPolicy
uses gw.plugin.pcintegration.v2.PCObjectConverterFactory

/**
 * Policy Refresh configuration for integration with older versions
 * of PolicyCenter that use the V2 version of the IPolicySearchAdatptor:
 * gw.plugin.pcintegration.v2.PolicySearchPCPlugin.
 */
@Export
class PCPolicyRefreshConfiguration extends PolicyRefreshConfigurationBase 
{
  var _policyExtractor:PolicyExtractor
  
  construct() {
    var pcPolicyGraph = new PCPolicyGraph(CCPolicy, new PCObjectConverterFactory().PCNameTranslator)
    _policyExtractor = new PolicyExtractor(pcPolicyGraph.TypeGraph)
  }

  /**
   * Returns the PolicyExtractor.
   */
  override function getPolicyExtractor(policy:Policy):PolicyExtractor {
    return _policyExtractor
  }
}
