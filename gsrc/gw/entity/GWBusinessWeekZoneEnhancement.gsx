package gw.entity

@Export
enhancement GWBusinessWeekZoneEnhancement : entity.BusinessWeekZone {
  property get ShortDescription() : String {
    return displaykey.Web.Admin.BusinessWeek.DuplicateZones.Zone(this.BusinessWeek.Name, this.Country.DisplayName, this.ZoneType.DisplayName, this.Code)
  }
}
