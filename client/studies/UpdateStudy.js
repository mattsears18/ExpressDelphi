Template.UpdateStudy.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var resourceId = FlowRouter.getParam('studyId');
    self.subscribe('currentStudy', resourceId);
  });
});

Template.UpdateStudy.helpers({
  study: () => {
    return Studies.findOne();
  },
});

Template.UpdateStudy.events({
  'click .fa-close': function() {
    Session.set('updateStudy', false);
  },
  'submit': function() {
    Session.set('updateStudy', false);
  }
});
