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


////////////////////////////////////////////////////////////////////////////////
// STUDIES ROUTES
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies', {
  name: 'studies',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('StudiesLayout', {main: 'Studies'});
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
    BlazeLayout.render('RatingLayout', {main: 'Rate'});
  }
});


////////////////////////////////////////////////////////////////////////////////
// RESULTS ROUTES
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/results', {
  name: 'results',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Results'});
  }
});

FlowRouter.route('/studies/:studyId/pairresults/:pairId', {
  name: 'pairResults',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'PairResults'});
  }
});



////////////////////////////////////////////////////////////////////////////////
// 404
////////////////////////////////////////////////////////////////////////////////
FlowRouter.notFound = {
  action: function() {
    FlowRouter.go('home');
  }
};
