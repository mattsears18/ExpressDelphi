import SimpleSchema from 'simpl-schema';
import { Template } from 'meteor/templating';

SimpleSchema.extendOptions(['autoform']);

Alternatives = new Mongo.Collection('alternatives');

Alternatives.allow({
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

AlternativeSchema = new SimpleSchema({
  number: {
    type: Number,
    label: 'Number',
  },
  name: {
    type: String,
    label: 'Name',
  },
  desc: {
    type: String,
    label: 'Description',
    autoform: {
      rows: 8
    },
    optional: true,
  },
  studyId: {
    type: String,
    label: 'Study',
    optional: true,
    autoform: {
      value: function() {
        return FlowRouter.getParam('studyId');
      },
      type: 'hidden'
    }
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
  },
});

Alternatives.attachSchema(AlternativeSchema);

export default Alternatives;
