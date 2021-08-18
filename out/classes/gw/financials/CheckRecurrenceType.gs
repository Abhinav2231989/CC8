package gw.financials
uses gw.lang.Export
uses java.lang.String

@Export
enum CheckRecurrenceType {
  
  SINGLE(\ -> displaykey.Wizard.NewCheckWizard.CheckInstructions.Recurrence.Type.Single), 
  WEEKLY(\ -> displaykey.Wizard.NewCheckWizard.CheckInstructions.Recurrence.Type.Weekly),
  MONTHLY(\ -> displaykey.Wizard.NewCheckWizard.CheckInstructions.Recurrence.Type.Monthly)
  
  var _displayName : block() : String
  
  private construct(inDisplayName : block() : String) {
    _displayName = inDisplayName
  }
  
  override function toString() : String {
    return _displayName()
  }
}
