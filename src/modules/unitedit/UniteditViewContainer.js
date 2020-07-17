import { compose, withState } from 'recompose';

import UniteditScreen from './UniteditView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  UniteditScreen,
);
