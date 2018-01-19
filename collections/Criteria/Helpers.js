import Criteria from './Criteria';

Criteria.helpers({
  study() {
    return Studies.find({_id: this.studyId});
  },
  weightRounded() {
    return Math.round(this.weight * 1000) / 1000;
  },
  weightsNormalized() {
    if(this.totalWeight() == 100) {
      return true;
    } else {
      return false;
    }
  },
  totalWeight() {
    criterion = this;

    criteria = Criteria.find({
      studyId: criterion.studyId,
    });

    totalWeight = 0;

    criteria.forEach(function(criterion) {
      totalWeight += criterion.weight;
    });

    return totalWeight;
  },
  weightNormalized() {
    normalWeight = this.weight / this.totalWeight() * 100;
    return normalWeight;
  },
  weightNormalizedRounded() {
    return Math.round(this.weightNormalized() * 1000) / 1000;
  },
});
