package gw.api.heatmap
uses java.util.ArrayList
uses gw.api.database.DBFunction
uses gw.api.database.Relop
uses gw.api.database.Query

/**
 * Dataset with policy location data for the catastrophe heat map.  Uses CatastrophePolicyLocationHeatMapCache to share
 * the buffer among all users.  (In clusters, that will be one buffer per cluster member.)
 */
@Export
class CatastrophePolicyLocationDataSet extends HeatMapDataSet {
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
      return new ArrayList<CatastrophePolicyLocationLatLong>()

    var result = HeatMapCaches.getCacheWithType(CatastrophePolicyLocationHeatMapCache).getEntry(HeatMap.CatastropheKey).value()
    return result
  }

  override property get MapPoints() : List<LatLong> {
    // fetch value from cache
    return mapPointQuery()
  }

  override function filter(latLong : LatLong) : boolean {
    var policyLocationLatLong = latLong as CatastrophePolicyLocationLatLong
    if (HeatMap.PolicyLocations == null)
      return true // "Any" case
    return HeatMap.PolicyLocations.filter(policyLocationLatLong.HasClaim)
  }
  
  override function getWeight(mapPoint : LatLong) : int {
    if (HeatMap.MapView == HeatMap.MapViews.PolicyTotalView)
      return (mapPoint as CatastrophePolicyLocationLatLong).Amount
    else
      return 1
  }

  /** The query used to initialize the cache */
  static function findPolicyLocationsForCatastrophe(catastropheId : Key) : List<CatastrophePolicyLocationLatLong> {
    var query = Query.make(PolicyLocationSummary)
                     .compare("Catastrophe", Relop.Equals, catastropheId)
    var rows = query
      .select(\ row -> new CatastrophePolicyLocationLatLong(row.Latitude as double, row.Longitude as double,
                                  row.ID, DBFunction.Count(row.ClaimJoin*.PolicyLocationSummary) > 0, row.TotalInsured))
    return rows.toList()
  }
  
}