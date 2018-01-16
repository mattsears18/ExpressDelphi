import Criteria from './Criteria';

Criteria.helpers({
  study() {
    return Studies.find({_id: this.studyId});
  },
});
