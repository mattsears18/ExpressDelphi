import SimpleSchema from 'simpl-schema';

Studies = new Mongo.Collection('studies');

SimpleSchema.extendOptions(['autoform']);

Studies.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  },
  remove: function(userId, doc) {
    return !!userId;
  },
});

StudySchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
  },
  desc: {
    type: String,
    label: 'Description',
    optional: true,
    autoform: {
      rows: 8
    },
  },
  currentRound: {
    type: Number,
    label: 'Current Round (set to 0 for a new study)',
    defaultValue: 0,
  },
  open: {
    type: Boolean,
    defaultValue: true,
    autoform: {
      type: 'hidden',
    },
  },
  ownerId: {
    type: String,
    autoValue: function() {
      return this.userId;
    },
    autoform: {
      type: 'hidden',
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
  }
});

Studies.attachSchema(StudySchema);

export default Studies;
