Template.Rate.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');

    self.subscribe('currentStudy', studyId);
    self.subscribe('roundAlternatives', studyId);
    self.subscribe('criteria', studyId);
    self.subscribe('currentPairs', studyId);
    self.subscribe('roundRatings', studyId);
  });
});

Template.Rate.helpers({
  currentStudy: () => { return Studies.findOne(); },
  alternatives: () => { return Alternatives.find(); },
  shuffledAlternatives: () => { return _.shuffle(Alternatives.find().fetch()); },
  criteria:     () => { return Criteria.find(); },
  pairs:        () => { return Pairs.find({studyId: FlowRouter.getParam('studyId')}); },
  ratings:      () => { return Ratings.find({}); },
});
