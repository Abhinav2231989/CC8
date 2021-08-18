package gw.assignment.workload.proxy

uses gw.api.assignment.workload.proxy.AbstractWorkloadProxy
uses gw.api.database.IQueryBeanResult
uses gw.api.database.Query
uses gw.entity.IEntityType
uses java.util.Set

/**
 * Proxy for access, computation, and management of Claim-related workload operations.
 */
@Export
public class ClaimWorkloadProxy extends AbstractWorkloadProxy {

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  public override property get AssignableType() : IEntityType {
    return Claim
  }


  public override function findAssignables(groupuser : GroupUser, excludeKeyList : List<Key>) : IQueryBeanResult<Claim> {
    var query = Query.make(Claim)
            .compare(Claim#AssignedUser, Equals, groupuser.User)
            .compare(Claim#AssignedGroup, Equals, groupuser.Group)
            .compare(Claim#State, Equals, ClaimState.TC_OPEN)

    // exclude any claims (by ID) that have been listed in the "excluded list"
    if (excludeKeyList != null and not excludeKeyList.Empty) {
       query.compareNotIn(Claim#ID, excludeKeyList.toTypedArray())
    }
    
    return query.select()                    
  }


  public override function getSupplementalWeight(bean : Bean) : int {
    return (bean as Claim).SupplementalWorkloadWeight
  }


  public override function getWeight(bean : Bean) : int {
    final var claim = (bean as Claim)
    return claim.State == ClaimState.TC_OPEN ? claim.WorkloadWeight : 0
  }


  public override function syncWeight(bean : Bean) : int {
    return (bean as Claim).syncWorkload()
  }


  public override property get WeightedStates() : Set {
    return { ClaimState.TC_OPEN, ClaimState.TC_CLOSED }
  }
}
