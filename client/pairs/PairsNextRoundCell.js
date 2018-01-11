Template.PairsNextRoundCell.events({
  'click .btn': function(event) {
    cr = event.target.dataset.nextround;

    Pairs.update(
      {_id: this._id},
      {$set: {nextRound: cr}
    });
  }
});
