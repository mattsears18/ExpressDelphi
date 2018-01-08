Template.UpdateAlternative.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var resourceId = FlowRouter.getParam('alternativeId');
    self.subscribe('singleAlternative', resourceId);
  });
});

Template.UpdateAlternative.helpers({
  alternative: () => {
    return Alternatives.findOne();
  },
});

Template.UpdateAlternative.events({
  'click .fa-close': function() {
    Session.set('updateAlternative', false);
  },
  'submit': function() {
    Session.set('updateAlternative', false);
  }
});
