import { compose, withState } from 'recompose';

import Select_categoryScreen from './Select_categoryView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  Select_categoryScreen,
);
