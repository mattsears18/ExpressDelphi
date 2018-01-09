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
  return Alternatives.find({study: studyId});
});

Meteor.publish('singleAlternative', function(id) {
  check(id, String);
  return Alternatives.find({_id: id});
});


////////////////////////////////////////////////////////////////////////////////
// CRITERIA PUBLICATIONS
////////////////////////////////////////////////////////////////////////////////
Meteor.publish('criteria', function(studyId) {
  return Criteria.find({});
});

Meteor.publish('singleCriterion', function(id) {
  check(id, String);
  return Criteria.find({_id: id});
});



////////////////////////////////////////////////////////////////////////////////
// PAIRS PUBLICATIONS
////////////////////////////////////////////////////////////////////////////////
// publishComposite('pairsWithRelations', {
//     find() {
//         // Find top ten highest scoring posts
//         return Pairs.find({});
//     },
//     children: [
//         {
//             find(pair) {
//                 // Find post author. Even though we only want to return
//                 // one record here, we use "find" instead of "findOne"
//                 // since this function should return a cursor.
//                 return Alternatives.find(
//                     { _id: pair.alternativeId },
//                     { fields: { name: 1 } });
//             }
//         },
//     ]
// });



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
          return Alternatives.find({_id: pair.alternativeId}, {limit: 1, fields: {name: 1, study: 1}});
        }
      },
      {
        find: function(pair) {
          return Criteria.find({_id: pair.criterionId}, {limit: 1, fields: {name: 1, study: 1}});
        }
      }
    ]
  };
});
