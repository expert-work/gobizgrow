import { compose, withState } from 'recompose';

import InvoiceDraftScreen from './InvoiceDraftView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  InvoiceDraftScreen,
);
