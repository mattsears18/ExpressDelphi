import Alternatives from './Alternatives';
import { jStat } from 'jStat';

Alternatives.helpers({
  study() {
    return Studies.findOne({_id: this.studyId});
  },
  pairs() {
    return Pairs.find({alternativeId: this._id});
  },
  roundCriteriaPairs() {
    alternative = this;
    study = alternative.study();
    criteria = alternative.study().criteria();

    if(study) {
      roundPairs = [];

      for(round=1; round <= study.currentRound; round++) {
        criteriaPairs = [];
        criteria.forEach(function(criterion) {
          pair = Pairs.findOne({
            alternativeId: alternative._id,
            criterionId: criterion._id,
            round: round
          });

          criteriaPairs.push({
            criterion: criterion._id,
            pair: pair,
          });
        });

        roundPairs.push({
          round: round,
          criteria: criteriaPairs,
        });
      }

      return roundPairs;
    }
  },
  criteriaMaxRatedRounds() {
    alternative = this;
    study = alternative.study();
    criteria = study.criteria();

    results = [];

    criteria.forEach(function(criterion) {
      pairs = Pairs.find({
        alternativeId: alternative._id,
        criterionId: criterion._id,
      });

      maxRound = 0;
      maxPair = {};

      pairs.forEach(function(pair) {
        if(pair.round > maxRound) {
          ratings = Ratings.find({
            pairId: pair._id
          });

          if(ratings.count()) {
            maxRound = pair.round;
            maxPair = pair;
          }
        }
      });

      results.push({
        maxRound: maxRound,
        maxPair: maxPair,
      });
    });

    return results;
    //
    // [{
    //   criterion,
    //   maxRatedPair,
    // }]

  },
  currentPairs() {
    alternative = this;
    study = Studies.find({_id: alternative.studyId});

    return Pairs.findOne({
      studyId: study._id,
      alternativeId: alternative._id,
      round: study.currentRound,
    });
  },
  finalValues() {
    alternative = this;

    criteria = Criteria.find({studyId: alternative.studyId});

    if(criteria) {
      data = {};
      data.scores = [];

      criteria.forEach(function(criterion) {
        pairs = Pairs.find({
          criterionId: criterion._id,
          alternativeId: alternative._id,
        });

        if(pairs) {
          maxRound = 0;
          consensusPair = undefined;
          consensusRound = undefined;

          pairs.forEach(function(pair) {
            if(pair.round > maxRound) {
              maxPair = pair;
              maxRound = pair.round;
            }

            if(pair.consensusReached) {
              consensusRound = pair.round;
            }
          });

          score = {};

          score.maxRound = maxRound;

          finalRatingValues = [];
          finalRatings = Ratings.find({pairId: maxPair._id});

          finalRatings.forEach(function(rating) {
            finalRatingValues.push(rating.value);
          });

          finalValue = jStat.median(finalRatingValues);

          score.criterionId = criterion._id;

          score.finalValue = finalValue;
          score.finalValueRounded = Math.round(score.finalValue * 1000) / 1000;

          score.weight = criterion.weight;
          score.weightRounded = Math.round(score.weight * 1000) / 1000;

          score.weightedValue = score.finalValue * 0.01 * score.weight;
          score.weightedValueRounded = Math.round(score.weightedValue * 1000) / 1000;

          score.consensusRound = consensusRound;
          score.ratings = finalRatings;

          data.scores.push(score);
        }
      });

      //TODO PICK BACK UP HERE

      data.finalScore = 0

      data.scores.forEach(function(score){
        data.finalScore += score.weightedValue;
      });

      data.finalScoreRounded = Math.round(data.finalScore * 1000) / 1000;

      return data;
    }
  },
});
