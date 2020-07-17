import ItemScreen from '../items/ItemViewContainer';
import UnitScreen from '../units/UnitViewContainer';
import CategoryScreen from '../categories/CategoryViewContainer';

 
const iconHome = require('../../../assets/images/tabbar/pages.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');

 const tabNavigationData = [
  {
    name: 'Items',
    component: ItemScreen,
    icon: iconHome,
  },
  { 
    name: 'Categories',
    component: CategoryScreen,
    icon: iconGrids,
  },
   { 
    name: 'Units',
    component: UnitScreen,
    icon: iconCalendar,
  }
];

export default tabNavigationData;