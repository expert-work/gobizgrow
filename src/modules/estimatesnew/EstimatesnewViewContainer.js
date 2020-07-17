import { compose, withState } from 'recompose';

import EstimatesnewScreen from './EstimatesnewView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  EstimatesnewScreen,
);
