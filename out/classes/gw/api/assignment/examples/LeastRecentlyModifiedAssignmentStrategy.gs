package gw.api.assignment.examples
uses gw.api.assignment.DynamicUserAssignmentStrategy;
uses java.util.Set;
uses java.util.HashSet

@Export
class LeastRecentlyModifiedAssignmentStrategy implements DynamicUserAssignmentStrategy 
{
  construct()
  {
  }

  override function findUserToAssign( assignable: Assignable, candidates: Set, locks: Set ) : GroupUser
  {

        var users : Set<User> = candidates as Set<User>
        var currentBundle = gw.transaction.Transaction.getCurrent()

    if (users == null || users.Empty) return null;
    var oldestModifiedUser : User = users.iterator().next()
    for (nextUser in users) {
      if (nextUser.UpdateTime < oldestModifiedUser.UpdateTime) {
        oldestModifiedUser = nextUser
      }
    }

    oldestModifiedUser = currentBundle.add( oldestModifiedUser)
    oldestModifiedUser.touch()

    return oldestModifiedUser.GroupUsers[0]
  }

  override function getCandidateUsers( assignable: Assignable, group: Group, includeSubGroups: boolean ) : Set
  {
    var groupUsers = (group.Users as Set<GroupUser>)
    if (groupUsers == null) return new User[0] as Set; 
    var users = groupUsers.map( \ groupUser -> groupUser.User )
    var result = new HashSet()
    result.addAll( users )
    return result
  }

  override function getLocksForAssignable( assignable: Assignable, candidates: Set ) : Set
  {
    return candidates 
  }
  
  override function getAssignmentToken( assignable: Assignable ) : Object
  {
    return "LeastRecentlyModifiedAssignmentStrategy_"+(assignable as KeyableBean).ID
  }

  override function rollbackAssignment( assignable: Assignable, assignedEntity: Object ) : boolean
  {
    return false
  }

}
