import SimpleSchema from 'simpl-schema';
import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';


SimpleSchema.extendOptions(['autoform']);


Studies = new Mongo.Collection('studies');

Studies.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
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
    defaultValue: 1,
  },
  open: {
    type: Boolean,
    defaultValue: true,
    autoform: {
      type: 'hidden',
    },
  },
  // criteria: {
  //   type: Array,
  //   optional: true,
  // },
  'criteria.$': {
    type: Object,
  },
  'criteria.$.name': {
    type: String,
  },
  'criteria.$.weight': {
    type: Number,
    optional: true,
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


Studies.attachSchema(StudySchema);


StudiesTabular = new Tabular.Table({
  name: "Studies",
  collection: Studies,
  columns: [
    {
       data: "name",
       title: "Name",
       render: function(data, type, row, meta){
          data = '<a href="/studies/' + row._id + '">' + data + '</a>';
          return data;
       }
    },
    {data: "desc", title: "Description"},
    {data: "currentRound", title: "Current Round"},
  ],
  searching: false,
  lengthChange: false,
  paging_type: 'full_numbers',
});
