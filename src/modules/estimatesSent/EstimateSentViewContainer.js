import { compose, withState } from 'recompose';

import EstimateSentScreen from './EstimateSentView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  EstimateSentScreen,
);
