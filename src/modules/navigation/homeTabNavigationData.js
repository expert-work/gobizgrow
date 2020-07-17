import HomeScreen from '../home/HomeViewContainer';
 
const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const tabNavigationData = [
  {
    name: 'Invoices',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Estimates',
    component: HomeScreen,
    icon: iconCalendar,
  },
  {
    name: 'Expenses',
    component: HomeScreen,
    icon: iconGrids,
  },
  {
    name: 'Payments',
    component: HomeScreen,
    icon: iconPages,
  },
  // {
  //   name: 'Components',
  //   component: ComponentsScreen,
  //   icon: iconComponents,
  // },
];

export default tabNavigationData;