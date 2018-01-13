Template.SideNav.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('currentStudy', studyId);
  });
});

Template.SideNav.helpers({
  study: () => {
    return Studies.findOne(FlowRouter.getParam('studyId'));
  },
});
