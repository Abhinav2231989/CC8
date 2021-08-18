package gw.plugin.policy.refresh.v2

uses gw.plugin.policy.refresh.PolicyRefreshPluginBase

/**
 * Plugin for integration with older versions of PolicyCenter
 * that use the V2 version of the IPolicySearchAdapter:
 * gw.plugin.pcintegration.v2.PolicySearchPCPlugin.
 * 
 */
@Export
class PCPolicyRefreshPlugin extends PolicyRefreshPluginBase {

  construct() {
    super(new PCPolicyRefreshConfiguration())
  }

}
