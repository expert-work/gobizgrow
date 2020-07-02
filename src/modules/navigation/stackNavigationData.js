import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { connect } from 'react-redux';

import TabNavigator from './MainTabNavigator';
import  HomeTabNavigator from './HomeTabNavigator';

import HomeScreen from '../home/HomeViewContainer';

import MainScreen from '../main/MainViewContainer';
import LoginScreen from '../login/LoginViewContainer';
import SignupScreen from '../signup/SignupViewContainer';
import ForgotpasswordScreen from '../Forgotpassword/ForgotpasswordViewContainer';


import CustomerScreen from '../customers/CustomerViewContainer';
import CustomernewScreen from '../customersnew/CustomernewViewContainer';
import CustomereditScreen from '../customersedit/CustomereditViewContainer';
 
import ItemsTabNavigator from './ItemTabNavigator';
import ItemnewScreen from '../itemsnew/ItemsnewViewContainer';
import ItemeditScreen from '../itemsedit/ItemseditViewContainer';
import InvoicesScreen from './InvoiceTabNavigator';


//import InvoicesScreen from '../invoices/InvoiceViewContainer';
import InvoicesnewScreen from '../invoicesnew/InvoicesnewViewContainer';
import InvoiceseditScreen from '../invoicesedit/InvoiceseditViewContainer';

import SelectItemsInvoiceAdd from '../invoicesnew/SelectItems';
import SelectedItemDetailInvoice from '../invoicesnew/ItemDetail';

import EstimatesScreen from './EstimateTabNavigator';
//import EstimatesScreen from '../estimates/EstimateViewContainer';

import EstimatesnewScreen from '../estimatesnew/EstimatesnewViewContainer';
import EstimateseditScreen from '../estimatesedit/EstimateseditViewContainer';


import ExpensesScreen from '../expenses/ExpenseViewContainer';
import ExpensesnewScreen from '../expensesnew/ExpensesnewViewContainer';
import ExpenseseditScreen from '../expensesedit/ExpenseseditViewContainer';

import ExpenseTabnavigator from './ExpenseTabnavigator';
import Expensecategoryedit from '../expensecategoryedit/ExpensecategoryeditViewContainer';
import Expensecategorynew from '../expensecategorynew/ExpensecategorynewViewContainer';


import PaymentsScreen from '../payments/PaymentsViewContainer';
import PaymentsnewScreen from '../paymentsnew/PaymentsnewViewContainer';
import PaymentseditScreen from '../paymentsedit/PaymentseditViewContainer';


import CategorynewScreen from '../categorynew/CategorynewViewContainer';
import CategoryeditScreen from '../categoryedit/CategoryeditViewContainer';

import UnitnewScreen from '../unitnew/UnitnewViewContainer';
import UniteditScreen from '../unitedit/UniteditViewContainer';

// import ProfileScreen from '../profile/ProfileViewContainer';
// import ArticleScreen from '../article/ArticleViewContainer';
// import ChatScreen from '../chat/ChatViewContainer';
// import MessagesScreen from '../chat/MessagesViewContainer';
// import ChartsScreen from '../charts/ChartsViewContainer';
// import AuthScreen from '../auth/AuthViewContainer';
import ImagePicker from '../ImagePicker/ImagePicker';
import PhotoAddScreen from '../photonew/PhotonewViewContainer';

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
 

const headerBackground = require('../../../assets/images/topBarBg.png');

const StackNavigationData = [

  
  {
    name: 'Home',
    component: HomeScreen,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerShown:true,
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
    name: 'Customers',
    component: CustomerScreen,
    headerLeft: null,
    headerRight:null,
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
    component: ItemsTabNavigator,
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
    name: 'Invoices',
    component: InvoicesScreen,
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
    name: 'Estimates',
    component: EstimatesScreen,
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
    name: 'Expenses',
    component: ExpenseTabnavigator,
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
    name: 'ImagePicker',
    component: ImagePicker,
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



 ]

export default StackNavigationData;