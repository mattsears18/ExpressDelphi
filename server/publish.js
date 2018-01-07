Meteor.publish('studies', function() {
  return Studies.find({});
});

Meteor.publish('singleStudy', function(id) {
  check(id, String);
  return Studies.find({_id: id});
});


Meteor.publish('alternatives', function(studyId) {
  return Alternatives.find({study: studyId});
});

Meteor.publish('criteria', function(studyId) {
  return Criteria.find({});
});
