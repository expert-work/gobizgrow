//This is an example of React Native
//Pagination to Load More Data dynamically - Infinite List
import React, { Fragment, Component } from 'react';
import ImagePicker from 'react-native-image-picker';

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
  SafeAreaView,
  StatusBar,
  Button,
  Dimensions
} from 'react-native';

 
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

 

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


 class PhotonewScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
                  company_id:'',
          notificationTitle:'',      
          notificationMessage:'',
          isDisabled:true,
            filepath: {
              data: '',
              uri: ''
            },
            fileData: '',
            fileUri: ''
    }

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
 
 
  chooseImage = async() => {
    let options = {
      title: 'Select Image',
           storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        }
        else {

         // console.log(response)
               this.setState({
                  filePath: response,
                  fileData: response.data,
                  fileUri: response.uri,
                  fileType: response.type
              });


            this.uploadFileApi();


      }
    });
  }

  uploadFileApi = async() =>  {

  Alert.alert('eeee');

           formData = new FormData();
           formData.append("file", {
              uri: this.state.fileUri  ,
              type: this.state.fileType,
              name: 'file.jpeg'
            })

            let options={ 
                        headers: {
                          'Accept': 'application/json',
                           'Content-Type': 'multipart/form-data'
                        },
                        method: 'POST',
                        body:formData
                      }

            fetch( CONSTANTS.UPLOADS,options, 5000)
                  .then((result) => {
                      console.log(result);
                       Alert.alert('success')
                  })
                  .catch((e) => {
                       console.log(e);
                       Alert.alert('failed')
                      // handle errors and timeout error
                  })



 // let json = await response.json();
 //     console.log(response.ok);         
 //     console.log(json);         
         
               // if(!this.isJson(response)){
               //  Alert.alert('faild');
               // }

               // let json = await response.json();
               // this.setState({
               //    fileUri:json.data,
               //    isDisabled:false
               // });
  }

 isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


  
  renderFileData() {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={styles.images}
      />
    } else {
      return <Image source={require('./../../../assets/dummy.png')}
        style={styles.images}
      />
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.fileUri }}
        style={styles.images}
      />
    } else {
      return <Image
        source={require('./../../../assets/galeryImages.jpg')}
        style={styles.images}
      />
    }
  }
    render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{flax:1,flexDirection: 'row',alignItems: 'center',
    justifyContent: 'space-around',borderBottomWidth:1,borderColor:colors.primaryLight}} >
           <View style={{flax:1,width: '90%',padding:15}} >
                    <Text style={{'color':colors.primaryLight,fontSize:18,fontWeight:'600' }}>
                      Add Image
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
             <View style={styles.ImageSections}>
                 {this.renderFileUri()}
             </View>
               <TouchableOpacity onPress={this.chooseImage} style={{justifyContent:"center",alignItems:'center',backgroundColor:'white', borderColor:colors.primaryLight,borderWidth:1, borderRadius:2,padding:10}} >
                <Text style={{color:colors.primaryLight,fontSize:18}}>Choose File</Text>
              </TouchableOpacity>
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
export default connect(mapStateToProps, mapDisptachToProps)(PhotonewScreen)
 

 

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

  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: colors.primary,
    borderWidth: 1,
    marginHorizontal: 3
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop:10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom:10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight:'bold'
  }
});