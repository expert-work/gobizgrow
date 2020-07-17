import React, { Component } from 'react';
 import { Image, StyleSheet, TouchableOpacity,Alert } from 'react-native';

import TabNavigator from './MainTabNavigator';
import  HomeTabNavigator from './HomeTabNavigator';
 import { connect } from 'react-redux';

 import HomeScreen from '../home/HomeViewContainer';
 
import MainScreen from '../main/MainViewContainer';
import LoginScreen from '../login/LoginViewContainer';
import SignupScreen from '../signup/SignupViewContainer';
import ForgotpasswordScreen from '../Forgotpassword/ForgotpasswordViewContainer';
import CustomerScreen from '../customers/CustomerViewContainer';
import CustomernewScreen from '../customersnew/CustomernewViewContainer';
import CustomereditScreen from '../customersedit/CustomereditViewContainer';

import InvoicesScreen from './InvoiceTabNavigator';

//import InvoicesScreen from '../invoices/InvoiceViewContainer';
import InvoicesnewScreen from '../invoicesnew/InvoicesnewViewContainer';
import InvoiceseditScreen from '../invoicesedit/InvoiceseditViewContainer';
import InvoiceViewScreen from '../invoiceview/InvoiceViewViewContainer';

import SelectItemsInvoiceAdd from '../invoicesnew/SelectItems';
import SelectedItemDetailInvoice from '../invoicesnew/ItemDetail';

//import EstimatesScreen from '../estimates/EstimateViewContainer';

import EstimatesScreen from './EstimateTabNavigator';
import EstimatesnewScreen from '../estimatesnew/EstimatesnewViewContainer';
import EstimateseditScreen from '../estimatesedit/EstimateseditViewContainer';

import EstimatesViewScreen from '../estimatesView/EstimateViewViewContainer';



import ExpensesScreen from '../expenses/ExpenseViewContainer';
import ExpenseTabnavigator from './ExpenseTabnavigator';
import ExpensecategoryScreen from '../expensecategories/ExpensecategoryViewContainer';
import Expensecategoryedit from '../expensecategoryedit/ExpensecategoryeditViewContainer';
import Expensecategorynew from '../expensecategorynew/ExpensecategorynewViewContainer';
import ExpensesnewScreen from '../expensesnew/ExpensesnewViewContainer';
import ExpenseseditScreen from '../expensesedit/ExpenseseditViewContainer';

 import ItemScreen from '../items/ItemViewContainer';
import ItemsTabNavigator from './ItemTabNavigator';
import ItemnewScreen from '../itemsnew/ItemsnewViewContainer';
import ItemeditScreen from '../itemsedit/ItemseditViewContainer';
import Select_categoryScreen from '../select_category/Select_categoryViewContainer';


import CategoryScreen from '../categories/CategoryViewContainer';
import CategorynewScreen from '../categorynew/CategorynewViewContainer';
import CategoryeditScreen from '../categoryedit/CategoryeditViewContainer';


import UnitnewScreen from '../unitnew/UnitnewViewContainer';
import UniteditScreen from '../unitedit/UniteditViewContainer';



import PaymentsScreen from '../payments/PaymentsViewContainer';
import PaymentsnewScreen from '../paymentsnew/PaymentsnewViewContainer';
import PaymentseditScreen from '../paymentsedit/PaymentseditViewContainer';


import SettingScreen from '../setting/SettingViewContainer';

import PhotoAddScreen from '../photonew/PhotonewViewContainer';
import PhotoUpdateScreen from '../photoupdate/PhotoupdateViewContainer';
 


// import ProfileScreen from '../profile/ProfileViewContainer';
// import ArticleScreen from '../article/ArticleViewContainer';
// import ChatScreen from '../chat/ChatViewContainer';
// import MessagesScreen from '../chat/MessagesViewContainer';
// import ChartsScreen from '../charts/ChartsViewContainer';
// import AuthScreen from '../auth/AuthViewContainer';

import { colors, fonts } from '../../styles';



  
 


const headerLeftComponent = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingLeft: 10,
      }}
    >
      <Image
        source={require('../../../assets/images/icons/arrow-back.png')}
        resizeMode="contain"
        style={{
          height: 20,
        }}
      />
    </TouchableOpacity>    
  )
}

headerRightComponentMenu = () => {
    return (
      <TouchableOpacity
        onPress={() => Alert.alert('done')}
        style={{
          paddingRight: 10,
        }}
      >
      <Image
        source={require('../../../assets/images/drawer/plus.png')}
        resizeMode="contain"
        style={{
          height: 20,
        }}
      />
      </TouchableOpacity>    
    )
  }

const headerBackground = require('../../../assets/images/topBarBg.png');

const StackNavigationDataAuth = [
       {
    name: 'Main',
    component: MainScreen,
    headerLeft: null,
    headerRight:null,
    headerShown:false,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Signout',
    component: MainScreen,
    headerLeft: null,
    headerRight:null,
    headerShown:false,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },      
  {
    name: 'Signup',
    component: SignupScreen,
    headerLeft: headerLeftComponent,
    headerRight:null,
    headerShown:false,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Forgotpassword',
    component: ForgotpasswordScreen,
    headerLeft: headerLeftComponent,
    headerRight:null,
    headerShown:false,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  
  {
    name: 'Login',
    component: LoginScreen,
    headerLeft: headerLeftComponent,
    headerRight:null,
    headerShown:false,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

    {
    name: 'Home',
    component: HomeScreen,
    headerRight:null,
    headerLeft: null,
    headerRight:null,
    headerBackground: { source: headerBackground },
    headerShown:true,
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
   {
    name: 'Customers',
    component: CustomerScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
    {
    name: 'Add Customers',
    component: CustomernewScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Edit Customers',
    component: CustomereditScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
   {
    name: 'Items',
    component: ItemScreen,
    headerLeft: headerLeftComponent,
    headerRight:headerRightComponentMenu,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
    {
    name: 'Item Categories',
    component: CategoryScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
    {
    name: 'Add Category',
    component: CategorynewScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
 {
    name: 'Edit Category',
    component: CategoryeditScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
    {
    name: 'Add Unit',
    component: UnitnewScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Edit Unit',
    component: UniteditScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
     {
    name: 'Expenses',
    component: ExpensesScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },
     {
    name: 'Expense Categories',
    component: ExpensecategoryScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },

   {
    name: 'Add Expense Category',
    component: Expensecategorynew,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },

     {
    name: 'Edit Expense Category',
    component: Expensecategoryedit,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },
    {
    name: 'Add Expenses',
    component: ExpensesnewScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },

     {
    name: 'Edit Expenses',
    component: ExpenseseditScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },
     {
    name: 'Add Item',
    component: ItemnewScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },

     {
    name: 'Edit Item',
    component: ItemeditScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },
     {
    name: 'Select Categories',
    component: Select_categoryScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },


  {
    name: 'Payments',
    component: PaymentsScreen,
    headerLeft: null,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },
  {
    name: 'Add Payment',
    component: PaymentsnewScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },
  {
    name: 'Edit Payment',
    component: PaymentseditScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },
   {
    name: 'Invoices',
    component: InvoicesScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },
    {
    name: 'Add Invoice',
    component: InvoicesnewScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
    {
    name: 'Edit Invoice',
    component: InvoiceseditScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'View Invoice',
    component: InvoiceViewScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

   {
    name: 'Estimates',
    component: EstimatesScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },
      {
    name: 'View Estimate',
    component: EstimatesViewScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

    {
    name: 'Add Estimate',
    component: EstimatesnewScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
      {
    name: 'Edit Estimate',
    component: EstimateseditScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  

      {
    name: 'Select Item',
    component: SelectItemsInvoiceAdd,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
    {
    name: 'Item Detail',
    component: SelectedItemDetailInvoice,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
   {
    name: 'Setting',
    component: SettingScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

   {
    name: 'Add Photo',
    component: PhotoAddScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  
   {
    name: 'Update Photo',
    component: PhotoUpdateScreen,
    headerLeft: headerLeftComponent,
    headerShown:true,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

 
]

export default StackNavigationDataAuth;