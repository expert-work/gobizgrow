import { compose, withState } from 'recompose';

import ItemScreen from './ItemView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  ItemScreen,
);
