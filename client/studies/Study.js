Template.Study.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('currentStudy', studyId);
    // self.subscribe('pairsWithRelations');
  });
});

Template.Study.helpers({
  study: () => {
    return Studies.findOne();
  },
  // pairsSelector() {
  //   study = Studies.findOne({_id: FlowRouter.getParam('studyId')});
  //
  //   if(study) {
  //     return {
  //       studyId: study._id,
  //       round: study.currentRound,
  //     }
  //   }
  // },
  pairs() {
      return Pairs.find();
  },
  pairAlternative() {
      // We use this helper inside the {{#each posts}} loop, so the context
      // will be a post object. Thus, we can use this.authorId.
      return Alternatives.findOne(this.alternativeId);
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
