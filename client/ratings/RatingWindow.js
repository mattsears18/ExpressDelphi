Template.RatingWindow.onCreated(function() {
  var self = this;
  self.autorun(function() {
    console.log(self);
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('incompleteAlternative', studyId);
    self.subscribe('criteria', studyId);
    self.subscribe('userRatings', studyId);
    self.subscribe('pairs', studyId);
  });
});

Template.RatingWindow.helpers({
  alternative: () => { return Alternatives.findOne(); },
  pairs: () => { return Pairs.find(); },
  criteria: () => { return Criteria.find(); },
});
