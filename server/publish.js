Meteor.publish('studies', function() {
  return Studies.find({});
});
