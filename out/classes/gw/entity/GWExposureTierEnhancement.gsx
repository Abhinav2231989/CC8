package gw.entity
uses java.util.HashMap

@Export
enhancement GWExposureTierEnhancement : entity.Exposure {
  
  function setExposureTier() : void {
    
    /*  Useful debug statement for understanding the state of the data coming into this function
    print("PolicyType: " + this.Claim.Policy.PolicyType + "  LOB: " + this.Claim.LOBCode + "  Coverage: " +
       this.Coverage.Type + "  CoverageSubtype: " + this.CoverageSubType + "  ExpoType: " + this.ExposureType 
       + "  LossParty: " + this.LossParty);
    */
    
    switch (this.Claim.Policy.PolicyType) {
      case "PersonalAuto":
      case "BusinessAuto":
      case "Homeowners":
      case "CommercialProperty":
        setAutoPropertyExposureTier()
        break
       case "WorkersComp":
        setWCExposureTier()
        break  
       case "travel_per":
        setTravelExposureTier()
        break  
      default:
        setOtherPolicyTypesExposureTier()
    }
  }
  
  private function setWCExposureTier() : void {
    switch (this.CoverageSubType) {
      case "WCWorkersCompMED":
        this.ExposureTier = "medical"
        break
      case "WCWorkersCompWAGES":
        this.ExposureTier = "indemnity"
        break
      case "WCEmpLiabCov":
        this.ExposureTier = "el"
        break
    }
  }

  private function setAutoPropertyExposureTier() : void {

    switch (this.ExposureType) {
      case "BodilyInjuryDamage":
      case "MedPay": 
      case "PIPDamages": 
        if (this.LossParty == "insured") {  // 1st party
          this.ExposureTier = "1p_med_low";
        } else {  // 3rd party
          this.ExposureTier = "3p_med_low";
        }
        break;      
      
      case "Dwelling":
      case "OtherStructure": 
      case "PropertyDamage": 
        if (this.LossParty == "insured") {  // 1st party
          this.ExposureTier = "1p_sd_low";
        } else {  // 3rd party
          this.ExposureTier = "3p_pd_low";
        }
        break;      

      case "Content":
      case "PersonalPropertyDamage": 
        if (this.LossParty == "insured") {  // 1st party
          this.ExposureTier = "1p_content_low";
        } else {  // 3rd party
          this.ExposureTier = "3p_pd_low";
        }
        break;      

      case "TowOnly": 
        this.ExposureTier = "towing";
        break;
      
      case "LivingExpenses": 
      case "LossOfUseDamage": 
        this.ExposureTier= "lossofuse";
        break;
               
      case "VehicleDamage": 
        if (this.LossParty == "insured") {  // 1st party
          if (this.CoverageSubType == "PARentalCov" or this.CoverageSubType == "BARentalCov") {
            this.ExposureTier = "rental";
          } else {
            this.ExposureTier = "1p_pd_low";
          }
        } else {  // 3rd party
          this.ExposureTier = "3p_pd_low";
        }
        break;      
      
      case "GeneralDamage": 
        if (this.LossParty == "insured") {  // 1st party
          this.ExposureTier = "1p_pd_low";
        } else {  // 3rd party
          this.ExposureTier = "3p_pd_low";
        }
        break;      
      
      default:
        if (this.LossParty == "insured") {  // 1st party
          this.ExposureTier = "1p_pd_low";
        } else {  // 3rd party
          this.ExposureTier = "3p_pd_low";
        }
    }

    if (this.InjuryIncident.ComplexInjury
            or this.VehicleIncident.TotalLoss
            or this.Claim.IsVeryComplexProperty
            or this.Claim.IsComplexProperty) {
      var lowToHigh = new HashMap<ExposureTier,ExposureTier>() {
        "1p_pd_low" -> "1p_pd_high",
        "1p_med_low" -> "1p_med_high",
        "1p_sd_low" -> "1p_sd_high",
        "1p_content_low" -> "1p_content_high",
        "3p_pd_low" -> "3p_pd_high",
        "3p_med_low" -> "3p_med_high"
      }
      if (lowToHigh.containsKey(this.ExposureTier)) {
        this.ExposureTier = lowToHigh[this.ExposureTier]
      }
    }
  }

  private function setTravelExposureTier() : void {
    if (this.ExposureType== "VehicleDamage"
            or this.ExposureType== "PropertyDamage"
            or this.ExposureType== "PersonalPropertyDamage"
            or this.ExposureType== "PIPDamages"
            or this.Incident.Severity == "severe-gen"
            or this.Incident.Severity == "major-gen"
            or this.InjuryIncident.Severity == "major-injury"
            or this.InjuryIncident.Severity == "severe-injury"
            or this.InjuryIncident.Severity == "fatal") {
      this.ExposureTier = "high"
    } else if (this.ExposureType =="MedPay"
            or this.Incident.Severity == "moderate-gen") {
      this.ExposureTier = "medium"
    } else {
      this.ExposureTier = "low"
    }
  }

  private function setOtherPolicyTypesExposureTier() : void {
    // Specific cases
    var covSubType = this.CoverageSubType;
    if (covSubType == "BOPForgeAltCov"  or 
        covSubType == "IMAccountReceivableCov"  or
        covSubType == "GLPollutionDesignatedCovBI" or 
        covSubType == "GLPollutionDesignatedCovPD" or 
        covSubType == "GLPollutionDesignatedCovGEN" or 
        covSubType == "farm_bid") {
      this.ExposureTier = "high";      
    } else if (covSubType == "GLCGLCov_prod_mp") {
      this.ExposureTier = "medium"; 
    } else {
      // General tiering
      switch (this.LossParty) {
        case "insured":
          if (this.ExposureType == "BodilyInjuryDamage") {
            this.ExposureTier = "medium";
          } else {
            this.ExposureTier = "low";
          }
          break;
          
        case "third_party":
          if (this.ExposureType == "BodilyInjuryDamage") {
            this.ExposureTier = "high";
          } else {
            this.ExposureTier = "medium";
          }
          break;
          
        default:  
          // should never come here, but just in case...
          this.ExposureTier = "low";
      }
    }

    if (this.ExposureTier != "high"
            and (this.InjuryIncident.ComplexInjury
                    or this.Claim.IsVeryComplexProperty
                    or (this.Incident.Subtype == "Incident" and (this.Incident.Severity == "severe-gen")))) {
      this.ExposureTier = "high"        
    }
    if (this.ExposureTier == "low"
            and ((this.Incident.Subtype == "Incident" and this.Incident.Severity =="major-gen")
                    or (this.LossParty =="third_party" and this.Claim.Policy.PolicyType == "businessowners")
                    or this.Claim.IsComplexProperty
                    or this.VehicleIncident.TotalLoss)) {
        this.ExposureTier = "medium"
    }  
  }
}
