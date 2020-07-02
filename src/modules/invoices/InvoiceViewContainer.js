import { compose, withState } from 'recompose';

import InvoiceScreen from './InvoiceView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  InvoiceScreen,
);
