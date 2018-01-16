import Criteria from './Criteria';

Criteria.after.remove(function (userId, doc) {
  FlowRouter.go('criteria', {studyId: doc.studyId});
});
