import React from 'react';
import { View,TouchableOpacity,AppRegistry,Image} from 'react-native';
import {Badge} from 'react-native-elements'
import firebase from './firbaseconf'
import Bucket from './bucket';

export default class Nav extends React.Component {

  constructor(props){
    super(props);
    this.state={
      count:0,
      email:[],
      name:[],
      notificationcount:0,
      notificationtitle:[],
      useremail:""
    }
    
  }

  gotobucket=()=>{
    this.props.navigate('BUCKET')
  }

  gotohome=()=>{
    this.props.navigate('MAIN')
  }
  readedallnotifications=()=>{
    this.props.navigate('NOTIFICATION')
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
        if(user){
          this.setState({useremail:user.email})
          const db=firebase.database().ref("bucket");
          const listoforders=db.orderByChild("buyer").equalTo(user.email);
          listoforders.on("value",snapshot=> {
            var counter=0;
      
            var email=[]
            snapshot.forEach(child=>{
                if(child.val().checkout===false){
                counter+=1;
                email.push(child.val().practitioneremail)
                }
            })
    
            this.setState({email:email})
            this.setState({count:counter});
          })

          const notfication=firebase.database().ref("notification");
          const allnotifiations=notfication.orderByChild("email").equalTo(user.email);
          allnotifiations.on("value",snapshot=> {
            console.log(snapshot)
             var notifiactioncounter=0
             var title=[]
             snapshot.forEach(child=>{
                  if(!child.val().readed){
                  notifiactioncounter+=1
                  }
                
                 title.push(child.val().title)
              })
              console.log(notifiactioncounter)
            this.setState({notificationcount:notifiactioncounter,notificationtitle:title})
          })
        }
    })
  }

 
  render() {
    const newsimg=require('./assets/newsfeed.png')
    const notimg=require('./assets/notify.png')
    const bucketimg=require('./assets/bucket.png')
    return (
        <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'center',width:"100%",height:"7%",backgroundColor:"#80635E"}}>
        <View style={{alignItems:'center',justifyContent:'center',width:"33%",height:"100%"}}>
        <TouchableOpacity style={{width:"40%",backgroundColor:"#80635E",height:"100%",justifyContent:'center'}}
        onPress={()=>this.gotohome()}>
        <Image source={newsimg} style={{width:"35%",height:"40%"}} ></Image>
        </TouchableOpacity>
        </View>
        <View style={{alignItems:'center',justifyContent:'center',width:"33%",height:"100%"}} >
        <TouchableOpacity style={{width:"33%",height:"100%",backgroundColor:"#80635E",justifyContent:'center'}}
        onPress={()=>this.readedallnotifications()}>
        <Image source={notimg} style={{width:"40%",height:"40%"}} ></Image>
        {
          (this.state.notificationcount>0)?
          (
            <Badge value={this.state.notificationcount} status="error" containerStyle={{ position: 'absolute', top:"13%", right:"20%" }} />
          ):
          false
        }
        </TouchableOpacity>
        </View>
        <View style={{alignItems:'center',justifyContent:'center',width:"33%",height:"100%"}} >
        <TouchableOpacity style={{width:"33%",backgroundColor:"#80635E",height:"100%",justifyContent:'center'}}
        onPress={()=>this.gotobucket()}>
        <Image source={bucketimg} style={{width:"40%",height:"40%"}} ></Image>
        <Badge value={this.state.count} status="error" containerStyle={{ position: 'absolute', top:"13%", right:"23%" }} />
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}


AppRegistry.registerComponent('Nav',()=>Nav)
