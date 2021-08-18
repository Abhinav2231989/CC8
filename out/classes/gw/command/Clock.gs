package gw.command
uses com.guidewire.pl.quickjump.DefaultMethod
uses com.guidewire.pl.quickjump.Argument
uses gw.i18n.DateTimeFormat

@Export
@DefaultMethod("withDefault")
class Clock extends CCBaseCommand {

  construct() {
    super();
  }

  @Argument("Number of Hours", "1")
  function addHours() : String {
    return addHours(Argument as int)
  } 

  @Argument("Number of Days", "1")
  function addDays() : String  {
    return addDays(Argument as int) 
  }

  @Argument("Number of Weeks", "1")
  function addWeeks() : String  {
    return addWeeks(Argument as int)
  }

  @Argument("Number of Months", "1")
  function addMonths() : String {
    return addMonths(Argument as int)
  }
  
  function withDefault() : String {
    return "Today is: " + CurrentDate + " " + CurrentDate.formatTime(DateTimeFormat.MEDIUM)
  }
    
  function withOneMoreMonth(): String {
    return addMonths(1)
  }
  
  function withOneMoreDay(): String {
    return addDays(1)
  }
  
  function withOneMoreWeek(): String {
    return addDays(7)
  }
}
