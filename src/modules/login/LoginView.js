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
import AsyncStorage from '@react-native-community/async-storage';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import CONSTANTS from '../constants';
import { connect } from 'react-redux';
import { SET_USER_INFO } from '../AppState';



var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class LoginScreen extends React.Component {
    state = {
        email   : '',
        password: '',
    }

    constructor(props) {
      super(props);
    }
   



    async componentDidMount() {
      this.checkIsLogin()
     }

    checkIsLogin = async () => {
                  var value = await AsyncStorage.getItem('isLogin')
                  if(typeof value != "undefined" && value=='1'){
                       this.props.navigation.navigate('Home')
                  }
    }


  async  loginUserApiCall() {
        try {
          console.log(this.state);
           formData = new FormData();
           formData.append('password',this.state.password);  
           formData.append('email',this.state.email);  
           let response = await fetch(
            CONSTANTS.LOGIN_API,
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

 

async loginUser(){
       this.setState({isDisabled:true})
       var user=  await this.loginUserApiCall();
       this.setState({isDisabled:false})
       if(user.responseCode !=200){
        var data=user.data
          var err='';
              if (typeof data.email != "undefined" && typeof data.email[0] != "undefined") { err=err+' '+data.email[0];}
              this.setState({
                notificationTitle:'Some error occured',
                notificationMessage:err
              })
              this.AlertPro.open()
        }else{
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
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios/32/000000/new-message.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email:email})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios/64/000000/key.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password:password})}/>
        </View>

        <TouchableOpacity  disabled={this.state.isDisabled}  onPress={() => this.loginUser()} underlayColor="white" style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={() => this.props.navigation.navigate('Forgotpassword')}  underlayColor="white" style={{marginTop:20}} >
        <Text style={{color:'white', fontSize:16}}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}  underlayColor="white" >
        <Text style={{color:'white', fontSize:16}}>Don't have account? Register now</Text>
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

const mapStateToProps = state => ({ ...state })

const mapDisptachToProps = dispatch => {
  return {
    login: (data) => dispatch({type: SET_USER_INFO, data})
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(LoginScreen)