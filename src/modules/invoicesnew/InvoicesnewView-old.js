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
import { SET_PAGE_REFERSH,SET_RIGHT_ICON_SHOW } from '../AppState';
  
 let uri='';
 let uploadUrl='';


 const settings = {
   uri,
    uploadUrl,
   data: {
    // extra fields to send in the multipart payload
  }
};

var items = [
  //name key is must.It is to show the text in front
  { id: 1, name: 'angellist' },
  { id: 2, name: 'codepen' },
  { id: 3, name: 'envelope' },
  { id: 4, name: 'etsy' },
  { id: 5, name: 'facebook' },
  { id: 6, name: 'foursquare' },
  { id: 7, name: 'github-alt' },
  { id: 8, name: 'github' },
  { id: 9, name: 'gitlab' },
  { id: 10, name: 'instagram' },
];

 class InvoicesnewScreen extends Component {
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
          serverData: [],
    };
   }
 

 
 

 async componentDidMount() {
          fetch('https://aboutreact.herokuapp.com/demosearchables.php',{method: 'POST'})
      .then(response => response.json())
      .then(responseJson => {
        //Successful response from the API Call
        this.setState({
          serverData: [...this.state.serverData, ...responseJson.results],
          //adding the new data in Data Source of the SearchableDropdown
        });
      })
      .catch(error => {
        console.error(error);
      });

       var expenses_categories=  await this.getExpensesCategories();
       this.setState({ expenses_categories:expenses_categories })
       this.setState({company_id:this.props.userInfo.company_id})
       this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.setHeaderRightIconShow(false);
       });
   }


   async  getExpensesCategories() {
    console.log(CONSTANTS.ALL_EXPENSES_CATEGORY_DROPDOWN_API+'/?company_id='+this.props.userInfo.company_id);
          try {
            let response = await fetch(
              CONSTANTS.ALL_EXPENSES_CATEGORY_DROPDOWN_API+'/?company_id='+this.props.userInfo.company_id,{method: 'POST'}
            );
             let json = await response.json();
             console.log(json.data);
             return json.data;
          } catch (error) {
            console.error(error);
          }
     }
   


  componentWillUnmount() {
    this._unsubscribe();
  }
 

  async  addExpensesApiCall() {
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
          console.error(error);
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
           if(user.responseCode !=200){
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
                      Add Invoice
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

        <View style={{ flex: 1, marginTop: 30 }}>
        <Text style={{ marginLeft: 10 }}>
          Searchable Dropdown from Static Array
        </Text>
        <SearchableDropdown
          onTextChange={text => console.log(text)}
          //On text change listner on the searchable input
          onItemSelect={item => alert(JSON.stringify(item))}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '60%',
          }}
          items={items}
          //mapping of item array
          defaultIndex={2}
          //default selected item index
          placeholder="placeholder"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
        <Text style={{ marginLeft: 10 }}>
          Searchable Dropdown from Dynamic Array from Server
        </Text>
        <SearchableDropdown
          onTextChange={text => console.log(text)}
          //On text change listner on the searchable input
          onItemSelect={item => alert(JSON.stringify(item))}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '50%',
          }}
          items={this.state.serverData}
          //mapping of item array
          defaultIndex={2}
          //default selected item index
          placeholder="placeholder"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
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

       <RNPickerSelect
             placeholder={{
              label: 'Select Expense Category',
              value: null,
              color: 'red',
            }}
               style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 20,
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
export default connect(mapStateToProps, mapDisptachToProps)(InvoicesnewScreen)
 

 

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