Template.PairsConsensusCell.events({
  'click .btn': function(event) {
    cr = event.target.dataset.consensusreached;

    nextRound = !cr

    Pairs.update(
      {_id: this._id},
      {$set: {
        consensusReached: cr,
        nextRound: nextRound
      }
    });
  }
});
