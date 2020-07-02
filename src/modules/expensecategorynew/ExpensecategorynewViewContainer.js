import { compose, withState } from 'recompose';

import ExpensecategorynewScreen from './ExpensecategorynewView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  ExpensecategorynewScreen,
);
