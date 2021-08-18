package gw.plugin.policy.notification.pc700
uses gw.plugin.policy.IPolicySystemNotificationPlugin
uses gw.plugin.policy.PolicySystemRetryableException
uses gw.plugin.policy.PolicySystemAlreadyExecutedException
uses wsi.remote.gw.webservice.pc.pc700.claimtopolicysystemnotificationapi.ClaimToPolicySystemNotificationAPI
uses java.util.Date
uses wsi.remote.gw.webservice.pc.pc700.claimtopolicysystemnotificationapi.faults.AlreadyExecutedException
uses java.lang.Exception
uses gw.api.financials.CurrencyAmount
uses gw.api.util.CurrencyUtil

/**
 * Implementation of IPolicySystemNotificationPlugin that uses web services to
 * notify Guidewire PolicyCenter
 */
@Export
class PCPolicySystemNotificationPlugin implements IPolicySystemNotificationPlugin {


  override function claimExceedsLargeLossThreshold(lossDate : Date,
          policyNumber : String, grossTotalIncurred : String, transactionId : String) {
    // Earlier, we used to get the grossTotalIncurred string in the format "$100", which we could just directly pass
    // over to PC v7 WebService. However, because of compatibility concerns (see comment in
    // LargeLossPolicySystemNotification.createMessage()), this format had to be changed to "100 USD" instead. Hence,
    // we now need to use this tricky bit of code to convert the input string in format "100 USD" to the format "$100"
    // expected by PC v7 WebService.
    var grossTotalIncurredCurrencyAmount = new CurrencyAmount(grossTotalIncurred)
    var grossTotalIncurredSerialized = CurrencyUtil.renderAsCurrency(grossTotalIncurredCurrencyAmount)

    final var policySystemAPI = new ClaimToPolicySystemNotificationAPI()

    executeNotification(\ -> {
      policySystemAPI.claimExceedsThreshold(lossDate, policyNumber, grossTotalIncurredSerialized, transactionId)
    })
  }
  
  private function executeNotification(notification()) {
    try {
      notification()
    } catch (e : AlreadyExecutedException) {
      throw new PolicySystemAlreadyExecutedException("Policy system already processed this notification", e)
    } catch (e : Exception) {
      throw new PolicySystemRetryableException("SOAP error when contacting policy system", e)
    }
  }
}
