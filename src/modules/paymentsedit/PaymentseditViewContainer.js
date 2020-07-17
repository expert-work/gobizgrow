import { compose, withState } from 'recompose';

import PaymentseditScreen from './PaymentseditView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  PaymentseditScreen,
);
