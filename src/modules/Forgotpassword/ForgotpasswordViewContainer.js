import { compose, withState } from 'recompose';

import ForgotpasswordScreen from './ForgotpasswordView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  ForgotpasswordScreen,
);
