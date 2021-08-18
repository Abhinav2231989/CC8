<table border="0" cellpadding="2px" cellspacing="0" style="border-collapse: collapse">
    <tr>
<%

  if (calendarState.getCalendarType().equals(calendarState.MY_DESKTOP_CALENDAR)) { %>

     <%renderDropdownList(matterFilters, "matterFilter", calendarState.getMatterFilter(),
                          displaykey.Web.Calendar.Filter.MatterRelated.Label )%>
     <%renderDropdownList(activityFilters, "activityFilter", calendarState.getActivityPatternFilter(),
                          displaykey.Web.Calendar.Filter.ActivityType.Label )%>
    </tr><tr>
     <%renderDropdownList(priorityFilters, "priorityFilter", calendarState.getPriorityFilter(),
                          displaykey.Web.Calendar.Filter.Priority.Label )%>

  <% } else if (calendarState.getCalendarType().equals(calendarState.SUPERVISOR_DESKTOP_CALENDAR) ) { %>

     <%renderDropdownList(matterFilters, "matterFilter", calendarState.getMatterFilter(),
                          displaykey.Web.Calendar.Filter.MatterRelated.Label )%>
     <%renderDropdownList(activityFilters, "activityFilter", calendarState.getActivityPatternFilter(),
                          displaykey.Web.Calendar.Filter.ActivityType.Label )%>
    </tr><tr>
     <%renderDropdownList(groupFilters, "groupFilter", calendarState.getGroupFilter(),
                          displaykey.Web.Calendar.Filter.Group.Label )%>
     <%renderDropdownList(priorityFilters, "priorityFilter", calendarState.getPriorityFilter(),
                          displaykey.Web.Calendar.Filter.Priority.Label )%>

   <% } else if (calendarState.getCalendarType().equals(calendarState.MY_CLAIM_CALENDAR) ) { %>

      <%renderDropdownList(assignedFilters, "assignedFilter", calendarState.getAssignedFilter(),
                          displaykey.Web.Calendar.Filter.Assignee.Label )%>
      <%renderDropdownList(priorityFilters, "priorityFilter", calendarState.getPriorityFilter(),
                          displaykey.Web.Calendar.Filter.Priority.Label )%>

   <% } else if (calendarState.getCalendarType().equals(calendarState.SUPERVISOR_CLAIM_CALENDAR) ) { %>

     <%renderDropdownList(groupFilters, "groupFilter", calendarState.getGroupFilter(),
                          displaykey.Web.Calendar.Filter.Group.Label )%>
     <%renderDropdownList(priorityFilters, "priorityFilter", calendarState.getPriorityFilter(),
                          displaykey.Web.Calendar.Filter.Priority.Label )%>

  <% } else if (calendarState.getCalendarType().equals(calendarState.MY_MATTER_CALENDAR) ) { %>

      <%renderDropdownList(detailMatterFilters, "detailMatterFilter", calendarState.getDetailMatterFilter(),
                          displaykey.Web.Calendar.Filter.MatterRelated.Label )%>
      <%renderDropdownList(activityFilters, "activityFilter", calendarState.getActivityPatternFilter(),
                          displaykey.Web.Calendar.Filter.ActivityType.Label )%>
    </tr><tr>
      <%renderDropdownList(assignedFilters, "assignedFilter", calendarState.getAssignedFilter(),
                          displaykey.Web.Calendar.Filter.Assignee.Label )%>
      <%renderDropdownList(priorityFilters, "priorityFilter", calendarState.getPriorityFilter(),
                          displaykey.Web.Calendar.Filter.Priority.Label )%>

    <% } else if (calendarState.getCalendarType().equals(calendarState.SUPERVISOR_MATTER_CALENDAR) ) { %>

      <%renderDropdownList(detailMatterFilters, "detailMatterFilter", calendarState.getDetailMatterFilter(),
                          displaykey.Web.Calendar.Filter.MatterRelated.Label )%>
      <%renderDropdownList(activityFilters, "activityFilter", calendarState.getActivityPatternFilter(),
                          displaykey.Web.Calendar.Filter.ActivityType.Label )%>
    </tr><tr>
      <%renderDropdownList(groupFilters, "groupFilter", calendarState.getGroupFilter(),
                          displaykey.Web.Calendar.Filter.Group.Label )%>
      <%renderDropdownList(priorityFilters, "priorityFilter", calendarState.getPriorityFilter(),
                          displaykey.Web.Calendar.Filter.Priority.Label )%>

   <% } %>

    </tr>
</table>


<% function renderDropdownList( filters : com.guidewire.pl.web.widget.LabeledValue[],
                                filterName : String,
                                selectedValue : String,
                                label : String) { %>
      <td class="dateNavigatorSmallText" align="right" style="padding-left: 5px;">
        <%=label%>
      </td>
      <td class="dateNavigatorSmallText">
        <select class="dateNavigatorSmallText" name="JumpActivity" size="1"
                      onchange="Events.invokeEvent( '<%= _id %>', true, '<%=filterName%>=' + this.options[this.selectedIndex].value )">
              <% for( var filter in filters ) {
                   if( filter.Value == selectedValue ) { %>
                     <option value="<%= filter.Value %>" selected ><%= filter.Label %>
                <% } else { %>
                     <option value="<%= filter.Value %>"><%= filter.Label %>
                <% } %>
              <% } %>
        </select>
      </td>

<% } %>
