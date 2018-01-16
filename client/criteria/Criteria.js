Template.Criteria.events({
  'click .new-recipe': function() {
    Session.set('newCriterion', true);
  }
});

Template.Criteria.helpers({
  selector() {
    return {studyId: FlowRouter.getParam('studyId')};
  }
});

Template.Criteria.destroyed = function(){
  Session.set('newCriterion', false);
}
