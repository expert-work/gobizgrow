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
  TouchableOpacity
} from 'react-native';
import AlertPro from "react-native-alert-pro";
import CONSTANTS from '../constants';

//import all the components we are going to use.
 import SearchBar from 'react-native-search-bar';
//import SearchBar from "react-native-dynamic-search-bar";
import { connect } from 'react-redux';
import { SET_USER_INFO } from '../AppState';
import { colors, fonts } from '../../styles';
const saveIcon = require('../../../assets/images/save.png');
import { SET_CUSTOMERS_REFERSH,SET_RIGHT_ICON_SHOW } from '../AppState';
import i18n from '../../translations';
import NetInfo from "@react-native-community/netinfo";


 class CustomereditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
          name:this.props.customerEditData.name,
          email:this.props.customerEditData.email,
          phone:this.props.customerEditData.phone,
          street_address:this.props.customerEditData.street_address,
          city:this.props.customerEditData.city,
          state:this.props.customerEditData.state,
          zip_code:this.props.customerEditData.zip_code,
          customer_notes:this.props.customerEditData.customer_notes,
          auth_token:this.props.customerEditData.auth_token,
          company_id:'',
          notificationTitle:'',      
          notificationMessage:'',
          isDisabled:false,
    };
   }
 


 


  componentDidMount() {
       this.setState({company_id:this.props.userInfo.company_id})
       this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.setHeaderRightIconShow(false);
       });

       console.log(this.props.customerEditData);
   }
  componentWillUnmount() {
    this._unsubscribe();
  }
 

  async  addCustomerApiCall() {
    let netState = await NetInfo.fetch();
    if (netState.isConnected) {
      try {
        console.log(this.state);
         formData = new FormData();
         formData.append('name',this.state.name); 
         formData.append('email',this.state.email); 
         formData.append('phone',this.state.phone); 
         formData.append('street_address',this.state.street_address); 
         formData.append('city',this.state.city); 
         formData.append('state',this.state.state); 
         formData.append('zip_code',this.state.zip_code); 
         formData.append('customer_notes',this.state.customer_notes); 
         formData.append('company_id',this.state.company_id); 
         console.log(CONSTANTS.UPDATE_CUSTOMERS_API+'/'+this.state.auth_token)
         let response = await fetch(
          CONSTANTS.UPDATE_CUSTOMERS_API+'/'+this.state.auth_token,
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
          return json;
      } catch (error) {
        Alert.alert("", i18n.translations.server_connect_error)
      }
    } else {
      Alert.alert("", i18n.translations.network_err_msg)
    }
  }



  async addCustomer(){
    try {
            if(this.state.name==''){
                    this.setState({
                      notificationTitle:'',
                      notificationMessage:'Please enter customer name'
                    })
                    this.AlertPro.open()
                    return false;
            }
            if(this.state.email==''){
                    this.setState({
                      notificationTitle:'',
                      notificationMessage:'Please enter customer email'
                    })
                    this.AlertPro.open()
                    return false;
            }

           if(!this.validateEmail(this.state.email)){
                    this.setState({
                      notificationTitle:'',
                      notificationMessage:'Please enter  a valid email'
                    })
                    this.AlertPro.open()
                    return false;
            }
            if(this.state.phone==''){
                    this.setState({
                      notificationTitle:'',
                      notificationMessage:'Please enter customer phone'
                    })
                    this.AlertPro.open()
                    return false;
            }

           this.setState({isDisabled:true})
           var user=  await this.addCustomerApiCall();
           this.setState({isDisabled:false})
           console.log(user)
           if(user && user.responseCode !=200){
            var data=user.data
              var err='';
                  if (typeof data.email != "undefined" && typeof data.email[0] != "undefined") { err=err+' '+data.email[0];}
                  if (typeof data.phone != "undefined" && typeof data.phone[0] != "undefined") { err=err+' '+data.phone[0];}
                  this.setState({
                    notificationTitle:'Some error occured',
                    notificationMessage:err
                  })
                  this.AlertPro.open()
            }else if (user) {
               this.props.customersRefersh('refresh');
               this.setState({
                    name:'',
                    email:'',
                    phone:'',
                    street_address:'',
                    city:'',
                    state:'',
                    zip_code:'',
                    customer_notes:'',
               })
               this.props.customersRefersh('refresh');
               this.props.navigation.navigate('Customers')
            }
        } catch (error) {
          console.error(error);
        }

    //this.setState({'isDisabled':true})
  }

  validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
 }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{flax:1,flexDirection: 'row',alignItems: 'center',
    justifyContent: 'space-around',borderBottomWidth:1,borderColor:colors.primaryLight}} >
           <View style={{flax:1,width: '90%',padding:15}} >
                    <Text style={{'color':colors.primaryLight,fontSize:18,fontWeight:'600' }}>
                      Edit Customer
                    </Text>
                 </View>
                 <View style={{flax:1,width: '10%'}} >
                 <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.addCustomer()} >
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
                  Customer Name  
                  <Text style={styles.required}>*</Text>
                </Text>
                <TextInput value={this.state.name}  style={styles.inputs} onChangeText={(name) => this.setState({name:name})}  />
            </View>
            <View style={{padding:15,paddingTop:3}}>
               <Text style={styles.text}>
                  Email Address
                  <Text style={styles.required}>*</Text>
                </Text>
                <TextInput   value={this.state.email}  style={styles.inputs}   onChangeText={(email) => this.setState({email:email})}  />
            </View>
            <View style={{padding:15,paddingTop:3}}>
               <Text style={styles.text}>
                  Phone Number
                  <Text style={styles.required}>*</Text>
                </Text>
                <TextInput  value={this.state.phone}   style={styles.inputs}    onChangeText={(phone) => this.setState({phone:phone})}  />
            </View>
            <View style={{padding:15,paddingTop:3}}>
               <Text style={styles.text}>
                  Street Address
                </Text>
                <TextInput  value={this.state.street_address}  style={styles.inputs}    onChangeText={(street_address) => this.setState({street_address:street_address})}  />
            </View>

            <View style={{padding:15,paddingTop:3}}>
               <Text style={styles.text}>
                  City
                </Text>
                <TextInput  value={this.state.city}    style={styles.inputs} onChangeText={(city) => this.setState({city:city})}   />
            </View>

            <View style={{padding:15,paddingTop:3,flex:1,flexDirection: 'row'}}>
              <View style={{width:'50%',paddingRight:10}}>
                  <Text style={styles.text}>
                    State
                  </Text>
                  <TextInput  value={this.state.state}  style={styles.inputs}   onChangeText={(state) => this.setState({state:state})}  />
              </View>
              <View style={{width:'50%',paddingLeft:10}}>
                  <Text style={styles.text}>
                    Zip Code
                  </Text>
                  <TextInput   value={this.state.zip_code} style={styles.inputs}    onChangeText={(zip_code) => this.setState({zip_code:zip_code})}  />
              </View>
            </View>
            <View style={{padding:15,paddingTop:3}}>
               <Text style={styles.text}>
                 Customer Note
                </Text>
                <TextInput multiline={true} numberOfLines={4}
                          value={this.state.customer_notes} 
                          onChangeText={(customer_notes) => this.setState({customer_notes:customer_notes})}
                           style={{borderWidth:1,height:60,color:colors.primary,
                          padding:10,
                          borderWidth:.5,
                          borderRadius:2,
                          borderColor:colors.primary}}   />
             </View>
            <View style={{padding:15,paddingTop:5}}>
                <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.addCustomer()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:colors.primaryLight,borderRadius:2,padding:10}}>
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
    customersRefersh: (data) => dispatch({type: SET_CUSTOMERS_REFERSH, data}),
    setHeaderRightIconShow: (data) => dispatch({type: SET_RIGHT_ICON_SHOW, data})
  }
}
export default connect(mapStateToProps, mapDisptachToProps)(CustomereditScreen)
 

 

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
    borderColor: colors.primaryLight,
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
    height:36,
    flex:1,
    color:colors.primary,
    padding:10,
    borderWidth:.5,
    borderRadius:2,
    borderColor:colors.primary,
},
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});