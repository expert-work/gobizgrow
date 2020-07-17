//This is an example of React Native
//Pagination to Load More Data dynamically - Infinite List
import React, { Component } from 'react';
//import react in our code.
import {
  View,
  Text,
  Alert,
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image 
} from 'react-native';
//import all the components we are going to use.
import CONSTANTS from '../constants';

 import SearchBar from 'react-native-search-bar';
//import SearchBar from "react-native-dynamic-search-bar";
import { connect } from 'react-redux';
import { SET_PAGE_REFERSH,SET_RIGHT_ICON_SHOW,SET_EDIT_DATA } from '../AppState';
import i18n from '../../translations';
import NetInfo from "@react-native-community/netinfo";
import { colors, fonts } from '../../styles';
const nextIcon = require('../../../assets/images/next.png');




 class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isListEnd: false,
      //Loading state used while loading the data for the first time
      serverData: [

              {
                name:'Item Categories',
                screen:'Item Categories'
              },
              {
                name:'Expenses Categories',
                screen:'Expense Categories'
              },
              {
                name:'Taxes',
                screen:'Item Categories'
              },
              {
                name:'Profile',
                screen:'Item Categories'
              },
              {
                name:'Company Information',
                screen:'Item Categories'
              },
         ],
      //Data Source for the FlatList
      fetching_from_server: false,
      //Loading state used while loading more data
      q:'',
      offset:1
    };
     //Index of the offset to load from web API
  }
  componentDidMount() {
       this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.setHeaderRightIconShow(false);
                if(this.props.pageRefersh=='refresh'){
                  
                  this.props.set_pageRefersh('');
                  }
    });
   }
  
 
 



  
  showErrorAlert = (message) => {
    this.setState({
      fetching_from_server: false,
      isListEnd: true,
    });
    Alert.alert("", message)
  }

  renderFooter() {
    return (
      <View style={styles.footer}>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  }

 
 

  
  componentWillUnmount() {
    this._unsubscribe();
  }


  render() {
       return (
      <View style={styles.container}>
          <FlatList
            style={{ width: '100%',marginTop:20 }}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.serverData}
             onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                 <View style={{flax:1,width: '70%',padding:10,paddingLeft:30}} >
                    
                    <Text style={styles.text,{color:'black'}}>
                     {item.name}
                     </Text>
                 </View>
                  <View style={{flax:1,width: '30%', paddingRight:10,justifyContent:'space-between',  contentAlign:'right'}} >
                    <TouchableOpacity  onPress={()=> this.props.navigation.navigate(item.screen)} >
                       <Image

                        resizeMode="contain"
                        source={nextIcon}
                       />
                  </TouchableOpacity>
                 

                  </View>
              </View>
            )}
            ListFooterComponent={this.renderFooter.bind(this)}
            //Adding Load More button as footer component
          />
          
      </View>
    );
  }
}
 
const mapStateToProps = state => ({...state.app})
const mapDisptachToProps = dispatch => {
  return {
    set_pageRefersh: (data) => dispatch({type: SET_PAGE_REFERSH, data}),
    setHeaderRightIconShow: (data) => dispatch({type: SET_RIGHT_ICON_SHOW, data}),
    editData: (data) => dispatch({type: SET_EDIT_DATA, data}),

  }
}



export default connect(mapStateToProps, mapDisptachToProps)(SettingScreen)
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
   },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    marginBottom:5,
    paddingVertical: 15,
    borderColor: '#eceaea',
    backgroundColor:'#eceaea',
    borderWidth: 1,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
   separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  text: {
    fontSize: 15,
    color: 'black',
  },
  itemText: {
    color: colors.primary,
    fontFamily: fonts.primary,
  },
  itemImage: {
    height: 35,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});