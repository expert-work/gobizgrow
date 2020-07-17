import ExpensesScreen from '../expenses/ExpenseViewContainer';
import ExpenseategoryScreen from '../expensecategories/ExpensecategoryViewContainer';

 
const iconHome = require('../../../assets/images/tabbar/pages.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');

 const tabNavigationData = [
  {
    name: 'Expenses',
    component: ExpensesScreen,
    icon: iconHome,
  },
  { 
    name: 'Categories',
    component: ExpenseategoryScreen,
    icon: iconGrids,
  }
    
];

export default tabNavigationData;