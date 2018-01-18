Template.ResultsTest.onCreated(function() {
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

Template.ResultsTest.helpers({
  study:        () => { return Studies.findOne(); },
  alternatives: () => { return Alternatives.find(); },
  criteria:     () => { return Criteria.find(); },
  ratings:      () => { return Ratings.find(); },
  pairs:        () => { return Pairs.find(); },
  rowspan:      () => {
    study = Studies.findOne();
    return study.currentRound + 2;
  }
});
