package gw.entity

uses gw.vendormanagement.ServiceRequestActivityPattern

@Export
enhancement GWServiceRequestMetricEscalationDelegateEnhancement : entity.ServiceRequestMetricEscalationDelegate {

  property get EscalationActivityPatternForMetric() : ActivityPattern {
    if (this typeis SpecialistInitialResponseTimeServiceRequestMetric) {
      return ActivityPattern.finder.getActivityPatternByCode(ServiceRequestActivityPattern.VENDOR_DID_NOT_ACCEPT_WORK.PatternCode)
    } else if (this typeis QuoteTimelinessServiceRequestMetric) {
      return ActivityPattern.finder.getActivityPatternByCode(ServiceRequestActivityPattern.VENDOR_PAST_EXPECTED_QUOTE_COMPLETION_DATE.PatternCode)
    } else if (this typeis ServiceTimelinessServiceRequestMetric) {
      return ActivityPattern.finder.getActivityPatternByCode(ServiceRequestActivityPattern.VENDOR_PAST_EXPECTED_SERVICE_COMPLETION_DATE.PatternCode)
    }
    return null
  }  
}
