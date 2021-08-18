package util;
uses java.util.ArrayList
uses gw.api.database.Query

@Export
class QuestionUtils{

  public static function getAppropriateQuestionSet(claimInput : Claim) : QuestionSet[] {
    var questionSetTypes = new ArrayList<QuestionSetType>()
    questionSetTypes.add("siugen");
    if (claimInput.LossType == "AUTO"){
      questionSetTypes.add("siucar");
    } else if (claimInput.LossType == "WC") {
      questionSetTypes.add("siuwork");
    }
    var query = Query.make(entity.QuestionSet)
           .compareIn("QuestionSetType", (questionSetTypes as typekey.QuestionSetType[]))
           .select().orderBy(\ q -> q.QuestionSetType)
                    .thenBy(\ q -> q.Priority)
    
    var questionSets = new ArrayList<QuestionSet>()
    for (questionSet in query) {
      questionSets.add(questionSet)
    }
    return questionSets.toTypedArray()
  }

  public static function getQuestionSetTotalScore(answerContainer : gw.api.question.AnswerContainer, questionSetsTemp : QuestionSet[]) : int {
    var result = 0;
    for (questionSetTemp in questionSetsTemp){
       result = result + questionSetTemp.getPointTotal(answerContainer);
    }
    return result;
  }
}
