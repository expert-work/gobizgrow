import { compose, withState } from 'recompose';

import CategorynewScreen from './CategorynewView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  CategorynewScreen,
);
