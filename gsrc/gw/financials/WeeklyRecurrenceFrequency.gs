package gw.financials
uses gw.lang.Export
uses java.lang.String

@Export
enum WeeklyRecurrenceFrequency {

  EVERY_WEEK(\ -> displaykey.Wizard.NewCheckWizard.CheckInstructions.Recurrence.SubsequentChecks.Frequency.Weekly.EveryWeek), 
  EVERY_TWO_WEEKS(\ -> displaykey.Wizard.NewCheckWizard.CheckInstructions.Recurrence.SubsequentChecks.Frequency.Weekly.EveryTwoWeeks),
  OTHER(\ -> displaykey.Wizard.NewCheckWizard.CheckInstructions.Recurrence.SubsequentChecks.Frequency.Weekly.Other)

  var _displayName : block() : String

  private construct(inDisplayName : block() : String) {
    _displayName = inDisplayName
  }
  
  override function toString() : String {
    return _displayName()
  }
}
