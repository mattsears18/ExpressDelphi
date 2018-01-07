Template.Alternatives.events({
  'click .new-recipe': function() {
    Session.set('newAlternative', true);
  }
});

Template.Alternatives.helpers({
  selector() {
    return {study: Meteor.user().profile.currentStudy._id};
  }
});
