package gw.entity
uses java.math.BigDecimal
uses gw.api.util.CurrencyUtil

@Export
enhancement GWDecimalMetricDelegateEnhancement : entity.DecimalMetricDelegate {
  
  function getApplicableDisplayValue(value : BigDecimal, displayScale : int) : String {
    var absValue = value.setScale(displayScale, CurrencyUtil.getRoundingMode()).abs().toString()
    return value < 0 ? displaykey.Web.Metric.NegativeValue(absValue) : absValue
  }

}
