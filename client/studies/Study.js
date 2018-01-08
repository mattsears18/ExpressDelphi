Template.Study.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('currentStudy', studyId);
  });
});

Template.Study.helpers({
  study: () => {
    return Studies.findOne();
  },
  pairsSelector() {
    study = Studies.findOne({_id: FlowRouter.getParam('studyId')})

    if(study) {
      return {
        study: study._id,
        round: study.currentRound,
      }
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
        // success!
      }
    });
  },
  'click .fa-pencil': function() {
    console.log('show the study update form');
    Session.set('updateStudy', true);
  },
});
