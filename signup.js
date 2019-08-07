import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,AppRegistry,TextInput,ActivityIndicator,Picker,ScrollView,KeyboardAvoidingView} from 'react-native';
import {Header} from 'react-native-elements'
import firebase from './firbaseconf'



export default class Signup extends React.Component {

  constructor(props){
    super(props);
    this.state={
      email:"",
      firstname:"",
      lastname:"",
      postcode1:"",
      postcode2:"",
      postcode3:"",
      region:"",
      password:"",
      sendingdata:false,
      valid:false,
      validationmsg:""
    }
  }

  signupfunc(){
    var firstnamevalid=true;
    var lastnamevalid=true;
    var emailvalid=true;
    var postcode1valid=true;
    var postcode2valid=true;
    var postcode3valid=true;
    var passwordvalid=true;
    var allvalid=false;
    alpha=/^[a-zA-Z]+$/
    mail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    code=/^^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/
    if(this.state.firstname!=='' & this.state.lastname !=='' & this.state.email!='' & this.state.postcode1!=='' & this.state.password!==''){
      if(!alpha.test(this.state.firstname)){
        firstnamevalid=false;
        this.setState({'validationmsg':"First name should contain letters only"})
      }
      if(this.state.password.length<6){
        passwordvalid=false;
        this.setState({'validationmsg':"Password length should be greater then 6"})
      }
      if(!alpha.test(this.state.lastname)){
        lastnamevalid=false;
        this.setState({'validationmsg':"Last name should contain letters only"})
      }
      if(!mail.test(this.state.email)){
        emailvalid=false;
        this.setState({'validationmsg':"Please enter valid email address"})
      }
      if(!code.test(this.state.postcode1)){
        postcode1valid=false;
        this.setState({'validationmsg':"Please enter the valid postcode"})
      }
      if(this.state.postcode2!==''){
        if(!code.test(this.state.postcode2)){
          postcode2valid=false;
          this.setState({'validationmsg':"First name should contain letters only"})
        }
      }
      if(this.state.postcode3!==''){
        if(!code.test(this.state.postcode2)){
          postcode3valid=false;
          this.setState({'validationmsg':"Please enter the valid postcode"})
        }
      }
    }
    else{
      this.setState({valid:false})
      allvalid=false;
      this.setState({'validationmsg':"Please fill all information"})
    }
    if(firstnamevalid & lastnamevalid & passwordvalid & emailvalid & postcode1valid & postcode2valid & postcode3valid){
      this.setState({valid:true})
      allvalid=true;
      this.setState({'validationmsg':""})
    }
    else{
      allvalid=false;
      this.setState({valid:false})
    }
    if(allvalid){
    this.setState({sendingdata:true})
    firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
    .then(()=>{
      console.log("user create!!!!");
    }).catch((error)=>{
      console.log("Faild to create user",error);
    });
    firebase.database().ref('parents/').push(
      {
        email:this.state.email,
        first_name:this.state.firstname,
        last_name:this.state.lastname,
        post_code_1:this.state.postcode1,
        post_code_2:this.state.postcode2,
        post_code_3:this.state.postcode3,
        region:this.state.region
      }
    ).then(()=>{
      console.log("inserted!!!!");
      
      this.setState({sendingdata:false})
    }).catch((error)=>{
      console.log("Filed");
      this.setState({sendingdata:false})

    });
  }
  
  }
  render() {
    const logoimg=require('./assets/childcare.png')
    if(this.state.sendingdata){
      return(
        <ActivityIndicator size="large"></ActivityIndicator>
      );
    }
    return (
    <KeyboardAvoidingView style={styles.container}  behavior={"padding"}>
      <Header backgroundColor="#fac1b8" centerComponent={{text:'Childcare', style:{color:'#fff',fontSize:20} }}
       placement="center"></Header>
       <View style={{margin:10}}>
       {
            !this.state.valid ? (
              <Text style={{backgroundColor:"white",color:"red"}}>{this.state.validationmsg}</Text> 
             ) : null
        }
       </View>
      <ScrollView  style={{width:"100%"}}>

      <TextInput style={styles.entries} placeholder="First Name" placeholderTextColor="#80635E" name="firstname" value={this.state.firstname}
      onChangeText={(firstname)=>this.setState({firstname})}></TextInput>

      <TextInput style={styles.entries} placeholder="Last Name" placeholderTextColor="#80635E" 
      onChangeText={(lastname)=>this.setState({lastname})}></TextInput>

      <TextInput style={styles.entries} placeholder="Email" placeholderTextColor="#80635E"
      onChangeText={(email)=>this.setState({email})}></TextInput>

      <TextInput style={styles.entries} placeholder="Password" placeholderTextColor="#80635E" secureTextEntry={true}
      onChangeText={password=>this.setState({password})}></TextInput>
      <View style={styles.pickers}>
      <Picker  placeholder="Region" placeholderTextColor="#80635E" selectedValue={this.state.region} style={{padding:0}} 
      onValueChange={(itemValue, itemIndex) =>this.setState({region: itemValue})}>
        <Picker.Item label="South East" value="South East" />
        <Picker.Item label="London" value="London" />
        <Picker.Item label="North West" value="North West" />
        <Picker.Item label="East of England" value="East of England" />
        <Picker.Item label="West Midlands" value="West Midlands" />
        <Picker.Item label="South West" value="South West" />
        <Picker.Item label="Yorkshire and the Humber" value="Yorkshire and the Humber" />
        <Picker.Item label="East Midlands" value="East Midlands" />
        <Picker.Item label="North East" value="North East" />
        <Picker.Item label="England" value="England" />
      </Picker>
      </View>
      <Text style={{width:"86%",margin:"1%"}}>
        Only First post code is compulsory rest are optional in case you want babysitters on diffrent locations.
      </Text>
      <TextInput style={styles.entries} placeholder="1st Post Code" placeholderTextColor="#80635E"
      onChangeText={(postcode1)=>this.setState({postcode1})}></TextInput>
      <TextInput style={styles.entries} placeholder="2nd Post Code" placeholderTextColor="#80635E"
      onChangeText={(postcode2)=>this.setState({postcode2})} ></TextInput>
      <TextInput style={styles.entries} placeholder="3rd Post Code" placeholderTextColor="#80635E" 
      onChangeText={(postcode3)=>this.setState({postcode3})}></TextInput>
      </ScrollView>
      <TouchableOpacity style={styles.signupbtn}  onPress={this.signupfunc.bind(this)}>
        <Text style={{color:"#000000",fontSize:20}}>Signup</Text>
      </TouchableOpacity>
      
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    
  },
  pickers:{
    borderWidth:3,
    borderColor:"#80635E",
    paddingLeft:8,
    width: "100%",
    borderRadius:8,
    marginTop:"3%",
    padding:0
  },
  entries:{
    borderWidth:3,
    borderColor:"#80635E",
    fontSize:20,
    paddingLeft:8,
    width: "100%",
    borderRadius:8,
    paddingTop:4,
    paddingBottom:4,
    marginTop:"3%"
  },
  signupbtn:{
    backgroundColor:"#fac1b8",
    width:"86%",
    alignItems: 'center',
    padding:10,
    borderRadius:8,
    margin:6

  }

});


AppRegistry.registerComponent('Signup',()=>Signup)
