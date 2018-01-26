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
      maxPair = null;

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
  },
  finalScore() {
    score = 0;
    this.criteriaMaxRatedRounds().forEach(function(set) {
      if(set.maxPair) {
        score += set.maxPair.weightedRatingMedian();
      }
    });
    return score;
  },
  finalScoreRounded() {
    return Math.round(this.finalScore() * 1000) / 1000;
  },
  finalScoreMean() {
    score = 0;
    this.criteriaMaxRatedRounds().forEach(function(set) {
      if(set.maxPair) {
        score += set.maxPair.weightedRatingMean();
      }
    });
    return score;
  },
  finalScoreMeanRounded() {
    return Math.round(this.finalScoreMean() * 1000) / 1000;
  },
  currentPairs() {
    alternative = this;
    study = Studies.findOne({_id: alternative.studyId});

    return Pairs.find({
      studyId: study._id,
      alternativeId: alternative._id,
      round: study.currentRound,
    });
  },
});
