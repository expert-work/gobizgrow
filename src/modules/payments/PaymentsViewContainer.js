import { compose, withState } from 'recompose';

import PaymentsScreen from './PaymentsView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  PaymentsScreen,
);
