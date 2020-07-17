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
import SearchableDropdown from 'react-native-searchable-dropdown';

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
import { SET_PAGE_REFERSH,SET_RIGHT_ICON_SHOW,SET_ITEMS_INVOICES,SET_BACK_SCREEN,SET_EDIT_DATA} from '../AppState';
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
 

 class EstimateseditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
          company_id:'',
          notificationTitle:'',      
          notificationMessage:'',
           
          estimate_number:this.props.editData.estimate_number,
          notes:this.props.editData.notes,
          customer_id:this.props.editData.customer_id,
          estimate_date:this.props.editData.estimate_date,
          due_date:this.props.editData.due_date,
          isDisabled:false,
          customers: [],
          ItemInInvoice:[],
          discount_val:this.props.editData.discount_val.toString(),
          sub_total:this.props.editData.sub_total,
          total:this.props.editData.total,
          discount_type:this.props.editData.discount_type,
          discount:this.props.editData.discount.toString(),
          auth_token:this.props.editData.auth_token,
          status:this.props.editData.status,
          id:this.props.editData.id,
          status_update_type:'',
          discountTypes:[
                { label: '$', value: 'Fixed' },
                { label: '%', value: 'Percentage' },
             ]
    };


  

   }
 

 
 

 async componentDidMount() {
     // this.props.setItemEstimates([])


      this.props.setBackScreen('Edit Estimate')
    
        //this.setState({'estimate_date':date,due_date:date})
    

     // var ItemInInvoice=[]
     // this.props.editData.items.map((item, index) => {
     //           ItemInInvoice.push(item)
     //           console.log('-----------setState-----------------')
     //           console.log(item);
     //           console.log('----------enf------------------')
     //   })
     // this.setState({ItemInInvoice:ItemInInvoice})

console.log(this.state)
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.setState({ItemInInvoice:this.props.ItemInInvoice})

          console.log('-----------setState-----------------')
          console.log(this.props.ItemInInvoice);
          console.log('----------enf------------------')

     
                var sub_total=0;
                this.props.ItemInInvoice.map((arr, index) => {
                  sub_total=sub_total + parseFloat(arr.price*arr.quantity);
                })
                this.setState({sub_total:sub_total})

                      discount=this.state.discount
                      discount_type=this.state.discount_type
                      this.setState({discount:discount})
                      var discount_val=0;
                         
                        if(discount_type=='Fixed'){ 
                           discount_val=discount;
                        }
                        if(discount_type=='Percentage'){ 
                          discount_val=(sub_total * discount)/100
                        }
                      this.setState({total:sub_total-discount_val,discount_val:discount_val})
                this.props.setHeaderRightIconShow(false);
       });

       var customers=  await this.getCustomers();
       this.setState({ customers:customers })
       this.setState({company_id:this.props.userInfo.company_id})
   }

  async  getCustomers() {
    let netState = await NetInfo.fetch();
    if (netState.isConnected) {
      console.log(CONSTANTS.ALL_CUSTOMERS_DROPDOWN_API+'/?company_id='+this.props.userInfo.company_id);
      try {
        let response = await fetch(
          CONSTANTS.ALL_CUSTOMERS_DROPDOWN_API+'/?company_id='+this.props.userInfo.company_id,{method: 'POST'}
        );
          let json = await response.json();
                
          return json.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    } else {
      Alert.alert("", i18n.translations.network_err_msg)
      return [];
    }
    
  }
    

  isDecimalNumber(number){
       const re = /^[0-9]*\.?[0-9]*$/;
       if (number !== '' && re.test(number)) {
          return number
       }
       return ''
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
 
  editSelectedItem(item){
             this.props.editItemData(item);
             console.log(item)
            this.props.navigation.navigate('Item Detail')
          // Alert.alert(this.props.customerEditId)
 
  }


  setDiscount(discount){
    discount=this.isDecimalNumber(discount)
    this.setState({discount:discount})
      var discount_val=0;
         var sub_total =  this.state.sub_total;
        
        if(this.state.discount_type=='Fixed'){ 
           discount_val=discount;
        }
        if(this.state.discount_type=='Percentage'){ 
          discount_val=(sub_total * discount)/100
        }
        

       if(sub_total<discount_val){
            discount_val=0
           this.setState({discount:''})
            this.setState({
                      notificationTitle:'',
                      notificationMessage:'Discount must be less then sub total'
                    })
                    this.AlertPro.open()

        }
     this.setState({total:sub_total-discount_val,discount_val:discount_val})
  }
setDiscountType(discount_type){
      this.setState({discount_type:discount_type})

      discount=this.state.discount
    this.setState({discount:discount})
      var discount_val=0;
         var sub_total =  this.state.sub_total;
        
        if(discount_type=='Fixed'){ 
           discount_val=discount;
        }
        if(discount_type=='Percentage'){ 
          discount_val=(sub_total * discount)/100
        }
        

       if(sub_total<discount_val){
           this.setState({discount:''})
            this.setState({
                      notificationTitle:'',
                      notificationMessage:'Discount must be less then sub total'
                    })
                    this.AlertPro.open()
        discount_val=0;
        }
     this.setState({total:sub_total-discount_val,discount_val:discount_val})
}


 




 
submitAlertPrompt  = async() =>  {
       let url='';
      if(this.state.status_update_type=='CONVERT_TO_INVOICE'){  url=CONSTANTS.CONVERT_TO_INVOICE_API }
      if(this.state.status_update_type=='MARK_AS_SENT'){  url= CONSTANTS.MARK_AS_SENT_API }
      if(this.state.status_update_type=='SEND_ESTIMATE'){  url= CONSTANTS.SEND_ESTIMATE_API }
      if(this.state.status_update_type=='MARK_AS_ACCEPTED'){  url= CONSTANTS.MARK_AS_ACCEPTED_API }
      if(this.state.status_update_type=='MARK_AS_REJECTED'){  url= CONSTANTS.MARK_AS_REJECTED_API }
      if(this.state.status_update_type=='DELETE_ESTIMATE'){  url= CONSTANTS.DELETE_ESTIMATE_API }
      this.setState({status_update_type:'',notificationTitle:'', notificationMessage:''})
      this[AlertPro + 'update'].close()
      url= url+'?id='+this.state.id+'&company_id='+this.state.company_id;


         // Alert.alert(this.state.deleteItemId);
          let netState = await NetInfo.fetch();
          if (netState.isConnected) {
            try {
              console.log(this.state);

                this.AlertPro.close()

               formData = new FormData();
               
                  formData.append('id',this.state.id); 
                  formData.append('company_id',this.state.company_id); 
                 let response = await fetch(url,
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
                   this.props.pageRefersh('refresh');
                   this.props.pageRefersh('refresh');
                   this.props.navigation.navigate('Estimates')
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


cancelAlertPromt(){
   this.setState({status_update_type:'',notificationTitle:'', notificationMessage:''})
   this[AlertPro + 'update'].close()

}

isconvertToInvoice(){
   this.setState({status_update_type:'CONVERT_TO_INVOICE',notificationTitle:'Are you sure?', notificationMessage:'Convert to Invoice'})
   this[AlertPro + 'update'].open()
}

ismarkAsSent(){
   this.setState({status_update_type:'MARK_AS_SENT',notificationTitle:'Are you sure?', notificationMessage:'Mark as Sent'})
   this[AlertPro + 'update'].open()
}

issendEstimate(){
   this.setState({status_update_type:'SEND_ESTIMATE',notificationTitle:'Are you sure?', notificationMessage:'Send Estimate'})
   this[AlertPro + 'update'].open()
}

ismarkAsAccepted(){
   this.setState({status_update_type:'MARK_AS_ACCEPTED',notificationTitle:'Are you sure?', notificationMessage:'Mark as Accepted'})
   this[AlertPro + 'update'].open()
}

ismarkAsRejected(){
   this.setState({status_update_type:'MARK_AS_REJECTED',notificationTitle:'Are you sure?', notificationMessage:'Mark as rejected'})
   this[AlertPro + 'update'].open()
}

isdeleteEstimate(){
   this.setState({status_update_type:'DELETE_ESTIMATE',notificationTitle:'Are you sure?', notificationMessage:'Delete'})
   this[AlertPro + 'update'].open()
}






  async  editEstimateApiCall() {
    let netState = await NetInfo.fetch();
    if (netState.isConnected) {
      try {
        console.log(this.state);
         formData = new FormData();
         formData.append('estimate_date',this.state.estimate_date); 
         formData.append('due_date',this.state.due_date); 
         formData.append('estimate_number',this.state.estimate_number); 
         formData.append('sub_total',this.state.sub_total);
         formData.append('discount',this.state.discount);
         formData.append('discount_type',this.state.discount_type);
         formData.append('total',this.state.total);
         formData.append('items', JSON.stringify(this.state.ItemInInvoice));
         formData.append('company_id',this.state.company_id); 
         formData.append('discount_val',this.state.discount_val); 
         formData.append('auth_token',this.state.auth_token); 
         formData.append('notes',this.state.notes); 


         formData.append('customer_id',this.state.customer_id); 

         let response = await fetch(
          CONSTANTS.UPDATE_ESTIMATE_API,
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

async selectCustomer(customer_id){ this.setState({customer_id:customer_id}) }

addItems(){
this.props.navigation.navigate('Select Item')
}
  async editEstimate(){
    try {

            if(this.state.estimate_date==''){
                    this.setState({
                      notificationTitle:'',
                      notificationMessage:'Please pick estimate date'
                    })
                    this.AlertPro.open()
                    return false;
            }

            if(this.state.due_date==''){
                    this.setState({
                      notificationTitle:'',
                      notificationMessage:'Please pick due date'
                    })
                    this.AlertPro.open()
                    return false;
            }             

            if(this.state.estimate_number==''){
                    this.setState({
                      notificationTitle:'',
                      notificationMessage:'Please enter estimate number'
                    })
                    this.AlertPro.open()
                    return false;
            }             

          
            if(this.state.customer_id==''){
                    this.setState({
                      notificationTitle:'',
                      notificationMessage:'Please select a Customer '
                    })
                    this.AlertPro.open()
                    return false;
            }  
             if(!this.state.ItemInInvoice.length ){
                    this.setState({
                      notificationTitle:'',
                      notificationMessage:'Please select an Item '
                    })
                    this.AlertPro.open()
                    return false;
            }  



           this.setState({isDisabled:true})
           var user=  await this.editEstimateApiCall();
           this.setState({isDisabled:false})
           console.log(user)
           if(user && user.responseCode !=200){
            var data=user.data
              var err='';
                  if (typeof data.estimate_date != "undefined" && typeof data.estimate_date[0] != "undefined") { err=err+' please pick estimate date ';}
                   this.setState({
                    notificationTitle:'Some error occured',
                    notificationMessage:err
                  })

                if (typeof data.due_date != "undefined" && typeof data.due_date[0] != "undefined") { err=err+' Please pick a due date ';}
                   this.setState({
                    notificationTitle:'Some error occured',
                    notificationMessage:err
                  })

                if (typeof data.estimate_number != "undefined" && typeof data.estimate_number[0] != "undefined") { err=err+' please enter estimate number ';}
                   this.setState({
                    notificationTitle:'Some error occured',
                    notificationMessage:err
                  })

                  this.AlertPro.open()


                  if (typeof data.customer_id != "undefined" && typeof data.customer_id[0] != "undefined") { err=err+' Please select a customer ';}
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
               this.props.navigation.navigate('Estimates')
               


            }
        } catch (error) {
          console.error(error);
        }

    //this.setState({'isDisabled':true})
  }

    render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{flax:1,flexDirection: 'row',alignItems: 'center',
    justifyContent: 'space-around',borderBottomWidth:1,borderColor:colors.primaryLight}} >
           <View style={{flax:1,width: '90%',padding:15}} >
                    <Text style={{'color':colors.primaryLight,fontSize:18,fontWeight:'600' }}>
                      Edit Estimate
                    </Text>
                 </View>
                 <View style={{flax:1,width: '10%'}} >
                 <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.editEstimate()} >
                       <Image
                        resizeMode="contain"
                        source={saveIcon}
                       />
                </TouchableOpacity>
                </View>
        </View>

  
       <View style={{paddingTop:30}}>
             <View style={{padding:15,paddingTop:3,flex:1,flexDirection: 'row'}}>
              <View style={{width:'50%',paddingRight:10}}>
                  <Text style={styles.text}>
                    Estimate Date
                  </Text>
                  <DatePicker
                        style={{width: '100%',color:colors.primary, borderColor:colors.primary}}
                        date={this.state.estimate_date} //initial date from state
                        mode="date" //The enum of date, datetime and time
                        placeholder="select date"
                        format="DD/MM/YYYY"
                        minDate="01-01-2020"
                        maxDate="01-01-2030"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            right: 0,
                            top: 4,
                            marginLeft: 0
                          },
                          dateText:{
                            color:colors.primaryLight
                          },
                          dateInput:{
                            borderColor:colors.primaryLight
                          }
                        }}
                         onDateChange={(estimate_date) => {this.setState({estimate_date: estimate_date})}}
                      />
               </View>
              <View style={{width:'50%',paddingLeft:10}}>
                  <Text style={styles.text}>
                    Due Date
                  </Text>
                  <DatePicker
                        style={{width: '100%',color:colors.primary, borderColor:colors.primary}}
                        date={this.state.due_date} //initial date from state
                        mode="date" //The enum of date, datetime and time
                        placeholder="select date"
                        format="DD/MM/YYYY"
                        minDate="01-01-2020"
                        maxDate="01-01-2030"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            right: 0,
                            top: 4,
                            marginLeft: 0
                          },
                          dateText:{
                            color:colors.primaryLight
                          },
                          dateInput:{
                            borderColor:colors.primaryLight
                          }
                                                 }}
                        onDateChange={(due_date) => {this.setState({due_date: due_date})}}
                      />
               </View>
            </View>


             <View style={{padding:15,paddingTop:3}}>
               <Text style={styles.text}>
                  Estimate Number
                  <Text style={styles.required}>*</Text>
                </Text>
                <TextInput value={this.state.estimate_number}  style={styles.inputs} onChangeText={(estimate_number) => this.setState({estimate_number:estimate_number})}  />
            </View>


            <View style={{padding:15,paddingTop:3}}> 
            <Text style={styles.text}>
                  Customer
                  <Text style={styles.required}>*</Text>
            </Text>
          <View style={{ borderColor: colors.primaryLight,borderWidth: 1,borderRadius:2,height:40}}> 
                  <RNPickerSelect
                     placeholder={{
                      label: 'Select a Customer',
                      value: null,
                      color: 'red',
                    }}
                       style={{
                      ...pickerSelectStyles,
                      iconContainer: {
                        top: 15,
                        left: 10,
                      },
                      placeholder: {
                        color: colors.primaryLight,
                        fontSize: 16,
                        paddingLeft:60,
                       },
                    }}
                   value={this.state.customer_id}
                    onValueChange={(customer_id) => this.selectCustomer(customer_id)}
                    items= {this.state.customers}

                    Icon={() => {
                      return (
                        <View
                          style={{
                            backgroundColor: 'transparent',
                            borderTopWidth: 10,
                            borderTopColor: colors.primaryLight,
                            borderRightWidth: 10,
                            borderRightColor: 'transparent',
                            borderLeftWidth: 10,
                            borderLeftColor: 'transparent',
                            width: 0,
                            height: 0,
                           }}
                        />
                      );
                    }}
                />
            </View>
          </View>
       
          <View style={{padding:15,paddingTop:3}}>
               <Text style={styles.text}>
                  Items
                  <Text style={styles.required}>*</Text>
                </Text>
             </View>
            <View style={{marginLeft:15,marginRight:15,paddingTop:0,paddingBottom:0,flex:1,backgroundColor:'#F8F8FF'}}>

                 {this.state.ItemInInvoice.map((arr, index) => {

                     return(
                      <View style={{padding:15,paddingTop:10,paddingBottom:10,flex:1,flexDirection: 'row'}}>
                           <TouchableOpacity  onPress={() => this.editSelectedItem(arr)}  style={{width:'50%',paddingRight:10}}>
                              <Text style={{ fontWeight:'800', fontSize:18, color:colors.primaryLight}}>
                                 {arr.name}
                              </Text>
                              <Text style={styles.text}>
                                 {arr.description}
                              </Text>
                              <Text style={styles.text}>
                                 {arr.quantity} x ${arr.price}
                              </Text>
                           </TouchableOpacity>
                          <TouchableOpacity onPress={() => this.editSelectedItem(arr)}   style={{width:'50%',paddingLeft:10}}>
                              <Text style={{textAlign:'right',marginRight:20, fontWeight:'800', fontSize:18, color:colors.primaryLight}}>
                                 $ {arr.price * arr.quantity}
                              </Text>
                           </TouchableOpacity>
                        </View>
                    )
                })}

      {this.state.ItemInInvoice.length  ? (
         <View>
            <View style={{padding:15,paddingTop:10,paddingBottom:10,flex:1,flexDirection: 'row',borderTopWidth:1,borderColor:colors.primaryLight}}>
                   <View style={{width:'50%',paddingRight:10}}>
                      <Text style={{ fontWeight:'600', fontSize:16, color:colors.primaryLight}}>
                                 SUBTOTAL
                              </Text>
                            
                           </View>
                          <View style={{width:'50%',paddingLeft:10}}>
                              <Text style={{textAlign:'right',marginRight:20, fontWeight:'600', fontSize:16, color:colors.primaryLight}}>
                                 $ {this.state.sub_total}
                              </Text>
                           </View>
            </View>
            <View style={{padding:15,paddingTop:10,paddingBottom:10,flex:1,flexDirection: 'row'}}>
                   <View style={{width:'50%',paddingRight:10}}>
                      <Text style={{ fontWeight:'600', fontSize:16, color:colors.primaryLight}}>
                                 DISCOUNT
                              </Text>
                            
                           </View>
                           <View style={{width:'50%',paddingLeft:10}}>
                                  <View style={{flex:1,flexDirection: 'row'}}>
                                           <View style={{width:'50%',paddingRight:10}}>
                                                <TextInput value={this.state.discount}  style={styles.inputs} onChangeText={(discount) => this.setDiscount(discount)}  />
                                            </View>  
                                            <View style={{width:'50%',paddingLeft:10}}>
                                               <View style={{ borderColor: colors.primaryLight,borderWidth: 1,borderRadius:2,height:40}}>
                                                    <RNPickerSelect
                                                             placeholder={{
                                                              label: '',
                                                              value: null,
                                                              color: 'red',
                                                            }}
                                                               style={{
                                                              ...pickerDiscountSelectStyles,
                                                              iconContainer: {
                                                                top: 20,
                                                                paddingLeft: 0,
                                                              },
                                                              placeholder: {
                                                                color: colors.primaryLight,
                                                                fontSize: 16,
                                                                },
                                                            }}
                                                            value={this.state.discount_type}
                                                            onValueChange={(discount_type) => this.setDiscountType(discount_type)}
                                                            items= {this.state.discountTypes}
 
                                                        />  
                                                    </View>    
                                           </View>
                                    </View>
                           </View>
             </View>


                  <View style={{padding:15,paddingTop:10,paddingBottom:20,flex:1,flexDirection: 'row',borderTopWidth:1,borderColor:colors.primaryLight}}>
                   <View style={{width:'50%',paddingRight:10}}>
                      <Text style={{ fontWeight:'800', fontSize:18, color:colors.primary}}>
                                 Total
                              </Text>
                            
                           </View>
                          <View style={{width:'50%',paddingLeft:10}}>
                              <Text style={{textAlign:'right',marginRight:20, fontWeight:'800', fontSize:18, color:colors.primary}}>
                                 $ {this.state.total}
                              </Text>
                           </View>
            </View>

        </View>

      ) : (
        <View></View>
      )}

 


            </View>
            <View style={{padding:15,paddingTop:5}}>
                <TouchableOpacity  onPress={() => this.addItems()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:'white', borderColor:colors.primaryLight,borderWidth:1, borderRadius:2,padding:10}}>
                     <Text style={{color:colors.primaryLight,fontSize:18}}>+ Add Item</Text>
                </TouchableOpacity>
             </View>

             
            <View style={{padding:15,paddingTop:3}}>
               <Text style={styles.text}>
                 Notes
                </Text>
                <TextInput multiline={true} numberOfLines={4}
                          value={this.state.notes} 
                          onChangeText={(notes) => this.setState({notes:notes})}
                           style={{borderWidth:1,height:60,color:colors.primary,
                          padding:10,
                          borderWidth:.5,
                          borderRadius:2,
                          borderColor:colors.primary}}   />
             </View>


              <View style={{padding:15,paddingBottom:2,  paddingTop:10}}>
                <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.isconvertToInvoice()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:colors.primaryLight,borderRadius:2,padding:10}}>
                     <Text style={{color:'white',fontSize:18}}>Convert To Invoice</Text>
                </TouchableOpacity>
             </View>

            { (this.state.status=='DRAFT')  && 
                  <View>
                   <View style={{padding:15,paddingBottom:2,  paddingTop:1}}>
                      <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.ismarkAsSent()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:colors.primaryGradientStart,borderRadius:2,padding:10}}>
                           <Text style={{color:'white',fontSize:18}}>Mark as Sent</Text>
                      </TouchableOpacity>
                   </View>

                   <View style={{padding:15,paddingBottom:2,  paddingTop:1}}>
                      <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.issendEstimate()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:colors.SENT,borderRadius:2,padding:10}}>
                           <Text style={{color:'white',fontSize:18}}>Send Estimate</Text>
                      </TouchableOpacity>
                   </View>
                </View>

            }

            { (this.state.status=='SENT')  && 
                  <View>
                   <View style={{padding:15,paddingBottom:2,  paddingTop:1}}>
                      <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.ismarkAsAccepted()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:colors.ACCEPTED,borderRadius:2,padding:10}}>
                           <Text style={{color:'white',fontSize:18}}>Mark Accepted</Text>
                      </TouchableOpacity>
                   </View>


                    <View style={{padding:15,paddingBottom:2,  paddingTop:1}}>
                      <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.ismarkAsRejected()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:colors.yellow,borderRadius:2,padding:10}}>
                           <Text style={{color:'white',fontSize:18}}>Mark Rejected</Text>
                      </TouchableOpacity>
                   </View>
                </View>

            }


              <View style={{padding:15,paddingBottom:2,  paddingTop:20}}>
                <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.isdeleteEstimate()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:colors.REJECTED,borderRadius:2,padding:10}}>
                     <Text style={{color:'white',fontSize:18}}>Delete</Text>
                </TouchableOpacity>
             </View>

              <View style={{padding:15,paddingBottom:2,  paddingTop:1}}>
                <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.editEstimate()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:colors.primaryLight,borderRadius:2,padding:10}}>
                     <Text style={{color:'white',fontSize:18}}>Save </Text>
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



        <AlertPro
          
          ref={ref => {
                this[AlertPro + 'update'] = ref;
          }}

          onConfirm={() => this.submitAlertPrompt()}
          onCancel={() => this.cancelAlertPromt()}
          title={this.state.notificationTitle}
          message={this.state.notificationMessage}
          textCancel="Cancel"
          textConfirm="Submit"
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



      </ScrollView>
    );
  }
}
 

const mapStateToProps = state => ({...state.app})

const mapDisptachToProps = dispatch => {
  return {
    pageRefersh: (data) => dispatch({type: SET_PAGE_REFERSH, data}),
    setHeaderRightIconShow: (data) => dispatch({type: SET_RIGHT_ICON_SHOW, data}),
    setItemEstimates: (data) => dispatch({type: SET_ITEMS_INVOICES, data}),
    setBackScreen: (data) => dispatch({type: SET_BACK_SCREEN, data}),
    editItemData: (data) => dispatch({type: SET_EDIT_DATA, data}),

  }
}
export default connect(mapStateToProps, mapDisptachToProps)(EstimateseditScreen)
 

 
 

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




 const pickerDiscountSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: colors.primaryLight,
    paddingLeft: 10, // to ensure the text is never behind the icon
  },
  inputAndroid: {
 

   fontSize: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
      textAlign:'center',
     alignContent:"center",
    justifyContent:"center",
    borderRadius: 8,
    width:width-100,
    height:60,
    color: 'black',
    marginLeft:20, // to ensure the text is never behind the icon
    top:-6,
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