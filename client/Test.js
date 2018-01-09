Template.Test.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('pairs');
  });
});

Template.Test.helpers({
  test: function() {
    query = Pairs.createQuery({
      createdAt: 1,
      createdBy: 1,
    });

    return query.fetch();
  }
});
