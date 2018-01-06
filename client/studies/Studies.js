Meteor.subscribe('studies');

Template.Studies.events({
  'click .new-recipe': function() {
    Session.set('newStudy', true);
  }
});

Template.Studies.helpers({
  studies: () => {
    return Studies.find({});
  }
});
