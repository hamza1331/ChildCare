import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,AppRegistry,ActivityIndicator,Image,ScrollView} from 'react-native';
import {Header} from 'react-native-elements'
import firebase from './firbaseconf'
import Nav from './navbar' 





export default class Fullprofile extends React.Component {

  constructor(props){
    super(props);
    this.state={
      user:null,
      gotdata:false,
    }
  }


  componentDidMount(){
    const { navigation } = this.props;
    const mail = navigation.getParam('email');
    const db=firebase.database().ref("practitioner");
    const selectedpract=db.orderByChild("email").equalTo(mail);
    selectedpract.on("value",snapshot=>{
    snapshot.forEach(child=>{
            this.setState({user:child.val()})
    });
       this.setState({gotdata:true})
    });
 
  }
 

  render() {
    if(!this.state.gotdata){
      return(
      <ActivityIndicator></ActivityIndicator>
      )
    }
    if(this.state.fulldetails){
      this.props.navigation.navigate('INVOICE', {
        email:this.state.user.email
      })
    }
    const { navigation } = this.props;
    const postcode =navigation.getParam('postcode')
    return (
    <View style={styles.container}>
      <Header backgroundColor="#fac1b8" centerComponent={{text:'Childcare', style:{color:'#fff',fontSize:20} }}
                   placement="center"></Header>

      <Nav navigate={this.props.navigation.navigate}></Nav>
    
      <ScrollView style={{marginTop:"2%",borderRadius:8,width:"90%"}}>
        <View  style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
          <Text style={{fontSize:20,color:"#80635E"}}>First Name</Text>
          <Text style={{fontSize:20}}>{this.state.user.first_name}</Text>
        </View>
        <View  style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
          <Text style={{fontSize:20,color:"#80635E"}}>Last Name</Text>
          <Text style={{fontSize:20}}>{this.state.user.last_name}</Text>
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
          <Text style={{fontSize:20,color:"#80635E"}}>Post Code</Text>
          <Text style={{fontSize:20}}>{postcode}</Text>
        </View>
        <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
          <Text style={{fontSize:20,color:"#80635E"}}>Qualification</Text>
          <Text style={{fontSize:20}}>{this.state.user.qualification}</Text>
        </View>
        <View style={{ borderBottomColor: 'black',borderBottomWidth: 3,paddingTop:"4%"}}>
          <Text style={{fontSize:20,color:"#80635E"}}>Additional Qualification</Text>
          <Text style={{fontSize:20}}>{this.state.user.additionalqualification}</Text>
        </View>
      </ScrollView>
      

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

AppRegistry.registerComponent('Fullprofile',()=>Fullprofile)
