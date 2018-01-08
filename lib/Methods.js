Meteor.methods({
  'studies.startNextRound'({ studyId }) {
    study = Studies.findOne({_id: studyId});
    newRound = study.currentRound + 1;

    Studies.update(
      {_id: studyId},
      {$set: {currentRound: newRound}}
    );

    //console.log('TODO: redirect all users back to the study page so that their votes dont accidentally get recorded in the wrong round');
    //console.log('TODO: delete any ratings for the study that are above the newRound #');
    //console.log('TODO: generate all of the new Pairs');


    alternatives = Alternatives.find({study: studyId});
    criteria = Criteria.find({study: studyId});

    alternatives.forEach((alternative) => {
      criteria.forEach((criterion) => {
        console.log(`STUDY: ${study.name} ROUND: ${newRound} ALTERNARTIVE: ${alternative.name} CRITERIA: ${criterion.name}`);
        Pairs.insert({
          study: study._id,
          round: newRound,
          alternative: alternative._id,
          criterion: criterion._id,
          consensusReached: false,
        });
      });
    });
  }
});
