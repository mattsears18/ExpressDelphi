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


PairsTabular = new Tabular.Table({
  name: "Pairs",
  collection: Pairs,
  columns: [
    {data: 'alternativeId', title: 'alternativeId'},
    {data: "criterionId", title: "Criterion"},
    {
      data: "comments",
       title: "Comments",
       render: function(data, type, row, meta){
         if(data) {
           return `<a href="#">View ${data.length}</a>`
         } else {
           data = 'None'
         }
         return data;
       }
    },
    {
      data: "consensusReached",
      title: "Consensus Reached",
      tmpl: Meteor.isClient && Template.PairsConsensusCell,
    },
  ],
  searching: false,
  paging: false,
  limit: 500,
  paging_type: 'full_numbers',
});

export default Pairs;
