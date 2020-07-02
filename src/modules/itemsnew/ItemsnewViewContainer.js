import { compose, withState } from 'recompose';

import ItemsnewScreen from './ItemsnewView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  ItemsnewScreen,
);
