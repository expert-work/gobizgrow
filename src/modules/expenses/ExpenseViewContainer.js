import { compose, withState } from 'recompose';

import ExpenseScreen from './ExpenseView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  ExpenseScreen,
);
