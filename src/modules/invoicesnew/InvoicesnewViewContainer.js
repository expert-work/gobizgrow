import { compose, withState } from 'recompose';

import InvoicesnewScreen from './InvoicesnewView';

export default compose(withState('isExtended', 'setIsExtended', false))(
  InvoicesnewScreen,
);
