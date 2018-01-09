Template.Monkeys.events({
  'click .new-recipe': function() {
    Session.set('newMonkey', true);
  }
});

Template.Monkeys.helpers({
  selector() {
    return {studyId: FlowRouter.getParam('studyId')};
  }
});
