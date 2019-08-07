import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,AppRegistry,Image,TextInput,ActivityIndicator,KeyboardAvoidingView,ScrollView} from 'react-native';
import Loader from './loading'
import firebase from './firbaseconf'
import { NavigationActions, StackActions } from 'react-navigation';

import RNIap, {
  Product,
  ProductPurchase,
  acknowledgePurchaseAndroid,
  purchaseUpdatedListener,
  purchaseErrorListener,
  PurchaseError,
} from 'react-native-iap';

const itemSkus = Platform.select({
  ios: [
    'CCCAPP', 
  ],
  android: [
    'android.test.purchased', 'android.test.canceled', 'android.test.refunded', 'android.test.item_unavailable',
    // 'point_1000', '5000_point', // dooboolab
  ]
});

export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state={
      email:"",
      password:"",
      errorMessage:"",
      authenticating:true
    }
    
  }

 async componentDidMount() {
  
    await RNIap.initConnection().then(res=>console.log('connection....'+res))
    const products = await RNIap.getProducts(itemSkus);
    console.log(products)
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        const parents=firebase.database().ref("parents");
        const mainuserparents=parents.orderByChild("email").equalTo(user.email);
        mainuserparents.on("value",snapshot=> {
          snapshot.forEach(child=>{
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'MAIN',params:{isparent:true} })],
          });
          this.props.navigation.dispatch(resetAction);

          })
        });

        const practitioner=firebase.database().ref("practitioner");
        const mainuserpractitioner=practitioner.orderByChild("email").equalTo(user.email);
        mainuserpractitioner.on("value",snapshot=> {
          snapshot.forEach(child=>{
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'MAIN',params:{isparent:false} })],
          });
          this.props.navigation.dispatch(resetAction);
            

          })
        });
       
      }
      else{
        this.props.navigation.navigate('LOGIN')
        this.setState({authenticating:false})

      }
    
    })
  }
 

  handleLogin = () => {

  }
  loginfunc=()=>{
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.props.navigation.navigate('Main'))
    .catch(error => this.setState({ errorMessage: error.message }))
     
  }

  signupfunc=()=>{
    this.props.navigation.navigate('SIGNUPOPT')
  }
  render() {
    const logoimg=require('./assets/childcare.png')
    const nameimg=require('./assets/name.png')
    if(this.state.authenticating){
      return(
        <ActivityIndicator></ActivityIndicator>
      );
    }
  
    return (
   
      <KeyboardAvoidingView style={styles.container}  behavior={"padding"}>
      <Text style={{fontSize:40,color:"#fac1b8",marginTop:"10%"}}>Login to</Text>
      <Image source={logoimg} style={{width:"60%",height:"25%",marginTop:"4%"}}></Image>
      <Image source={nameimg}  ></Image>
      <Text style={{color:"red"}}>{this.state.errorMessage}</Text>
      <TextInput style={styles.loginbox} placeholder="Email" placeholderTextColor="#000"
      onChangeText={(email)=>this.setState({email})}></TextInput>
      <TextInput  style={styles.loginbox} secureTextEntry={true} placeholder="Password" placeholderTextColor="#000"
      onChangeText={(password)=>this.setState({password})}></TextInput>
    
      <TouchableOpacity style={styles.loginbtn}  onPress={this.loginfunc}>
        <Text style={{color:"#000000",fontSize:20}}>Login</Text>
      </TouchableOpacity>

      <View style={styles.linestyle}></View>

      <TouchableOpacity style={styles.loginbtn}  onPress={this.signupfunc}>
        <Text style={{color:"#000000",fontSize:20}}>Create Account</Text>
      </TouchableOpacity> 
     
      </KeyboardAvoidingView>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#14d1bb',
    backgroundColor:'white',
    alignItems: 'center',
   
  },
  loginbox:{
    borderWidth:3,
    borderColor:"#fac1b8",
    fontSize:20,
    paddingLeft:8,
    width: "100%",
    borderRadius:7,
    marginBottom:18,
    paddingTop:4,
    paddingBottom:4
  },
  loginbtn:{
    backgroundColor:"#fac1b8",
    width:"100%",
    alignItems: 'center',
    padding:10,
    borderRadius:6
 
  },
  linestyle:{
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      width:"100%",
      marginBottom:10,
      marginTop:10

  }
});


AppRegistry.registerComponent('Login',()=>Login)
