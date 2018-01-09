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
    optional: true,
  },
  weight: {
    type: Number,
    label: 'Weight',
    optional: true,
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
    {
       data: "name",
       title: "Name",
       render: function(data, type, row, meta){
          data = '<a href="/studies/' + FlowRouter.getParam('studyId') + '/criteria/' + row._id + '">' + data + '</a>';
          return data;
       }
    },
    {data: "desc", title: "Description"},
    {data: "weight", title: "Weight"},
  ],
  lengthChange: false,
});

export default Criteria;
