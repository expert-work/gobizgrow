import { compose, withState } from 'recompose';

import CustomernewScreen from './CustomernewView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  CustomernewScreen,
);
