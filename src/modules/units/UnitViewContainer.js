import { compose, withState } from 'recompose';

import UnitScreen from './UnitView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  UnitScreen,
);
