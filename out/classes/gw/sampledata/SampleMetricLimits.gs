package gw.sampledata

uses com.guidewire.cc.system.config.CCConfigResourceKeys
uses gw.api.financials.CurrencyAmount
uses gw.api.testdata.TestDataUtil
uses gw.api.util.CurrencyUtil
uses gw.lang.reflect.TypeSystem
uses gw.pl.persistence.core.Bundle

uses java.lang.IllegalStateException
uses java.lang.Integer
uses java.math.BigDecimal

@Export
class SampleMetricLimits extends SampleDataBase {
  
  /**
   * Nested class for creating Claim metric limits. The addLimits() method
   * is effectively a terse description of all the limits we add. It could
   * also be replaced by code that reads in values from a spreadsheet.
   */
  private class ClaimMetricLimits {

    private var _bundle : Bundle
    
    construct(bundle : Bundle) {
      _bundle = bundle
    }
    
    function addLimits() {
      add("WorkersComp", "DaysOpenClaimMetric", null, 3, 2, 5)
      add("WorkersComp", "DaysOpenClaimMetric", "medicalonly", 45, 40, 90)
      add("WorkersComp", "DaysOpenClaimMetric", "indemnity", 90, 80, 150)
      add("WorkersComp", "DaysOpenClaimMetric", "el", 180, 165, 270)
      add("PersonalAuto", "DaysOpenClaimMetric", null, 30, 25, 60)
      add("PersonalAuto", "DaysOpenClaimMetric", "low", 10, 8, 20)
      add("PersonalAuto", "DaysOpenClaimMetric", "high", 150, 140, 180)
      add("Homeowners", "DaysOpenClaimMetric", null, 90, 80, 120)
      add("Homeowners", "DaysOpenClaimMetric", "low", 30, 25, 40)
      add("Homeowners", "DaysOpenClaimMetric", "high", 180, 160, 200)
      add("GeneralLiability", "DaysOpenClaimMetric", null, 250, 200, 300)
      add("GeneralLiability", "DaysOpenClaimMetric", "low", 50, 40, 80)
      add("GeneralLiability", "DaysOpenClaimMetric", "high", 500, 400, 750)
      add("BusinessOwners", "DaysOpenClaimMetric", null, 90, null, null)
      add("BusinessAuto", "DaysOpenClaimMetric", null, 60, null, null)
      add("CommercialProperty", "DaysOpenClaimMetric", null, 180, null, null)
      add("farmowners", "DaysOpenClaimMetric", null, 60, null, null)
      add("travel_per", "DaysOpenClaimMetric", null, 30, null, null)
      add("WorkersComp", "DaysInitialContactWithInsuredClaimMetric", null, 1, 1, 2)
      add("PersonalAuto", "DaysInitialContactWithInsuredClaimMetric", null, 1, 1, 2)
      add("Homeowners", "DaysInitialContactWithInsuredClaimMetric", null, 1, 1, 2)
      add("GeneralLiability", "DaysInitialContactWithInsuredClaimMetric", null, 1, 1, 2)
      add("BusinessOwners", "DaysInitialContactWithInsuredClaimMetric", null, 1, 1, 2)
      add("BusinessAuto", "DaysInitialContactWithInsuredClaimMetric", null, 1, 1, 2)
      add("CommercialProperty", "DaysInitialContactWithInsuredClaimMetric", null, 1, 1, 2)
      add("farmowners", "DaysInitialContactWithInsuredClaimMetric", null, 1, 1, 2)
      add("travel_per", "DaysInitialContactWithInsuredClaimMetric", null, 1, 1, 2)
      add("WorkersComp", "TimeToFirstPaymentClaimMetric", null, 20, 17, 30)
      add("WorkersComp", "TimeToFirstPaymentClaimMetric", "el", 60, 50, 120)
      add("WorkersComp", "DaysLastViewedByAdjusterClaimMetric", null, 10, 8, 20)
      add("WorkersComp", "DaysLastViewedByAdjusterClaimMetric", "indemnity", 15, 12, 25)
      add("WorkersComp", "DaysLastViewedByAdjusterClaimMetric", "el", 20, 17, 40)
      add("PersonalAuto", "DaysLastViewedByAdjusterClaimMetric", null, 10, 8, 15)
      add("PersonalAuto", "DaysLastViewedByAdjusterClaimMetric", "high", 20, 18, 30)
      add("Homeowners", "DaysLastViewedByAdjusterClaimMetric", null, 12, 10, 20)
      add("Homeowners", "DaysLastViewedByAdjusterClaimMetric", "high", 20, 25, 40)
      add("GeneralLiability", "DaysLastViewedByAdjusterClaimMetric", null, 30, 25, 50)
      add("GeneralLiability", "DaysLastViewedByAdjusterClaimMetric", "low", 20, 25, 40)
      add("BusinessOwners", "DaysLastViewedByAdjusterClaimMetric", null, 30, 25, 50)
      add("BusinessAuto", "DaysLastViewedByAdjusterClaimMetric", null, 20, 25, 40)
      add("CommercialProperty", "DaysLastViewedByAdjusterClaimMetric", null, 30, 25, 50)
      add("farmowners", "DaysLastViewedByAdjusterClaimMetric", null, 20, 25, 40)
      add("travel_per", "DaysLastViewedByAdjusterClaimMetric", null, 12, 10, 20)
      add("WorkersComp", "DaysLastViewedBySupervisorClaimMetric", null, 20, 17, 40)
      add("WorkersComp", "DaysLastViewedBySupervisorClaimMetric", "indemnity", 30, 25, 45)
      add("WorkersComp", "DaysLastViewedBySupervisorClaimMetric", "el", 20, 17, 40)
      add("PersonalAuto", "DaysLastViewedBySupervisorClaimMetric", null, 20, 16, 40)
      add("PersonalAuto", "DaysLastViewedBySupervisorClaimMetric", "high", 30, 25, 50)
      add("Homeowners", "DaysLastViewedBySupervisorClaimMetric", null, 20, 16, 40)
      add("Homeowners", "DaysLastViewedBySupervisorClaimMetric", "high", 30, 25, 50)
      add("GeneralLiability", "DaysLastViewedBySupervisorClaimMetric", null, 60, 50, 100)
      add("GeneralLiability", "DaysLastViewedBySupervisorClaimMetric", "low", 30, 25, 50)
      add("BusinessOwners", "DaysLastViewedBySupervisorClaimMetric", null, 60, 50, 100)
      add("BusinessAuto", "DaysLastViewedBySupervisorClaimMetric", null, 30, 25, 50)
      add("CommercialProperty", "DaysLastViewedBySupervisorClaimMetric", null, 60, 50, 100)
      add("farmowners", "DaysLastViewedBySupervisorClaimMetric", null, 30, 25, 50)
      add("travel_per", "DaysLastViewedBySupervisorClaimMetric", null, 20, 16, 40)
      add("WorkersComp", "OverdueActivitiesClaimMetric", null, null, 2, 3)
      add("WorkersComp", "OverdueActivitiesClaimMetric", "indemnity", null, 3, 5)
      add("WorkersComp", "OverdueActivitiesClaimMetric", "el", null, 3, 6)
      add("PersonalAuto", "OverdueActivitiesClaimMetric", null, null, 2, 3)
      add("Homeowners", "OverdueActivitiesClaimMetric", null, null, 2, 3)
      add("GeneralLiability", "OverdueActivitiesClaimMetric", null, null, 2, 3)
      add("BusinessOwners", "OverdueActivitiesClaimMetric", null, null, 2, 3)
      add("BusinessAuto", "OverdueActivitiesClaimMetric", null, null, 2, 3)
      add("CommercialProperty", "OverdueActivitiesClaimMetric", null, null, 2, 3)
      add("farmowners", "OverdueActivitiesClaimMetric", null, null, 2, 3)
      add("travel_per", "OverdueActivitiesClaimMetric", null, null, 2, 3)
      add("WorkersComp", "OpenEscalatedActivitiesClaimMetric", null, 0, null, 1)
      add("WorkersComp", "OpenEscalatedActivitiesClaimMetric", "indemnity", 0, 1, 2)
      add("WorkersComp", "OpenEscalatedActivitiesClaimMetric", "el", 0, 1, 2)
      add("PersonalAuto", "OpenEscalatedActivitiesClaimMetric", null, 0, null, 1)
      add("Homeowners", "OpenEscalatedActivitiesClaimMetric", null, 0, null, 1)
      add("GeneralLiability", "OpenEscalatedActivitiesClaimMetric", null, 0, null, 1)
      add("BusinessOwners", "OpenEscalatedActivitiesClaimMetric", null, 0, null, 1)
      add("BusinessAuto", "OpenEscalatedActivitiesClaimMetric", null, 0, null, 1)
      add("CommercialProperty", "OpenEscalatedActivitiesClaimMetric", null, 0, null, 1)
      add("farmowners", "OpenEscalatedActivitiesClaimMetric", null, 0, null, 1)
      add("travel_per", "OpenEscalatedActivitiesClaimMetric", null, 0, null, 1)
      add("WorkersComp", "AllEscalatedActivitiesClaimMetric", null, 1, 1, 2)
      add("WorkersComp", "AllEscalatedActivitiesClaimMetric", "indemnity", 2, 2, 3)
      add("WorkersComp", "AllEscalatedActivitiesClaimMetric", "el", 3, 2, 4)
      add("PersonalAuto", "AllEscalatedActivitiesClaimMetric", null, 1, 1, 2)
      add("Homeowners", "AllEscalatedActivitiesClaimMetric", null, 1, 1, 2)
      add("GeneralLiability", "AllEscalatedActivitiesClaimMetric", null, 1, 1, 2)
      add("WorkersComp", "ReserveChangeCountClaimMetric", "medicalonly", 3, 2, 4)
      add("WorkersComp", "ReserveChangeCountClaimMetric", "indemnity", 4, 3, 5)
      add("WorkersComp", "ReserveChangeCountClaimMetric", "el", 5, 4, 6)
      add("WorkersComp", "NetTotalIncurredClaimMetric", null, 9000, null, null)
      add("WorkersComp", "NetTotalIncurredClaimMetric", "incidentreport", 0, null, 1)
      add("WorkersComp", "NetTotalIncurredClaimMetric", "medicalonly", 6000, null, null)
      add("WorkersComp", "NetTotalIncurredClaimMetric", "indemnity", 12000, null, null)
      add("WorkersComp", "NetTotalIncurredClaimMetric", "el", 10000, null, null)
      add("PersonalAuto", "NetTotalIncurredClaimMetric", null, 8000, null, null)
      add("PersonalAuto", "NetTotalIncurredClaimMetric", "low", 500, null, null)
      add("PersonalAuto", "NetTotalIncurredClaimMetric", "high", 20000, null, null)
      add("Homeowners", "NetTotalIncurredClaimMetric", null, 5000, null, null)
      add("Homeowners", "NetTotalIncurredClaimMetric", "low", 1500, null, null)
      add("Homeowners", "NetTotalIncurredClaimMetric", "high", 25000, null, null)
      add("GeneralLiability", "NetTotalIncurredClaimMetric", null, 10000, null, null)
      add("GeneralLiability", "NetTotalIncurredClaimMetric", "low", 2000, null, null)
      add("GeneralLiability", "NetTotalIncurredClaimMetric", "high", 50000, null, null)
    }
    
    private function add(policyType : PolicyType, metricType : typekey.ClaimMetric, tier : ClaimTier, target : Integer, yellow : Integer, red : Integer) {
      var limit = createLimitForType(metricType)
      limit.PolicyTypeMetricLimits = PolicyTypeMetricLimits.cache.limitsForPolicyType(policyType)
      limit.ClaimTier = tier
      limit.Currency = CurrencyUtil.getDefaultCurrency()
      if (limit typeis IntegerClaimMetricLimit) {
        limit.IntegerTargetValue = target
        limit.IntegerYellowValue = yellow
        limit.IntegerRedValue = red
      } else if (limit typeis PercentClaimMetricLimit) {
        limit.PercentTargetValue = target
        limit.PercentYellowValue = yellow
        limit.PercentRedValue = red
      } else if (limit typeis MoneyClaimMetricLimit) {
        limit.MoneyTargetValue = target != null ? new CurrencyAmount(new BigDecimal(target), limit.Currency) : null
        limit.MoneyYellowValue = yellow != null ? new CurrencyAmount(new BigDecimal(yellow), limit.Currency) : null
        limit.MoneyRedValue = red != null ? new CurrencyAmount(new BigDecimal(red), limit.Currency) : null
      } else {
        throw new IllegalStateException("Unexpected ClaimMetricLimit type: " + typeof limit)
      }
    }
    
    private function createLimitForType(metricType : typekey.ClaimMetric) : ClaimMetricLimit {
      var result : ClaimMetricLimit
      TestDataUtil.runWithExistingBundleNoCommit(_bundle, \ -> {
        var type = TypeSystem.getByFullName("entity." + metricType.Code)
        var metric = type.TypeInfo.getConstructor({}).Constructor.newInstance({}) as ClaimMetric
        result = metric.createDefaultLimit() as ClaimMetricLimit
        metric.remove()
      })
      return result
    }
  }

  /**
   * Nested class for creating Exposure metric limits. The add limits method is
   * just following the prescription: "For all 11 Policy types, for Initial
   * Contact with Claimant (Days) set a default target of 1 day, Yellow of 1 day
   * and Red of 2 days"
   */
  private class ExposureMetricLimits {

    var _bundle : Bundle
    
    construct(bundle : Bundle) {
      _bundle = bundle
    }
    
    function addLimits() {
      for (policyType in PolicyType.getTypeKeys(false)) {
        add(policyType, "DaysInitialContactWithClaimantExposureMetric", null, 1, 1, 3)
      }
    }

    private function add(policyType : PolicyType, metricType : typekey.ExposureMetric, tier : ExposureTier, target : Integer, yellow : Integer, red : Integer) {
      var limit = createLimitForType(metricType)
      limit.PolicyTypeMetricLimits = PolicyTypeMetricLimits.cache.limitsForPolicyType(policyType)
      limit.ExposureTier = tier
      limit.Currency = CurrencyUtil.getDefaultCurrency()
      if (limit typeis IntegerExposureMetricLimit) {
        limit.IntegerTargetValue = target
        limit.IntegerYellowValue = yellow
        limit.IntegerRedValue = red
      } else if (limit typeis PercentExposureMetricLimit) {
        limit.PercentTargetValue = target
        limit.PercentYellowValue = yellow
        limit.PercentRedValue = red
      } else if (limit typeis MoneyExposureMetricLimit) {
        limit.MoneyTargetValue = new CurrencyAmount(new BigDecimal(target), limit.Currency)
        limit.MoneyYellowValue = new CurrencyAmount(new BigDecimal(yellow), limit.Currency)
        limit.MoneyRedValue = new CurrencyAmount(new BigDecimal(red), limit.Currency)
      } else {
        throw new IllegalStateException("Unexpected ExposureMetricLimit type: " + typeof limit)
      }
    }
    
    private function createLimitForType(metricType : typekey.ExposureMetric) : ExposureMetricLimit {
      var result : ExposureMetricLimit
      TestDataUtil.runWithExistingBundleNoCommit(_bundle, \ -> {
        var type = TypeSystem.getByFullName("entity." + metricType.Code)
        var metric = type.TypeInfo.getConstructor({}).Constructor.newInstance({}) as ExposureMetric
        result = metric.createDefaultLimit() as ExposureMetricLimit
        metric.remove()
      })
      return result
    }
  }

  construct(inCache : SampleDataCache) {
    super(inCache)
  }

  override property get Description() : String {
    return "Claim, exposure and service request metric limits"
  }

  override function testSampleData( bundle : Bundle ) {
    // Tests create their own metric limits
  }

  override function demoSampleData(bundle : Bundle) {
    var claimMetricLimits = new ClaimMetricLimits(bundle)
    claimMetricLimits.addLimits()
    var exposureMetricLimits = new ExposureMetricLimits(bundle)
    exposureMetricLimits.addLimits()

    //service request sample limits are stored in xml
    XMLSampleDataImporter.importFromFile(CCConfigResourceKeys.SERVICE_REQUEST_METRIC_LIMITS.File, bundle)
  }
}
