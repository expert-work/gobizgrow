import { compose, withState } from 'recompose';

import UnitnewScreen from './UnitnewView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  UnitnewScreen,
);
