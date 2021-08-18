package gw.financials

uses gw.api.util.DateUtil
uses gw.pl.persistence.core.Bundle

/**
 * Utility class for updating future checks.
 */
@Export
class CheckUpdater {
  
  var _bundle:Bundle
  
  construct(bundle:Bundle) {
    _bundle = bundle
  }

  /**
   * Updates all future checks with the given <code>oldAddress</code> with the
   * new mailing address.
   */
  function updateMailingAddress(contact:Contact, oldAddress:Address, newAddress:Address) {
    // call combine lines to emulate what happens to the payee's address in the check wizard
    var oldAddressDisplayName = oldAddress.DisplayName.combineLines()
    // remove to evict from the bundle, or it will be saved as an orphaned Address
   oldAddress.remove()

    var subQueryOnCheckTable = gw.api.database.Query.make(Check)
                                                .compare(Check#ScheduledSendDate, NotEquals, null)
                                                .compare(Check#ScheduledSendDate, GreaterThanOrEquals, DateUtil.currentDate())
    var checkpayees = gw.api.database.Query.make(CheckPayee)
                              .compare(CheckPayee#PayeeDenorm, Equals, contact)
                              .subselect("Check", CompareIn, subQueryOnCheckTable, "ID").select()

    for (payee in checkpayees) {
      // If the Check for this CheckPayee is already in the current bundle, use that bean (especially since
      // it may contain changes that are not yet in the database). Otherwise, move the Check returned by
      // the find expression (which will be in a read-only bundle) and add it to the current bundle (which
      // should be writable).

      var check = _bundle.loadBean(payee.Check as Key) as Check
      if (check == null) {
        check = payee.Check
        _bundle.add(check)
      }

      // Check.isScheduledSendDateInFuture() may have additional logic, so use it to check the send date again here
      if (check.ScheduledSendDateInFuture  
        and check.MailToAddress == oldAddressDisplayName) {
          check.MailToAddress = String.makeSafe(newAddress as java.lang.String).combineLines()
      }
    }
  }
}
