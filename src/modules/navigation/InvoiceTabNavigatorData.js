import InvoicesScreen from '../invoices/InvoiceViewContainer';
import InvoicesDueScreen from '../invoicesDue/InvoiceDueViewContainer';
import InvoicesDraftScreen from '../invoicesDraft/InvoiceDraftViewContainer';


 
 
const iconHome = require('../../../assets/images/tabbar/pages.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');

 const tabNavigationData = [
  {
    name: 'All',
    component: InvoicesScreen,
    icon: iconHome,
  },
  { 
    name: 'Due',
    component: InvoicesDueScreen,
    icon: iconGrids,
  },
   { 
    name: 'Draft',
    component: InvoicesDraftScreen,
    icon: iconCalendar,
  }
];

export default tabNavigationData;