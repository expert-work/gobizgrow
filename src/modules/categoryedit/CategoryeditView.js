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
import { SET_PAGE_REFERSH,SET_RIGHT_ICON_SHOW } from '../AppState';
import i18n from '../../translations';
import NetInfo from "@react-native-community/netinfo";



 class CategoryeditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
          name:this.props.editData.name,
          description:this.props.editData.description,
          auth_token:this.props.editData.auth_token,
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
   }
  componentWillUnmount() {
    this._unsubscribe();
  }
 

  async  updateCategoryApiCall() {
    NetInfo.fetch().then(async(state) => {
      if(state.isConnected) {
        try {
          console.log(this.state);
           formData = new FormData();
           formData.append('name',this.state.name); 
           formData.append('description',this.state.description);  
           formData.append('company_id',this.state.company_id); 
           formData.append('auth_token',this.state.auth_token); 


           let response = await fetch(
            CONSTANTS.UPDATE_CATEGORY_API,
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
    });
  }



  async updateCategory(){
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
           var user=  await this.updateCategoryApiCall();
           this.setState({isDisabled:false})
           console.log(user)
           if(user && user.responseCode !=200){
            var data=user.data
              var err='';
                  if (typeof data.name != "undefined" && typeof data.name[0] != "undefined") { err=err+' '+data.name[0];}
                   this.setState({
                    notificationTitle:'Some error occured',
                    notificationMessage:err
                  })
                  this.AlertPro.open()
            }else if (user) {
               this.props.pageRefersh('refresh');
               this.setState({
                    name:'',
                    description:'',
               })
               this.props.pageRefersh('refresh');
               this.props.navigation.navigate('Items')
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
                      Edit Category
                    </Text>
                 </View>
                 <View style={{flax:1,width: '10%'}} >
                 <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.updateCategory()} >
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
                <TextInput value={this.state.name}  style={styles.inputs} onChangeText={(name) => this.setState({name:name})}  />
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
                <TouchableOpacity disabled={this.state.isDisabled}  onPress={() => this.updateCategory()}  style={{justifyContent:"center",alignItems:'center',backgroundColor:colors.primaryLight,borderRadius:2,padding:10}}>
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
export default connect(mapStateToProps, mapDisptachToProps)(CategoryeditScreen)
 

 

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