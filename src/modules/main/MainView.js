import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Button,
  Dimensions,
  Image
   
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

 
export default function MainScreen(props) {

     // const rnsUrl = 'https://reactnativestarter.com';
  // const handleClick = () => {
  //   Linking.canOpenURL(rnsUrl).then(supported => {
  //     if (supported) {
  //       Linking.openURL(rnsUrl);
  //     } else {
  //       console.log(`Don't know how to open URI: ${rnsUrl}`);
  //     }
  //   });
  // };

  

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.section}>
      
          <Image source={{uri: 'http://app.gobizgrow.com/assets/pages/img/login/login-invert.png'}} style={{width: 250, height: 48,marginBottom:10}} />
          <Text size={18} white style={{marginBottom:20, fontWeight:"900",textAlign:'center'}}>
             Tools You Need to Run Your Business  
          </Text>
        
          

                               <View style={{
                                      flexDirection: 'row',
                                      textAlign: 'left',
                                      fontSize: 15,
                                      backgroundColor:'white',
                                      shadowColor: "#000",
                                      shadowOffset: {
                                      width: 3,
                                      height: 3,
                                      },
                                      shadowOpacity: .4,
                                      shadowRadius: 4.65,
                                      elevation: 6,
                                      borderColor: '#eff0f1',
                                      borderWidth: 0.5,
                                      marginBottom:5
                                  }}>
                                    <View style={{flex:1, paddingLeft:10, paddingRight:5}} >
                                            <Image source={{uri: 'https://crater.misdotdot.com/public/images/bill.png'}} style={{width: 70, height: 70 ,marginTop:5,marginBottom:5}} />
                                     </View>
                                     <View style={{flex:3}}  >
                                           <Text style={{ textAlign: "left",fontSize:16,paddingTop:10 }}>Easily Create Invoices</Text>
                                            <Text style={{ textAlign: "left" ,paddingBottom:24}}>Create easy or comples invoices in under a minute </Text>
                                     </View>
                                  </View>


                                  <View style={{
                                    flexDirection: 'row',
                                    textAlign: 'left',
                                    fontSize: 15,
                                    backgroundColor:'white',
                                    shadowColor: "#000",
                                    shadowOffset: {
                                    width: 3,
                                    height: 3,
                                    },
                                    shadowOpacity: .4,
                                    shadowRadius: 4.65,
                                    elevation: 6,
                                    borderColor: '#eff0f1',
                                    borderWidth: 0.5,
                                    marginBottom:5
                                }}>
                                  <View style={{flex:1, paddingLeft:10, paddingRight:5}} >
                                          <Image source={{uri: 'https://crater.misdotdot.com/public/images/dollar.png'}} style={{width: 70, height: 70 ,marginTop:5,marginBottom:5}} />
                                   </View>
                                   <View style={{flex:3}}  >
                                         <Text style={{ textAlign: "left",fontSize:16,paddingTop:10 }}>Repair Costs & Breakdowns</Text>
                                          <Text style={{ textAlign: "left" ,paddingBottom:10}}>Know exactly how much to chnage for any repair </Text>
                                   </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    textAlign: 'left',
                                    fontSize: 15,
                                    backgroundColor:'white',
                                    shadowColor: "#000",
                                    shadowOffset: {
                                    width: 3,
                                    height: 3,
                                    },
                                    shadowOpacity: .4,
                                    shadowRadius: 4.65,
                                    elevation: 6,
                                    borderColor: '#eff0f1',
                                    borderWidth: 0.5,
                                    marginBottom:5
                                }}>
                                  <View style={{flex:1, paddingLeft:10, paddingRight:5}} >
                                          <Image source={{uri: 'https://crater.misdotdot.com/public/images/question.png'}} style={{width: 70, height: 70 ,marginTop:5,marginBottom:5}} />
                                   </View>
                                   <View style={{flex:3}}  >
                                         <Text style={{ textAlign: "left",fontSize:16,paddingTop:10 }}>Repair Information</Text>
                                          <Text style={{ textAlign: "left" ,paddingBottom:10}}>Detailed repair info with parts breakdown & search </Text>
                                   </View>
                                </View>


                                <View style={{
                                    flexDirection: 'row',
                                    textAlign: 'left',
                                    fontSize: 15,
                                    backgroundColor:'white',
                                    shadowColor: "#000",
                                    shadowOffset: {
                                    width: 3,
                                    height: 3,
                                    },
                                    shadowOpacity: .4,
                                    shadowRadius: 4.65,
                                    elevation: 6,
                                    borderColor: '#eff0f1',
                                    borderWidth: 0.5,
                                    marginBottom:5
                                }}>
                                  <View style={{flex:1, paddingLeft:10, paddingRight:5}} >
                                          <Image source={{uri: 'https://crater.misdotdot.com/public/images/tools.png'}} style={{width: 70, height: 70 ,marginTop:5,marginBottom:5}} />
                                   </View>
                                   <View style={{flex:3}}  >
                                         <Text style={{ textAlign: "left",fontSize:16,paddingTop:10 }}>The Tools You Need</Text>
                                          <Text style={{ textAlign: "left" ,paddingBottom:10}}>All the tools and info you need to run your business</Text>
                                   </View>
                                </View>


 

        <TouchableOpacity   onPress={() => props.navigation.navigate('Login')}  underlayColor="white" style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Signup')} underlayColor="white" style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

 
</View>
      </ImageBackground>
    </View>
  );
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
     margin:2,
    borderColor: 'white',
    backgroundColor: '#e060a8'
   },
  buttonText: {
    textAlign:"center",
    fontSize:24,
    fontWeight:"900",
    color: 'white'
  }
});
