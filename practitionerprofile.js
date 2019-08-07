import React from 'react';
import {ScrollView, StyleSheet, Text, View,TouchableOpacity,AppRegistry,ActivityIndicator,Image,Button} from 'react-native';
import {Header} from 'react-native-elements'
import firebase from './firbaseconf'
import Nav from './navbar' 





export default class Prprofile extends React.Component {

  constructor(props){
    super(props);
    this.state={
      user:null,
      gotdata:false,
      fulldetails:false,
      postcode:""
    }
  }


  componentDidMount(){
    const { navigation } = this.props;
    const mail = navigation.getParam('email');
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        const postcodepr=firebase.database().ref("practitioner").orderByChild("email").equalTo(user.email)
        postcodepr.on("value",snapshot=>{
          snapshot.forEach(child=>{
            if(navigation.getParam('postcode')==="post code 1")
                this.setState({postcode:child.val().post_code_1})
            if(navigation.getParam('postcode')==="post code 2")
                this.setState({postcode:child.val().post_code_2})
            if(navigation.getParam('postcode')==="post code 3")
                this.setState({postcode:child.val().post_code_3})
          })
        })
        const postcode=firebase.database().ref("parents").orderByChild("email").equalTo(user.email)
        postcode.on("value",snapshot=>{
          snapshot.forEach(child=>{
            if(navigation.getParam('postcode')==="post code 1")
                this.setState({postcode:child.val().post_code_1})
            if(navigation.getParam('postcode')==="post code 2")
                this.setState({postcode:child.val().post_code_2})
            if(navigation.getParam('postcode')==="post code 3")
                this.setState({postcode:child.val().post_code_3})
          })
        })
        const db=firebase.database().ref("practitioner");
        const selectedpract=db.orderByChild("email").equalTo(mail);
        selectedpract.on("value",snapshot=>{
        snapshot.forEach(child=>{
            this.setState({user:child.val()})
        });
      
        this.setState({gotdata:true})
        });

        
        
      }
    })
  }
 

  render() {
 
    if(!this.state.gotdata){
      return(
      <ActivityIndicator></ActivityIndicator>
      )
    }
   

    return (
    <View style={styles.container}>
      <Header backgroundColor="#fac1b8" centerComponent={{text:'Childcare', style:{color:'#fff',fontSize:20} }}
                   placement="center"></Header>

      <Nav navigate={this.props.navigation.navigate}></Nav>
      <Text style={{fontSize:30}}>{this.state.user.first_name}</Text>
      <Text style={{fontSize:30}}>{this.state.user.payment_hour}£/hr</Text>
      <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,width:"100%" }}/>
      
      <ScrollView style={{marginTop:"8%",borderRadius:8,width:"90%"}}>
        <View  style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
          <Text style={{fontSize:20,color:"#fac1b8"}}>Name</Text>
          <Text style={{fontSize:20}}>{this.state.user.first_name}</Text>
        </View>
        <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
          <Text style={{fontSize:20,color:"#fac1b8"}}>Region</Text>
          <Text style={{fontSize:20}}>{this.state.user.region}</Text>
        </View>
        <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
          <Text style={{fontSize:20,color:"#fac1b8"}}>Post Code</Text>
          <Text style={{fontSize:20}}>******</Text>
        </View>
        <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
          <Text style={{fontSize:20,color:"#fac1b8"}}>Qualification</Text>
          <Text style={{fontSize:20}}>{this.state.user.qualification}</Text>
        </View>
        <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
          <Text style={{fontSize:20,color:"#fac1b8"}}>Additional Qualification</Text>
          <Text style={{fontSize:20}}>{this.state.user.additionalqualification}</Text>
        </View>
      </ScrollView>
  
      <TouchableOpacity style={{width:'33%',backgroundColor:"#fac1b8",padding:10,borderRadius:6,marginTop:6,alignItems:'center'}}>
        <Text style={{color:"#000000"}}>Add to cart</Text>
      </TouchableOpacity>
      
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

AppRegistry.registerComponent('Prprofile',()=>Prprofile)
