import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,AppRegistry,ActivityIndicator,Image,FlatList,Alert} from 'react-native';
import {Header} from 'react-native-elements'
import firebase from './firbaseconf'
import Nav from './navbar' 
import TimeAgo from 'react-native-timeago';


const add=require('./assets/checkout.png')
const del=require('./assets/delete.png')

export default class Buckethistory extends React.Component {

  constructor(props){
    super(props);
    this.state={
      email:[],
      name:[],
      useremail:"",
      datetime:[]
    }
   
  }

  

  

componentWillMount(){

  firebase.auth().onAuthStateChanged(user => {
    if(user){
   
        const name=[]
        const datetime=[]
        const email=[]
        const db=firebase.database().ref("bucket");
        const bucketdata=db.orderByChild("buyer").equalTo(user.email);
        bucketdata.on("value",snapshot=>{
            snapshot.forEach(child=>{
                if(child.val().checkout===true){
                    name.push(child.val().name)
                    email.push(child.val().practitioneremail)
                    datetime.push(child.val().checkout_time)
                }
              
            })
            this.setState({name:name})
            this.setState({email:email})
            this.setState({useremail:user.email})
            this.setState({datetime:datetime})
            console.log(datetime,"//////////////////////////")
            
        })
    }
})
}
     
  deleteentry=(mail)=>{
    Alert.alert(
        'Delete',
        'Are you sure you want to remove this order from cart?',
        [
          {text: 'Ok', onPress: () =>{
            const allorderofthis=firebase.database().ref("bucket").orderByChild("buyer").equalTo(this.state.useremail);
            allorderofthis.on("value",snapshot=>{
            snapshot.forEach(child=>{
                if(child.val().practitioneremail===mail){
                  if(child.val().checkout===false){
                    child.ref.remove();
                  }
                }
            })
            })
          }},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        {cancelable: false},
      );
    

  }

  clearcart=()=>{
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all the orders is the cart?',
      [
        {text: 'Ok', onPress: () =>{
          const allorderofthis=firebase.database().ref("bucket").orderByChild("buyer").equalTo(this.state.useremail);
          allorderofthis.on("value",snapshot=>{
          snapshot.forEach(child=>{
                if(child.val().checkout===false){
                  child.ref.remove();
                }
          })
          })
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      {cancelable: false},
    );
  }

  checkout=()=>{
    const numberoforders=firebase.database().ref("bucket").orderByChild("buyer").equalTo(this.state.useremail);
    numberoforders.on("value",snapshot=>{
      var count=0;
      snapshot.forEach(child=>{
         if(!child.val().checkout){
           count++;
         }
      })
       var price=0
       if(count>=3){
           price=count*(1.66)
       }
       else{
         price=count*(1.99)
       }
       this.props.navigation.navigate('INVOICE', {
        count: count,
        price:price
      })

    })
  }
  checkoutsingle=(mail)=>{
    this.props.navigation.navigate('INVOICE', {
      count: 1,
      price:1.99,
      pracmail:mail,
      usermail:this.state.useremail

    })
  }
 


  _purchasedItems=({item,index})=>(
            <View>
              <TouchableOpacity  style={styles.childstyle} 
              onPress={()=>this.props.navigation.navigate('FULLPROFILE',{email:this.state.email[index]})}>
                <View style={{width:"100%"}}>
                <Text>you purchased the information of {
                    item
                } now you can see his complete profile</Text>
                <TimeAgo time={this.state.datetime[index]} style={{color:"#606060",fontSize:10}}></TimeAgo>
                </View>
              </TouchableOpacity>
            </View>
  )


  render() {
      
    return (
    <View style={styles.container}>
      <Header backgroundColor="#fac1b8" centerComponent={{text:'History', style:{color:'#fff',fontSize:20} }} 
      rightComponent={{ icon: 'person', color: '#fff'}}
                   placement="center"></Header>
      <Nav navigate={this.props.navigation.navigate}></Nav>
  
      <View  style={{width:"95%",height:"80%",flex:1}}>
          <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.name}
          renderItem={this._purchasedItems}
              />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center',width:"100%",height:"7%",backgroundColor:"#80635E"}}>
        <View style={{alignItems:'center',justifyContent:'center',width:"50%",height:"100%"}}>
        <TouchableOpacity style={{width:"50%",backgroundColor:"#80635E",height:"100%",justifyContent:'center'}}
        onPress={()=>this.props.navigation.navigate('BUCKET')}>
        <Text style={{color:"#ffffff"}}>Cart List</Text>
        </TouchableOpacity>
        </View>
        <View style={{alignItems:'center',justifyContent:'center',width:"50%",height:"100%"}} >
        <TouchableOpacity style={{width:"50%",height:"100%",backgroundColor:"#80635E",justifyContent:'center'}}
        onPress={()=>this.props.navigation.navigate('BUCKETHISTORY')}>
        <Text style={{color:"#ffffff"}}>History</Text>
        </TouchableOpacity>
        </View>
     
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
    paddingTop:"1%",
    paddingBottom:"8%",
    backgroundColor: '#FFFFFD',
    borderWidth: 1,
  borderColor: '#ddd',
  borderBottomWidth: 0,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 3,
  marginTop:"2%",
  flexDirection: 'row', alignItems: 'center',justifyContent: 'center'
  }
});

AppRegistry.registerComponent('Buckethistory',()=>Buckethistory)
