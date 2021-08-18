package libraries

@Export
enhancement ClaimUI : entity.Claim
{
  function setInitialValues() {
    if (this.LossType == "AUTO") {
      if (this.Policy.PolicyType == PolicyType.TC_BUSINESSAUTO) {
        this.LOBCode = LOBCode.TC_BUSINESSAUTOLINE
      } else {
        this.LOBCode = LOBCode.TC_PERSONALAUTOLINE
      }
    } else if (this.LossType == "TRAV" ) {
      this.LOBCode = "travel" 
    } else if (this.LossType == "GL") {
      this.LOBCode = "GLLine"
   } else if (this.LossType == "PR") {
      if (this.Policy.PolicyType == PolicyType.TC_HOMEOWNERS) {
        this.LOBCode = LOBCode.TC_HOMEOWNERSLINE_HOE
      } else {
        this.LOBCode = "CPLine"
      }
   } else if (this.LossType == "WC") {
      if(this.LocationCode != null and (this.AddressOwner.Address == null or this.AddressOwner.Address.New)) {
        this.AddressOwner.Address = this.LocationCode.Address
      }
      this.ClaimWorkComp = new ClaimWorkComp(this);
      this.LOBCode = "WorkersCompLine" as LOBCode
      var claimInjuryIncident = this.ensureClaimInjuryIncident();
      claimInjuryIncident.GeneralInjuryType = "specific" as InjuryType;
      claimInjuryIncident.DetailedInjuryType = "59" as DetailedInjuryType;
      if (claimInjuryIncident.BodyParts.length == 0) {
        var newBodyPart = claimInjuryIncident.newBodyPart();
        newBodyPart.PrimaryBodyPart = "multiple" as BodyPartType;
        newBodyPart.DetailedBodyPart = "65" as DetailedBodyPartType;
        claimInjuryIncident.addToBodyParts( newBodyPart );
      }
      this.EmploymentData = new EmploymentData(this)
    }
    if(this.ReportedDate == null) {
      this.ReportedDate = gw.api.util.DateUtil.currentDate()
    }
    this.SIUStatus = "No_Referral"
    this.IncidentReport = false
  }

  function areInitialValuesSet() : boolean {
    return this.LOBCode != null
  }

  function cancelTrips(checkedTripRU : entity.TripRU[]) {
    for (eachTripRU in checkedTripRU){
      var newTripIncident = new TripIncident()
      newTripIncident.TripRU = eachTripRU
      this.addToIncidents( newTripIncident )
    }
  }
  function undoTripCancellation(checkedTripRU : entity.TripRU[]) {
    for (eachTripRU in checkedTripRU){
      for(eachTripIncident in this.TripIncidentsOnly)
      {
        if(eachTripIncident.TripRU == eachTripRU)
        {
          this.removeFromIncidents( eachTripIncident )
        }
      }
    }
  }
  function associationDetails() : String {

    if(this.ClaimsAssociatedWith.firstWhere( \ elt -> elt.PrimaryClaim) != null){
      return "Primary"
    } else {
      return "Companion"
    }
  }
}