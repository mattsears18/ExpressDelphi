import SimpleSchema from 'simpl-schema';
import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';


SimpleSchema.extendOptions(['autoform']);


Criteria = new Mongo.Collection('criteria');

Criteria.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  },
});

CriterionSchema = new SimpleSchema({
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
  weight: {
    type: Number,
    label: 'Weight',
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


Criteria.attachSchema(CriterionSchema);


CriteriaTabular = new Tabular.Table({
  name: "Criteria",
  collection: Criteria,
  columns: [
    {data: "name", title: "Name"},
    {data: "desc", title: "Description"},
    {data: "weight", title: "Weight"},
  ],
  searching: false,
  lengthChange: false,
  paging_type: 'full_numbers',
});


Criteria.before.insert(function (userId, doc) {
  doc.study = Meteor.user().profile.currentStudy._id;
});
