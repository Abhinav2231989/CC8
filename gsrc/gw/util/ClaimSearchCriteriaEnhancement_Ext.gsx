package gw.util

uses gw.api.search.ClaimSearchResults
/*
 * Copyright © Endurance Specialty Holdings Ltd.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * Endurance Specialty Holdings Ltd. ("Confidential Information").  
 * You shall not disclose such Confidential Information and
 * shall use it only in accordance with the terms of the license
 * agreement you entered into with Endurance Specialty Holdings Ltd.
 *
 * @author rcanegaly
 * 8/25/14
 *
 */

/**
*  An enhancement to the ClaimSearchCriteria entity.
*  It has properties to support searching for claims by their new Reopened_Ext flag
 */
 enhancement ClaimSearchCriteriaEnhancement_Ext: entity.ClaimSearchCriteria {

   public function performAdvancedSearch_Ext() : ClaimSearchResults{

     var records = this.performAdvancedSearch()
     if(records.Count > 3){
       gw.api.util.LocationUtil.addRequestScopedWarningMessage("More than 3 results found. Please provide more specific search criteria")
       records.each( \ elt -> {
        // records.add
       })
     }


     return records
   }
 }
