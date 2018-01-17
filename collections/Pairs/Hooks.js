import Pairs from './Pairs';

Pairs.after.remove(function (userId, pair) {
  Meteor.call('removeRatingsByPairId', pair._id);
});
