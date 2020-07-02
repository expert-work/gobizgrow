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
import { SET_PAGE_REFERSH,SET_RIGHT_ICON_SHOW ,SET_ITEMS_INVOICES} from '../AppState';
  
 let uri='';
 let uploadUrl='';


 const settings = {
   uri,
    uploadUrl,
   data: {
    // extra fields to send in the multipart payload
  }
};
 

 class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
          company_id:'',
          notificationTitle:'',      
          notificationMessage:'',
          name:this.props.editData.name,
          price:this.props.editData.price,
          description:this.props.editData.description,
          id:this.props.editData.id,
          isDisabled:false,
          categories:[],
          quantity:this.props.editData.quantity?this.props.editData.quantity:'1',
     };
   }
 

  

 async componentDidMount() {
 
  this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.setHeaderRightIconShow(false);
       });
      
       this.setState({company_id:this.props.userInfo.company_id})

       
       

     
   }





   
 
  



  componentWillUnmount() {
    this._unsubscribe();
  }
 

 

isNumericNumber(number){
      const re = /^[0-9\b]+$/;
      if (number !== '' && re.test(number)) {
        return number
     }
     return ''
}

isDecimalNumber(number){
     const re = /^[0-9]*\.?[0-9]*$/;
     if (number !== '' && re.test(number)) {
        return number
     }
     return ''
}

onchangeQuantity(quantity){
  var quantity= this.isNumericNumber(quantity)
  this.setState({quantity:quantity})
}
onchangePrice(price){
    var price= this.isDecimalNumber(price)
    this.setState({price:price})
}


 
    
  addItemsInLIst(){
    var item={
        unique_id:this.makeid(10),
        name:this.state.name,
        price:this.state.price,
        id:this.state.id,
        quantity:this.state.quantity,
        description:this.state.description,
    }
    var total=this.state.price*this.state.quantity
    if(total.toString()!='0'){
       if(this.props.editData.unique_id){
              var ItemInInvoice=[]
               this.props.ItemInInvoice.map((oldItems, index) => {
                      if(this.props.editData.unique_id !=oldItems.unique_id){
                        ItemInInvoice.push(oldItems)
                      }else{
                       ItemInInvoice.push(item)
                      }           
                })
       }else{
           ItemInInvoice=this.props.ItemInInvoice
           ItemInInvoice.push(item)
       }

    }

    this.props.setItemInvoices(ItemInInvoice)
    this.props.navigation.navigate(this.props.backScreen)

    } 


removeItemFromList(){
 var ItemInInvoice=[]
     this.props.ItemInInvoice.map((item, index) => {
            if(this.props.editData.unique_id !=item.unique_id){
              ItemInInvoice.push(item)
            }            
      })
    this.props.setItemInvoices(ItemInInvoice)
    this.props.navigation.navigate(this.props.backScreen)
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
    render() {

    return (
      <ScrollView style={styles.container}>
        <View style={{flax:1,flexDirection: 'row',alignItems: 'center',
    justifyContent: 'space-around',borderBottomWidth:1,borderColor:colors.primaryLight}} >
           <View style={{flax:1,width: '90%',padding:15}} >
                    <Text style={{'color':colors.primaryLight,fontSize:18,fontWeight:'600' }}>
                      Item
                    </Text>
                 </View>
                 <View style={{flax:1,width: '10%'}} >
                 <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.addItemsInLIst()} >
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

        
          <View style={{padding:15,paddingTop:3,flex:1,flexDirection: 'row'}}>
              <View style={{width:'50%',paddingRight:10}}>
                  <Text style={styles.text}>
                    Quantity
                  </Text>
                  <TextInput keyboardType='numeric' value={this.state.quantity}  style={styles.inputs}   onChangeText={(quantity) => this.onchangeQuantity(quantity)}  />
              </View>
              <View style={{width:'50%',paddingLeft:10}}>
                  <Text style={styles.text}>
                    Price
                  </Text>
                <TextInput keyboardType='numeric' value={this.state.price}  style={styles.inputs} onChangeText={(price) => this.onchangePrice(price)}  />
              </View>
           </View>

       
  


            <View style={{margin:15,padding:15,paddingTop:3,borderWidth:1,borderColor:colors.primaryLight}}>
                     <View style={{padding:15,paddingTop:15,paddingBottom:5,flex:1,flexDirection: 'row', borderBottomWidth:1,borderBottomColor:colors.primaryLight}}>
                          <View style={{width:'50%',paddingRight:10}}>
                              <Text style={styles.text}>
                              {this.state.quantity} x $ {this.state.price}
                              </Text>
                           </View>
                          <View style={{width:'50%',paddingLeft:10}}>
                              <Text style={styles.text,{textAlign:'right'}}>
                                ${ (this.state.quantity)*  (this.state.price)}
                              </Text>
                           </View>
                       </View>

                       <View style={{padding:15,paddingTop:15,paddingBottom:0,flex:1,flexDirection: 'row'}}>
                          <View style={{width:'50%',paddingRight:10}}>
                              <Text style={styles.text}>
                              Amount
                              </Text>
                           </View>
                          <View style={{width:'50%',paddingLeft:10}}>
                              <Text style={styles.text,{textAlign:'right'}}>
                                ${ (this.state.quantity)*  (this.state.price)}
                              </Text>
                           </View>
                       </View>


            </View>

            <View style={{padding:15,paddingTop:3}}>
               <Text style={styles.text}>
                 Description(Optional)
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






              <View style={{padding:15,paddingTop:5}}>
                <TouchableOpacity  onPress={() => this.addItemsInLIst()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:colors.primaryLight,borderRadius:2,padding:10}}>
                     <Text style={{color:'white',fontSize:18}}>Save</Text>
                </TouchableOpacity>
               {(this.props.editData.unique_id) &&(

                <TouchableOpacity  onPress={() => this.removeItemFromList()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:'red',borderRadius:2,marginTop:10,padding:10}}>
                     <Text style={{color:'white',fontSize:18}}>Remove</Text>
                </TouchableOpacity>

               )}





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
    setItemInvoices: (data) => dispatch({type: SET_ITEMS_INVOICES, data})

  }
}
export default connect(mapStateToProps, mapDisptachToProps)(ItemDetail)
 

 

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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    borderRadius: 4,
    color: colors.primaryLight,
    paddingLeft: 40, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: colors.primaryLight,
    borderRadius: 8,
    color: colors.primaryLight,
    paddingLeft: 40, // to ensure the text is never behind the icon
  },
});