package gw.plugin.pcintegration.pc702.location

uses gw.plugin.policy.location.CCPolicyLocationInfo
uses gw.plugin.policy.location.PolicyLocationSearchCriteria
uses gw.plugin.policy.location.PolicyLocationSearchPlugin
uses wsi.remote.gw.webservice.pc.pc700.policylocationsearchapi.PolicyLocationSearchAPI

@Export
class PolicyLocationSearchPluginImpl implements PolicyLocationSearchPlugin {


  override function findPolicyLocationsWithinBoundingBox(criteria : PolicyLocationSearchCriteria): CCPolicyLocationInfo [] {
    var plsAPI = new PolicyLocationSearchAPI()
    var plis = plsAPI.findPolicyLocationsWithinBoundingBox(criteria.EffDate, criteria.ProductCodes, criteria.TopLeftLat,
       criteria.TopLeftLong, criteria.BottomRightLat, criteria.BottomRightLong, criteria.Handle, criteria.StartingOffset,
        criteria.Count)
    return plis?.map( \pli -> new CCPolicyLocationInfoImpl (pli) )
  }
}