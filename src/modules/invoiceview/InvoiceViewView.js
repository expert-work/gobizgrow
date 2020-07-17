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
import AlertPro from "react-native-alert-pro";

 import SearchBar from 'react-native-search-bar';
//import SearchBar from "react-native-dynamic-search-bar";
import { connect } from 'react-redux';
import { SET_PAGE_REFERSH,SET_RIGHT_ICON_SHOW,SET_EDIT_DATA,SET_ITEMS_INVOICES } from '../AppState';
import { colors, fonts } from '../../styles';
import i18n from '../../translations';
import NetInfo from "@react-native-community/netinfo";
import { WebView } from 'react-native-webview';

 

 


 class InvoiceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isListEnd: false,
      deleteItemId:'',
      //Loading state used while loading the data for the first time
      serverData: [],
      //Data Source for the FlatList
      fetching_from_server: false,
      //Loading state used while loading more data
      q:'',
      offset:1,
      auth_token:this.props.editData.auth_token,
    };
     //Index of the offset to load from web API
  }
  componentDidMount() {
    //Alert.alert(this.state.auth_token)
       this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.setHeaderRightIconShow('');
                this.props.setItemEstimates([]);
                if(this.props.isPageRefersh=='refresh'){
                  this.props.pageRefersh('');
                  }
    });
   }
  
 
    
 



  componentWillUnmount() {
    this._unsubscribe();
  }


  render() {
        const { searchQuery } = this.state;
       return (
      <View style={styles.container}>
      <WebView  style={{height:700}} source={{ uri: CONSTANTS.VIEW_INVOICE_API+this.state.auth_token }} />
  


        <AlertPro
          
          ref={ref => {
            this.AlertPro = ref;
          }}

          onConfirm={() => this.deletEstimate()}
          onCancel={() => this.cancelDeletEstimate()}
          title="Delete confirmation"
          message="Are you sure to delete the entry?"
          textCancel="Cancel"
          textConfirm="Delete"
          customStyles={{
            mask: {
              backgroundColor: "transparent"
            },
            container: {
              borderWidth: 1,
              borderColor: "#9900cc",
              shadowColor: "#000000",
              shadowOpacity: 0.1,
              shadowRadius: 10
            },
            buttonCancel: {
              backgroundColor: "#4da6ff"
            },
            buttonConfirm: {
              backgroundColor: "#ffa31a"
            }
          }}
        />


      </View>
    );
  }
}
 
const mapStateToProps = state => ({...state.app})
const mapDisptachToProps = dispatch => {
  return {
     setHeaderRightIconShow: (data) => dispatch({type: SET_RIGHT_ICON_SHOW, data}),
         setEditData: (data) => dispatch({type: SET_EDIT_DATA, data}),
        setItemEstimates: (data) => dispatch({type: SET_ITEMS_INVOICES, data}),
        pageRefersh: (data) => dispatch({type: SET_PAGE_REFERSH, data}),


  }
}



export default connect(mapStateToProps, mapDisptachToProps)(InvoiceScreen)
 

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
  DRAFT:{
   color:colors.secondaryGradientEnd,   
  },
  SENT:{
   color:colors.profileGradientEnd,
  },
  ACCEPTED:{
   color:colors.blue,
  },
  REJECTED:{
   color:colors.green,
  }
});