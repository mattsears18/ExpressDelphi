Template.Studies.events({
  'click .new-recipe': function() {
    Session.set('newStudy', true);
  }
});

Template.Studies.destroyed = function(){
  Session.set('newStudy', false);
}
