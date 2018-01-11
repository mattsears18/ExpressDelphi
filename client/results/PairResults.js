import { jStat } from 'jStat';


Template.PairResults.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    var pairId = FlowRouter.getParam('pairId');

    self.subscribe('currentStudy', studyId);
    self.subscribe('alternatives', studyId);
    self.subscribe('criteria', studyId);
    self.subscribe('singlePair', pairId);
    self.subscribe('pairRatings', pairId);
  });
});

Template.PairResults.helpers({
  currentStudy: () => { return Studies.findOne(); },
  alternatives: () => { return Alternatives.find(); },
  criteria:     () => { return Criteria.find(); },
  pair:         () => { return Pairs.findOne(); },
  ratings:      () => { return Ratings.find({}); },
  jStat:        () => { return jStat },
});
