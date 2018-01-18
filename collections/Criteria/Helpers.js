import Criteria from './Criteria';

Criteria.helpers({
  study() {
    return Studies.find({_id: this.studyId});
  },
  weightRounded() {
    return Math.round(this.weight * 1000) / 1000;
  },
});
