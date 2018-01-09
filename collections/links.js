import Pairs from './Pairs'
import Alternatives from './Alternatives'

Pairs.addLinks({
  'alternative': {
    type: 'one',
    collection: Alternatives,
    field: 'alternativeId',
  }
});
