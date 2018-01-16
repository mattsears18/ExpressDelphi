////////////////////////////////////////////////////////////////////////////////
// FAKER
////////////////////////////////////////////////////////////////////////////////

// Create in 25 fake users.

// If the user count ever falls below 25 this code will
// make sure that you ALWAYS have 25 fresh users to
// do with what you will. Be sure to place this
// in your Meteor.startup or a Tracker.deps block

FlowRouter.route('/faker/study', {
  name: 'fakerStudy',
  action() {
    if(Meteor.userId() == 'cwFXpB7ehrTHSvrSg') {
      studyId = Studies.insert({
        name: faker.name.jobDescriptor(),
        desc: faker.lorem.paragraph(),
        currentRound: 0,
      });

      for(i=0; i < 5; i++) {
        alternativeId = Alternatives.insert({
          studyId: studyId,
          number: faker.random.number(),
          name: faker.name.jobDescriptor(),
          desc: faker.lorem.paragraph(),
        });
      }

      for(i=0; i < 5; i++) {
        criterionId = Criteria.insert({
          studyId: studyId,
          name: faker.name.jobDescriptor(),
          desc: faker.lorem.paragraph(),
          weight: faker.random.number(),
        });
      }

      Meteor.call('studies.startNextRound', {
        studyId: studyId,
      });


      //insert ratings
      //start next rounds
      //insert ratings
      //start next rounds
      //insert ratings
      //start next rounds
      //insert ratings

    }
  }
});
