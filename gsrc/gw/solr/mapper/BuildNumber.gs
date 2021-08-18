package gw.solr.mapper

uses gw.xsd.config.solr_search_config.ResultField
uses gw.xsd.config.solr_search_config.DataProperty
uses gw.solr.mapper.IDataHolder
uses gw.solr.mapper.IResultHolder
uses java.lang.Integer
uses java.math.BigDecimal
uses java.lang.Long
uses java.lang.Double
uses java.lang.Number

/**
 * <br/><br/><i>Experimental.  Do not use without consulting Guidewire.</i>
 */
@Export
abstract class BuildNumber<N extends java.lang.Number> implements ISolrQueryResultMapper {

  override function mapSortColumn(resultFields:List<ResultField>, criteriaProperties: List<DataProperty>, dataHolder:IDataHolder): String {
    var chosenResultField : ResultField
    if (criteriaProperties.Count == 1) {
      var selection = dataHolder.lookup<String>(criteriaProperties.get(0))
      chosenResultField = resultFields.firstWhere( \ rf -> rf.Key == selection )
    } else {
      chosenResultField = resultFields.get(0)
    }
    return chosenResultField.SortFieldName
  }

  override function mapQueryResult(resultFields:List<ResultField>, criteriaProperties:List<DataProperty>, dataHolder:IDataHolder, solrResult:IResultHolder): Object {
    var chosenResultField : ResultField
    if (criteriaProperties.Count == 1) {
      var selection = dataHolder.lookup<String>(criteriaProperties.get(0))
      chosenResultField = resultFields.firstWhere( \ rf -> rf.Key == selection )
    } else {
      chosenResultField = resultFields.get(0)
    }
    var resultVal = solrResult.lookup(chosenResultField)
    switch(typeof resultVal) {
        case N: return resultVal
        case java.lang.Number: return coerce(resultVal)
        default:
          return parse(resultVal.toString())
    }
  }

  /**
   * Parses the number from a string.
   */
  abstract function parse(valStr:String) : N

 /**
  * Coerces the value from another Number type.
  */
  abstract function coerce(val:Number) : N

  public static class INTEGER extends BuildNumber<Integer> {
    override function parse(valStr:String) : Integer {
      return Integer.parseInt(valStr)
    }
    override function coerce(val:Number) : Integer {
      return val.intValue()
    }
  }

  public static class LONG extends BuildNumber<Long> {
    override function parse(valStr:String) : Long {
      return Long.parseLong(valStr)
    }
    override function coerce(val:Number) : Long {
      return val.longValue()
    }
  }

  public static class DOUBLE extends BuildNumber<Double> {
    override function parse(valStr:String) : Double {
      return Double.parseDouble(valStr)
    }
    override function coerce(val:Number) : Double {
      return val.doubleValue()
    }
  }

  public static class DECIMAL extends BuildNumber<BigDecimal> {
    override function parse(valStr:String) : BigDecimal {
      return new BigDecimal(valStr)
    }

    override function coerce(val:Number) : BigDecimal {
      return val typeis BigDecimal ? val : new BigDecimal(val.doubleValue())
    }
  }
}