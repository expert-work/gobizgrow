import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { SET_RIGHT_ICON_SHOW } from '../AppState';

import { colors, fonts } from '../../styles';

const chartIcon = require('../../../assets/images/pages/chart.png');
const calendarIcon = require('../../../assets/images/pages/calendar.png');
const chatIcon = require('../../../assets/images/pages/chat.png');
const galleryIcon = require('../../../assets/images/pages/gallery.png');
const profileIcon = require('../../../assets/images/pages/profile.png');

const customersIcon = require('../../../assets/images/pages/users.png');
const itemsIcon = require('../../../assets/images/pages/star.png');
const estimatesIcon = require('../../../assets/images/pages/calculator.png');
const invoicesIcon = require('../../../assets/images/pages/file.png');
const expensesIcon = require('../../../assets/images/pages/dollar.png');
const paymentsIcon = require('../../../assets/images/pages/banknotes.png');
const settingIcon = require('../../../assets/images/pages/setting.png');
const logoutIcon = require('../../../assets/images/pages/logout.png');



 
  class HomeScreen extends React.Component {
  state = {
      email   : '',
      password: '',
  }

  constructor(props) {
    super(props);
  }
  componentDidMount() {
       this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.setHeaderRightIconShow(false);
       });
   }
  componentWillUnmount() {
    this._unsubscribe();
  }

 render() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Customers')}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={customersIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Customers</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Items')}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={itemsIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Items</Text>
        </TouchableOpacity>



      </View>
      <View style={styles.row}>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Estimates')}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={estimatesIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Estimates</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Invoices')}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={invoicesIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Invoices</Text>
        </TouchableOpacity>
        


     

      </View>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Expenses')}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={expensesIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Expenses</Text>
        </TouchableOpacity>
       
        <TouchableOpacity 
                  onPress={() => this.props.navigation.navigate('Payments')}
         style={styles.item}>
          <Image
            resizeMode="contain"
            source={paymentsIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Payments</Text>
        </TouchableOpacity>
      
 

      </View>

      

    </View>
  );
}
}


const mapStateToProps = state => ({...state.app})
const mapDisptachToProps = dispatch => {
  return {
     setHeaderRightIconShow: (data) => dispatch({type: SET_RIGHT_ICON_SHOW, data})

  }
}
export default connect(mapStateToProps, mapDisptachToProps)(HomeScreen)
 





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 120,
    paddingVertical: 20,
    borderColor: colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  itemText: {
    color: colors.primary,
    fontFamily: fonts.primary,
  },
  itemImage: {
    height: 35,
  },
});
