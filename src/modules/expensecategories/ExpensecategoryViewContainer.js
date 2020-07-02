import { compose, withState } from 'recompose';

import ExpensecategoryScreen from './ExpensecategoryView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  ExpensecategoryScreen,
);
