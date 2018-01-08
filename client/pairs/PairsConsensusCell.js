Template.PairsConsensusCell.events({
  'click .btn': function(event) {
    cr = event.target.dataset.consensusreached;

    Pairs.update(
      {_id: this._id},
      {$set: {consensusReached: cr}
    });
  }
});
