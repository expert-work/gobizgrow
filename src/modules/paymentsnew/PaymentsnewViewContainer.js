import { compose, withState } from 'recompose';

import PaymentsnewScreen from './PaymentsnewView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  PaymentsnewScreen,
);
