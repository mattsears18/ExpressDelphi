Template.UpdateCriterion.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var resourceId = FlowRouter.getParam('criterionId');
    self.subscribe('singleCriterion', resourceId);
  });
});

Template.UpdateCriterion.helpers({
  criterion: () => {
    return Criteria.findOne();
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
