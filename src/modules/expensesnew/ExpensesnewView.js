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
import { SET_PAGE_REFERSH,SET_RIGHT_ICON_SHOW } from '../AppState';
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

 class ExpensesnewScreen extends Component {
  constructor() {
    super();
    this.state = {
          company_id:'',
          notificationTitle:'',      
          notificationMessage:'',
          expense_date:'',
          amount:'',
          notes:'',
          expense_category_id:'',
          isDisabled:false,
          expenses_categories:[],
    };
   }
 

 
 

 async componentDidMount() {
       var expenses_categories=  await this.getExpensesCategories();
       this.setState({ expenses_categories:expenses_categories })
       this.setState({company_id:this.props.userInfo.company_id})
       this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.setHeaderRightIconShow(false);
       });
   }


   async  getExpensesCategories() {
    let netState = await NetInfo.fetch();
    if (netState.isConnected) {
      console.log(CONSTANTS.ALL_EXPENSES_CATEGORY_DROPDOWN_API+'/?company_id='+this.props.userInfo.company_id);
      try {
        let response = await fetch(
          CONSTANTS.ALL_EXPENSES_CATEGORY_DROPDOWN_API+'/?company_id='+this.props.userInfo.company_id,{method: 'POST'}
        );
          let json = await response.json();
          console.log(json.data);
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
   


  componentWillUnmount() {
    this._unsubscribe();
  }
 

  async  addExpensesApiCall() {
    let netState = await NetInfo.fetch();
    if (netState.isConnected) {
      try {
        console.log(this.state);
         formData = new FormData();
         formData.append('expense_date',this.state.expense_date); 
         formData.append('amount',this.state.amount); 
         formData.append('notes',this.state.notes); 
         formData.append('expense_category_id',this.state.expense_category_id); 

         formData.append('company_id',this.state.company_id); 

         let response = await fetch(
          CONSTANTS.ADD_EXPENSE_API,
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



  async addExpenses(){
    try {
            if(this.state.expense_date==''){
                    this.setState({
                      notificationTitle:'',
                      notificationMessage:'Please select expense date'
                    })
                    this.AlertPro.open()
                    return false;
            }

            if(this.state.amount==''){
                    this.setState({
                      notificationTitle:'',
                      notificationMessage:'Please enter  amount'
                    })
                    this.AlertPro.open()
                    return false;
            }             

          
            if(this.state.expense_category_id==''){
                    this.setState({
                      notificationTitle:'',
                      notificationMessage:'Please select a Category '
                    })
                    this.AlertPro.open()
                    return false;
            }  
 



           this.setState({isDisabled:true})
           var user=  await this.addExpensesApiCall();
           this.setState({isDisabled:false})
           console.log(user)
           if(user && user.responseCode !=200){
            var data=user.data
              var err='';
                  if (typeof data.expense_date != "undefined" && typeof data.expense_date[0] != "undefined") { err=err+' please select an expense  date ';}
                   this.setState({
                    notificationTitle:'Some error occured',
                    notificationMessage:err
                  })

                if (typeof data.amount != "undefined" && typeof data.amount[0] != "undefined") { err=err+' Please enter an  amount ';}
                   this.setState({
                    notificationTitle:'Some error occured',
                    notificationMessage:err
                  })

                if (typeof data.expense_category_id != "undefined" && typeof data.expense_category_id[0] != "undefined") { err=err+'Expense category is required ';}
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
               this.props.navigation.navigate('Expenses')
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
                      Add Expense
                    </Text>
                 </View>
                 <View style={{flax:1,width: '10%'}} >
                 <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.addExpenses()} >
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
                  Expense Date
                  <Text style={styles.required}>*</Text>
                </Text>
                    <DatePicker
                        style={{width: '100%',color:colors.primary, borderColor:colors.primary}}
                        date={this.state.expense_date} //initial date from state
                        mode="date" //The enum of date, datetime and time
                        placeholder="select date"
                        format="DD-MM-YYYY"
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
                        onDateChange={(expense_date) => {this.setState({expense_date: expense_date})}}
                      />

             </View>

          <View style={{padding:15,paddingTop:3}}>
               <Text style={styles.text}>
                  Amount
                  <Text style={styles.required}>*</Text>
                </Text>
                <TextInput value={this.state.amount}  style={styles.inputs} onChangeText={(amount) => this.setState({amount:amount})}  />
            </View>
      
            <View style={{padding:15,paddingTop:3}}>
               <Text style={styles.text}>
                 Category
                </Text>
      <View style={{ borderColor: colors.primaryLight,borderWidth: 1,borderRadius:2,height:40}}> 

             <RNPickerSelect
                   placeholder={{
                    label: 'Select Expense Category',
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

                  onValueChange={(expense_category_id) => this.setState({expense_category_id:expense_category_id})}
                  items= {this.state.expenses_categories}

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
              <View style={{padding:15,paddingTop:5}}>
                <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.addExpenses()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:colors.primaryLight,borderRadius:2,padding:10}}>
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
    setHeaderRightIconShow: (data) => dispatch({type: SET_RIGHT_ICON_SHOW, data})
  }
}
export default connect(mapStateToProps, mapDisptachToProps)(ExpensesnewScreen)
 

 

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