//This is an example of React Native
//Pagination to Load More Data dynamically - Infinite List
import React, { Component } from 'react';
//import react in our code.
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import AlertPro from "react-native-alert-pro";
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


import CONSTANTS from '../constants';

//import all the components we are going to use.
 import SearchBar from 'react-native-search-bar';
//import SearchBar from "react-native-dynamic-search-bar";
import { connect } from 'react-redux';
import { SET_USER_INFO } from '../AppState';
import { colors, fonts } from '../../styles';
const saveIcon = require('../../../assets/images/save.png');
import { SET_PAGE_REFERSH,SET_RIGHT_ICON_SHOW,SELECTED_CATEGORIES,SET_BACK_SCREEN } from '../AppState';
import i18n from '../../translations';
import NetInfo from "@react-native-community/netinfo";
 let uri='';
 let uploadUrl='';


 const settings = {
   uri,
    uploadUrl,
   data: {
    // extra fields to send in the multipart payload
  }
};

 class ItemsnewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
          company_id:'',
          notificationTitle:'',      
          notificationMessage:'',
          
          name:this.props.editData.name,
          price:this.props.editData.price,
          description:this.props.editData.description,
          auth_token:this.props.editData.auth_token,
          id:this.props.editData.id,

          category:[],
          category_ids:[],
          unit:'',

          isDisabled:false,
          categories:[],
          units:[],
          SELECTED_CATEGORIES:[],
    };
   }
 




 




 
 

 async componentDidMount() {
  //this.props.SET_SELECTED_CATEGORIES([]);
  this.props.SET_BACK_SCREEN('Edit Item');
       this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.setState({SELECTED_CATEGORIES:this.props.selected_categories})
                this.props.setHeaderRightIconShow(false);
       });
       this.setState({company_id:this.props.userInfo.company_id})
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
 

  async  addItemsApiCall() {
    let netState = await NetInfo.fetch();
    if (netState.isConnected) {
      try {
        console.log(this.state);
         formData = new FormData();
         
         formData.append('name',this.state.name); 
         formData.append('price',this.state.price); 
         formData.append('description',this.state.description); 
          formData.append('company_id',this.state.company_id); 
         formData.append('items_categories',JSON.stringify(this.state.SELECTED_CATEGORIES)); 
         formData.append('auth_token',this.state.auth_token); 
         let response = await fetch(
          CONSTANTS.UPDATE_ITEM_API,
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



  async addItems(){
    try {
         
         




            if(this.state.name==''){
                    this.setState({
                      notificationTitle:'',
                      notificationMessage:'Please enter  name'
                    })
                    this.AlertPro.open()
                    return false;
            }             

            if(this.state.price==''){
                    this.setState({
                      notificationTitle:'',
                      notificationMessage:'Please enter  price'
                    })
                    this.AlertPro.open()
                    return false;
            }             
                                  
          
    


           this.setState({isDisabled:true})
           var user=  await this.addItemsApiCall();
           this.setState({isDisabled:false})
           console.log(user)
           if(user && user.responseCode !=200){
            var data=user.data
              var err='';
               
                if (typeof data.name != "undefined" && typeof data.name[0] != "undefined") { err=err+' Please enter an  price ';}
                   this.setState({
                    notificationTitle:'Some error occured',
                    notificationMessage:err
                  })
                
                 

                if (typeof data.price != "undefined" && typeof data.price[0] != "undefined") { err=err+' Please enter an  price ';}
                   this.setState({
                    notificationTitle:'Some error occured',
                    notificationMessage:err
                  })
 
                  this.AlertPro.open()
            }else if(user) {
               this.props.pageRefersh('refresh');
               this.setState({
                    name:'',
                })
               this.props.pageRefersh('refresh');
               this.props.navigation.navigate('Items')
            }
        } catch (error) {
          console.error(error);
        }

    //this.setState({'isDisabled':true})
  }
  selectCategories(){
    this.props.navigation.navigate('Select Categories')

  }
   setCategoryValues(val,item){
                catArr=[]; 
               this.state.SELECTED_CATEGORIES.map((items, index) => {
                      if(items.id == item.id){ items.price=this.isDecimalNumber(val) }
                      catArr.push(items) ;
               })
               this.setState({SELECTED_CATEGORIES:catArr})
   }
 
 removeCategoryFromList(id){
                catArr=[]; 
               this.state.SELECTED_CATEGORIES.map((items, index) => {
                      if(items.id != id){  catArr.push(items) ; }
                     
               })
               this.setState({SELECTED_CATEGORIES:catArr})
              this.props.SET_SELECTED_CATEGORIES(catArr);
 }



 isDecimalNumber(number){
       const re = /^[0-9]*\.?[0-9]*$/;
       if (number !== '' && re.test(number)) {
          return number
       }
       return ''
  }
   getEnteredPrice(id){
        val='';
        this.state.SELECTED_CATEGORIES.map((items, index) => {
                      if(items.id ==id){
                          val=items.price
                       }
               })
      return val;

   }


    render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{flax:1,flexDirection: 'row',alignItems: 'center',
    justifyContent: 'space-around',borderBottomWidth:1,borderColor:colors.primaryLight}} >
           <View style={{flax:1,width: '90%',padding:15}} >
                    <Text style={{'color':colors.primaryLight,fontSize:18,fontWeight:'600' }}>
                      Add Item
                    </Text>
                 </View>
                 <View style={{flax:1,width: '10%'}} >
                 <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.addItems()} >
                       <Image
                        resizeMode="contain"
                        source={saveIcon}
                       />
                </TouchableOpacity>
                </View>
        </View>
       <View style={{paddingTop:30}}>
            <View style={{padding:15,paddingTop:3}}>
               <Text style={styles.text}>
                  Name
                  <Text style={styles.required}>*</Text>
                </Text>
                 <TextInput value={this.state.name}  style={styles.inputs} onChangeText={(name) => this.setState({name:name})}  />

             </View>

          <View style={{padding:15,paddingTop:3}}>
               <Text style={styles.text}>
                  Generic Price
                  <Text style={styles.required}>*</Text>
                </Text>
                <TextInput value={this.state.price}  style={styles.inputs} onChangeText={(price) => this.setState({price:price})}  />
           </View>  
           <View style={{padding:15,paddingTop:3}}>
               <Text style={styles.text}>
                 Description (Optional)
                </Text>
                <TextInput multiline={true} numberOfLines={4}
                          value={this.state.description} 
                          onChangeText={(description) => this.setState({description:description})}
                           style={{borderWidth:1,height:60,color:colors.primary,
                          padding:10,
                          borderWidth:.5,
                          borderRadius:2,
                          borderColor:colors.primary}}   />
             </View>

            <Text style={{paddingTop:20,paddingLeft:15, fontSize:20,marginBottom:10}}>Pricing Based on Category</Text>
           
               <FlatList
                  style={{ width: '100%',marginTop:20,padding:5 }}
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.SELECTED_CATEGORIES}
                   onEndReachedThreshold={0.5}
                  renderItem={({ item, index }) => (
                    <View style={styles.item}>
                       <View style={{flax:1,width: '35%', padding:10,}} >
                          
                          <Text style={styles.text}>
                           {item.name}
                           </Text>
                       </View>
                       <View style={{flax:1,width: '55%',padding:10,}} >
                                  <TextInput value={this.getEnteredPrice(item.id)}  style={{...styles.inputs,backgroundColor:'white'}} onChangeText={(val) => this.setCategoryValues(val,item)}  />  
                        </View>
                        <View style={{flax:1,width: '10%',justifyContent:'space-between',  contentAlign:'right'}} >
                        <TouchableOpacity  onPress={()=> this.removeCategoryFromList(item.id)} >
                                                  <Text style={{color:'red', borderRadius:50, borderWidth:2,borderColor:'white',width:22,height:22, fontSize:18, fontWeight:'800'}}>X</Text>
                        </TouchableOpacity>



                        </View>
                    </View>
                  )}
                  ListFooterComponent={this.renderFooter.bind(this)}
                 />







            <View style={{padding:15,paddingTop:3}}>
               <TouchableOpacity  onPress={() => this.selectCategories()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:'white', borderColor:colors.primaryLight,borderWidth:1, borderRadius:2,padding:10}}>
                       <Text style={{color:colors.primaryLight,fontSize:18}}>+ Add Category</Text>
               </TouchableOpacity>
            </View>


              <View style={{padding:15,paddingTop:5}}>
                <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.addItems()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:colors.primaryLight,borderRadius:2,padding:10}}>
                     <Text style={{color:'white',fontSize:18}}>Save</Text>
                </TouchableOpacity>
             </View>
            <View style={{padding:40}}></View>
       </View>

        <AlertPro
          ref={ref => {
            this.AlertPro = ref;
          }}
          showCancel={false}
          onConfirm={() => this.AlertPro.close()}
          title={this.state.notificationTitle}
          message={this.state.notificationMessage}
          textCancel="Cancel"
          textConfirm="Ok"
          customStyles={{
            mask: {
              backgroundColor: "transparent"
            },
            title:{
              color:'#e060a8',
              fontSize:25,

            },
            message: {
                color:'blue',
                 fontSize:20,
             },
            container: {
              shadowColor: "#000000",
              shadowOpacity: 0.1,
              shadowRadius: 10,
              textClor:'#e060a8'
            },
         
            buttonConfirm: {
              backgroundColor: "#e060a8"
            }
          }}
        />
      </ScrollView>
    );
  }
}
 

const mapStateToProps = state => ({...state.app})

const mapDisptachToProps = dispatch => {
  return {
    pageRefersh: (data) => dispatch({type: SET_PAGE_REFERSH, data}),
    setHeaderRightIconShow: (data) => dispatch({type: SET_RIGHT_ICON_SHOW, data}),
        SET_SELECTED_CATEGORIES: (data) => dispatch({type: SELECTED_CATEGORIES, data}),
    SET_BACK_SCREEN: (data) => dispatch({type: SET_BACK_SCREEN, data}),

  }
}
export default connect(mapStateToProps, mapDisptachToProps)(ItemsnewScreen)
 

 

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
    fontSize: 16,
    marginBottom:5,
    color: colors.primary,
  },
  required:{
    color:'red',
    marginLeft:15,
    fontSize: 20,
  },
  itemText: {
    color: colors.primary,
    fontFamily: fonts.primary,
  },
  itemImage: {
    height: 35,
  },
  inputs:{
    height:40,
    flex:1,
    color:colors.primaryLight,
    padding:10,
    borderWidth:.5,
    borderRadius:2,
    borderColor:colors.primaryLight,
},
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:4,
    borderBottomWidth: 1,
    width:'100%',
    height:60,
    marginBottom:5,
    flexDirection: 'row',
    alignItems:'center'
},
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
     
    color: colors.primaryLight,
    paddingLeft: 40, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    top:-6,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: colors.primaryLight,
    marginLeft:40,
  },
});