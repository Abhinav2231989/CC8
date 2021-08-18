package gw.entity
uses gw.api.financials.FinancialsCalculationUtil
uses gw.api.financials.FinancialsCalculations
uses java.math.BigDecimal
uses gw.api.financials.CurrencyAmount
uses gw.api.util.CurrencyUtil

@Export
enhancement GWSubroReserveLineEnhancement : entity.ReserveLine
{
  function getNetPaidExcludingSubroRecovery() : CurrencyAmount{
    var totalPaidForLossCosts = FinancialsCalculations.getTotalPayments().withReserveLine(this).Amount
    var allRecovery = FinancialsCalculations.getTotalRecoveries().withReserveLine(this).Amount

    var subroRecovery = FinancialsCalculationUtil.getTotalRecoveries().getAmount( this, RecoveryCategory.TC_SUBRO )
    
    if (totalPaidForLossCosts == null ){
      totalPaidForLossCosts = BigDecimal.ZERO.ofCurrency(this.Claim.Currency)
    }

    if (allRecovery == null ){
      allRecovery = BigDecimal.ZERO.ofCurrency(this.Claim.Currency)
    }

    if (subroRecovery == null ){
      subroRecovery = BigDecimal.ZERO.ofCurrency(this.Claim.Currency)
    }
   
    return (totalPaidForLossCosts - allRecovery + subroRecovery)
  }

  function getNetPaidReservingAmountExcludingSubroRecovery() : CurrencyAmount{
    var totalPaidForLossCosts = FinancialsCalculations.getTotalPayments().withReserveLine(this).ReservingAmount
    var allRecovery = FinancialsCalculations.getTotalRecoveries().withReserveLine(this).ReservingAmount

    var subroRecovery = FinancialsCalculationUtil.getTotalRecoveries().getReservingAmount(this, RecoveryCategory.TC_SUBRO)

    if (totalPaidForLossCosts == null ){
      totalPaidForLossCosts = BigDecimal.ZERO.ofCurrency(this.ReservingCurrency)
    }

    if (allRecovery == null ){
      allRecovery = BigDecimal.ZERO.ofCurrency(this.ReservingCurrency)
    }

    if (subroRecovery == null ){
      subroRecovery = BigDecimal.ZERO.ofCurrency(this.ReservingCurrency)
    }
   
    return (totalPaidForLossCosts - allRecovery + subroRecovery)
  }

  function getSubroRecovery() : CurrencyAmount {
    var subroRecovery = FinancialsCalculationUtil.getTotalRecoveries().getAmount( this, RecoveryCategory.TC_SUBRO )
    return (subroRecovery == null ) ? BigDecimal.ZERO.ofCurrency(this.Claim.Currency) : subroRecovery
  }

  function getSubroRecoveryReservingAmount() : CurrencyAmount {
    var subroRecoveryReservingAmount = FinancialsCalculationUtil.getTotalRecoveries().getReservingAmount(this, RecoveryCategory.TC_SUBRO)
    return (subroRecoveryReservingAmount == null ) ? BigDecimal.ZERO.ofCurrency(this.ReservingCurrency) : subroRecoveryReservingAmount
  }

}
