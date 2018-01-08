Meteor.methods({
  'studies.startNextRound'({ studyId }) {
    study = Studies.findOne({_id: studyId});
    newRound = study.currentRound + 1;

    Studies.update(
      {_id: studyId},
      {$set: {currentRound: newRound}}
    );
  }
});
