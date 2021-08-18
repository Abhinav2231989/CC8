            <table border="0" cellpadding="2px" cellspacing="0" style="border-collapse: collapse">
              <tr>
                <td class="dateNavigatorSmallText">
                    <%= displaykey.JSP.LitigationCalendar.JumpTo %> <select name="JumpDate" size="1" class="dateNavigatorSmallText"
                              onchange="Events.invokeEvent( '<%= _id %>', true, this.options[this.selectedIndex].value )">
                      <option value="clearCalendarState=1"><%= displaykey.JSP.LitigationCalendar.Today %>
                      <option value="year=<%= model.Year%>&month=<%= model.Month%>&today=<%= model.Today %>&selectedDay=<%= model.SelectedDay %>" selected><%= model.Title %>
                      <% for ( var i in 0..|11 ) { %>
                        <option value="year=<%= model.getYear( i+1 )%>&month=<%= model.getMonth(  i+1 )%>&today=0&selectedDay=1"><%= model.getTitle(  i+1 ) %>
                      <% } %>
                    </select>
                </td>
              </tr>
            </table>
