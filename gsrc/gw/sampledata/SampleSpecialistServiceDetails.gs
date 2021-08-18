package gw.sampledata

uses gw.pl.persistence.core.Bundle
uses com.guidewire.cc.system.config.CCConfigResourceKeys

/**
 * Creates CC-specific entities that link SpecialistServices, which is part of platform. This class
 * requries that SampleSpecialistServiceTree has already been loaded.
 */
@Export
class SampleSpecialistServiceDetails extends SampleDataBase {

  construct(inCache : SampleDataCache) {
    super(inCache)
  }

  override property get Description() : String {
    return "Specialist Service Details"
  }

  override function testSampleData(bundle : Bundle) {
    XMLSampleDataImporter.importFromFile(CCConfigResourceKeys.VENDOR_SERVICE_DETAILS.File, bundle)
  }

  override function minimalTestSampleData(bundle : Bundle) {
    testSampleData(bundle)
  }
}
