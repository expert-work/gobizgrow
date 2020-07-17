import { compose, withState } from 'recompose';

import ItemseditScreen from './ItemseditView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  ItemseditScreen,
);
