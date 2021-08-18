<%@ params(trigger : FinancialThresholdTrigger, clm : Claim) %>
<% var cause = trigger.TriggeringCause == "reached" ? "reached or exceeded" : "fell below" %>
On ${ java.util.Date.CurrentDate.formatDateTime(MEDIUM, MEDIUM) } the ${ trigger.FinancialThreshold.DisplayName } for Claim ${ clm.ClaimNumber } ${ cause } ${ gw.api.util.CurrencyUtil.renderAsCurrency(trigger.ThresholdAmount) }.