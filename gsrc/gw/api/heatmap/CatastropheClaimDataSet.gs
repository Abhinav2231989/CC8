package gw.api.heatmap
uses com.guidewire.cc.domain.group.GroupFilter
uses java.util.Date
uses java.util.ArrayList
uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.financials.CurrencyAmount
uses gw.api.database.optimizer.oracle.EnableOracleQueryRewrite
uses gw.api.database.optimizer.oracle.OracleQueryRewriteIntegrity

/**
 * Dataset with claim data for the catastrophe heat map.  Uses CatastropheClaimHeatMapCache to share
 * the buffer among all users.  (In clusters, that will be one buffer per cluster member.)
 */
@Export
class CatastropheClaimDataSet extends HeatMapDataSet {
  var earliestReportedDate : Date
  var _heatMap : CatastropheHeatMap as HeatMap
  
  construct(aHeatMap : CatastropheHeatMap) {
    HeatMap = aHeatMap
  }
  
  /**
   * Returns the latitude, longitude and claim ID of geocoded claims associated with the catastrophe.
   * @return  the list of LongLats
   */
  override function mapPointQuery() : List<LatLong> {
    if (HeatMap.CatastropheKey == null or HeatMap.CatastropheKey.Value < 0)  // skip query if catastrophe is being created
      return new ArrayList<CatastropheClaimLatLong>()

    earliestReportedDate = HeatMap.ReportedDateRange != null ? Date.Today.addDays(-(HeatMap.ReportedDateRange.Code.substring(1) as int)) : null
    var result = HeatMapCaches.getCacheWithType(CatastropheClaimHeatMapCache).getEntry(HeatMap.CatastropheKey).value()
    return result
  }
    
  override property get MapPoints() : List<LatLong> {
    // fetch value from cache
    return mapPointQuery()
  }

  override function filter(latLong : LatLong) : boolean {
    var claimLatLong = latLong as CatastropheClaimLatLong
    if (HeatMap.ClaimState != null and claimLatLong.State != HeatMap.ClaimState) {
      return false
    }
    if (earliestReportedDate != null and claimLatLong.ReportedDate < earliestReportedDate) {
      return false
    }
    if (HeatMap.AssignedToGroup typeis GroupFilter) {
      if (not HeatMap.AssignedToGroup.filter(claimLatLong.AssignedGroupId)) {
        return false
      }
    } else if (HeatMap.AssignedToGroup typeis Group) {
      if (HeatMap.AssignedToGroup.ID != claimLatLong.AssignedGroupId) {
        return false
      }
    }
    // AssignedToGroup == null means don't filter on assigned group
    return true
  }

  override function getWeight(mapPoint : LatLong) : int {
    if (HeatMap.MapView == HeatMap.MapViews.ClaimTotalView)
      return (mapPoint as CatastropheClaimLatLong).Amount
    else
      return 1
  }
  
  /** The query used to initialize the cache */
  static function findClaimsForCatastrophe(catastropheId : Key) : List<CatastropheClaimLatLong> {
    var query = Query.make(Claim)
    query.compare("Catastrophe", Equals, catastropheId)
    query.compare("LossLocationSpatialDenorm", NotEquals, null)

    var rows = query
      .select(\ row -> {
        var open = row.ClaimRpt.OpenReservesReporting
        var payments = row.ClaimRpt.TotalPaymentsReporting
        var recoveries = row.ClaimRpt.TotalRecoveriesReporting
        var netIncurred : CurrencyAmount = open.addStrict(payments).subtractStrict(recoveries)
        return new CatastropheClaimLatLong(
              row.LossLocationSpatialDenorm, row.ID,
              netIncurred, row.State, row.AssignedGroup as Key, row.ReportedDate)
              })
    return rows.toList()
  }
}
