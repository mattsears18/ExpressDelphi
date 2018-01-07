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

FlowRouter.route('/studies', {
  name: 'studies',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Studies'});
  }
});

FlowRouter.route('/studies/:id', {
  name: 'study',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Study'});
  }
});

FlowRouter.route('/alternatives', {
  name: 'alternatives',
  action() {
    if(!Session.get('currentStudy')){
      FlowRouter.go('studies');
    }
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Alternatives'});
  }
});

FlowRouter.route('/criteria', {
  name: 'criteria',
  action() {
    if(!Session.get('currentStudy')){
      FlowRouter.go('studies');
    }
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Criteria'});
  }
});

FlowRouter.route('/vote', {
  name: 'vote',
  action() {
    if(!Session.get('currentStudy')){
      FlowRouter.go('studies');
    }
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Vote'});
  }
});
