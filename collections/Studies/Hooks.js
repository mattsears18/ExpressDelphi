import Studies from './Studies';

Studies.after.remove(function (userId, study) {
  Meteor.call('removeAlternativesByStudyId', study._id);
  Meteor.call('removeCriteriaByStudyId', study._id);
  Meteor.call('removePairsByStudyId', study._id);
  Meteor.call('removeMessagesByStudyId', study._id);
  FlowRouter.go('studies');
});

Studies.after.insert(function (userId, doc) {
  FlowRouter.go('study', {studyId: doc._id});
});
