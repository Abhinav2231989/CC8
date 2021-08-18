package gw.sampledata
uses gw.pl.persistence.core.Bundle

@Export
class SampleAuthorityLimits extends SampleDataBase {

  construct(inCache : SampleDataCache) {
    super(inCache)
  }

  override property get Description() : String {
    return "Authority Limits"
  }
    
  override function testSampleData(bundle : Bundle) {
    new gw.api.databuilder.AuthorityLimitBuilder()
      .withLimitAmount(1000000bd.ofDefaultCurrency())
      .withPublicId("demo_sample:1")
      .withLimitType("ctr")
      .onProfile(gw.api.database.Query.make(entity.AuthorityLimitProfile).compare("PublicID", Equals, "demo_sample:1").select().FirstResult)
      .create(bundle)
    new gw.api.databuilder.AuthorityLimitBuilder()
      .withLimitAmount(1000000bd.ofDefaultCurrency())
      .withPublicId("demo_sample:2")
      .withLimitType("cptd")
      .onProfile(gw.api.database.Query.make(entity.AuthorityLimitProfile).compare("PublicID", Equals, "demo_sample:1").select().FirstResult)
      .create(bundle)
    new gw.api.databuilder.AuthorityLimitBuilder()
      .withLimitAmount(20000bd.ofDefaultCurrency())
      .withPublicId("demo_sample:3")
      .withLimitType("ctr")
      .onProfile(gw.api.database.Query.make(entity.AuthorityLimitProfile).compare("PublicID", Equals, "demo_sample:2").select().FirstResult)
      .create(bundle)
    new gw.api.databuilder.AuthorityLimitBuilder()
      .withLimitAmount(30000bd.ofDefaultCurrency())
      .withPublicId("demo_sample:4")
      .withLimitType("cptd")
      .onProfile(gw.api.database.Query.make(entity.AuthorityLimitProfile).compare("PublicID", Equals, "demo_sample:2").select().FirstResult)
      .create(bundle)
  }
}

