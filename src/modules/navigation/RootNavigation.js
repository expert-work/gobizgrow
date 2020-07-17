import 'react-native-gesture-handler';
import React from 'react';

import MainScreen from '../main/MainViewContainer';
import AsyncStorage from '@react-native-community/async-storage';

import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet, View,TouchableOpacity,Alert,StatusBar } from 'react-native';

import StackNavigationData from './stackNavigationData';
import StackNavigationDataAuth from './stackNavigationDataAuth';
import { connect } from 'react-redux';
import { SET_RIGHT_ICON_SHOW } from '../AppState';

const Stack = createStackNavigator();

 class NavigatorView extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        email   : '',
        password: '',
        userToken: 'null'
      }
      if (typeof this.props.userInfo?.auth_token !== 'undefined') {
         this.state={userToken:this.props.userInfo?.auth_token}
       }
       else{
         this.state={userToken:null}
       }     
      // this.props.setHeaderRightIconShow('jgjj');
      }

  
  
    headerLeftComponentMenu = () => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.toggleDrawer()}
        style={{
          paddingLeft: 10,
        }}
      >
      <Image
        source={require('../../../assets/images/drawer/menu.png')}
        resizeMode="contain"
        style={{
          height: 20,
        }}
      />
      </TouchableOpacity>    
    )
  }  
   
   ifShowRightIcon(){
      return (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(this.props.isHeaderRightIconShow)}
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
  ifNotShowRightIcon(){
      return (
          <View></View> 
        )
   }

    headerRightComponentMenu = () =>{
       if(this.props.isHeaderRightIconShow !== 'undefined' && this.props.isHeaderRightIconShow){
             return this.ifShowRightIcon();
       }else{
        this.ifNotShowRightIcon();
       }
    }



render() {
  return (
    <Stack.Navigator >

    {this.state.userToken == null ?
    
    StackNavigationDataAuth.map((item, idx) => (
        <Stack.Screen
          key={`stack_item-${idx+1}`}
          name={item.name} 
          component={item.component} 
          options={{
            headerShown: item.headerShown,
            headerRight: this.headerRightComponentMenu,
            headerLeft: item.headerLeft || this.headerLeftComponentMenu,
            headerBackground: () => (
              <Image style={styles.headerImage} source={item.headerBackground.source} />
            ),
            headerTitleStyle: item.headerTitleStyle,
          }} 
        />
      ))    
      :  StackNavigationData.map((item, idx) => (
        <Stack.Screen
          key={`stack_item-${idx+1}`}
          name={item.name} 
          component={item.component} 
          options={{
            headerRight:this.headerRightComponentMenu,
            headerShown: item.headerShown,
            headerLeft: item.headerLeft || this.headerLeftComponentMenu,
            headerBackground: () => (
              <Image style={styles.headerRightImage} source={item.headerBackground.source} />
            ),
            headerTitleStyle: item.headerTitleStyle,
          }} 
        />
      ))
  }
    </Stack.Navigator>
  );
}
}
const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100 + '%',
    height: StatusBar.height,
  },
    headerRightImage: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100 + '%',
    height: StatusBar.height,
  },
});

const mapStateToProps = state => ({...state.app})
const mapDisptachToProps = dispatch => {
  return {
    setHeaderRightIconShow: (data) => dispatch({type: SET_RIGHT_ICON_SHOW, data})
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(NavigatorView)
 