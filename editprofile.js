import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,AppRegistry,KeyboardAvoidingView,Image,Picker,ScrollView} from 'react-native';
import {Header} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import Nav from './navbar' 
import firebase from './firbaseconf'
import { TextInput } from 'react-native-gesture-handler';

export default class Editprofile extends React.Component {

  constructor(props){
    super(props);
    this.state={
      user:null,
      gotdata:false,
      isparent:false,
      postcode1:"",
      postcode2:"",
      postcode3:"",
      issuedate:"2016-05-15",
      expirydate:"2016-05-15",
      qualification:"",
      additionalqualification:"",
      contact:"",
      payment:"",
      age:"",
      messsage:"",
      id:"",
      valid:false,
      

    }
  }




  componentWillMount(){
    const { navigation } = this.props;
    const is_parent=navigation.getParam('isparent');
    if(is_parent){
      const post_code_1 = navigation.getParam('post_code_1');
      const post_code_2 = navigation.getParam('post_code_2');
      const post_code_3 = navigation.getParam('post_code_3');
      const id = navigation.getParam('id');
      this.setState({isparent:is_parent})
      this.setState({postcode1:post_code_1})
      this.setState({postcode2:post_code_2})
      this.setState({postcode3:post_code_3})
      this.setState({id:id})
    }
    else{
      const post_code_1 = navigation.getParam('post_code_1');
      const post_code_2 = navigation.getParam('post_code_2');
      const post_code_3 = navigation.getParam('post_code_3');
  
      const id = navigation.getParam('id');
      this.setState({isparent:is_parent})
      this.setState({postcode1:post_code_1})
      this.setState({postcode2:post_code_2})
      this.setState({postcode3:post_code_3})
      this.setState({issuedate: navigation.getParam('dbs_issue_date')})
      this.setState({expirydate: navigation.getParam('dbs_expiry_date')})
      this.setState({qualification: navigation.getParam('qualification')})
      this.setState({additionalqualification: navigation.getParam('additionalqualification')})
      this.setState({age: navigation.getParam('age_of_child')})
      this.setState({payment: navigation.getParam('payment_hour')})
      this.setState({contact: navigation.getParam('contact_number')})
      this.setState({id:id})
    }
   
  }




  editprofile(){
    var allvalid=true
    var messsage=""
    num = /^[0-9\b]+$/;
    dec = /^(\d+\.?\d{0,9}|\.\d{1,9})$/;
    code=/^^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/
    if(this.state.isparent){
      if(this.state.postcode1===""){
        allvalid=false
        messsage="You must provide at least one post code"
      }
      else{
        if(!code.test(this.state.postcode1)){
            allvalid=false
            messsage="Please give valid Post1 code"
         }
      }
  
      if(!code.test(this.state.postcode2) & this.state.postcode2!==""){
        allvalid=false
        messsage="Please give valid Post2 code"
      }
      if(!code.test(this.state.postcode3) & this.state.postcode3!==""){
        allvalid=false
        messsage="Please give valid Post3 code"
      }
      this.setState({messsage:messsage})
      this.setState({valid:allvalid})
      if(allvalid){        
        firebase.database().ref("parents/"+this.state.id).update(
            {
              post_code_1:this.state.postcode1,
              post_code_2:this.state.postcode2,
              post_code_3:this.state.postcode3,
            }
          ).then(()=>{
            alert("Updated successfully");
            
            this.setState({sendingdata:false})
          }).catch((error)=>{
            console.log("Filed");
            this.setState({sendingdata:false})
      
          });
      }
    }
    else{
      if(this.state.postcode1===""){
        allvalid=false
        messsage="You must provide atleast one post code"
      }
      else{
        if(!code.test(this.state.postcode1)){
            allvalid=false
            messsage="Please give valid Post 1 code"
         }
      }
      if(!code.test(this.state.postcode2) & this.state.postcode2!==""){
        allvalid=false
        messsage="Please give valid Post 2 code"
      }
      if(!code.test(this.state.postcode3) & this.state.postcode3!==""){
        allvalid=false
        messsage="Please give valid Post 3 code"
      }
   
      if(!num.test(this.state.age)){
        allvalid=false
        messsage="Plese provide valid data for age"
      }
      if(!dec.test(this.state.payment)){
        allvalid=false
        messsage="Please provide valid payment amount"
      }
      if(allvalid){        
        firebase.database().ref("practitioner/"+this.state.id).update(
            {
              post_code_1:this.state.postcode1,
              post_code_2:this.state.postcode2,
              dbs_issue_date:this.state.issuedate,
              dbs_expiry_date:this.state.expirydate,
              qualification:this.state.qualification,
              additionalqualification:this.state.additionalqualification,
              contact_number:this.state.contact,
              age_of_child:this.state.age,
              payment_hour:this.state.payment,
              
            }
          ).then(()=>{
            alert("Updated successfully");
            
            this.setState({sendingdata:false})
          }).catch((error)=>{
            console.log("Filed");
            this.setState({sendingdata:false})
      
          });
      }
      this.setState({messsage:messsage})
      this.setState({valid:allvalid})
    }
  }


  render() {
  
    const newsimg=require('./assets/newsfeed.png')
    const notimg=require('./assets/notify.png')
    const bucketimg=require('./assets/bucket.png')

    if(this.state.isparent){
        return(
 
            <View style={styles.container}>
            <KeyboardAvoidingView style={{width:"100%",alignItems:'center'}} behavior="padding">
            <Header backgroundColor="#fac1b8" centerComponent={{text:'Edit Profile', style:{color:'#fff',fontSize:20} }}
                         placement="center"></Header>
            <Nav navigate={this.props.navigation.navigate}></Nav>
            <View style={{margin:10}}>
            {
                !this.state.valid ? (
                    <Text style={{backgroundColor:"white",color:"red"}}>{this.state.messsage}</Text> 
                ) : null
            }
            </View>
            <View style={{borderRadius:8,width:"90%"}}>
              <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
                <Text style={{fontSize:20,color:"#80635E"}}>Post Code 1</Text>
                <TextInput style={{fontSize:20}}
                onChangeText={(postcode1)=>this.setState({postcode1})}>{this.state.postcode1}</TextInput>
              </View>
              <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
                <Text style={{fontSize:20,color:"#80635E"}}>Post Code 2</Text>
                <TextInput style={{fontSize:20}}
                onChangeText={(postcode2)=>this.setState({postcode2})}>{this.state.postcode2}</TextInput>
              </View>
              <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
                <Text style={{fontSize:20,color:"#80635E"}}>Post Code 3</Text>
                <TextInput style={{fontSize:20}} 
                onChangeText={(postcode3)=>this.setState({postcode3})}>{this.state.postcode3}</TextInput>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
            <TouchableOpacity style={{width:"33%",backgroundColor:"#ffffff",padding:10,marginTop:"4%",alignItems:'center',borderWidth:2,borderColor:"#000"}}
            onPress={this.editprofile.bind(this)}>

              <Text style={{color:"#000"}}>Update</Text>
            </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
          </View>
        
        )
    }
    return (
        <View style={styles.container}>
        <Header backgroundColor="#fac1b8" centerComponent={{text:'Edit profile', style:{color:'#fff',fontSize:20} }}
                     placement="center"></Header>
  
        <View style={{margin:10}}>
            {
                !this.state.valid ? (
                    <Text style={{backgroundColor:"white",color:"red"}}>{this.state.messsage}</Text> 
                ) : null
            }
        </View>

        <ScrollView style={{borderRadius:8,width:"100%"}}>
        <KeyboardAvoidingView style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%",flex:1}} behavior={"position"}>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%",width:"100%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Post Code 1</Text>
            <TextInput style={{fontSize:20}} onChangeText={(postcode1)=>this.setState({postcode1})}>
            {this.state.postcode1}</TextInput>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Post Code 2</Text>
            <TextInput style={{fontSize:20}} onChangeText={(postcode2)=>this.setState({postcode2})}>
            {this.state.postcode2}</TextInput>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Post Code 3</Text>
            <TextInput style={{fontSize:20}} onChangeText={(postcode3)=>this.setState({postcode3})}>
            {this.state.postcode3}</TextInput>
          </View>
         
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>DBS Issue Date</Text>
            <DatePicker
         
              date={this.state.issuedate}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              showIcon={false}
              androidMode='spinner'
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                  dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
              },
              dateInput:{
                borderWidth:0,
                borderColor:"#ffffff"
              }
            
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({issuedate: date})}}
            />
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>DBS Expiry Date</Text>
            <DatePicker
              
              date={this.state.expirydate}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              showIcon={false}
              androidMode='spinner'
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
              dateInput:{
                borderWidth:0,
                borderColor:"#ffffff",
                padding:0
              }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({expirydate: date})}}
            />
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Qualification</Text>
            <View >
              <Picker  placeholder="Region" placeholderTextColor="#80635E" selectedValue={this.state.qualification} style={{padding:0}} 
              onValueChange={(itemValue) =>this.setState({qualification: itemValue})}>
              <Picker.Item label="Level 1" value="Level 1" />
              <Picker.Item label="Level 2" value="Level 2" />
              <Picker.Item label="Level 3" value="Level 3" />
              <Picker.Item label="Childminder" value="Childminder" />
              <Picker.Item label="Au pair" value="Au pair" />
              <Picker.Item label="Student" value="Student" />
              <Picker.Item label="Nany" value="Nany" />
              <Picker.Item label="Degree" value="Degree" />
              <Picker.Item label="Masters" value="Masters" />
              <Picker.Item label="Phd" value="Phd" />
              <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Additional Qualification</Text>
            <TextInput style={{fontSize:20}} 
            onChangeText={(additionalqualification)=>this.setState({additionalqualification})}>
            {this.state.additionalqualification}</TextInput>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Contact Number</Text>
            <TextInput style={{fontSize:20}} onChangeText={(contact)=>this.setState({contact})}>
            {this.state.contact}</TextInput>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Payment per Hour</Text>
            <TextInput style={{fontSize:20}} onChangeText={(payment)=>this.setState({payment})}>
            {this.state.payment}</TextInput>
          </View>
            <Text style={{fontSize:20,color:"#80635E"}}>Age of child</Text>
            <TextInput style={{fontSize:20}} onChangeText={(age)=>this.setState({age})}>
            {this.state.age}</TextInput>
        
            </KeyboardAvoidingView>
        </ScrollView>
       
        <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
            <TouchableOpacity style={{width:"33%",backgroundColor:"#ffffff",padding:10,marginTop:"4%",alignItems:'center',borderWidth:2,borderColor:"#000"}}
            onPress={this.editprofile.bind(this)}>
              <Text style={{color:"#000"}}>Update</Text>
            </TouchableOpacity>
        </View>
      
      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    width:"100%"
    
  },
   childstyle:{
    flexDirection: 'row',width:"100%",height:"7%"
  }
});

AppRegistry.registerComponent('Editprofile',()=>Editprofile)
