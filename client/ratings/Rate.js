Template.Rate.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('currentStudy', studyId);
  });
});

Template.Rate.helpers({
  currentStudy: () => {
    return Studies.findOne();
  },
});
