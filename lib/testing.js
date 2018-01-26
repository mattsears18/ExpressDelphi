import helpers from '../lib/helpers';

////////////////////////////////////////////////////////////////////////////////
// FAKER
////////////////////////////////////////////////////////////////////////////////

//
// FlowRouter.route('/faker/study', {
//   name: 'fakerStudy',
//   action() {
//     BlazeLayout.render('HomeLayout', {main: 'FakerStudy'});
//   },
// });


FlowRouter.route('/faker/study', {
  name: 'fakerStudy',
  action() {
    user = Meteor.users.findOne(
      {_id: Meteor.userId()},
      {fields: {profile: 1}}
    );
    if(user.profile && user.profile.admin) {
      studyId = Studies.insert({
        name: faker.name.jobDescriptor(),
        desc: faker.lorem.paragraph(),
        currentRound: 0,
      });

      for(i=0; i < 5; i++) {
        alternativeId = Alternatives.insert({
          studyId: studyId,
          number: faker.random.number({min:1, max:100}),
          name: faker.name.jobDescriptor(),
          desc: faker.lorem.paragraph(),
        });
      }

      for(i=0; i < 5; i++) {
        criterionId = Criteria.insert({
          studyId: studyId,
          name: faker.name.jobDescriptor(),
          desc: faker.lorem.paragraph(5),
          weight: faker.random.number({min:1, max:100}),
        });
      }

      numRounds = 3;

      for(i=0; i<=numRounds; i++) {
        doRound();
      }

      function doRound() {
        Meteor.call('studies.startNextRound', {
          studyId: studyId,
        });

        study = Studies.findOne({_id: studyId});

        pairs = Pairs.find({
          studyId: studyId,
          round: study.currentRound,
        });

        userIds = [
          'cwFXpB7ehrTHSvrSg',
          'swwregrhtgrerwrts',
          'sewretrgfhdfswert',
          'ewretgrfdfsdawreq',
          'wqewrtrgfvdxcsdaw',
          'dafegrhfbdvsfegfg',
          'dasfdgfhdvfsegfdv',
          'dswfegfdvscdafewr',
          'dasfdgfbvcsdasfgd',
          'dasfdgdfegrhdgsfd',
          'dfwegrhtfdgsfwgt3',
          'k654g3h565jgf3ref',
          '75kjytvrfg3h4yrbg',
          'dvsbehtr46h35grwb',
          'cef4g35h6j5ythget',
          'nhrytu67564h5ebrt',
          'fdgfhnj576453gwrb',
          'wvbnmtj564h3grwbe',
          'fbgntuj54h3grwebt',
          'vwbnrmtuk65764hge',
          'dsfgfhbvdcsdfgdvv',
          'iyutnbryetvr3tb4r',
          'ewretrnhgfr3t4ber',
          '46berwgetrgbdfswg',
          '7867rwehtrdgfsrdf',
          '3124ertrhyfghfgdf',
          'l97kitunybrgfvcws',
          '97yutbryetvrwgeht',
          '123f24egrtyujmtgd',
          '64tervwcadvsbfddd',
        ];

        pairs.forEach(function(pair) {
          userIds.forEach(function(userId) {
            Ratings.insert({
              pairId: pair._id,
              userId: userId,
              value: faker.random.number({min:1, max:10}),
              comment: faker.lorem.paragraph(5),
            });
          });

          if(helpers.coinFlip()) {
            Pairs.update(
              {_id: pair._id},
              {$set: {
                nextRound: false,
              }}
            );

            if(helpers.coinFlip()) {
              Pairs.update(
                {_id: pair._id},
                {$set: {
                  consensusReached: true,
                }}
              );
            }
          }
        });

        userIds.forEach(function(userId) {
          if(helpers.coinFlip()) {
            Messages.insert({
              studyId: studyId,
              userId: userId,
              content: faker.lorem.paragraph(2),
            });
          }
        });
      }
    }
  },
});




FlowRouter.route('/studies/:studyId/resultstest', {
  name: 'results-test',
  action() {
    BlazeLayout.render('MainLayout', {main: 'ResultsTest'});
  }
});

FlowRouter.route('/studies/:studyId/resultstest2', {
  name: 'results-test2',
  action(params, queryParams) {
    BlazeLayout.render('MainLayout', {main: 'ResultsTest2'});
  }
});

FlowRouter.route('/studies/:studyId/resultsmedian', {
  name: 'results-median',
  action(params, queryParams) {
    BlazeLayout.render('MainLayout', {main: 'ResultsMedian'});
  }
});

FlowRouter.route('/studies/:studyId/resultsmean', {
  name: 'results-mean',
  action(params, queryParams) {
    BlazeLayout.render('MainLayout', {main: 'ResultsMean'});
  }
});

FlowRouter.route('/test', {
  name: 'test',
  action(params, queryParams) {
    BlazeLayout.render('HomeLayout', {main: 'Test'});
  }
});
