import SimpleSchema from 'simpl-schema';
import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';


SimpleSchema.extendOptions(['autoform']);


Ratings = new Mongo.Collection('ratings');

Ratings.allow({
  insert: function(userId, doc) {
    Ratings.remove({
      pairId: doc.pairId,
      userId: doc.userId,
    });

    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  },
});

RatingSchema = new SimpleSchema({
  userId: {
    type: String,
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
  pairId: {
    type: String,
    optional: true,
    autoform: {
      type: 'hidden',
    },
  },
  value: {
    type: Number,
  },
  comment: {
    type: String,
    optional: true,
    autoform: {
      rows: 4
    },
  },
  createdAt: {
    type: Date,
    label: 'Create At',
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: 'hidden',
    },
  },
});


Ratings.attachSchema(RatingSchema);


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
    if(this.pair().previousRoundPair()) {
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
  }
});

export default Ratings;
