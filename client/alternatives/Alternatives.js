Template.Alternatives.events({
  'click .new-recipe': function() {
    Session.set('newAlternative', true);
  }
});

Template.Alternatives.helpers({
  selector() {
    return {study: FlowRouter.getParam('studyId')};
  }
});
