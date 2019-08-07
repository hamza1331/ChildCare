import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,AppRegistry,ActivityIndicator,Image,FlatList,Alert} from 'react-native';
import {Header} from 'react-native-elements'
import firebase from './firbaseconf'
import Nav from './navbar'
import TimeAgo from 'react-native-timeago';



export default class Notification extends React.Component {

  constructor(props){
    super(props);
    this.state={
      title:[],
      datetime:[]
    
    }
   
  }

  

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
        if(user){
            const title=[]
            const datetime=[]
            const db=firebase.database().ref("notification");
            const notifications=db.orderByChild("email").equalTo(user.email);
            notifications.on("value",snapshot=>{
                snapshot.forEach(child=>{
                    title.push(child.val().title)
                    datetime.push(child.val().datetime)
                    if(!child.val().readed){
                        child.ref.update({
                            readed:true
                        })
                    }
                   
                })
                this.setState({title:title})
                this.setState({datetime:datetime})                
            })
        }
    })
}
     

  _renderItem = ({item,index}) => (
            <View>
              <TouchableOpacity  style={styles.childstyle}>
                <View style={{width:"100%"}}>
                <Text>{
                    item
                }</Text>
                <TimeAgo time={this.state.datetime[index]} style={{color:"#606060",fontSize:10}}></TimeAgo>
                </View>
              </TouchableOpacity>
            </View>
     )
 


  render() {
      
    return (
    <View style={styles.container}>
      <Header backgroundColor="#fac1b8" centerComponent={{text:'Notification', style:{color:'#fff',fontSize:20} }} 
      rightComponent={{ icon: 'person', color: '#fff'}}
                   placement="center"></Header>
      <Nav navigate={this.props.navigation.navigate}></Nav>
     
      <View  style={{width:"100%",height:"80%",flex:1}}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item, index) => index.toString()}
        data={this.state.title}
        renderItem={this._renderItem}
            />
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

AppRegistry.registerComponent('Notification',()=>Notification)
