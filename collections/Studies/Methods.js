Meteor.methods({
  "removeAlternativesByStudyId" : function (studyId) {
    Alternatives.remove({studyId: studyId}, {multi: true});
  },
  "removeCriteriaByStudyId" : function (studyId) {
    Criteria.remove({studyId: studyId}, {multi: true});
  },
  "removePairsByStudyId" : function (studyId) {
    Pairs.remove({studyId: studyId}, {multi: true});
  },
  "removeMessagesByStudyId" : function (studyId) {
    Messages.remove({studyId: studyId}, {multi: true});
  },
});
