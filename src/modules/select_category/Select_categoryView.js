//This is an example of React Native
//Pagination to Load More Data dynamically - Infinite List
import React, { Component } from 'react';
//import react in our code.
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image 
} from 'react-native';
 import CheckBox from '@react-native-community/checkbox';
import AlertPro from "react-native-alert-pro";

//import all the components we are going to use.
import CONSTANTS from '../constants';

 import SearchBar from 'react-native-search-bar';
//import SearchBar from "react-native-dynamic-search-bar";
import { connect } from 'react-redux';
import { SET_PAGE_REFERSH,SET_RIGHT_ICON_SHOW,SET_EDIT_DATA,SELECTED_CATEGORIES,SET_BACK_SCREEN } from '../AppState';
import i18n from '../../translations';
import NetInfo from "@react-native-community/netinfo";
import { colors, fonts } from '../../styles';
const nextIcon = require('../../../assets/images/next.png');
const saveIcon = require('../../../assets/images/save.png');




 class Select_category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isListEnd: false,
      toggleCheckBox:false,
      //Loading state used while loading the data for the first time
             //Data Source for the FlatList
      fetching_from_server: false,
      //Loading state used while loading more data
      q:'',
      name:'',
      description:'',
      company_id:'',
      notificationTitle:'',      
      notificationMessage:'',
      isDisabled:false,
      ALL_CATEGORIES: [],
      SELECTED_CATEGORIES:[],

    };
    this.offset = 1;
    //Index of the offset to load from web API
  }
  componentDidMount() {
       this.setState({company_id:this.props.userInfo.company_id})
       this._unsubscribe = this.props.navigation.addListener('focus', () => {
           this.setState({SELECTED_CATEGORIES:this.props.selected_categories})
                 if(this.props.isPageRefersh=='refresh'){
                  this.props.pageRefersh('');
                  this.refreshData();
                 }
    });
    this.loadMoreData();
  }
  
  refreshData(q=''){
       this.setState({q:q})
        this.offset=1;

        this.setState({
            loading: false,
            isListEnd: false,
            ALL_CATEGORIES: [],
            fetching_from_server: false
        })
        this.loadMoreData();
   }
 
 setToggleCheckBox(status, item){
         let catArr= this.state.SELECTED_CATEGORIES;
         if(status){  
               var cat={
                   id:item.id,
                   name:item.name,
                   price:0
               }
              catArr.push(cat);
              this.setState({SELECTED_CATEGORIES:catArr})
         }else{
               catArr=[]; 
               this.state.SELECTED_CATEGORIES.map((items, index) => {
                      if(items.id != item.id){
                       catArr.push(items) ;
                      }
               })
               this.setState({SELECTED_CATEGORIES:catArr})
         }



  }


 getCategoryCheckBoxValue(id){
    var check=false;
    this.state.SELECTED_CATEGORIES.map((items, index) => {
                      if(items.id == id){
                        check=true;
                      }
               })
       return check;
 }

async  addCategoryApiCall() {
    NetInfo.fetch().then(async(state) => {
      if(state.isConnected) {
        try {
        //  console.log(this.state);
           formData = new FormData();
           formData.append('name',this.state.name); 
           formData.append('description',this.state.description);  
           formData.append('company_id',this.state.company_id); 

           let response = await fetch(
            CONSTANTS.ADD_CATEGORY_API,
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
             this.setState({isDisabled:false})
            if(json && json.responseCode !=200){
            var data=json.data
              var err='';
                  if (typeof data.name != "undefined" && typeof data.name[0] != "undefined") { err=err+' '+data.name[0];}
                   this.setState({
                    notificationTitle:'Some error occured',
                    notificationMessage:err
                  })
                  this.AlertPro.open()
            }else if (json) {
                this.setState({
                    name:'',
                    description:'',
               })
               this.refreshData();
            }


            return json;
        } catch (error) {
          Alert.alert("", i18n.translations.server_connect_error)
        }
      } else {
        Alert.alert("", i18n.translations.network_err_msg)
      }
    });
        
  }



  async addCategory(){
    try {
            if(this.state.name==''){
                    this.setState({
                      notificationTitle:'',
                      notificationMessage:'Please enter Category name'
                    })
                    this.AlertPro.open()
                    return false;
            }
             

           this.setState({isDisabled:true})
           var user=  await this.addCategoryApiCall();          
        } catch (error) {
          console.error(error);
        }
  }



 loadMoreData = () => {
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      //On click of Load More button We will call the web API again
      this.setState({ fetching_from_server: true }, () => {
        NetInfo.fetch().then(state => {
          if(state.isConnected) {
            console.log(CONSTANTS.ALL_CATEGORIES_API+'?page=' + this.offset+'&company_id='+this.props.userInfo.company_id+'&q='+this.state.q)
            fetch(CONSTANTS.ALL_CATEGORIES_API+'?page=' + this.offset+'&company_id='+this.props.userInfo.company_id+'&q='+this.state.q)
              //Sending the currect offset with get request
              .then(response => response.json())
              .then(responseJson => {
                if (responseJson.data.data.length > 0) {
                  //Successful response from the API Call
                  this.offset = this.offset + 1;
                  //After the response increasing the offset for the next API call.
                  this.setState({
                    ALL_CATEGORIES: [...this.state.ALL_CATEGORIES, ...responseJson.data.data],
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

 selectCategories(){
    this.props.SET_SELECTED_CATEGORIES(this.state.SELECTED_CATEGORIES);
    this.props.navigation.navigate(this.props.backScreen)

 }
 

  
  componentWillUnmount() {
    this._unsubscribe();
  }


  render() {
       return (
      <View style={styles.container}>
                  <View style={{flax:1,flexDirection: 'row',alignItems: 'center',
    justifyContent: 'space-around',borderBottomWidth:1,borderColor:colors.primaryLight}} >
           <View style={{flax:1,width: '90%',padding:15}} >
                    <Text style={{'color':colors.primaryLight,fontSize:18,fontWeight:'600' }}>
                      Create new Category
                    </Text>
                 </View>
                 <View style={{flax:1,width: '10%'}} >
                 <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.addCategory()} >
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
                  Category Name  
                  <Text style={styles.required}>*</Text>
                </Text>
                <TextInput value={this.state.name}  style={{ borderWidth:1,borderColor:colors.primaryLight,paddingLeft:15, height:40,color:colors.primary}} onChangeText={(name) => this.setState({name:name})}  />
            </View>
 
            <View style={{padding:15,paddingTop:3}}>
               <Text style={styles.text}>
                 Description
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
                  <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.addCategory()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:colors.primaryLight,borderRadius:2,padding:10}}>
                     <Text style={{color:'white',fontSize:18}}>Add new Category</Text>
                    </TouchableOpacity>         
              </View>
            
       </View>
      <View style={{borderWidth:1,borderColor:colors.primaryLight}} ></View>    


      {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
 
          <FlatList
            style={{ width: '100%',marginTop:10 }}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.ALL_CATEGORIES}
            onEndReached={() => this.loadMoreData()}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                 <View style={{flax:1,width: '85%',padding:10,paddingLeft:30}} >
                    <Text style={styles.text,{'color':colors.primaryLight,fontSize:18,fontWeight:'800' }}>
                       {item.name.toUpperCase()}
                    </Text>
                </View>
                  <View style={{flax:1,width: '15%'}} >
                  <TouchableOpacity>
                  <CheckBox
                      disabled={false}
                      boxType={'square'}
                      value={this.getCategoryCheckBoxValue(item.id)}
                      onValueChange={() => this.getCategoryCheckBoxValue(item.id) ? this.setToggleCheckBox(false,item) : this.setToggleCheckBox(true,item)}
                      />
                  </TouchableOpacity>
                  </View>
              </View>
            )}
            ListFooterComponent={this.renderFooter.bind(this)}
            //Adding Load More button as footer component
          />
         )}
        <View style={{padding:15,paddingTop:5,marginBottom:20}}>
            <TouchableOpacity  onPress={() => this.selectCategories()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:colors.primary,borderRadius:2,padding:10}}>
               <Text style={{color:'white',fontSize:18}}>Select Categories</Text>
              </TouchableOpacity>         
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
    SET_SELECTED_CATEGORIES: (data) => dispatch({type: SELECTED_CATEGORIES, data}),
    SET_BACK_SCREEN: (data) => dispatch({type: SET_BACK_SCREEN, data}),


  }
}



export default connect(mapStateToProps, mapDisptachToProps)(Select_category)
 

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
    inputs:{
    height:40,
    flex:1,
    color:colors.primaryLight,
    padding:10,
    borderWidth:.5,
    borderRadius:2,
    borderColor:colors.primaryLight,
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