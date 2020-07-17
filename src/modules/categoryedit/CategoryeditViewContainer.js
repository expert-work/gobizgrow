import { compose, withState } from 'recompose';

import CategoryeditScreen from './CategoryeditView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  CategoryeditScreen,
);
