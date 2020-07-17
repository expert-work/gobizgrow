import { compose, withState } from 'recompose';

import CustomerScreen from './CustomerView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  CustomerScreen,
);
