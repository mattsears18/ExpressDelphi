Template.Study.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleStudy', id);

    currentStudy = Studies.findOne({"_id": id});
    Session.set('currentStudy', currentStudy);     // necessary for proper routing

    Meteor.users.update(Meteor.userId(), {$set: {"profile.currentStudy": currentStudy}});
  });
});

Template.Study.helpers({
  study: () => {
    return Studies.findOne();
  },
});
