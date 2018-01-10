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
});

export default Ratings;
