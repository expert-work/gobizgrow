import { compose, withState } from 'recompose';

import InvoiceDueScreen from './InvoiceDueView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  InvoiceDueScreen,
);
