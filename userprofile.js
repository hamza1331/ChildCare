import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,AppRegistry,ActivityIndicator,Image,Button,ScrollView} from 'react-native';
import Nav from './navbar'
import {Header} from 'react-native-elements'
import firebase from './firbaseconf'


export default class Userprofile extends React.Component {

  constructor(props){
    super(props);
    this.state={
      user:null,
      gotdata:false,
      isparent:false,
      keyy:""
    }
  }


  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
        if(user){
          const db1=firebase.database().ref("practitioner");
          const mainuser=db1.orderByChild("email").equalTo(user.email);
          mainuser.on("value",snapshot=> {
            try{
              var key = Object.keys(snapshot.val())[0];
              console.log(key)
              this.setState({keyy:key})
            }
            catch{
              console.log("Errrororor")
            }
            snapshot.forEach(child=>{
                  console.log(child.val()) 
                  this.setState({user:child.val()}) 
                  this.setState({isparent:false})
            })
          
          })
  
          const db2=firebase.database().ref("parents");
          const mainuser1=db2.orderByChild("email").equalTo(user.email);
          mainuser1.on("value",snapshot1=> {
            try{
              var key = Object.keys(snapshot1.val())[0];
              console.log(key)
              this.setState({keyy:key})
            }
            catch{
              console.log("Errrororor")
            }
            snapshot1.forEach(child1=>{
                  this.setState({user:child1.val()}) 
                  this.setState({isparent:true})
            })
            
          })
          this.setState({gotdata:true})
        }
      })
  }

   
  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        this.props.navigation.navigate('LOGIN')
    } catch (e) {
        console.log(e);
    }
  }
  calleditpage(){
    if(this.state.isparent){
      this.props.navigation.navigate('EDITPROFILE', {
        isparent: this.state.isparent,
        post_code_1:this.state.user.post_code_1,
        post_code_2:this.state.user.post_code_2,
        post_code_3:this.state.user.post_code_3,
        id:this.state.keyy
      })
    }
    else{
      this.props.navigation.navigate('EDITPROFILE', {
      isparent: this.state.isparent,
      post_code_1:this.state.user.post_code_1,
      post_code_2:this.state.user.post_code_2,
      post_code_3:this.state.user.post_code_3,
      dbs_issue_date:this.state.user.dbs_issue_date,
      dbs_expiry_date:this.state.user.dbs_expiry_date,
      qualification:this.state.user.qualification,
      additionalqualification:this.state.user.additionalqualification,
      contact_number:this.state.user.contact_number,
      age_of_child:this.state.user.age_of_child,
      payment_hour:this.state.user.payment_hour,
      id:this.state.keyy
    })
    }
  }
 

  render() {
    const newsimg=require('./assets/newsfeed.png')
    const notimg=require('./assets/notify.png')
    const bucketimg=require('./assets/bucket.png')
    if(!this.state.gotdata){
      return(
      <ActivityIndicator></ActivityIndicator>
      )
    }
    if(this.state.isparent){
        return(
            <View style={styles.container}>
            <Header backgroundColor="#fac1b8" centerComponent={{text:'Childcare', style:{color:'#fff',fontSize:20} }}
                         placement="center"></Header>
      
      <Nav navigate={this.props.navigation.navigate}></Nav>
            <View style={{borderRadius:8,width:"90%"}}>
              <View  style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
                <Text style={{fontSize:20,color:"#80635E"}}>First Name</Text>
                <Text style={{fontSize:20}}>{this.state.user.first_name}</Text>
              </View>
              <View  style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
                <Text style={{fontSize:20,color:"#80635E"}}>Last Name</Text>
                <Text style={{fontSize:20}}>{this.state.user.last_name}</Text>
              </View>
              <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
                <Text style={{fontSize:20,color:"#80635E"}}>Region</Text>
                <Text style={{fontSize:20}}>{this.state.user.region}</Text>
              </View>
              <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
                <Text style={{fontSize:20,color:"#80635E"}}>Post Code 1</Text>
                <Text style={{fontSize:20}}>{this.state.user.post_code_1}</Text>
              </View>
              <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
                <Text style={{fontSize:20,color:"#80635E"}}>Post Code 2</Text>
                <Text style={{fontSize:20}}>{this.state.user.post_code_2}</Text>
              </View>
              <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
                <Text style={{fontSize:20,color:"#80635E"}}>Post Code 3</Text>
                <Text style={{fontSize:20}}>{this.state.user.post_code_3}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
            <TouchableOpacity style={{width:"33%",backgroundColor:"#ffffff",padding:10,marginTop:"4%",alignItems:'center',borderWidth:2,borderColor:"#000"
                }} onPress={this.calleditpage.bind(this)}>
              <Text style={{color:"#000"}}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width:"33%",backgroundColor:"#ffffff",padding:10,marginTop:"4%",alignItems:'center',borderWidth:2,borderColor:"#000"}}
            onPress={this.signOutUser}>
              <Text style={{color:"#000"}}>Logout</Text>
            </TouchableOpacity>
            </View>
          </View>
        )
    }
    return (
        <View style={styles.container}>
        <Header backgroundColor="#fac1b8" centerComponent={{text:'Childcare', style:{color:'#fff',fontSize:20} }}
                     placement="center"></Header>
  
        <ScrollView style={{borderRadius:8,width:"90%"}}>
          <View  style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>First Name</Text>
            <Text style={{fontSize:20}}>{this.state.user.first_name}</Text>
          </View>
          <View  style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Last Name</Text>
            <Text style={{fontSize:20}}>{this.state.user.last_name}</Text>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Region</Text>
            <Text style={{fontSize:20}}>{this.state.user.region}</Text>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Post Code 1</Text>
            <Text style={{fontSize:20}}>{this.state.user.post_code_1}</Text>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Post Code 2</Text>
            <Text style={{fontSize:20}}>{this.state.user.post_code_2}</Text>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Post Code 3</Text>
            <Text style={{fontSize:20}}>{this.state.user.post_code_3}</Text>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>DBS number</Text>
            <Text style={{fontSize:20}}>{this.state.user.dbs_number}</Text>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>DBS Issue Date</Text>
            <Text style={{fontSize:20}}>{this.state.user.dbs_issue_date}</Text>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>DBS Expiry Date</Text>
            <Text style={{fontSize:20}}>{this.state.user.dbs_expiry_date}</Text>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Qualification</Text>
            <Text style={{fontSize:20}}>{this.state.user.qualification}</Text>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Additional Qualification</Text>
            <Text style={{fontSize:20}}>{this.state.user.additionalqualification}</Text>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Contact Number</Text>
            <Text style={{fontSize:20}}>{this.state.user.contact_number}</Text>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Email</Text>
            <Text style={{fontSize:20}}>{this.state.user.email}</Text>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Payment per Hour</Text>
            <Text style={{fontSize:20}}>{this.state.user.payment_hour}</Text>
          </View>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
            <Text style={{fontSize:20,color:"#80635E"}}>Age of child</Text>
            <Text style={{fontSize:20}}>{this.state.user.age_of_child}</Text>
          </View>
        </ScrollView>
  
        <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>
            <TouchableOpacity style={{width:"33%",backgroundColor:"#ffffff",padding:10,marginTop:"4%",alignItems:'center',borderWidth:2,borderColor:"#000"}}
            onPress={this.calleditpage.bind(this)}>
              <Text style={{color:"#000"}}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width:"33%",backgroundColor:"#ffffff",padding:10,marginTop:"4%",alignItems:'center',borderWidth:2,borderColor:"#000"}}
            onPress={this.signOutUser}>
              <Text style={{color:"#000"}}>Logout</Text>
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
    
  },
   childstyle:{
    flexDirection: 'row', alignItems: 'center',justifyContent: 'center',width:"100%",height:"7%"
  }
});

AppRegistry.registerComponent('Userprofile',()=>Userprofile)
