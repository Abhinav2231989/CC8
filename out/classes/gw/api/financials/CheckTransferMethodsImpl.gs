package gw.api.financials

uses gw.lang.Export

@Export
class CheckTransferMethodsImpl implements CheckTransferMethods {

  var _check: Check

  construct(check: Check) {
    this._check = check
  }

  override function getDefaultTargetReservingCurrencyForTransfer(targetClaim: Claim): Currency {
    return targetClaim?.Currency
  }

}