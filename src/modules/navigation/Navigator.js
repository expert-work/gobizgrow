import * as React from 'react';
import { View, Text, StyleSheet, Image,Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { 
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import NavigatorView from './RootNavigation';

 import { connect } from 'react-redux';
import { SET_USER_INFO } from '../AppState';
const iconHome = require('../../../assets/images/drawer/home.png');
const customerHome = require('../../../assets/images/drawer/users.png');
const iconCalendar = require('../../../assets/images/drawer/calendar.png');
const iconGrids = require('../../../assets/images/drawer/grids.png');
const iconPages = require('../../../assets/images/drawer/pages.png');
const iconComponents = require('../../../assets/images/drawer/components.png');
const iconSettings = require('../../../assets/images/drawer/settings.png');
const iconItems = require('../../../assets/images/drawer/star.png');
const iconEstimates = require('../../../assets/images/drawer/calculator.png');
const iconInvoices = require('../../../assets/images/drawer/invoice.png');
const iconPayment = require('../../../assets/images/drawer/payment.png');
const iconExpense = require('../../../assets/images/drawer/expense.png');
const iconLogout = require('../../../assets/images/drawer/logout.png');





const drawerData = [
  {
    name: 'Home',
    icon: iconHome,
  },
   {
    name: 'Items',
    icon: iconItems,
  },
];

const Drawer = createDrawerNavigator();
 
 
class CustomDrawerContent extends React.Component {

     state = {
        email   : '',
        name: '',
    }

    constructor(props) {
      super(props);
    }
   



    async componentDidMount() {
      this.getUserData()
     }

    getUserData = async () => {
                  var value = await AsyncStorage.getItem('isLogin')
                  var userData = await AsyncStorage.getItem('userData')
                  userData=JSON.parse(userData); 
                  this.setState({
                    email:userData.email,
                    name :userData.name
                  })
                  console.log(userData);
     }
   logout = async (props) => {
   // Alert.alert(this.props.userInfo?.name)
      await AsyncStorage.setItem('isLogin', 'null')
      const value = await AsyncStorage.getItem('isLogin')
      this.props.login([])
      this.props.navigation.navigate('Signout')
  }

  render(){
   return (
    <DrawerContentScrollView {...this.props} style={{padding: 0}}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={require('../../../assets/images/drawer/user.png')}
        />
        <View style={{ paddingLeft: 15 }}>
          <Text style={styles.userName}>{this.props.userInfo?.name}</Text>
          <Text style={{ color: '#4BC1FD' }}>{this.props.userInfo?.email}</Text>
        </View>
      </View>
      <View style={styles.divider} />
   
      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 20, height: 20}}
              source={iconHome} 
            />
            <Text style={styles.menuTitle}>Home</Text>
          </View>
        )}
        onPress={() => this.props.navigation.navigate('Home')}
      />

      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 20, height: 20}}
              source={customerHome} 
            />
            <Text style={styles.menuTitle}>Customers</Text>
          </View>
        )}
        onPress={() => this.props.navigation.navigate('Customers')}
      />


      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 20, height: 20}}
              source={iconItems} 
            />
            <Text style={styles.menuTitle}>Items</Text>
          </View>
        )}
        onPress={() => this.props.navigation.navigate('Items')}
      />

      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 20, height: 20}}
              source={iconEstimates} 
            />
            <Text style={styles.menuTitle}>Estimates</Text>
          </View>
        )}
        onPress={() => this.props.navigation.navigate('Estimates')}
      />

      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 20, height: 20}}
              source={iconInvoices} 
            />
            <Text style={styles.menuTitle}>Invoices</Text>
          </View>
        )}
        onPress={() => this.props.navigation.navigate('Invoices')}
      />

      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 20, height: 20}}
              source={iconPayment} 
            />
            <Text style={styles.menuTitle}>Payments</Text>
          </View>
        )}
        onPress={() => this.props.navigation.navigate('Payments')}
      />


      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 20, height: 20}}
              source={iconExpense} 
            />
            <Text style={styles.menuTitle}>Expenses</Text>
          </View>
        )}
        onPress={() => this.props.navigation.navigate('Expenses')}
      />

      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 20, height: 20}}
              source={iconLogout} 
            />
            <Text style={styles.menuTitle}>Logout</Text>
          </View>
        )}
        onPress={() =>this.logout()}
      />
    </DrawerContentScrollView>
  );
}
}

const mapStateToProps = state => ({...state.app})
const mapDisptachToProps = dispatch => {
  return {
    login: (data) => dispatch({type: SET_USER_INFO, data})
  }
}
const CustomDrawerContentComponent = connect(mapStateToProps, mapDisptachToProps)(CustomDrawerContent)

//const CustomDrawerContentComponent = connect(mapStateToProps)(CustomDrawerContent)


  
export default class App extends React.Component {
   
    constructor(props) {
      super(props);
    }

render() {
         return (
          <Drawer.Navigator
            drawerStyle={{
              backgroundColor: '#3C38B1',
            }}
            drawerContent={props => <CustomDrawerContentComponent {...props} />}
          >
            <Drawer.Screen name="Homes" component={NavigatorView} />
          </Drawer.Navigator>
        );
    }
}

const styles = StyleSheet.create({
  menuTitle: {
    marginLeft: 10,
    color: '#fff'
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  userName: {
    color: '#fff',
    fontSize: 18
  },
  divider: {
    borderBottomColor: 'white',
    opacity: 0.2,
    borderBottomWidth: 1,
    margin: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10
  },
});
