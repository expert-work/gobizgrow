import { compose, withState } from 'recompose';

import InvoiceseditScreen from './InvoiceseditView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  InvoiceseditScreen,
);
