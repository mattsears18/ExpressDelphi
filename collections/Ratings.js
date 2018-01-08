import SimpleSchema from 'simpl-schema';
import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';


SimpleSchema.extendOptions(['autoform']);


Ratings = new Mongo.Collection('ratings');

Ratings.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  },
});

RatingSchema = new SimpleSchema({
  owner: {
    type: String,
    label: 'Owner',
    optional: true,
  },
  study: {
    type: String,
    label: 'Study',
    optional: true,
  },
  round: {
    type: Number,
    label: 'Round',
    optional: true,
  },
  alternative: {
    type: String,
    label: 'Alternative',
    optional: true,
  },
  criterion: {
    type: String,
    label: 'Criterion',
    optional: true,
  },
  value: {
    type: Number,
    label: 'Value',
    optional: true,
  },
  comments: {
    type: String,
    label: 'Comments',
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


Ratings.attachSchema(RatingSchema);


RatingsTabular = new Tabular.Table({
  name: "Ratings",
  collection: Ratings,
  columns: [
    {data: "Round", title: "Round"},
    {data: "Alternative", title: "Alternative"},
    {data: "Criterion", title: "Criterion"},
    {data: "Value", title: "Value"},
    {data: "Comments", title: "Comments"},
  ],
  searching: false,
  lengthChange: false,
  paging_type: 'full_numbers',
});
