Template.StatusBar.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('currentStudy', studyId);
  });
});

Template.StatusBar.helpers({
  study: () => {
    return Studies.findOne();
  },
});
