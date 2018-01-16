import Ratings from './Ratings';

Ratings.helpers({
  pair() {
    return Pairs.findOne(this.pairId);
  },
  deviateMedian() {
    if(this.pair().previousRoundPair()) {
      return Math.abs((this.pair().previousRoundPair().ratingMedian() - this.value)) > 2;
    }
  },
  deviateLastRound() {
    if(this.pair() && this.pair().previousRoundPair() && this.pair().previousRoundPair().currentUserRating()) {
      return Math.abs((this.pair().previousRoundPair().currentUserRating().value - this.value)) > 2;
    }
  },
  commentMessage() {
    if(this.deviateMedian()) {
      return "Please provide an explanation of why your rating deviates more than 2 units from the last round median rating"
    } else if(this.deviateLastRound()) {
      return "Please provide an explanation of why your rating deviates more than 2 units your last round rating"
    }

    return "Comments";
  },
  previousRoundRating() {
    prevPair = this.pair().previousRoundPair();

    if(prevPair)  {
      return Ratings.findOne({
        pairId: prevPair._id,
        userId: this.userId,
      });
    }
  },
  roundChange() {
    if(this.previousRoundRating) {
      return this.value - this.previousRoundRating().value;
    }
  },
  roundAbsChange() {
    if(this.previousRoundRating) {
      return Math.abs(this.value - this.previousRoundRating().value);
    }
  },
  roundChangeDirection() {
    if (this.roundChange() > 0) {
      return 'up';
    } else {
      return 'down';
    }
  }
});
