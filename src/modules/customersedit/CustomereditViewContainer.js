import { compose, withState } from 'recompose';

import CustomereditScreen from './CustomereditView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  CustomereditScreen,
);
