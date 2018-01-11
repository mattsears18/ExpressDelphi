Template.Rate.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');

    self.subscribe('currentStudy', studyId);
    self.subscribe('roundAlternatives', studyId);
    self.subscribe('criteria', studyId);
    self.subscribe('pairs', studyId);
    self.subscribe('ratings', studyId);
  });
});

Template.Rate.helpers({
  currentStudy:         () => { return Studies.findOne(); },
  alternatives:         () => { return Alternatives.find(); },
  shuffledAlternatives: () => { return _.shuffle(Alternatives.find().fetch()); },
  criteria:             () => { return Criteria.find(); },
  currentPairs:         () => {
    study = Studies.findOne({_id: FlowRouter.getParam('studyId')});

    if(study) {
      return Pairs.find({
        studyId: FlowRouter.getParam('studyId'),
        round: study.currentRound,
      });
    }
  },
});
