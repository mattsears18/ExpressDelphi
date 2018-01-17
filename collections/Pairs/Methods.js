Meteor.methods({
  "removeRatingsByPairId" : function (pairId) {
    Ratings.remove({pairId: pairId}, {multi: true});
  },
});
