Template.Study.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('currentStudy', studyId);
  });
});

Template.Study.helpers({
  study: () =>      { return Studies.findOne(); },

  pairsSelector: function() {
    study = Studies.findOne({_id: FlowRouter.getParam('studyId')});
    if(study) {
      return {
        studyId: FlowRouter.getParam('studyId'),
        round: study.currentRound,
      };
    }
  }
});



Template.Study.events({
  'click .next-round': function() {
    Meteor.call('studies.startNextRound', {
      studyId: FlowRouter.getParam('studyId'),
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // success!
      }
    });
  },
  'click .fa-pencil': function() {
    Session.set('updateStudy', true);
  },
});
