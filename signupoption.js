import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,AppRegistry,Image,TextInput,Button} from 'react-native';

export default class Signupotp extends React.Component {

  constructor(props){
    super(props);
    
    
  }

  

  gotoParent=()=>{
    this.props.navigation.navigate('PARENTSIGNUP')
  }

  gotoPractitioner=()=>{
    this.props.navigation.navigate('PRACTITIONERSIGNUP')
  }
  render() {
    const logoimg=require('./assets/childcare.png')
    return (
    <View style={styles.container}>
      <Image source={logoimg} style={{width:"50%",height:"20%",marginTop:"4%"}}></Image>
      <Text style={{fontSize:40,color:"#fac1b8",marginTop:"2%"}}>Sign up</Text>
      <Text style={{fontSize:40,color:"#fac1b8",marginTop:"2%",marginBottom:30}}>as</Text>    
      <TouchableOpacity style={styles.loginbtn}  onPress={this.gotoParent}>
        <Text style={{color:"#000000",fontSize:20}}>Parent</Text>
      </TouchableOpacity>
      <View style={styles.linestyle}></View>


      <TouchableOpacity style={styles.loginbtn}  onPress={this.gotoPractitioner}>
        <Text style={{color:"#000000",fontSize:20}}>Practitioner</Text>
      </TouchableOpacity>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',

    
  },
  loginbox:{
    borderWidth:3,
    borderColor:"#fac1b8",
    fontSize:20,
    paddingLeft:8,
    width: "63%",
    borderRadius:7,
    marginBottom:18,
    paddingTop:4,
    paddingBottom:4
  },
  loginbtn:{
  backgroundColor:"#fac1b8",

    backgroundColor:"#fac1b8",
    width:"63%",
    alignItems: 'center',
    padding:10,
    borderRadius:6

  },
  linestyle:{
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width:"100%",
    marginBottom:10,
    marginTop:10

}

});


AppRegistry.registerComponent('Signupotp',()=>Signupotp)
