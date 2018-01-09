Template.Monkey.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var monkeyId = FlowRouter.getParam('monkeyId');
    self.subscribe('singleMonkey', monkeyId);
  });
});

Template.Monkey.helpers({
  monkey: () => {
    return Monkeys.findOne();
  },
});

Template.Monkey.events({
  'click .fa-pencil': function() {
    Session.set('updateMonkey', true);
  },
});
