package libraries

/**
 * Creates exposures for worker's comp claims, if the state of the claim requires
 * them and they are not already present. Provides two different methods for
 * doing this, a legacy method based on severity and a newer approach based on
 * relevant fields on the claim. Customers may choose to use either method
 * (customized as necessary) but should not use both
 */
@Export
enhancement FNOL : entity.Claim {

  /**
   * Create exposures based on:
   * <ul>
   * <li>Medical or incident report flags set - create Medical Details exposure
   * <li>Time loss or death report flags set - create Time Loss exposure
   * <li>Employer liability flag set - create Employers Liability exposure
   * </ul>
   */
  function createRelevantWorkCompExposures() {
    //open WC Medical Exp if this is not an Incident Only report OR if Medical Report is specifically specified
    if (this.MedicalReport or !this.IncidentReport){
      createAndSetUpExposure("WCWorkersCompCov", "WCWorkersCompMED")
    }
    
    //open WC Time Loss Exp if Indemnity/TimeLossReport field is checked 
    if (this.TimeLossReport or this.DeathReport){
      createAndSetUpExposure("WCWorkersCompCov", "WCWorkersCompWAGES")
    }
    
    //open WC Employer's Liability Exp
    if (this.EmployerLiability) {
      createAndSetUpExposure("WCEmpLiabCov", "WCEmpLiabCov")
    }

    linkWCExposuresToCoverages()
    
    ensureNoGapsInExposureNumbers()
  }

  /**
   * 
   */
  function linkWCExposuresToCoverages() {
    for (var exposure in this.Exposures) {
      for (coverage in exposure.Claim.Policy.getAllCoverages()) {
        if ((coverage.Type == "WCWorkersCompCov" and 
           (exposure.CoverageSubType == "WCWorkersCompWAGES") or
           (exposure.CoverageSubType == "WCWorkersCompMED")) 
          or
            (coverage.Type == "WCEmpLiabCov" and 
            exposure.CoverageSubType == "WCEmpLiabCov")) {
              exposure.Coverage = coverage
              break
        }
      }
    }
  }

  /**
   * Legacy method, create exposures based on claim severity
   */
  function createWcDefaultExposures() {
    if (this.ClaimInjuryIncident.Severity == "wc-ell") {
      createAndSetUpExposure("WCEmpLiabCov", "WCEmpLiabCov")
    } else {
      createAndSetUpExposure("WCWorkersCompCov", "WCWorkersCompMED")
      if (this.ClaimInjuryIncident.Severity != null
              and this.ClaimInjuryIncident.Severity != "contract-medical"
              and this.ClaimInjuryIncident.Severity != "medical_only") {
        createAndSetUpExposure("WCWorkersCompCov", "WCWorkersCompWAGES")
      }
    }

    linkWCExposuresToCoverages()

    ensureNoGapsInExposureNumbers()
  }

  /**
   * Create exposure with given coverage type and coverage subtype, unless it
   * is already present. If the claim is already open then set up the exposure
   * immediately (if the claim is draft then it will be set up at the end of
   * the new claim wizard)
   */
  private function createAndSetUpExposure(coverageType : CoverageType, coverageSubtype : CoverageSubtype) {
    if (not this.hasExposureOfType(this.getNewExposureType(coverageSubtype))) {
      var exposure = this.newExposure(coverageType, coverageSubtype, true)
      if (this.State == "open") {
        exposure.saveAndSetup() 
      }
    }
  }

  private function ensureNoGapsInExposureNumbers() {
    var order = 1
    foreach (e in this.OrderedExposures) {
      e.ClaimOrder = order
      order++
    }
  }

}
