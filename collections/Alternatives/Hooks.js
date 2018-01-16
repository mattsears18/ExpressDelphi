import Alternatives from './Alternatives';

Alternatives.after.remove(function (userId, doc) {
  FlowRouter.go('alternatives', {studyId: doc.studyId});
});
