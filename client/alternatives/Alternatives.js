Template.Alternatives.events({
  'click .new-recipe': function() {
    Session.set('newAlternative', true);
  }
});

Template.Alternatives.helpers({
  selector() {
    return {studyId: FlowRouter.getParam('studyId')};
  }
});

Template.Alternatives.destroyed = function(){
  Session.set('newAlternative', false);
}
