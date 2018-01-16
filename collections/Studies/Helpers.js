import Studies from './Studies'

Studies.helpers({
  currentPairs() {
    study = this;
    return Pairs.find({
      studyId: study._id,
      round: study.currentRound,
    });
  },
  currentRatings() {
    study = this;
    pairs = study.currentPairs();

    pairIds = []

    pairs.forEach(function(pair) {
      pairIds.push(pair._id);
    });

    return Ratings.find({pairId: {$in: pairIds}});
  },
  currentUserRatings() {
    study = this;
    pairs = study.currentPairs();

    pairIds = []

    pairs.forEach(function(pair) {
      pairIds.push(pair._id);
    });

    return Ratings.find({
      pairId: {$in: pairIds},
      userId: Meteor.user()._id,
    });
  },
  currentUserRatingProgress() {
    if(Meteor.user() && this.currentUserRatings()) {
      return Math.round(this.currentUserRatings().count() / this.currentPairs().count() * 1000) / 10  
    }
  }
});
