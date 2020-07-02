import { compose, withState } from 'recompose';

import PhotonewScreen from './PhotonewView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  PhotonewScreen,
);
