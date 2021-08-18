package gw.plugin.addressbook.ab700

uses gw.plugin.addressbook.AddressBookRemotableSearchResultSpec
uses gw.api.webservice.exception.RequiredFieldException
uses gw.contactmapper.ab700.ContactIntegrationXMLMapper
uses java.util.ArrayList
uses java.util.HashSet
uses java.util.Set
uses wsi.remote.gw.webservice.ab.ab700.abcontactapi.anonymous.elements.ABContactAPISearchSpecInfo_SortColumns
uses wsi.remote.gw.webservice.ab.ab700.abcontactapi.anonymous.elements.ABContactAPISearchSpecInfo_SortColumns_Entry
uses wsi.remote.gw.webservice.ab.ab700.abcontactapi.anonymous.elements.ABContactAPISearchSpecInfo_SubtypeFilter
uses wsi.remote.gw.webservice.ab.ab700.abcontactapi.anonymous.types.complex.ABContactSearchCriteriaInfo_Tags
uses wsi.remote.gw.webservice.ab.ab700.abcontactapi.types.complex.ABContactAPISearchSpecInfo
uses wsi.remote.gw.webservice.ab.ab700.abcontactapi.types.complex.ABContactSearchCriteriaInfo
uses wsi.remote.gw.webservice.ab.ab700.abcontactapi.types.complex.AddressSearchInfo
uses wsi.remote.gw.webservice.ab.ab700.abcontactapi.types.complex.ProximitySearchParametersInfo


/**
 * This class converts Contact Search spec and criteria from the IAddressBookAdapter API objects
 * to the ABContactAPI objects. 
 * 
 * If you extend the search criteria you will need to modify this class to make sure the extensions
 * get copied over for the search in ContactManager
 */
@Export
class ContactSearchMapper {

  construct() {
  }

  /**
   * This is a set of all the sort fields in the EntityName for Contact that exist only
   * in ContactManager 8.0, so they need to be removed before sending to ContactManager 
   * 7.0
   */

  static var AB800OnlySortPaths : Set<String> = new HashSet<String>() { 
      "Contact.NameKanji",
      "Contact.FirstNameKanji", 
      "Contact.LastNameKanji",
      "Contact.Particle" 
  }

  /**
   * Converts the AddressBookRemotableSearchSpec used in the IAddressBookAdapter API to the 
   * ABContactAPISearchSpecInfo used in the ABContactAPI for ContactManager.
   * 
   * This spec controls various aspects of results that should be returned from searches in the AddressBook.
   * 
   * @param searchResultSpec the AddressBookRemotableSearchResultSpec passed in through the IAddressBookAdapter API
   * @returns the ABContactAPISearchSpecInfo to be sent to ContactManager
   */
  public static function convertToABContactAPISearchSpecInfo(searchResultSpec : AddressBookRemotableSearchResultSpec) : ABContactAPISearchSpecInfo {
    var searchSpecInfo = new ABContactAPISearchSpecInfo()
    searchSpecInfo.GetNumResultsOnly = searchResultSpec.GetNumResultsOnly
    searchSpecInfo.StartRow = searchResultSpec.StartRow
    searchSpecInfo.ExcludeTotal = not searchResultSpec.IncludeTotal
    searchSpecInfo.ChunkSize = searchResultSpec.MaxResults
    if (searchResultSpec.MaxResults == null) {
      searchSpecInfo.ChunkSize = 0
    }

    var subtypeList = new ArrayList<wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.ABContact>()
    var mapper = ContactIntegrationXMLMapper.getInstance().getNameMapper()
    for (subtypeFilter in searchResultSpec.ContactSubtypeFilter) {
      var abEntityName = mapper.getXSDTypeFromEntityName(subtypeFilter)
      var enumValue = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.ABContact.forGosuValue(abEntityName)
      if (enumValue == null) {
        throw new RequiredFieldException("Invalid subtype filter ${subtypeFilter} mapped to ${abEntityName}")
      }
      subtypeList.add(enumValue)      
      var alternates = mapper.getAlternateABTypeCodeValues(subtypeFilter)
      if (alternates != null) {
        alternates.each(\ s -> { 
          var altEnumValue = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.ABContact.forGosuValue(s)
          if (not subtypeList.contains(altEnumValue)) {
            subtypeList.add(altEnumValue)
          }
        })
      }
    }
    
    if (subtypeList.HasElements) {
      searchSpecInfo.SubtypeFilter = new ABContactAPISearchSpecInfo_SubtypeFilter()
      searchSpecInfo.SubtypeFilter.Subtypes.Entry = subtypeList
    }

    searchSpecInfo.SortColumns = new ABContactAPISearchSpecInfo_SortColumns()
    for (sortRow in searchResultSpec.SortColumns) {
      if(!AB800OnlySortPaths.contains(sortRow.SortPath)) {
        var sortColumn = new ABContactAPISearchSpecInfo_SortColumns_Entry()
        sortColumn.Ascending = sortRow.Ascending
        sortColumn.BeanPath = ABContactPluginUtil.translateToABEntities(sortRow.SortPath)
        searchSpecInfo.SortColumns.Entry.add(sortColumn)
      }
    }
    return searchSpecInfo
  }

  /**
   * This method converts the ContactSearchCriteria entity into the ABContactSearchCriteriaInfo that
   * is sent to ContactManager for search operations.
   * If you have extended the ContactSearchCriteria entity with custom search fields, you must extend the
   * ABContactSearchCriteriaInfo class in ContactManager and then extend this method to ensure the custom
   * search data is sent to ContactManager.
   * 
   * @param searchCriteria the ContactSearchCriteria to be converted
   * @returns the ABContactSearchCriteriaInfo to be sent to ContactManager
   */
  public static function convertToABContactSearchCriteriaInfo(searchCriteria : ContactSearchCriteria) : ABContactSearchCriteriaInfo {
    var searchCriteriaInfo = new ABContactSearchCriteriaInfo()
    searchCriteriaInfo.ContactType = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.ABContact.forGosuValue(ContactIntegrationXMLMapper.getInstance().getNameMapper().getXSDTypeFromEntityName(searchCriteria.ContactSubtype.Code))
    searchCriteriaInfo.AdjudicativeDomain = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.AdjudicativeDomain.forGosuValue(searchCriteria.AdjudicativeDomain.Code)
    searchCriteriaInfo.AttorneySpecialty = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.LegalSpecialty.forGosuValue(searchCriteria.AttorneySpecialty.Code)
    searchCriteriaInfo.DoctorSpecialty = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.SpecialtyType.forGosuValue(searchCriteria.DoctorSpecialty.Code)
    searchCriteriaInfo.LawFirmSpecialty = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.LegalSpecialty.forGosuValue(searchCriteria.LawFirmSpecialty.Code)
    searchCriteriaInfo.MedicalOrgSpecialty = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.SpecialtyType.forGosuValue(searchCriteria.MedicalOrgSpecialty.Code)
    searchCriteriaInfo.VendorType = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.VendorType.forGosuValue(searchCriteria.VendorType.Code)
    searchCriteriaInfo.Keyword = searchCriteria.Keyword
    searchCriteriaInfo.OrganizationName = searchCriteria.OrganizationName
    searchCriteriaInfo.PreferredVendors = searchCriteria.PreferredVendors
    searchCriteriaInfo.TaxID    = searchCriteria.TaxID
    searchCriteriaInfo.Score = searchCriteria.Score
    searchCriteriaInfo.EmployeeNumber = null   
    searchCriteriaInfo.FirstName = searchCriteria.FirstName

    // set AllTagsRequired to false and don't set any tags
    searchCriteriaInfo.AllTagsRequired = false;
    searchCriteriaInfo.Tags = null

    if (searchCriteria.ProximitySearchParameters != null) {
      var pSearchParameters = new ProximitySearchParametersInfo()
      pSearchParameters.CorrectedSearchCenter = searchCriteria.ProximitySearchParameters.CorrectedSearchCenter    
      pSearchParameters.DistanceBasedSearch = searchCriteria.ProximitySearchParameters.DistanceBasedSearch
      pSearchParameters.GeocodeStatus = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.GeocodeStatus.forGosuValue(searchCriteria.ProximitySearchParameters.GeocodeStatus.Code)
      pSearchParameters.Longitude = searchCriteria.ProximitySearchParameters.SpatialPoint.Longitude
      pSearchParameters.Latitude = searchCriteria.ProximitySearchParameters.SpatialPoint.Latitude
      pSearchParameters.Number = searchCriteria.ProximitySearchParameters.Number
      pSearchParameters.SavedSearchCenter = searchCriteria.ProximitySearchParameters.SavedSearchCenter
      pSearchParameters.UnitOfDistance = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.UnitOfDistance.forGosuValue(searchCriteria.ProximitySearchParameters.UnitOfDistance.Code)
      
      searchCriteriaInfo.ProximitySearchParameters.$TypeInstance = pSearchParameters    
    }
    
    if (searchCriteria.ProximitySearchCenter != null) {
      var pSearchCenter = new AddressSearchInfo()
      pSearchCenter.City = searchCriteria.ProximitySearchCenter.City
      pSearchCenter.Country = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.Country.forGosuValue(searchCriteria.ProximitySearchCenter.Country.Code)
      pSearchCenter.PostalCode = searchCriteria.ProximitySearchCenter.PostalCode
      pSearchCenter.State = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.State.forGosuValue(searchCriteria.ProximitySearchCenter.State.Code)
      searchCriteriaInfo.ProximitySearchCenter.$TypeInstance = pSearchCenter
    }
    
    if (searchCriteria.Address != null) {
      var address = new AddressSearchInfo()
      address.City = searchCriteria.Address.City
      address.Country = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.Country.forGosuValue(searchCriteria.Address.Country.Code)
      address.PostalCode = searchCriteria.Address.PostalCode
      address.State = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.State.forGosuValue(searchCriteria.Address.State.Code)
      searchCriteriaInfo.Address.$TypeInstance = address
    }

    if (searchCriteria.Tags.HasElements) {
      searchCriteriaInfo.Tags.$TypeInstance = new ABContactSearchCriteriaInfo_Tags()
      for (tagType in searchCriteria.Tags*.Type){
        var remoteContactTagType = wsi.remote.gw.webservice.ab.ab700.abcontactapi.enums.ContactTagType.forGosuValue(tagType.Code)
        searchCriteriaInfo.Tags.Entry.add(remoteContactTagType)
      }
    }

    searchCriteriaInfo.AllTagsRequired = searchCriteria.AllTagsRequired

    return searchCriteriaInfo
  }
}