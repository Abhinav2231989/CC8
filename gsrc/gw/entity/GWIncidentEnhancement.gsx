package gw.entity

@Export
enhancement GWIncidentEnhancement : entity.Incident {
  
  /**
   * Gets the incident's display name prefixed with the incidents type
   */
  property get TypePrefixedIncidentName(): String {

    var subtype = this.Subtype
    var incidentDisplayName = this.DisplayName
    
    // Incident description has not been added
    if (incidentDisplayName.equals(displaykey.DisplayName.EmptyAddress) or incidentDisplayName.equals(displaykey.Java.DisplayName.NewlyCreated) or incidentDisplayName.Empty) {
      incidentDisplayName = displaykey.Web.Incident.NoDescription

      if(this.Exposures.Count > 0) {
        var incidentExposureType = this.Exposures.first().ExposureType
        if(this.Exposures.allMatch( \ exposure -> exposure.ExposureType == incidentExposureType)) {
          incidentDisplayName = incidentExposureType.DisplayName
        }
      }
    }
    
    if (subtype == typekey.Incident.TC_INCIDENT) {
        return incidentDisplayName
    }
    
    var prefix = ""
    var displayKeyName = "Web.Incident.PrefixName." + subtype.Code
    prefix = gw.api.domain.DisplayKey.getDisplayKeyValue(displayKeyName)       
    
    if (prefix == displayKeyName) {
      return incidentDisplayName
    }    
    
    return prefix + ": " + incidentDisplayName
  }
}
