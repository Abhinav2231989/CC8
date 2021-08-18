package gw.api.financials

uses gw.api.system.CCConfigParameters
uses java.util.Set

/**
 * An abstract ReserveLineInputSetStrategy implementation appropriate for
 * payment-related screens, enforcing the rules for selecting reserve lines and
 * exposures when editing payments, ensuring that exposures match any service
 * request invoices on the check, and ensuring that all payments on a check have
 * the same reserving currency.
 */
@Export
abstract class ReserveLineInputSetStrategyForPaymentBase
    extends ReserveLineInputSetStrategyThatPreservesExchangeRate {

  // if non-null, then ReserveLine.Exposure.Incident must appear in the set; if null, there is no filtering on incidents
  var _filteringIncidents : Set<Key>
  var _manualCheck : boolean

  construct(check : Check) {
    super(check.TransToReservingExchangeRate)

    _filteringIncidents = determineFilteringIncidents(check)
    _manualCheck = check.ManualCheck
  }

  private static function determineFilteringIncidents(check : Check) : Set<Key> {
    // A service request invoice is compatible with a reserve line if a) the invoice' service request is not linked to
    // an incident, b) the reserve line is not linked to an exposure, or c) the reserve line's exposure refers to the
    // same incident as the service request. If a check is linked to any service request invoices, then every reserve
    // line should normally be compatible with at least one of the invoices. This standard will be applied in this class
    // to decide whether a reserve line should be selectable.
    var serviceRequests = check.ServiceRequestInvoices*.ServiceRequest
    if (not serviceRequests.HasElements or serviceRequests.hasMatch(\ sr -> sr.Incident == null)) {
      // the service request with no incident will match any reserve line, so set this to null to prevent filtering
      return null
    } else {
      return serviceRequests*.Incident*.ID.toSet()
    }
  }

  private function matchesIncident(exposure : Exposure) : boolean {
    return _filteringIncidents == null or _filteringIncidents.contains(exposure.Incident.ID)
  }

  override final function allowExistingReserveLine(reserveLine : ReserveLine) : boolean {
    if (reserveLine.Exposure == null) {
      return allowExistingClaimLevelReserveLine(reserveLine.Claim, reserveLine)
    } else {
      return allowExistingExposureLevelReserveLine(reserveLine.Exposure, reserveLine)
    }
  }

  protected function allowExistingClaimLevelReserveLine(claim : Claim, reserveLine : ReserveLine) : boolean {
    if (not claim.hasPassedAbilityToPay()) {
      return false
    } else if (not claim.Closed) {
      return (AllowPaymentsExceedReservesLimits and hasAnyReserves(reserveLine)) or hasAvailableReserves(reserveLine)
    } else {
      return AllowNoPriorPaymentSupplement or hasAnyLevelPayments(claim)
    }
  }

  protected function allowExistingExposureLevelReserveLine(exposure : Exposure, reserveLine : ReserveLine) : boolean {
    if (not matchesIncident(exposure) or not exposure.hasPassedAbilityToPay()) {
      return false
    } else if (not exposure.Closed) {
      return (AllowPaymentsExceedReservesLimits and hasAnyReserves(reserveLine)) or hasAvailableReserves(reserveLine)
    } else {
      return AllowNoPriorPaymentSupplement or hasExposureLevelPayments(exposure)
    }
  }

  override function allowNewClaimLevelReserveLine(claim : Claim) : boolean {
    if (not claim.hasPassedAbilityToPay()) {
      return false
    } else if (not claim.Closed) {
      return _manualCheck or AllowPaymentsExceedReservesLimits or not hasClaimLevelReserves(claim)
    } else {
      return AllowNoPriorPaymentSupplement
    }
  }

  override function allowNewExposureLevelReserveLine(exposure : Exposure) : boolean {
    if (not matchesIncident(exposure) or not exposure.hasPassedAbilityToPay()) {
      return false
    } else if (not exposure.Closed) {
      return _manualCheck or AllowPaymentsExceedReservesLimits or not hasExposureLevelReserves(exposure)
    } else {
      return AllowNoPriorPaymentSupplement
    }
  }

  override function restrictReservingCurrency(transaction : Transaction) : Currency {
    var payment = transaction as Payment
    for (otherPayment in payment.Check.Payments) {
      if (otherPayment != payment and otherPayment.ReservingCurrency != null) {
        return otherPayment.ReservingCurrency
      }
    }
    return null
  }

  private static property get AllowPaymentsExceedReservesLimits() : boolean {
    return CCConfigParameters.AllowPaymentsExceedReservesLimits.Value
  }

  private static property get AllowNoPriorPaymentSupplement() : boolean {
    return CCConfigParameters.AllowNoPriorPaymentSupplement.Value
  }

  private static function hasAnyLevelPayments(claim : Claim) : boolean {
    return FinancialsCalculations.getTotalPaymentsWithPending()
            .withClaim(claim)
            .hasContributingTransactions()
  }

  private static function hasClaimLevelPayments(claim : Claim) : boolean {
    return FinancialsCalculations.getTotalPaymentsWithPending()
            .withClaim(claim)
            .useClaimLevelReserves()
            .hasContributingTransactions()
  }

  private static function hasExposureLevelPayments(exposure : Exposure) : boolean {
    return FinancialsCalculations.getTotalPaymentsWithPending()
            .withExposure(exposure)
            .hasContributingTransactions()
  }

  private static function hasAnyLevelReserves(claim : Claim) : boolean {
    return FinancialsCalculations.getTotalReservesWithPending()
            .withClaim(claim)
            .hasContributingTransactions()
  }

  private static function hasClaimLevelReserves(claim : Claim) : boolean {
    return FinancialsCalculations.getTotalReservesWithPending()
            .withClaim(claim)
            .useClaimLevelReserves()
            .hasContributingTransactions()
  }

  private static function hasExposureLevelReserves(exposure : Exposure) : boolean {
    return FinancialsCalculations.getTotalReservesWithPending()
            .withExposure(exposure)
            .hasContributingTransactions()
  }

  private static function hasAnyReserves(reserveLine : ReserveLine) : boolean {
    return FinancialsCalculations.getTotalReservesWithPending()
            .withReserveLine(reserveLine)
            .hasContributingTransactions()
  }

  private static function hasAvailableReserves(reserveLine : ReserveLine) : boolean {
    return FinancialsCalculations.getAvailableReserves()
            .noNulls()
            .withReserveLine(reserveLine)
            .ReservingAmount
            .signum() > 0
  }

}
