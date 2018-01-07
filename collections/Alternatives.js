import SimpleSchema from 'simpl-schema';
import Tabular from 'meteor/aldeed:tabular';
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
  },
  owner: {
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


AlternativesTabular = new Tabular.Table({
  name: "Alternatives",
  collection: Alternatives,
  columns: [
    {data: "number", title: "Number"},
    {data: "name", title: "Name"},
    {data: "desc", title: "Description"},
  ],
  searching: false,
  lengthChange: false,
  paging_type: 'full_numbers',
});

Alternatives.before.insert(function (userId, doc) {
  doc.study = Meteor.user().profile.currentStudy._id;
});
