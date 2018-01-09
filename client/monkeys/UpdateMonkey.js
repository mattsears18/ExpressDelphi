Template.UpdateMonkey.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var resourceId = FlowRouter.getParam('monkeyId');
    self.subscribe('singleMonkey', resourceId);
  });
});

Template.UpdateMonkey.helpers({
  monkey: () => {
    return Monkeys.findOne();
  },
});

Template.UpdateMonkey.events({
  'click .fa-close': function() {
    Session.set('updateMonkey', false);
  },
  'submit': function() {
    Session.set('updateMonkey', false);
  }
});
