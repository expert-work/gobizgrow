import { compose, withState } from 'recompose';

import EstimateDraftScreen from './EstimateDraftView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  EstimateDraftScreen,
);
