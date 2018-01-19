Template.UpdateCriterion.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var criterionId = FlowRouter.getParam('criterionId');
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('criteria', studyId);
  });
});

Template.UpdateCriterion.helpers({
  criterion: () => {
    return Criteria.findOne({
      _id: FlowRouter.getParam('criterionId'),
    });
  },
});

Template.UpdateCriterion.events({
  'click .fa-close': function() {
    Session.set('updateCriterion', false);
  },
  'submit': function() {
    Session.set('updateCriterion', false);
  }
});
