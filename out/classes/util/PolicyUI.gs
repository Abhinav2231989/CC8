package util

@Export
class PolicyUI {

  construct() {
  }

  static function handleCoverageCurrencyUpdate(coverage : Coverage) : String {
    if (coverage.ClaimDeductible != null && coverage.isFieldChanged(Coverage#Currency)) {
      gw.api.util.LocationUtil.addRequestScopedInfoMessage(displaykey.Deductible.Info.CurrencyUpdatedForDeductible)
    }

    return null
  }
  
  static function handleCoverageDeductibleUpdate(coverage: Coverage) : String {
    if (coverage.ClaimDeductible != null && coverage.isFieldChanged(Coverage#Deductible)) {
      var infoMessage : String = null
      var deductible = coverage.ClaimDeductible

      if (deductible.Paid) {
        infoMessage = displaykey.Deductible.Info.AmountUpdatedForPaidDeductible
      } else if (deductible.Overridden) {
        infoMessage = displaykey.Deductible.Info.AmountUpdatedForOverriddenDeductible
      } else {
        infoMessage = displaykey.Deductible.Info.AmountUpdatedForUnpaidDeductible
      }

      gw.api.util.LocationUtil.addRequestScopedInfoMessage(infoMessage)
    }

    return null
  }

}
