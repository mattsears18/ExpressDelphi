Template.RatingStatus.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');

    self.subscribe('currentStudy', studyId);
    self.subscribe('pairs', studyId);
    self.subscribe('ratings', studyId);
  });
});

Template.RatingStatus.helpers({
  currentStudy:         () => { return Studies.findOne(); },
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
