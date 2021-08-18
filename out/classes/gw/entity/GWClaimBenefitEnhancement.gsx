package gw.entity
uses gw.api.benefits.WorkersCompBenefitsCalculator
uses gw.api.benefits.TTDBenefitsCalculator
uses gw.api.benefits.TPDBenefitsCalculator
uses gw.api.benefits.PPDBenefitsCalculator
uses gw.api.benefits.PTDBenefitsCalculator
uses java.util.Date
uses gw.api.util.DateUtil
uses gw.api.database.Query

@Export
enhancement GWClaimBenefitEnhancement : Claim {

  function getTPDBenefitsCalculator() : WorkersCompBenefitsCalculator {
    return TPDBenefitsCalculator.create( this, null)
  }
  
  function getTPDBenefitsCalculatorWithTime(calculationTime : Date) : WorkersCompBenefitsCalculator {
    return TPDBenefitsCalculator.create( this, calculationTime)
  }
  
  function getTTDBenefitsCalculator() : WorkersCompBenefitsCalculator {
    return TTDBenefitsCalculator.create( this, null)
  }

  function getPPDBenefitsCalculator() : WorkersCompBenefitsCalculator {
    return PPDBenefitsCalculator.create( this, null)
  }

  function getPTDBenefitsCalculator() : WorkersCompBenefitsCalculator {
    return PTDBenefitsCalculator.create( this, null)
  }
 
  function getLossTimeExposure() : Exposure {
    var LTExp : Exposure = null;
    for (exp in this.Exposures) {
      if (exp.CoverageSubType== "WCWorkersCompWAGES") 
        {LTExp = exp;}
      } 
    return LTExp;
  }

  function getNumberOfDependents(ValuationDate : Date) : Number {
    var ActiveDependents : Number = 0
    if (ValuationDate == null) {
      ValuationDate = DateUtil.currentDate()
    }  
    var AllDependents = this.getLossTimeExposure().getClaimContactsByRole("claimantdep")
    for (dep in AllDependents) {
      if (dep.BenefitEndDate == null or dep.BenefitEndDate > gw.api.util.DateUtil.currentDate()) {
        ActiveDependents = ActiveDependents + 1
      }
    }
    return ActiveDependents;
  }
 
  function findWCBeneCalcRef() : WCBenefitParameterSet {    
    //Date logic is to ensure that Find is based upon date not time and date
    return Query.make(entity.WCBenefitParameterSet).compare("JurisdictionState", Equals, this.JurisdictionState)
                                             .compare("StartDate", LessThanOrEquals, this.LossDate.moveToEndOfDay())
                                             .compare("EndDate", GreaterThanOrEquals, this.LossDate.trimToMidnight()).select().AtMostOneRow
  }
 
  function getWCWaitingDays(BenefitType : LostWagesBenefitType) : Number {
   var WaitDays = findWCBeneCalcRef().WaitingPeriodDays
   if (WaitDays <> null and BenefitType <> null) {
     if (BenefitType == "ppd" and findWCBeneCalcRef().WPNotAppliedToPPD){
       WaitDays = 0
     }
     else if (BenefitType == "ptd" and findWCBeneCalcRef().WPNotAppliedToPTD){
       WaitDays = 0
     } 
   }
   return WaitDays
 }
 
 function getWCRetroactiveDays(BenefitType: LostWagesBenefitType): Number {
   var RetroDays = findWCBeneCalcRef().RetroactivePeriod
   if (RetroDays <> null) {
     if (BenefitType == "ppd" and findWCBeneCalcRef().WPNotAppliedToPPD){
       RetroDays = 0
     }
     else if (BenefitType == "ptd" and findWCBeneCalcRef().WPNotAppliedToPTD){
       RetroDays = 0
     }
   }    
   return RetroDays
 }
  
  function getWCWaitingDaysApplied() : Number {
    var wda : Number = 0.0
    for (eachperiod in this.ClaimWorkComp.WaitingPeriodDetails) {
      if (eachperiod.WaitingDaysApplied <> null) {
        wda = wda + eachperiod.WaitingDaysApplied as java.lang.Double
      } 
    }
    return wda
  }
 
  function getWCRetroDaysRepaid(): Number {
    var daysrepaid  : Number = 0.0;
    for (eachperiod in this.ClaimWorkComp.WaitingPeriodDetails) {
      if (eachperiod.WaitingDaysRepaid <> null) {
        daysrepaid = daysrepaid + eachperiod.WaitingDaysRepaid as java.lang.Double
      } 
    }
    return daysrepaid
  }
 
  function getWorkStatusMessage() : String {
    var currentWorkStatusMessage : String = displaykey.Claim.Benefit.WorkStatus.Unknown
    if (this.EmploymentData != null) {
      var currentWorkStatus = this.EmploymentData.WorkStatusChanges.sortBy(\s -> s.StatusDate ).last()
      if (currentWorkStatus.StatusDate <= DateUtil.currentDate() and currentWorkStatus.StatusEndDate == null) {
        currentWorkStatusMessage = displaykey.Claim.Benefit.WorkStatus.Known(currentWorkStatus.Status.Description, currentWorkStatus.StatusDate.DaysSince)
      }
    }
    return currentWorkStatusMessage
  }
}