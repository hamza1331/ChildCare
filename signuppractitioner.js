import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,AppRegistry,TextInput,Picker,CheckBox,ActivityIndicator,KeyboardAvoidingView,ScrollView} from 'react-native';
import {Header,Button} from 'react-native-elements'
import firebase from './firbaseconf'
export default class Signuppract extends React.Component {

  constructor(props){
    super(props);
    this.state={
        pageStage:"1",
        sendingdata:false,
        email:"",
        firstname:"",
        lastname:"",
        postcode1:"",
        postcode2:"",
        postcode3:"",
        region:"",
        password:"",
        contactnumber:"",
        dbsnumber:"",
        dbsissuedate:"",
        dbsexpirydate:"",
        payment:"",
        ageofchild:"",
        qualification:"",
        additionalqualification:""
    }
    
  }
  
  signupfunc(){
    this.setState({sendingdata:true})
    firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
    .then(()=>{
      console.log("user create!!!!");
    }).catch((error)=>{
      console.log("Faild to create user",error);
    });
    firebase.database().ref('practitioner/').push(
      {
        email:this.state.email,
        first_name:this.state.firstname,
        last_name:this.state.lastname,
        post_code_1:this.state.postcode1,
        post_code_2:this.state.postcode2,
        post_code_3:this.state.postcode3,
        region:this.state.region,
        dbs_number:this.state.dbsnumber,
        dbs_issue_date:this.state.dbsissuedate,
        dbs_expiry_date:this.state.dbsexpirydate,
        contact_number:this.state.contactnumber,
        age_of_child:this.state.ageofchild,
        payment_hour:this.state.payment,
        qualification:this.state.qualification,
        additionalqualification:this.state.additionalqualification
      }
    ).then(()=>{
      console.log("inserted!!!!");
      this.setState({sendingdata:false})
    }).catch((error)=>{
      console.log("Filed");
      this.setState({sendingdata:false})

    });
  }
  

  changePagestate=(stage)=>{
      this.setState({pageStage:stage});
  }

  checkRender(){
    if(this.state.sendingdata){
      return(
        <ActivityIndicator size="large"></ActivityIndicator>
      );
    }
      if(this.state.pageStage==="1"){
          //This will return firstpage
          return(
                <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
                
                  <Header backgroundColor="#fac1b8" centerComponent={{text:'Childcare', style:{color:'#fff',fontSize:20} }}
                   placement="center"></Header>
                   <View style={{margin:10}}></View>
                   <ScrollView  style={{width:"100%"}}>
               
                    <TextInput style={styles.entries} placeholder="First Name" placeholderTextColor="#80635E"
                     onChangeText={(firstname)=>this.setState({firstname})}></TextInput>
                    <TextInput style={styles.entries} placeholder="Last Name" placeholderTextColor="#80635E"
                     onChangeText={(lastname)=>this.setState({lastname})}></TextInput>
                    <TextInput style={styles.entries} placeholder="Email" placeholderTextColor="#80635E"
                     onChangeText={(email)=>this.setState({email})}></TextInput>
                    <TextInput style={styles.entries} placeholder="Password" placeholderTextColor="#80635E" secureTextEntry={true}
                     onChangeText={(password)=>this.setState({password})}></TextInput>
                    <TextInput style={styles.entries} keyboardType={"number-pad"} placeholder="Contact Number" placeholderTextColor="#80635E"
                     onChangeText={(contactnumber)=>this.setState({contactnumber})}></TextInput>
                    <Text style={{width:"86%",margin:"4%"}}>
                        You should have upto date disclosure and barring certificate inorder to create account.
                    </Text>
                    <View style={{ flexDirection: 'column'}}>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox />
                                <Text >I have disclosure and barring certificate</Text>
                        </View>
                    </View>
                    <TextInput style={styles.entries} placeholder="DBS Number" placeholderTextColor="#80635E"
                     onChangeText={(dbsnumber)=>this.setState({dbsnumber})}></TextInput>
                    <TextInput style={styles.entries} placeholder="DBS Issue Date" placeholderTextColor="#80635E"
                     onChangeText={(dbsissuedate)=>this.setState({dbsissuedate})}></TextInput>
                    <TextInput style={styles.entries} placeholder="DBS Expiry Date" placeholderTextColor="#80635E"
                     onChangeText={(dbsexpirydate)=>this.setState({dbsexpirydate})}></TextInput>
                   <View style={{ height: 50 }} />
                   
                  </ScrollView>
                  <View style={{ flexDirection: 'column',marginTop:"2%"}}>
                        <View style={{ flexDirection: 'row' }}>
                        <Button buttonStyle={{backgroundColor: 'black',borderRadius:50,marginRight:20}} onPress={() => this.setState({pageStage:"1"})} ></Button>     
                        <Button buttonStyle={{backgroundColor: 'black',borderRadius:50}} onPress={() => this.setState({pageStage:"2"})} ></Button>     
                        </View>
                    </View>
                    
                    </KeyboardAvoidingView>
        );
      }
      else{
          return(
            <KeyboardAvoidingView style={styles.container}  behavior={"padding"}>
            <Header backgroundColor="#fac1b8" centerComponent={{text:'Childcare', style:{color:'#fff',fontSize:20} }}
             placement="center"></Header>
             <View style={{margin:10}}></View>
             <ScrollView style={{width:"100%"}}>
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
              <TextInput style={styles.entries} placeholder="1st Post Code" placeholderTextColor="#80635E"
                onChangeText={(postcode1)=>this.setState({postcode1})}></TextInput>
              <TextInput style={styles.entries} placeholder="2nd Post Code" placeholderTextColor="#80635E"
                 onChangeText={(postcode2)=>this.setState({postcode2})} ></TextInput>
              <TextInput style={styles.entries} placeholder="3rd Post Code" placeholderTextColor="#80635E" 
                  onChangeText={(postcode3)=>this.setState({postcode3})}></TextInput>
              <TextInput style={styles.entries} placeholder="Payment Per Hour" placeholderTextColor="#80635E"
              onChangeText={(payment)=>this.setState({payment})}></TextInput>
            
              <TextInput style={styles.entries} placeholder="Age Of Child" placeholderTextColor="#80635E"
              onChangeText={(ageofchild)=>this.setState({ageofchild})}></TextInput>
              <TextInput style={styles.entries} placeholder="Qualification" placeholderTextColor="#80635E"
              onChangeText={(qualification)=>this.setState({qualification})}></TextInput>
              <TextInput style={styles.entries} placeholder="Additional Qualification" placeholderTextColor="#80635E"
              onChangeText={(additionalqualification)=>this.setState({additionalqualification})}></TextInput>
                   <TextInput style={styles.entries} placeholder="Additional Qualification" placeholderTextColor="#80635E"
              onChangeText={(additionalqualification)=>this.setState({additionalqualification})}></TextInput>
              </ScrollView>
              <View style={{ flexDirection: 'column',marginTop:"2%"}}>
                  <View style={{ flexDirection: 'row' }}>
                  <Button buttonStyle={{backgroundColor: 'black',borderRadius:50,marginRight:20}} onPress={() => this.setState({pageStage:"1"})} ></Button>     
                  <Button buttonStyle={{backgroundColor: 'black',borderRadius:50}} onPress={() => this.setState({pageStage:"2"})} ></Button>     
                  </View>
              </View>
              <TouchableOpacity style={styles.signupbtn}  onPress={this.signupfunc.bind(this)}>
                    <Text style={{color:"#fff",fontSize:20}}>Signup</Text>
              </TouchableOpacity>
              </KeyboardAvoidingView>
          );
      }
  }



  render() {
    const logoimg=require('./assets/childcare.png')
   
   return(
       this.checkRender()
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center'
 
    
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
    margin:"6%"
  },
  pickers:{
    borderWidth:3,
    borderColor:"#80635E",
    paddingLeft:8,
    width: "100%",
    borderRadius:8,
    marginTop:"3%",
    padding:0
  }

});


AppRegistry.registerComponent('Signuppract',()=>Signuppract)