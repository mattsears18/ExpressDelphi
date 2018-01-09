Template.Test.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('pairsWithRelations');
  });
});

Template.Test.helpers({
  pairs() {
      return Pairs.find();
  },
  pairAlternative() {
      // We use this helper inside the {{#each posts}} loop, so the context
      // will be a post object. Thus, we can use this.authorId.
      return Alternatives.findOne(this.alternativeId);
  }
});
