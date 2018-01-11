import SimpleSchema from 'simpl-schema';
import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import { jStat } from 'jStat';


SimpleSchema.extendOptions(['autoform']);


Alternatives = new Mongo.Collection('alternatives');

Alternatives.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  },
});

AlternativeSchema = new SimpleSchema({
  number: {
    type: Number,
    label: 'Number',
  },
  name: {
    type: String,
    label: 'Name',
  },
  desc: {
    type: String,
    label: 'Description',
    autoform: {
      rows: 8
    },
    optional: true,
  },
  studyId: {
    type: String,
    label: 'Study',
    optional: true,
    autoform: {
      value: function() {
        return FlowRouter.getParam('studyId');
      },
      type: 'hidden'
    }
  },
  ownerId: {
    type: String,
    autoValue: function() {
      return this.userId;
    },
    autoform: {
      type: 'hidden',
    },
  },
  createdAt: {
    type: Date,
    label: 'Create At',
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: 'hidden',
    },
  },
});


Alternatives.attachSchema(AlternativeSchema);


AlternativesTabular = new Tabular.Table({
  name: "Alternatives",
  collection: Alternatives,
  columns: [
    {
       data: "name",
       title: "Name",
       render: function(data, type, row, meta){
          data = '<a href="/studies/' + FlowRouter.getParam('studyId') + '/alternatives/' + row._id + '">' + data + '</a>';
          return data;
       }
    },
    {data: "desc", title: "Description"},
  ],
  lengthChange: false,
});


Alternatives.helpers({
  pairs() {
    return Pairs.find({alternativeId: this._id});
  },
  finalValues() {
    alternative = this;

    criteria = Criteria.find({studyId: alternative.studyId});

    if(criteria) {
      data = {};
      data.scores = [];

      criteria.forEach(function(criterion) {
        pairs = Pairs.find({
          criterionId: criterion._id,
          alternativeId: alternative._id,
        });

        if(pairs) {
          maxRound = 0;
          consensusPair = undefined;
          consensusRound = undefined;

          pairs.forEach(function(pair) {
            if(pair.round > maxRound) {
              maxPair = pair;
              maxRound = pair.round;
            }

            if(pair.consensusReached) {
              consensusRound = pair.round;
            }
          });

          score = {};

          score.maxRound = maxRound;

          finalRatingValues = [];
          finalRatings = Ratings.find({pairId: maxPair._id});

          finalRatings.forEach(function(rating) {
            finalRatingValues.push(rating.value);
          });

          finalValue = jStat.mean(finalRatingValues);

          score.criterionId = criterion._id;

          score.finalValue = finalValue;
          score.finalValueRounded = Math.round(score.finalValue * 1000) / 1000;

          score.weight = criterion.weight;
          score.weightRounded = Math.round(score.weight * 1000) / 1000;

          score.weightedValue = score.finalValue * 0.01 * score.weight;
          score.weightedValueRounded = Math.round(score.weightedValue * 1000) / 1000;

          score.consensusRound = consensusRound;
          score.ratings = finalRatings;

          data.scores.push(score);
        }
      });

      //TODO PICK BACK UP HERE

      data.finalScore = 0

      data.scores.forEach(function(score){
        data.finalScore += score.weightedValue;
      });

      data.finalScoreRounded = Math.round(data.finalScore * 1000) / 1000;

      return data;
    }
  },
});


export default Alternatives;
