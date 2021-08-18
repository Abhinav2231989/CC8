package gw.api.financials

uses com.guidewire.cc.system.dependency.CCDependencies
uses org.apache.commons.lang3.ObjectUtils

@Export
class PaymentTransferMethodsImpl implements PaymentTransferMethods {

  var _payment: Payment

  construct(payment : Payment) {
    this._payment = payment
  }

  override function findMatchingTargetExposureForTransfer(claim: Claim) : Exposure {
    var exposureToMatch = _payment.Exposure
    if (exposureToMatch == null) {
      return null;
    }

    var targetExposures = claim.Exposures
    if (targetExposures.Count == 0) {
      return null;
    }

    return targetExposures.firstWhere( \ targetExposure ->
            exposureToMatch.PrimaryCoverage.equals(targetExposure.PrimaryCoverage) and
            ObjectUtils.equals(exposureToMatch.LossParty, targetExposure.LossParty)
    )
  }

  override function findMatchingTargetReserveLineForTransfer(targetReservingCurrency: Currency): ReserveLine {
    return CCDependencies.getFinancialsFinder().findReserveLineTightMatch(_payment.Claim.ID,
            _payment.Exposure.ID, _payment.CostType, _payment.CostCategory, targetReservingCurrency)
  }

}