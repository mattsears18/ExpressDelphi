Template.ResultsMedian.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('currentStudy', studyId);
    self.subscribe('alternatives', studyId);
    self.subscribe('criteria', studyId);
    self.subscribe('ratings', studyId);
    self.subscribe('pairs', studyId);
  });
});

Template.ResultsMedian.helpers({
  study:        () => { return Studies.findOne(); },
  alternatives: () => { return Alternatives.find(); },
  criteria:     () => { return Criteria.find(); },
  ratings:      () => { return Ratings.find(); },
  pairs:        () => { return Pairs.find(); },
});
