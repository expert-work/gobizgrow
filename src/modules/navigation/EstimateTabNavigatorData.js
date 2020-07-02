import EstimatesScreen from '../estimates/EstimateViewContainer';
import EstimatesSentScreen from '../estimatesSent/EstimateSentViewContainer';
import EstimatesDraftScreen from '../estimatesDraft/EstimateDraftViewContainer';


 
 
const iconHome = require('../../../assets/images/tabbar/pages.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');

 const tabNavigationData = [
  {
    name: 'All',
    component: EstimatesScreen,
    icon: iconHome,
  },
  { 
    name: 'Sent',
    component: EstimatesSentScreen,
    icon: iconGrids,
  },
   { 
    name: 'Draft',
    component: EstimatesDraftScreen,
    icon: iconCalendar,
  }
];

export default tabNavigationData;