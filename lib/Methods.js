Meteor.methods({
  'studies.startNextRound'({ studyId }) {
    study = Studies.findOne({_id: studyId});
    newRound = study.currentRound + 1;

    Studies.update(
      {_id: studyId},
      {$set: {currentRound: newRound}}
    );

    alternatives = Alternatives.find({study: studyId});
    criteria = Criteria.find({study: studyId});

    alternatives.forEach((alternative) => {
      criteria.forEach((criterion) => {
        console.log(`STUDY: ${study.name} ROUND: ${newRound} ALTERNARTIVE: ${alternative.name} CRITERIA: ${criterion.name}`);

        insert = false;

        if(study.currentRound > 0) {
          oldPair = Pairs.findOne({
            studyId: study._id,
            round: study.currentRound,
            alternativeId: alternative._id,
            criterionId: criterion._id
          });

          if(oldPair && !oldPair.consensusReached) {
            // Only create new pairs in the next round for the pairs that haven't reached consensus yet
            insert = true;
          }
        } else {
          insert = true;
        }

        if(insert == true) {
          Pairs.insert({
            studyId: study._id,
            round: newRound,
            alternativeId: alternative._id,
            criterionId: criterion._id,
            consensusReached: false,
          });
        }
      });
    });
  },




  pairs() {
    const query = Pairs.createQuery({
      consensusReached: 1
    });
    return query.fetch();
  }
});
