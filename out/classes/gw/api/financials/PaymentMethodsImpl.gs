package gw.api.financials

uses gw.api.financials.PaymentMethods

@Export
class PaymentMethodsImpl implements PaymentMethods {

  var _payment : Payment

  construct( payment : Payment ) {
    _payment = payment
  }

  override function recodePayment(onsetPayments : Payment[]) {
    _payment.coreRecodePayment(onsetPayments)
  }
}
