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


export default Ratings;
