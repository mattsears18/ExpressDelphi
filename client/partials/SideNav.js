Template.SideNav.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('currentStudy', studyId);
  });
});

Template.SideNav.helpers({
  currentStudy: () => {
    return Studies.findOne();
  },
});
