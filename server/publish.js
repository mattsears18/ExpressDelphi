import { publishComposite } from 'meteor/reywood:publish-composite';

////////////////////////////////////////////////////////////////////////////////
// STUDIES PUBLICATIONS
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('studies', function() {
  return Studies.find({});
});

Meteor.publish('currentStudy', function(id) {
  check(id, String);
  return Studies.find({_id: id});
});


////////////////////////////////////////////////////////////////////////////////
// ALTERNATIVES PUBLICATIONS
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('alternatives', function(studyId) {
  return Alternatives.find({studyId: studyId});
});

Meteor.publish('singleAlternative', function(id) {
  check(id, String);
  return Alternatives.find({_id: id});
});

Meteor.publish('roundAlternatives', function(studyId) {
  check(studyId, String);

  study = Studies.findOne({_id: studyId});

  pairs = Pairs.find({
    studyId: studyId,
    round: study.currentRound
  });

  alternativeIds = [];

  pairs.forEach(function(pair) {
    alternativeIds.push(pair.alternativeId);
  });

  alternativeIds = Array.from(new Set(alternativeIds));

  return Alternatives.find({_id: {$in: alternativeIds}});
});


////////////////////////////////////////////////////////////////////////////////
// CRITERIA PUBLICATIONS
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('criteria', function(studyId) {
  return Criteria.find({studyId: studyId});
});

Meteor.publish('singleCriterion', function(id) {
  check(id, String);
  return Criteria.find({_id: id});
});


////////////////////////////////////////////////////////////////////////////////
// PAIRS PUBLICATIONS
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('pairs', function(studyId) {
  study = Studies.findOne({_id: studyId});

  return Pairs.find({
    studyId: studyId,
    round: study.currentRound,
  });
});

Meteor.publish('singlePair', function(pairId) {
  console.log(pairId);
  return Pairs.find({_id: pairId});
});


Meteor.publishComposite("tabular_pairsWithRelations", function (tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  return {
    find: function () {
      return Pairs.find({_id: {$in: ids}}, {fields: fields});
    },
    children: [
      {
        find: function(pair) {
          return Alternatives.find({_id: pair.alternativeId}, {limit: 1, fields: {name: 1, studyId: 1}});
        }
      },
      {
        find: function(pair) {
          return Criteria.find({_id: pair.criterionId}, {limit: 1, fields: {name: 1, studyId: 1}});
        }
      },
    ]
  };
});


////////////////////////////////////////////////////////////////////////////////
// RATINGS PUBLICATIONS
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('ratings', function(studyId) {
  check(studyId, String);

  study = Studies.findOne({_id: studyId});

  pairs = Pairs.find({ studyId: studyId });

  pairIds = [];

  pairs.forEach(function(pair) {
    pairIds.push(pair._id);
  });

  return Ratings.find({});
});


Meteor.publish('roundRatings', function(studyId) {
  check(studyId, String);

  study = Studies.findOne({_id: studyId});

  pairs = Pairs.find({
    studyId: studyId,
    round: study.currentRound
  });

  pairIds = [];

  pairs.forEach(function(pair) {
    pairIds.push(pair._id);
  });

  return Ratings.find({});
});

Meteor.publish('pairRatings', function(pairId) {
  check(pairId, String);
  return Ratings.find({pairId: pairId});
});


Meteor.publish('ratings', function(studyId) {
  check(studyId, String);

  pairs = Pairs.find({studyId: studyId});

  return Ratings.find({pairId: pairId});
});
