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
  pub: "tabular_pairsWithRelations",
  extraFields: ['alternativeId', 'criterionId', 'studyId'],
  columns: [
    {
      data: 'alternative()',
      title: 'Alternative',
      render: function(data, type, row, meta) {
        return `<a href="/studies/${data.study}/alternatives/${data._id}">${data.name}</a>`;
      }
    },
    {
      data: 'criterion()',
      title: 'Criterion',
      render: function(data, type, row, meta) {
        return `<a href="/studies/${data.study}/criteria/${data._id}">${data.name}</a>`;
      }
    },
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
    {
      data: '_id',
      title: "Results",
      render: function(data, type, row, meta) {
        return `<a href="/studies/${row.studyId}/pairresults/${data}" class="btn btn-primary">View Rating Results</a>`;
      }
    },
  ],
  searching: false,
  paging: false,
  limit: 500,
  paging_type: 'full_numbers',
});

Pairs.helpers({
  alternative() {
    return Alternatives.findOne(this.alternativeId);
  },
  criterion() {
    return Criteria.findOne(this.criterionId);
  },
  currentUserRating() {
    return Ratings.findOne({
      pairId: this._id,
      userId: Meteor. user()._id,
    });
  },
});

export default Pairs;
