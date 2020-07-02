import { compose, withState } from 'recompose';

import EstimateScreen from './EstimateView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  EstimateScreen,
);
