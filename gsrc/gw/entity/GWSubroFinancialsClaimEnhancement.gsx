package gw.entity
uses gw.api.financials.FinancialsCalculationUtil
uses gw.api.financials.FinancialsCalculations
uses gw.api.util.Logger
uses gw.api.financials.CurrencyAmount
uses java.math.BigDecimal
uses gw.api.util.CurrencyUtil
uses gw.api.database.Query
uses gw.api.database.Relop

@Export
enhancement GWSubroFinancialsClaimEnhancement : entity.Claim
{
  function ReserveLinesforClaimCost() : ReserveLine[]{

    var list = new java.util.ArrayList()

      for (aline in this.ReserveLines) {
        if (aline.CostType=="claimcost") {
            list.add(aline)
          }
      }

    return list as ReserveLine[]
  }

  function getClaimNetPaidExcludingSubroRecovery() : CurrencyAmount {
    var ClaimNetPaidExcludingSubroRecovery = this.ReserveLines.toList()
                                                 .sumCurrencyAmount( \ r -> {
                                                                              if (r.CostType =="claimcost") {
                                                                                return r.getNetPaidExcludingSubroRecovery()
                                                                              } else {
                                                                                return null
                                                                              }
                                                                            })

    return  (ClaimNetPaidExcludingSubroRecovery == null) ? new CurrencyAmount( BigDecimal.ZERO, this.getClaim().Currency ) : ClaimNetPaidExcludingSubroRecovery
  }


  function AutoSetOpenRecoveryReserve(validateonly : Boolean) : String{
    //zero in claim currency
    var zero = new CurrencyAmount( BigDecimal.ZERO, this.getClaim().Currency )
        
    var CalculateOSRecReserveComment : String = null

     // Note:  TotalExpectedRecovery will need to be divided by 100 to convert to a decimals
    var TotalExpectedRecoveryPercentage : Number = 0
    var CurrentRecoveredPercentage : Number = 0

    // Determine Expected Recovery  and cap at 100%

    TotalExpectedRecoveryPercentage = this.AdversePartyExpectedRecoveryPercent()


    if ( TotalExpectedRecoveryPercentage > 100)  {
       TotalExpectedRecoveryPercentage = 100
    }
    // This is acutally a percentage, therefore divide by 100

    TotalExpectedRecoveryPercentage = TotalExpectedRecoveryPercentage / 100

    var ClaimNetPaidExcludingSubroRecovery = zero
    var ClaimRecoveryforRecCatSubro = zero

    var RLNetPaidExcludingSubroRecovery = zero
    var RLSubroRec = zero

    // Determine Net Paid (Excluding Subro Recovery) and  Subro Recovery for the claim

    for (eachRL in this.ReserveLines ) {
      if (eachRL.CostType =="claimcost") {
        RLNetPaidExcludingSubroRecovery = eachRL.getNetPaidExcludingSubroRecovery()
        RLSubroRec = FinancialsCalculationUtil.getTotalRecoveries().getAmount( eachRL, "subro" )
        if (RLSubroRec ==  null)
        {
          RLSubroRec = zero
        }
        // ClaimPaidNetNonSubroRecovery -> ClaimNetPaidExcludingSubroRecovery
        ClaimNetPaidExcludingSubroRecovery = ClaimNetPaidExcludingSubroRecovery + RLNetPaidExcludingSubroRecovery
        ClaimRecoveryforRecCatSubro  = ClaimRecoveryforRecCatSubro + RLSubroRec 
        if (RLNetPaidExcludingSubroRecovery != zero
            and ((RLSubroRec.divideStrict(RLNetPaidExcludingSubroRecovery, CurrencyUtil.getRoundingMode())  ) > TotalExpectedRecoveryPercentage))  //
        {

          CalculateOSRecReserveComment = displaykey.Subrogation.SetRecoveryResToExpected.RecGTExpect(TotalExpectedRecoveryPercentage * 100, eachRL.DisplayName )
          //api.util.Logger.logInfo( "Log Rule displaykey.DisplayName" + displaykey.Java.DisplayName.NewlyCreated)
          Logger.logInfo( "rlSubroRec" +  RLSubroRec)
          Logger.logInfo( "RLNetPaidExcludingSubroRecovery" +  RLNetPaidExcludingSubroRecovery)
        }
      }
    }

    if (ClaimNetPaidExcludingSubroRecovery > zero) {
      CurrentRecoveredPercentage = ClaimRecoveryforRecCatSubro.divideStrict(ClaimNetPaidExcludingSubroRecovery, CurrencyUtil.getRoundingMode())
    } else {
      CalculateOSRecReserveComment = displaykey.Subrogation.SetRecoveryResToExpected.ZeroNetPaid
    }
    if ((ClaimNetPaidExcludingSubroRecovery * TotalExpectedRecoveryPercentage) ==
        // TODO: CurrencyCorrectness
        (ClaimRecoveryforRecCatSubro.addAsSameCurrency(gw.api.util.Math.Nz(FinancialsCalculations.getOpenRecoveryReserves().withClaim(this).withCostType(CostType.TC_CLAIMCOST).Amount.Amount)))) {
      CalculateOSRecReserveComment = displaykey.Subrogation.SetRecoveryResToExpected.EqualsExpected
    }

    if ((not validateonly) and (CalculateOSRecReserveComment == null)) {

      // Set the recovery
      for (eachRL in this.ReserveLines ) {
        if (eachRL.CostType =="claimcost" and (eachRL.getNetPaidExcludingSubroRecovery() > zero or FinancialsCalculations.getOpenRecoveryReserves().withReserveLine(eachRL).Amount > zero)){
          RLNetPaidExcludingSubroRecovery = eachRL.getNetPaidExcludingSubroRecovery()
          RLSubroRec = FinancialsCalculationUtil.getTotalRecoveries().getAmount( eachRL, "subro" )
          if (RLSubroRec == null) {
            RLSubroRec = zero
          }
          if (RLNetPaidExcludingSubroRecovery != zero
              and (RLSubroRec.divideStrict(RLNetPaidExcludingSubroRecovery, CurrencyUtil.getRoundingMode())) < TotalExpectedRecoveryPercentage ) {
            var amountofOpenRecoveryReserveNeededForRL = RLNetPaidExcludingSubroRecovery * TotalExpectedRecoveryPercentage
            amountofOpenRecoveryReserveNeededForRL = amountofOpenRecoveryReserveNeededForRL.fix(CurrencyUtil.getRoundingMode()) - RLSubroRec
            if (amountofOpenRecoveryReserveNeededForRL >= zero) {
              eachRL.setOpenRecoveryReserves( "subro", amountofOpenRecoveryReserveNeededForRL , Query.make(User).compare(User#PublicID, Relop.Equals, "default_data:1" /* Super User */).select().AtMostOneRow)
            }
          }

          else // Actual Recovery must equal Expected Recovery, therefore RL should have zero Outstanding Recovery Reserves
          {
            if (zero < (FinancialsCalculations.getOpenRecoveryReserves().withReserveLine(eachRL).Amount)) {
              eachRL.setOpenRecoveryReserves( "subro", zero , Query.make(User).compare(User#PublicID, Relop.Equals, "default_data:1" /* Super User */).select().AtMostOneRow)
            }
          }

        } // if(eachRL.CostType =="claimcost" ...

      } // for(eachRL in this.ReserveLines ) ...
    }  //if (Not RLActualRecoveredGreaterThanExpected

    return CalculateOSRecReserveComment
  }

  function getClaimCostsRecovSubroOnly() : CurrencyAmount {
     var ClaimRecoveryforRecCatSubro = this.ReserveLines
                                           .toList()
                                           .sumCurrencyAmount( \ r -> {
                                                                        if (r.CostType =="claimcost") {
                                                                          return FinancialsCalculationUtil.getTotalRecoveries().getAmount( r, "subro" )
                                                                        } else {
                                                                          return null
                                                                        }
                                                                      })

    return (ClaimRecoveryforRecCatSubro == null) ? new CurrencyAmount( BigDecimal.ZERO, this.getClaim().Currency ) : ClaimRecoveryforRecCatSubro
  }


  function getClaimLevelRecoveriesSubroOnly(aReserveLine : ReserveLine) : CurrencyAmount
  {
     var total = this.getRecoveriesIterator( false /*newAndModifiedOnly*/ )
                     .toList().sumCurrencyAmount( \ t -> {
                                                               var rec = t
                                                               if (rec.Exposure == null 
                                                                   and rec.CostType == "claimcost"
                                                                   and aReserveLine == rec.ReserveLine   
                                                                   and rec.RecoveryCategory == "subro") {
                                                                 return rec.ClaimAmount
                                                               } else {
                                                                 return null
                                                               }
                                                             } )

     return (total == null) ? new CurrencyAmount( BigDecimal.ZERO, this.getClaim().Currency ) : total
  }


  function getTotAmountRecoveredByAdvParties() : CurrencyAmount
  {
    var TotAmountRec = this.SubrogationSummary.SubroAdverseParties
                           .toList().sumCurrencyAmount( \ s -> s.getTotClaimCostSubroRecoveryForParty() )
    
    return (TotAmountRec == null) ? new CurrencyAmount( BigDecimal.ZERO, this.getClaim().Currency ) : TotAmountRec
  }
}
