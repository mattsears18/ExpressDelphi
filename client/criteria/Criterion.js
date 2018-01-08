Template.Criterion.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var criterionId = FlowRouter.getParam('criterionId');
    self.subscribe('singleCriterion', criterionId);
  });
});

Template.Criterion.helpers({
  criterion: () => {
    return Criteria.findOne();
  },
});

Template.Criterion.events({
  'click .fa-pencil': function() {
    Session.set('updateCriterion', true);
  },
});
