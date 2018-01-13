import SimpleSchema from 'simpl-schema';
import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import moment from 'moment';


SimpleSchema.extendOptions(['autoform']);


Messages = new Mongo.Collection('messages');

Messages.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  },
});

MessageSchema = new SimpleSchema({
  content: {
    type: String,
    label: 'Content',
    autoform: {
      rows: 5
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
  userId: {
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


Messages.helpers({
  time() {
    return moment(this.createdAt).format('M/D/YY h:mm:ss A');
  },
  user() {
    return Meteor.users.findOne({_id: this.userId});
  }
});

Messages.attachSchema(MessageSchema);


export default Messages;
