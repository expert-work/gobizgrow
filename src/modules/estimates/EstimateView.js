//This is an example of React Native
//Pagination to Load More Data dynamically - Infinite List
import React, { Component } from 'react';
//import react in our code.
import {
  View,
  Text,
  Alert,
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image 
} from 'react-native';
//import all the components we are going to use.
import CONSTANTS from '../constants';

 import SearchBar from 'react-native-search-bar';
//import SearchBar from "react-native-dynamic-search-bar";
import { connect } from 'react-redux';
import { SET_PAGE_REFERSH,SET_RIGHT_ICON_SHOW,SET_EDIT_DATA,SET_ITEMS_INVOICES } from '../AppState';
import { colors, fonts } from '../../styles';
const nextIcon = require('../../../assets/images/next.png');


 class EstimateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isListEnd: false,
      //Loading state used while loading the data for the first time
      serverData: [],
      //Data Source for the FlatList
      fetching_from_server: false,
      //Loading state used while loading more data
      q:'',
      offset:1
    };
     //Index of the offset to load from web API
  }
  componentDidMount() {
       this._unsubscribe = this.props.navigation.addListener('focus', () => {
                this.props.setHeaderRightIconShow('Add Estimate');
                this.props.setItemEstimates([]);
                if(this.props.isPageRefersh=='refresh'){
                  this.props.pageRefersh('');
                   this.refreshData();
                 }
    });
    this.loadMoreData();
  }
  
  refreshData(q=''){
       this.setState({q:q})
         this.setState({
            offset:1,
            loading: false,
            isListEnd: false,
            serverData: [],
            fetching_from_server: false
        })
         setTimeout(this.loadMoreData,500)
   }

  editEstimate(data){
    var ItemInInvoice=[]
    data.items.map((item, index) => {
                  var item={
                  unique_id:this.makeid(10),
                  name:item.name,
                  price:item.price.toString(),
                  id:item.id,
                  quantity:item.quantity.toString(),
                  description:'',
              }
       ItemInInvoice.push(item)
    })
   this.props.setItemEstimates(ItemInInvoice);
    // console.log(data);
     this.props.editData(data);

     this.props.navigation.navigate('Edit Estimate')
    // Alert.alert(this.props.customerEditId)
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


  loadMoreData = () => {
    if (!this.state.fetching_from_server && !this.state.isListEnd) {
      //On click of Load More button We will call the web API again
      this.setState({ fetching_from_server: true }, () => {
        console.log(CONSTANTS.ALL_ESTIMATES_API+'?page=' + this.state.offset+'&company_id='+this.props.userInfo.company_id+'&q='+this.state.q)
        fetch(CONSTANTS.ALL_ESTIMATES_API+'?page=' + this.state.offset+'&company_id='+this.props.userInfo.company_id+'&q='+this.state.q)
          //Sending the currect offset with get request
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.data.data.length > 0) {
              //Successful response from the API Call
              this.state.offset = this.state.offset + 1;
              //After the response increasing the offset for the next API call.
              this.setState({
                serverData: [...this.state.serverData, ...responseJson.data.data],
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
            console.error(error);
          });
      });
    }
  };
  renderFooter() {
    return (
      <View style={styles.footer}>
        {this.state.fetching_from_server ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  }

 
 

  
  componentWillUnmount() {
    this._unsubscribe();
  }


  render() {
        const { searchQuery } = this.state;
      return (
      <View style={styles.container}>
      <View style={{paddingLeft:10, paddingRight:10}}>
       <SearchBar
          fontColor="blue"
          iconColor="#c6c6c6"
          shadowColor="white"
          backgroundColor="none"
          borderColor="blue"
          placeholder="Search here"
          onChangeText={(val) => this.refreshData(val)}
          onSearchButtonPress={(val) => this.refreshData(val)}
          onCancelButtonPress={(val) => this.refreshData(val)}

        />
               </View> 
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
 
          <FlatList
            style={{ width: '100%' }}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.serverData}
            onEndReached={() => this.loadMoreData()}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                 <View style={{flax:1,width: '70%',padding:10,paddingLeft:30}} >
                    <Text style={styles.text,{'color':colors.primaryLight,fontSize:18,fontWeight:'800' }}>
                    {item.estimate_number.toUpperCase()}
                    </Text>
                    <Text style={styles.text,{color:'black'}}>
                     {item.customer_name}
                     </Text>
                 </View>
                  <View style={{flax:1,width: '30%', paddingRight:10,justifyContent:'space-between',  contentAlign:'right'}} >
                    <TouchableOpacity  onPress={() => this.editEstimate(item)} >
                       <Image

                        resizeMode="contain"
                        source={nextIcon}
                       />
                  </TouchableOpacity>
                  <Text style={styles.text,{color:'black'}}>
                     {item.total} USD
                     </Text>

                  </View>
              </View>
            )}
            ListFooterComponent={this.renderFooter.bind(this)}
            //Adding Load More button as footer component
          />
         )}
      </View>
    );
  }
}
 
const mapStateToProps = state => ({...state.app})
const mapDisptachToProps = dispatch => {
  return {
     setHeaderRightIconShow: (data) => dispatch({type: SET_RIGHT_ICON_SHOW, data}),
         editData: (data) => dispatch({type: SET_EDIT_DATA, data}),
        setItemEstimates: (data) => dispatch({type: SET_ITEMS_INVOICES, data}),
        pageRefersh: (data) => dispatch({type: SET_PAGE_REFERSH, data}),


  }
}



export default connect(mapStateToProps, mapDisptachToProps)(EstimateScreen)
 

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
    fontSize: 15,
    color: 'black',
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