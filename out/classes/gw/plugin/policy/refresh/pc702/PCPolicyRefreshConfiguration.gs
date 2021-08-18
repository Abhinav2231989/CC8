package gw.plugin.policy.refresh.pc702

uses gw.plugin.policy.refresh.PolicyRefreshConfigurationBase
uses gw.api.policy.refresh.pcintegration.PCPolicyGraph
uses soap.pcintegrationPC702.entity.CCPolicy
uses gw.plugin.pcintegration.pc702.PolicySearchConverter
uses gw.api.policy.refresh.PolicyExtractor

/**
 * Policy refresh configuration for use when integrating with PolicyCenter. Automatically finds which types should
 * be considered during policy refresh by examining the XSD types in the PC integration web service.
 */
@Export
class PCPolicyRefreshConfiguration extends PolicyRefreshConfigurationBase {

  var _policyExtractor:PolicyExtractor

  construct() {
    var pcPolicyGraph = new PCPolicyGraph(CCPolicy, PolicySearchConverter.INSTANCE.NameMapper)
    _policyExtractor = new PolicyExtractor(pcPolicyGraph.TypeGraph)
  }

  override function getPolicyExtractor(policy : Policy) : PolicyExtractor {
    return _policyExtractor
  }

}
