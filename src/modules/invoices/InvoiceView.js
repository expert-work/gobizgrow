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
import { SET_PAGE_REFERSH,SET_RIGHT_ICON_SHOW,SET_EDIT_DATA,SET_ITEMS_INVOICES,BEFORE_PHOTOS,AFTER_PHOTOS,OTHER_PHOTOS,ACTIVE_PHOTO_TAB,UPDATE_PHOTO_DATA} from '../AppState';
import { colors, fonts } from '../../styles';
import i18n from '../../translations';
import NetInfo from "@react-native-community/netinfo";
const nextIcon = require('../../../assets/images/next.png');
const eyeIcon = require('../../../assets/images/eye.png');
const editIcon = require('../../../assets/images/edit.png');
const crossIcon = require('../../../assets/images/cross.png');



 class InvoiceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isListEnd: false,
      //Loading state used while loading the data for the first time
      serverData: [],
      deleteItemId:'',
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
                this.props.setHeaderRightIconShow('Add Invoice');
                this.props.setItemInvoices([]);
                this.props.set_before_photos([]);
                this.props.set_after_photos([]);
                this.props.set_other_photos([]);
                this.props.set_active_photo_tab('');
                this.props.set_update_photo_data([]);
              

                if(this.props.isPageRefersh=='refresh'){
                  this.props.pageRefersh('');
                   this.refreshData();
                 }
    });
    this.loadMoreData();
  }
  
  refreshData(q=''){
       this.setState({q:q})
         this.setState({
            offset:1,
            loading: false,
            isListEnd: false,
            serverData: [],
            fetching_from_server: false
        })
         setTimeout(this.loadMoreData,500)
   }

  editInvoice(data){
    var ItemInInvoice=[]
    data.items.map((item, index) => {
                  var item={
                  unique_id:this.makeid(10),
                  name:item.name,
                  price:item.price.toString(),
                  id:item.id,
                  quantity:item.quantity.toString(),
                  description:item.notes,
              }
       ItemInInvoice.push(item)
    })
   this.props.setItemInvoices(ItemInInvoice);
   this.props.setEditData(data);

    var before_photos=[]
    var after_photos=[]
    var other_photos=[]
 
    data.before_photos.map((item, index) => {
                  var item={
                  unique_id:this.makeid(10),
                  url:item.url,
                  id:item.id,
                  notes:item.notes,
                  type:item.type,
              }
       before_photos.push(item)
    })
    data.after_photos.map((item, index) => {
                  var item={
                  unique_id:this.makeid(10),
                  url:item.url,
                  id:item.id,
                  notes:item.notes,
                  type:item.type,
              }
       after_photos.push(item)
    })

    data.other_photos.map((item, index) => {
                  var item={
                  unique_id:this.makeid(10),
                  url:item.url,
                  id:item.id,
                  notes:item.notes,
                  type:item.type,
              }
       other_photos.push(item)
    })

    this.props.set_before_photos(before_photos)
    this.props.set_after_photos(after_photos)
    this.props.set_other_photos(other_photos)



   this.props.navigation.navigate('Edit Invoice')
    // Alert.alert(this.props.customerEditId)
  }




 makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}


  loadMoreData = () => {
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      //On click of Load More button We will call the web API again
      this.setState({ fetching_from_server: true }, () => {
        NetInfo.fetch().then(state => {
          if(state.isConnected) {
            console.log(CONSTANTS.ALL_INVOICES_API+'?page=' + this.state.offset+'&company_id='+this.props.userInfo.company_id+'&q='+this.state.q)
            fetch(CONSTANTS.ALL_INVOICES_API+'?page=' + this.state.offset+'&company_id='+this.props.userInfo.company_id+'&q='+this.state.q)
              //Sending the currect offset with get request
              .then(response => response.json())
              .then(responseJson => {
                if (responseJson.data.data.length > 0) {
                  //Successful response from the API Call
                  this.state.offset = this.state.offset + 1;
                  //After the response increasing the offset for the next API call.
                  this.setState({
                    serverData: [...this.state.serverData, ...responseJson.data.data],
                    //adding the new data with old one available
                    fetching_from_server: false,
                    //updating the loading state to false
                  });
                } else {
                  this.setState({
                    fetching_from_server: false,
                    isListEnd: true,
                  });
                }
              })
              .catch(error => {
                this.showErrorAlert(i18n.translations.server_connect_error);
              });
          } else {
            this.showErrorAlert(i18n.translations.network_err_msg);
          }
        });
        
      });
    }
  };

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

  isdeleteInvoice(id){
    this.setState({deleteItemId:id.toString()})
   // Alert.alert(this.state.deleteItemId)
  this.AlertPro.open()
   
 }
 



  viewInvoice(data){
      this.props.setEditData(data);
      this.props.navigation.navigate('View Invoice')
   }



  deleteInvoice  = async() =>  {

   // Alert.alert(this.state.deleteItemId);
    let netState = await NetInfo.fetch();
    if (netState.isConnected) {
      try {
        console.log(this.state);

          this.AlertPro.close()

         formData = new FormData();
         
            formData.append('id',this.state.deleteItemId); 
            formData.append('company_id',this.state.company_id); 
           let response = await fetch(
          CONSTANTS.DELETE_INVOICE_API,
          { 
            headers: {
              'Accept': 'application/json',
               'Content-Type': 'multipart/form-data'
            },
            method: 'POST',
            body:formData
          }
        );
         let json = await response.json();
         console.log('-------------------------------------');
         if(json && json.responseCode ==200){
           this.refreshData()
         }
         console.log(json);
          console.log('-------------------------------------');
          return json;

      } catch (error) {
        Alert.alert("", i18n.translations.server_connect_error)
      }
    } else {
      Alert.alert("", i18n.translations.network_err_msg)
    }

  }
    
  canceldeleteInvoice(){
     this.setState({deleteItemId:''})
      this.AlertPro.close()
  }


 

  
  componentWillUnmount() {
    this._unsubscribe();
  }


  render() {
        const { searchQuery } = this.state;
      return (
      <View style={styles.container}>
      <View style={{paddingLeft:10, paddingRight:10}}>
       <SearchBar
          fontColor="blue"
          iconColor="#c6c6c6"
          shadowColor="white"
          backgroundColor="none"
          borderColor="blue"
          placeholder="Search here"
          onChangeText={(val) => this.refreshData(val)}
          onSearchButtonPress={(val) => this.refreshData(val)}
          onCancelButtonPress={(val) => this.refreshData(val)}

        />
               </View> 
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
 
          <FlatList
            style={{ width: '100%' }}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.serverData}
            onEndReached={() => this.loadMoreData()}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => (
             
             <View style={styles.item}>
                 <View style={{flax:1,width: '90%',paddingLeft:10}} >
                    <Text style={styles.text,{'color':colors.primary,fontSize:18,fontWeight:'600' ,margin:2}}>
                    {item.customer_name.toUpperCase()}
                    </Text>
                    
                    <Text style={styles.text,{'color':colors.primaryLight,fontSize:18,fontWeight:'600' ,margin:2}}>
                    {item.invoice_number.toUpperCase()}
                    </Text>

                    
                     <Text style={styles.text,{'color':colors.darkGray,fontSize:18,fontWeight:'600' ,margin:2}}>
                    {item.due_amount.toUpperCase()} USD
                    </Text>

                    <Text style={styles.text,{'color':colors[item.status],fontSize:18,fontWeight:'600' ,margin:2}}>
                    {item.status.toUpperCase()}
                    </Text>
                 </View>

                  <View style={{flax:1,width: '10%', paddingRight:10,justifyContent:'space-between',  contentAlign:'right'}} >
                    <TouchableOpacity  onPress={() => this.editInvoice(item)} style={{margin:5}}>
                       <Image
                        resizeMode="contain"
                        source={editIcon}
                       />
                  </TouchableOpacity>
  
                      <TouchableOpacity  onPress={() => this.viewInvoice(item)} style={{margin:5}}>
                       <Image
                        resizeMode="contain"
                        source={eyeIcon}
                       />
                  </TouchableOpacity>
                   <TouchableOpacity  onPress={() => this.isdeleteInvoice(item.id)} style={{margin:5}}>
                       <Image
                        resizeMode="contain"
                        source={crossIcon}
                       />
                  </TouchableOpacity>


                  </View>
              </View>

            )}
            ListFooterComponent={this.renderFooter.bind(this)}
            //Adding Load More button as footer component
          />
         )}


        <AlertPro
          
          ref={ref => {
            this.AlertPro = ref;
          }}

          onConfirm={() => this.deleteInvoice()}
          onCancel={() => this.canceldeleteInvoice()}
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
          setItemInvoices: (data) => dispatch({type: SET_ITEMS_INVOICES, data}),
          pageRefersh: (data) => dispatch({type: SET_PAGE_REFERSH, data}),
          set_before_photos: (data) => dispatch({type: BEFORE_PHOTOS, data}),
          set_after_photos: (data) => dispatch({type: AFTER_PHOTOS, data}),
          set_other_photos: (data) => dispatch({type: OTHER_PHOTOS, data}),
          set_active_photo_tab: (data) => dispatch({type: ACTIVE_PHOTO_TAB, data}),
          set_update_photo_data: (data) => dispatch({type: UPDATE_PHOTO_DATA, data}),
          

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
});