import Pairs from './Pairs';
import Tabular from 'meteor/aldeed:tabular';


PairsTabular = new Tabular.Table({
  name: "Pairs",
  collection: Pairs,
  pub: "tabular_pairsWithRelations",
  extraFields: [
    'alternativeId',
    'criterionId',
    'studyId',
    'minVal',
    'maxVal',
    'nextRoundMinVal',
    'nextRoundMaxVal',
  ],
  columns: [
    {
      data: 'alternative()',
      title: 'Alternative',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href="/studies/${data.study}/alternatives/${data._id}">${data.name}</a>`;
        }
      }
    },
    {
      data: 'criterion()',
      title: 'Criterion',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href="/studies/${data.study}/criteria/${data._id}">${data.name}</a>`;
        }
      }
    },
    {
      data: 'ratingMaxdev()',
      title: 'Max Deviation from Median',
    },
    {
      data: 'ratingMeandevRounded()',
      title: 'Mean Deviation from Median',
    },
    {
      data: "consensusReached",
      title: "Consensus Reached",
      tmpl: Meteor.isClient && Template.PairsConsensusCell,
    },
    {
      data: "nextRound",
      title: "Include in Next Round",
      tmpl: Meteor.isClient && Template.PairsNextRoundCell,
    },
    {
      title: "Next Round Range",
      tmpl: Meteor.isClient && Template.PairsNextRoundRangeCell,
    },
    {
      data: '_id',
      title: "Results",
      render: function(data, type, row, meta) {
        return `<a href="/studies/${row.studyId}/pairresults/${data}" class="btn btn-primary">Results</a>`;
      }
    },
  ],
  searching: false,
  paging: false,
  limit: 500,
  paging_type: 'full_numbers',
});
