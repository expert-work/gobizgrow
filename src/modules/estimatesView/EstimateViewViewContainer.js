import { compose, withState } from 'recompose';

import EstimateViewScreen from './EstimateViewView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  EstimateViewScreen,
);
