import Studies from './Studies'

Studies.helpers({
  currentPairs() {
    study = this;
    return Pairs.find({
      studyId: study._id,
      round: study.currentRound,
    });
  },
  criteria() {
    return Criteria.find({studyId: this._id});
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
  },
  rounds() {
    rounds = [];
    for(round = 1; round <= this.currentRound; round++) {
      rounds.push(round);
    }
    return rounds;
  },
  ratedRounds() {
    study = this;
    rounds = [];
    for(round = 1; round <= this.currentRound; round++) {
      pairs = Pairs.find({studyId: study._id, round: round});
      if(pairs) {
        // pairs.forEach(function(pair) {
        //   ratings = Ratings.find({pairId: pair._id});
        //   if(ratings) {
        //     rounds.push(round);
        //     throw BreakException;
        //   }
        // });

        function hasRatings(element, index, array) {
          if(element.ratings().count()) {
            return true;
          }
          return false;
        }
        if(pairs.fetch().some(hasRatings)) {
          rounds.push(round);
        }
      }
    }
    return rounds;
  },
});
