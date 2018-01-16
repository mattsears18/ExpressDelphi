Template.Alternative.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var alternativeId = FlowRouter.getParam('alternativeId');
    self.subscribe('singleAlternative', alternativeId);
  });
});

Template.Alternative.helpers({
  alternative: () => {
    return Alternatives.findOne();
  },
});

Template.Alternative.events({
  'click .fa-pencil': function() {
    Session.set('updateAlternative', true);
  },
});

Template.Alternative.destroyed = function(){
  Session.set('updateAlternative', false);
}
