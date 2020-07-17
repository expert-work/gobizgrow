import { compose, withState } from 'recompose';

import SettingScreen from './SettingView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  SettingScreen,
);
