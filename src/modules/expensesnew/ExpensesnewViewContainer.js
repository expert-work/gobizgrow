import { compose, withState } from 'recompose';

import ExpensesnewScreen from './ExpensesnewView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  ExpensesnewScreen,
);
