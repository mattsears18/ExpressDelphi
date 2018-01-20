import SimpleSchema from 'simpl-schema';
import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';

SimpleSchema.extendOptions(['autoform']);


Pairs = new Mongo.Collection('pairs');

Pairs.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  },
});

PairSchema = new SimpleSchema({
  studyId: {
    type: String,
  },
  round: {
    type: Number,
  },
  alternativeId: {
    type: String,
    optional: true,
  },
  criterionId: {
    type: String,
    optional: true,
  },
  consensusReached: {
    type: Boolean,
  },
  nextRound: {
    type: Boolean,
    optional: true,
  },
  minVal: {
    type: Number,
    optional: true,
  },
  maxVal: {
    type: Number,
    optional: true,
  },
  nextRoundMinVal: {
    type: Number,
    optional: true,
  },
  nextRoundMaxVal: {
    type: Number,
    optional: true,
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

Pairs.attachSchema(PairSchema);

export default Pairs;
