import { compose, withState } from 'recompose';

import InvoiceViewScreen from './InvoiceViewView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  InvoiceViewScreen,
);
