import { compose, withState } from 'recompose';

import ExpenseCategoryeditScreen from './ExpensecategoryeditView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  ExpenseCategoryeditScreen,
);
