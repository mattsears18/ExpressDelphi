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
  name: 'htest',
  action() {
    BlazeLayout.render('Test');
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
// MONKEYS ROUTES
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/monkeys', {
  name: 'monkeys',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Monkeys'});
  }
});

FlowRouter.route('/studies/:studyId/monkeys/:monkeyId', {
  name: 'monkey',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Monkey'});
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
