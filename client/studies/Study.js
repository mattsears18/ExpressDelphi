import { $ } from 'meteor/jquery';
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
dataTablesBootstrap(window, $);








Template.Study.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('currentStudy', studyId);
    self.subscribe('alternatives', studyId);
    self.subscribe('criteria', studyId);
    self.subscribe('roundRatings', studyId);
    self.subscribe('pairs', studyId);
  });
});

Template.Study.helpers({
  study: () =>      { return Studies.findOne(); },
  alternatives: () => { return Alternatives.find(); },
  criteria: () => { return Criteria.find(); },

  pairsSelector: function() {
    study = Studies.findOne({_id: FlowRouter.getParam('studyId')});
    if(study) {
      return {
        studyId: FlowRouter.getParam('studyId'),
        round: study.currentRound,
      };
    }
  },
});


Template.Study.events({
  'click .next-round': function() {
    Meteor.call('studies.startNextRound', {
      studyId: FlowRouter.getParam('studyId'),
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        FlowRouter.go('rate', {studyId: FlowRouter.getParam('studyId')});
      }
    });
  },
  'click .autofill-consensus': function() {
    Meteor.call('studies.autofillConsensus', {
      studyId: FlowRouter.getParam('studyId'),
    }, (err, res) => {
      if (err) {
        alert(err);
      }
    });
  },
  'click .fa-pencil': function() {
    Session.set('updateStudy', true);
  },
});


Template.Study.destroyed = function(){
  Session.set('updateStudy', false);
}
