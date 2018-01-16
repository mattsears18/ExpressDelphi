import Studies from './Studies';

Studies.after.remove(function (userId, doc) {
  FlowRouter.go('studies');
});

Studies.after.insert(function (userId, doc) {
  FlowRouter.go('study', {studyId: doc._id});
});
