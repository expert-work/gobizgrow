import { compose, withState } from 'recompose';

import ExpenseseditScreen from './ExpenseseditView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  ExpenseseditScreen,
);
