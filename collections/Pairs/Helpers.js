import Pairs from './Pairs';
import { jStat } from 'jStat';

Pairs.helpers({
  alternative() {
    return Alternatives.findOne(this.alternativeId);
  },
  criterion() {
    return Criteria.findOne(this.criterionId);
  },
  currentUserRating() {
    return Ratings.findOne({
      pairId: this._id,
      userId: Meteor.user()._id,
    });
  },
  ratings() {
    return Ratings.find({
      pairId: this._id,
    });
  },
  ratingsWithComments() {
    return ratings = Ratings.find({
      pairId: this._id,
      comment: {$exists: true},
    });
  },
  ratingValues() {
    ratings = this.ratings();

    ratingValues = [];
    ratings.forEach(function(rating){
      ratingValues.push(rating.value);
    });

    return ratingValues;
  },
  ratingMin() {
    return jStat.min(this.ratingValues());
  },
  ratingMax() {
    return jStat.max(this.ratingValues());
  },
  ratingRange() {
    return jStat.range(this.ratingValues());
  },
  ratingMean() {
    return jStat.mean(this.ratingValues());
  },
  ratingMedian() {
    return jStat.median(this.ratingValues());
  },
  weightedRatingMedian() {
    criterion = Criteria.findOne({_id: this.criterionId});
    return this.ratingMedian() * criterion.weight / 100;
  },
  weightedRatingMedianRounded() {
    return Math.round(this.weightedRatingMedian() * 1000) / 1000;
  },
  ratingMode() {
    return jStat.mode(this.ratingValues());
  },
  ratingMeddev() {
    return jStat.meddev(this.ratingValues());
  },
  ratingMeandev() {
    return jStat.meandev(this.ratingValues());
  },
  ratingMaxCount() {
    var store = this.ratingValues();
    var frequency = {};
    var max = 0;  // holds the max frequency.
    var result;   // holds the max frequency element.
    for(var v in this.ratingValues()) {
      frequency[store[v]]=(frequency[store[v]] || 0)+1; // increment frequency.
      if(frequency[store[v]] > max) { // is this frequency > max so far ?
        max = frequency[store[v]];  // update max.
        result = store[v];          // update result.
      }
    }

    return max;
  },
  placeholderRange() {
    return this.minVal + ' to ' + this.maxVal + ' Allowed this Round';
  },
  previousRoundPair() {
    return Pairs.findOne({
      studyId: this.studyId,
      alternativeId: this.alternativeId,
      criterionId: this.criterionId,
      round: (this.round - 1)
    });
  },
});
