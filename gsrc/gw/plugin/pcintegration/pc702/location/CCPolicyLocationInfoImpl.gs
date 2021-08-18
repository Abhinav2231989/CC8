package gw.plugin.pcintegration.pc702.location

uses gw.plugin.policy.location.CCPolicyLocationInfo
uses wsi.remote.gw.webservice.pc.pc700.policylocationsearchapi.anonymous.elements.CCPolicyLocation_Address
uses wsi.remote.gw.webservice.pc.pc700.policylocationsearchapi.anonymous.elements.PolicyLocationInfo_PNIAddressFields
uses wsi.remote.gw.webservice.pc.pc700.policylocationsearchapi.anonymous.elements.PolicyLocationInfo_TotalInsuredValues_Entry
uses wsi.remote.gw.webservice.pc.pc700.policylocationsearchapi.types.complex.PolicyLocationInfo

uses java.math.BigDecimal

@Export
class CCPolicyLocationInfoImpl implements CCPolicyLocationInfo {
  private var _info : PolicyLocationInfo

  construct(info: PolicyLocationInfo) {
    _info = info
  }

  override property get PolicyNumber(): String {
    return _info.PolicyNumber
  }

  override property get PolicyLocationAddress(): Address {
    return new Address(_info.PolicyLocation.Address)
  }

  override property get PolicyLocationPolicySystemID(): String {
    return _info.PolicyLocation.PolicySystemID
  }

  override property get PNIAddressFields(): PNIAddress {
    return new PNIAddress(_info.PNIAddressFields)
  }

  override property get PolicyLocationLatitude(): BigDecimal {
    return _info.PolicyLocationLatitude
  }

  override property get PolicyLocationLongitude(): BigDecimal {
    return _info.PolicyLocationLongitude
  }

  override property get PolicyLocationGeocodeStatus(): String {
    return _info.PolicyLocationGeocodeStatus
  }

  override property get ProductCode(): String {
    return _info.ProductCode
  }

  override property get PNIName(): String {
    return _info.PNIName
  }

  override property get PNIEmail(): String {
    return _info.PNIEmail
  }

  override property get PNIPhoneNumber(): String {
    return _info.PNIPhoneNumber
  }

  //Not returned by PC 7.0.x Policy Location search
  override property get PNIPhoneCountry(): typekey.PhoneCountryCode {
    return null
  }

  //Not returned by PC 7.0.x Policy Location search
  override property get PNIPhoneExtension(): String {
    return null
  }

  override property get TotalInsuredValues(): InsuredValue[] {
    return (_info.TotalInsuredValues.Entry.map(\insuredVal -> new InsuredValue(insuredVal))) as InsuredValue[]
  }

  private class InsuredValue implements CCPolicyLocationInfo.InsuredValue {

    private var _insuredVal : PolicyLocationInfo_TotalInsuredValues_Entry

    construct(insuredVal : PolicyLocationInfo_TotalInsuredValues_Entry) {
      _insuredVal = insuredVal
    }

    override property get Name(): String {
      return _insuredVal.Name
    }

    override property get Value(): BigDecimal {
      return _insuredVal.Value
    }

    override property get Currency(): String {
      return null
    }
  }

  private class Address implements CCPolicyLocationInfo.Address {
    private var _address : CCPolicyLocation_Address

    construct(address: CCPolicyLocation_Address) {
      _address = address
    }

    override property get AddressLine1(): String {
      return _address.AddressLine1
    }

    override property get AddressLine1Kanji(): String {
      return null
    }

    override property get AddressLine2(): String {
      return _address.AddressLine2
    }

    override property get AddressLine2Kanji(): String {
      return null
    }

    override property get AddressLine3(): String {
      return _address.AddressLine3
    }

    override property get City(): String {
      return _address.City
    }

    override property get CityKanji(): String {
      return null
    }

    override property get County(): String {
      return _address.County
    }

    override property get State(): String {
      return _address.State
    }

    override property get PostalCode(): String {
      return _address.PostalCode
    }

    override property get CEDEX(): String {
      return null
    }

    override property get CEDEXBureau(): String {
      return null
    }

    override property get Country(): String {
      return _address.Country
    }
  }

  private class PNIAddress implements CCPolicyLocationInfo.Address {
    private var _address : PolicyLocationInfo_PNIAddressFields

    construct(address: PolicyLocationInfo_PNIAddressFields) {
      _address = address
    }

    override property get AddressLine1(): String {
      return _address.AddressLine1
    }

    override property get AddressLine1Kanji(): String {
      return null
    }

    override property get AddressLine2(): String {
      return _address.AddressLine2
    }

    override property get AddressLine2Kanji(): String {
      return null
    }

    override property get AddressLine3(): String {
      return _address.AddressLine3
    }

    override property get City(): String {
      return _address.City
    }

    override property get CityKanji(): String {
      return null
    }

    override property get County(): String {
      return _address.County
    }

    override property get State(): String {
      return _address.State
    }

    override property get PostalCode(): String {
      return _address.PostalCode
    }

    override property get CEDEX(): String {
      return null
    }

    override property get CEDEXBureau(): String {
      return null
    }

    override property get Country(): String {
      return _address.Country
    }
  }
}