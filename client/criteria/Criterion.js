Template.Criterion.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var criterionId = FlowRouter.getParam('criterionId');
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('criteria', studyId);
  });
});

Template.Criterion.helpers({
  criterion: () => {
    return Criteria.findOne({
      _id: FlowRouter.getParam('criterionId'),
    });
  },
});

Template.Criterion.events({
  'click .fa-pencil': function() {
    Session.set('updateCriterion', true);
  },
});

Template.Criterion.destroyed = function(){
  Session.set('updateCriterion', false);
}
