import { compose, withState } from 'recompose';

import EstimateseditScreen from './EstimateseditView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  EstimateseditScreen,
);
