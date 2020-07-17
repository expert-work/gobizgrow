import { compose, withState } from 'recompose';

import PhotoupdateScreen from './PhotoupdateView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  PhotoupdateScreen,
);
