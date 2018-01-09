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
  study: {
    type: String,
  },
  round: {
    type: Number,
  },
  alternativeId: {
    type: String,
    optional: true,
  },
  criterion: {
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
    {
       title: "Alternative",
       render: function(data, type, row, meta){
         console.log(row.alternative);
         return '<font color="red">Alternative placeholder - pick back up in the "Pairs.js" file</font>';
       }
    },
    {data: "criterion", title: "Criterion"},
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

Pairs.expose();

export default Pairs;
