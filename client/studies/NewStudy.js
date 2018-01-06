Template.NewStudy.events({
  'click .fa-close': function() {
    Session.set('newStudy', false);
  }
});
