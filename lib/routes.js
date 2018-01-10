import { Session } from 'meteor/session';

if(Meteor.isClient) {
  Accounts.onLogin(function() {
    FlowRouter.go('studies');
  });

  Accounts.onLogout(function() {
    FlowRouter.go('home');
  });
}





FlowRouter.triggers.enter([function(context, redirect) {
  if(!Meteor.userId()) {
    FlowRouter.go('home');
  }
}]);





FlowRouter.route('/', {
  name: 'home',
  action() {
    if(Meteor.userId()) {
      FlowRouter.go('studies');
    }
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout', {main: 'Home'});
  }
});


FlowRouter.route('/test', {
  name: 'test',
  action() {
    Ratings.insert({
      pairId: "bzJpSN8GyQ3844Qok",
      userId: 'cwFXpB7ehrTHSvrSg',
      value: 55,
      round: 1,
    });
  }
});


////////////////////////////////////////////////////////////////////////////////
// STUDIES ROUTES
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies', {
  name: 'studies',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Studies'});
  }
});

FlowRouter.route('/studies/:studyId', {
  name: 'study',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Study'});
  }
});


////////////////////////////////////////////////////////////////////////////////
// ALTERNATIVES ROUTES
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/alternatives', {
  name: 'alternatives',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Alternatives'});
  }
});

FlowRouter.route('/studies/:studyId/alternatives/:alternativeId', {
  name: 'alternative',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Alternative'});
  }
});



////////////////////////////////////////////////////////////////////////////////
// CRITERIA ROUTES
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/criteria', {
  name: 'criteria',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Criteria'});
  }
});

FlowRouter.route('/studies/:studyId/criteria/:criterionId', {
  name: 'criterion',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Criterion'});
  }
});


////////////////////////////////////////////////////////////////////////////////
// RATINGS ROUTES
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/rate', {
  name: 'rate',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Rate'});
  }
});

FlowRouter.route('/studies/:studyId/ratingwindow', {
  name: 'ratingwindow',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('RatingWindow');
  }
});



FlowRouter.route('/studies/:studyId/ratings', {
  name: 'ratings',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Ratings'});
  }
});

FlowRouter.route('/studies/:studyId/results', {
  name: 'results',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Results'});
  }
});
