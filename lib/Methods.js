Meteor.methods({
  'studies.startNextRound'({ studyId }) {
    study = Studies.findOne({_id: studyId});
    newRound = study.currentRound + 1;

    Studies.update(
      {_id: studyId},
      {$set: {currentRound: newRound}}
    );

    // DELETE ANY PAIRS AND RATINGS THAT MIGHT ACCIDENTALLY BE IN THE DB
    pairs = Pairs.find({
      studyId: studyId,
      round: {$gte: newRound}
    });

    if(pairs) {
      pairIds = [];

      pairs.forEach(function(pair) {
        pairIds.push(pair._id);
      });

      Ratings.remove({
        pairId: {$in: pairIds}
      });

      Pairs.remove({
        studyId: studyId,
        round: {$gte: newRound}
      });
    }

    alternatives = Alternatives.find({studyId: studyId});
    criteria = Criteria.find({studyId: studyId});

    alternatives.forEach((alternative) => {
      criteria.forEach((criterion) => {
        insert = false;

        oldPair = '';

        if(study.currentRound > 0) {
          oldPair = Pairs.findOne({
            studyId: study._id,
            round: study.currentRound,
            alternativeId: alternative._id,
            criterionId: criterion._id
          });

          if(oldPair && !oldPair.consensusReached && oldPair.nextRound) {
            // Only create new pairs in the next round for the pairs that haven't reached consensus yet
            insert = true;
          }
        } else {
          insert = true;
        }

        if(insert == true) {
          pair = {
            studyId: study._id,
            round: newRound,
            alternativeId: alternative._id,
            criterionId: criterion._id,
            consensusReached: false,
            nextRound: true,
          };

          if(oldPair) {
            pair.minVal = oldPair.nextRoundMinVal;
            pair.maxVal = oldPair.nextRoundMaxVal;
            pair.nextRoundMinVal = oldPair.nextRoundMinVal;
            pair.nextRoundMaxVal = oldPair.nextRoundMaxVal;
          } else {
            pair.minVal = 1;
            pair.maxVal = 10;
            pair.nextRoundMinVal = 1;
            pair.nextRoundMaxVal = 10;
          }

          Pairs.insert(pair);
        }
      });
    });
  },
  'studies.autofillConsensus'({ studyId }) {
    study = Studies.findOne({_id: studyId});

    if(study) {
      pairs = Pairs.find({
        studyId: studyId,
        round: study.currentRound,
      });

      pairs.forEach(function(pair) {
        if(pair.ratingMaxdev() <= 1) {
          Pairs.update(
            {_id: pair._id},
            { $set: {consensusReached: true}},
          );
        }
      });
    }
  },
});
