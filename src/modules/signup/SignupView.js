import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AlertPro from "react-native-alert-pro";

import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Button,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight,
  Alert
   
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CONSTANTS from '../constants';
import AsyncStorage from '@react-native-community/async-storage';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import { SET_USER_INFO } from '../AppState';
import i18n from '../../translations';
import NetInfo from "@react-native-community/netinfo";
import { connect } from 'react-redux';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


class SignupScreen extends React.Component {

    constructor(props) {
      super(props);
    }
   
    state = {
        email   : '',
        password: '',
        name: '',
        industry: '',
        industries:[],
        notificationTitle:'',
        notificationMessage:'',
        isDisabled:false,
    }


    async componentDidMount() {
      this.checkIsLogin()
     var industries=  await this.getIndustries();
     this.setState({ industries:industries })
    }


    checkIsLogin = async () => {
                  var value = await AsyncStorage.getItem('isLogin')
                  if(typeof value != "undefined" && value=='1'){
                       this.props.navigation.navigate('Home')
                  }
    }

   async  getIndustries() {
    let netState = await NetInfo.fetch();
    if (netState.isConnected) {
      try {
        let response = await fetch(
          CONSTANTS.INDUSTRIES_API,{method: 'POST'}
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
   

  async  registerUserApiCall() {
    let netState = await NetInfo.fetch();
    if (netState.isConnected) {
      try {
        console.log(this.state);
        formData = new FormData();
        formData.append('name',this.state.name);  
        formData.append('password',this.state.password);  
        formData.append('email',this.state.email);  
        formData.append('industry',this.state.industry);  
        let response = await fetch(
          CONSTANTS.REGISTER_API,
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

   

async registerUser(){
       this.setState({isDisabled:true})
       var user=  await this.registerUserApiCall();
       this.setState({isDisabled:false})
       if(user && user.responseCode !=200){
        var data=user.data
          var err='';
              if (typeof data.email != "undefined" && typeof data.email[0] != "undefined") { err=err+' '+data.email[0];}
              if (typeof data.name != "undefined" && typeof data.name[0] != "undefined") { err=err+' '+data.name[0];}
              if (typeof data.industry != "undefined" && typeof data.industry[0] != "undefined") { err=err+' '+data.industry[0];}
              if (typeof data.password != "undefined" && typeof data.password[0] != "undefined") { err=err+' '+data.password[0];}
              this.setState({
                notificationTitle:'Some error occured',
                notificationMessage:err
              })
              this.AlertPro.open()
        }else if (user) {
          await this.loginSuccessfull(user.data);
       }
}
    

async loginSuccessfull (data){
      await AsyncStorage.setItem('isLogin', '1')
      await AsyncStorage.setItem('userData', JSON.stringify(data))
      await AsyncStorage.setItem('auth_token', data.auth_token)
      this.props.login(data)
      this.props.navigation.navigate('Home')
}


 render() {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.section}>
      
          <Image source={{uri: 'http://app.gobizgrow.com/assets/pages/img/login/login-invert.png'}} style={{width: 250, height: 48,marginBottom:10}} />
          <Text size={20} white style={{marginBottom:10, marginTop:10, fontWeight:"900"}}>
              
          </Text>
          <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios/48/000000/user.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Name"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({name:name})}/>
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios/32/000000/new-message.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email:email})}/>
        </View>

        <View style={styles.inputContainer}>
          <RNPickerSelect
             placeholder={{
              label: 'Select Your Industry',
              value: null,
              color: 'red',
            }}
               style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 25,
                left: 10,
              },
              placeholder: {
                color: 'gray',
                fontSize: 16,
                paddingLeft:60,
                fontWeight: 'bold',
              },
            }}

            onValueChange={(industry) => this.setState({industry:industry})}
            items= {this.state.industries}

            Icon={() => {
              return (
                <View
                  style={{
                    backgroundColor: 'transparent',
                    borderTopWidth: 10,
                    borderTopColor: 'gray',
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
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios/64/000000/key.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password:password})}/>
        </View>

        <TouchableOpacity disabled={this.state.isDisabled} onPress={() => this.registerUser()} underlayColor="white" style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
       
       <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}  underlayColor="white" >
        <Text style={{color:'white', fontSize:16}}>Already have account? Login now</Text>
        </TouchableOpacity>

        
     
 
</View>
      </ImageBackground>


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

      </KeyboardAvoidingView>
  );
}
   }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    width:width,
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    width:width,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
     alignContent:"center",
    justifyContent:"center",
    width:"100%",
    borderRadius: 4,
    borderWidth: 2,
    padding:15,
     margin:5,
    borderColor: 'white',
    backgroundColor: '#e060a8'
   },
  buttonText: {
    textAlign:"center",
    fontSize:24,
    fontWeight:"900",
    color: 'white'
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
inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
},
inputIcon:{
  width:30,
  height:30,
  marginLeft:15,
  justifyContent: 'center'
},
buttonContainer: {
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  width:250,
  borderRadius:30,
},
loginButton: {
  backgroundColor: "#00b5ec",
},
loginText: {
  color: 'white',
}
});


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 20,
    paddingHorizontal: 10,
     borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    width:'100%',
    textAlign:'center',
     alignContent:"center",
    justifyContent:"center",
    paddingLeft: 60, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 10,
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
     textAlign:'center',
     alignContent:"center",
    justifyContent:"center",
    borderRadius: 8,
    width:width-100,

    color: 'black',
    marginLeft:60, // to ensure the text is never behind the icon
  },
});

const mapStateToProps = state => ({ ...state })

const mapDisptachToProps = dispatch => {
  return {
    login: (data) => dispatch({type: SET_USER_INFO, data})
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(SignupScreen)