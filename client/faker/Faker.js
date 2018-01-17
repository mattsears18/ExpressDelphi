// Template.FakerStudy.onCreated(function() {
//   var self = this;
//   self.autorun(function() {
//
//     // var studyId = FlowRouter.getParam('studyId');
//     // self.subscribe('currentStudy', studyId);
//     // self.subscribe('alternatives', studyId);
//     // self.subscribe('criteria', studyId);
//     // self.subscribe('pairs', studyId);
//     // self.subscribe('ratings', studyId);
//     self.subscribe('users');
//   });
// });
//
// Template.FakerStudy.helpers({
//   // study:        () => { return Studies.findOne(); },
//   // alternatives: () => { return Alternatives.find(); },
//   // criteria:     () => { return Criteria.find(); },
//   // pairs:        () => { return Pairs.find(); },
//   // ratings:      () => { return Ratings.find(); },
//   users:        () => { return Meteor.users.find(); },
// });
//
//
//
//
// Template.FakerStudy.onRendered(function() {
//   var self = this;
//   self.autorun(function() {
//     console.log(self.users);
//   });
// });
