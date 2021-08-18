package gw.entity
uses gw.api.financials.CurrencyAmount
uses java.math.BigDecimal

@Export
enhancement GWSubroAdversePartyEnhancement : entity.SubroAdverseParty
{

  function getTotAmountRecoveredForParty() : CurrencyAmount {
    var TotAmountRec = this.Claim.getRecoveriesIterator( false /*newAndModifiedOnly*/ )
                           .toList().sumCurrencyAmount( \ t -> { return recoveryAmountFor(t)})
    return (TotAmountRec == null) ? new CurrencyAmount( BigDecimal.ZERO, this.getClaim().Currency ) : TotAmountRec
  }
  
  private function recoveryAmountFor(t : Transaction) : CurrencyAmount {
    if (t.Status == "draft") {
      return null
    }
    if ((t as Recovery).OnBehalfOf != null) {
      if (this.AdverseParty.PublicID == (t as Recovery).OnBehalfOf.PublicID) {
        return t.ClaimAmount
      }
    } else {
      if (this.AdverseParty.PublicID == (t as Recovery).Payer.PublicID) {
        return t.ClaimAmount
      }
    }
    return null
  }

  private function claimCostRecoveryAmountFor(t : Transaction) : CurrencyAmount {
    if ((t as Recovery).CostType != CostType.TC_CLAIMCOST) {
      return null
    }
    return recoveryAmountFor(t) 
  }
  
  function getTotClaimCostSubroRecoveryForParty() : CurrencyAmount {
    var TotAmountRec = this.Claim.getRecoveriesIterator( false /*newAndModifiedOnly*/ )
                           .toList().sumCurrencyAmount( \ t -> {
                               if (t.RecoveryCategory == RecoveryCategory.TC_SUBRO) {
                                      return claimCostRecoveryAmountFor(t)
                               } else {
                                 return null
                               }
                           })
                           
    return (TotAmountRec == null) ? new CurrencyAmount( BigDecimal.ZERO, this.getClaim().Currency ) : TotAmountRec
  }


  function TotPromissoryAmount() : CurrencyAmount {
     
    var TotCalculatedAmount = this.ScheduledPayments.toList()
                                  .sumCurrencyAmount( \ s -> s.SubroInstallmentAmount )

    return (TotCalculatedAmount == null) ? new CurrencyAmount( BigDecimal.ZERO, this.getClaim().Currency ) : TotCalculatedAmount
  }


  function PromissoryAmountDueAsOf() : CurrencyAmount {
    //Calculates total amount of estimated payments
    var TotCalculatedAmount = this.ScheduledPayments.toList()
                                  .sumCurrencyAmount( \ s -> {
                                                               if (s.PaymentExpDate  < gw.api.util.DateUtil.currentDate()) {
                                                                 return s.SubroInstallmentAmount 
                                                               } else {
                                                                 return null
                                                               }
                                                             } )
                                                             
    return (TotCalculatedAmount == null) ? new CurrencyAmount( BigDecimal.ZERO, this.getClaim().Currency ) : TotCalculatedAmount

  }

}
