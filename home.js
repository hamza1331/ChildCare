import React from 'react';
import { ScrollView,StyleSheet, Text, View,TouchableOpacity,AppRegistry,ActivityIndicator,Image,FlatList,Alert,Picker} from 'react-native';
import {Header,Overlay,Slider} from 'react-native-elements'
import firebase from './firbaseconf'
import Nav from './navbar' 
import TimeAgo from 'react-native-timeago';



const add=require('./assets/addtocart.png')

export default class Home extends React.Component {

  constructor(props){
    super(props);
    this.state={
      practitionerlist:[],
      practitioneremail:[],
      practitionerprice:[],
      gettingdata:true,
      filtervisible:false,
      filterpostcode:"post code 1",
      priceval:39,
      ageval:2,
      reload:false,
      checkout_time:[],
      buyer:[]
    }
    this.gotoprof = this.gotoprof.bind(this);
  }


 
  updatethelist(){
    console.log(this.state.filterpostcode)
    this.setState({gettingdata:true})
    this.setState({filtervisible:false})
    this.setState({reload:true})
    let name=[];
    let price=[];
    let email=[];
    console.disableYellowBox = true;
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        const db=firebase.database().ref("parents");
        const mainuser=db.orderByChild("email").equalTo(user.email);
        mainuser.on("value",snapshot=> {
          snapshot.forEach(child=>{
            const db1=firebase.database().ref("practitioner");
            if(this.state.filterpostcode==="post code 1"){
              const listpostpc1=db1.orderByChild("post_code_1").equalTo(child.val()["post_code_1"]);
              listpostpc1.on("value",snapshot1=>{
                snapshot1.forEach(child1=>{
                  if(this.state.priceval>0){
                    const filterpayment=db1.orderByChild("payment_hour").endAt(String(this.state.priceval))
                    filterpayment.on("value",snapshotfilter=>{
                      snapshotfilter.forEach(childfilter=>{
                          const filterage=db1.orderByChild("age_of_child").endAt(String(this.state.ageval))
                          filterage.on("value",snapshotfilterage=>{
                            snapshotfilterage.forEach(childagefilter=>{
                              name.push(child1.val().first_name)
                              email.push(child1.val().email)
                              price.push(child1.val().payment_hour)
                            })
                          })
                      })
                    })
                  }
                  else{
                    name.push(child1.val().first_name)
                    email.push(child1.val().email)
                    price.push(child3.val().payment_hour)
                  }
                });
              });
  
              const listpostpc2=db1.orderByChild("post_code_2").equalTo(child.val()["post_code_1"]);
              listpostpc2.on("value",snapshot2=>{
                snapshot2.forEach(child2=>{
                  if(this.state.priceval>0){
                    const filterpayment=db1.orderByChild("payment_hour").endAt(String(this.state.priceval))
                    filterpayment.on("value",snapshotfilter=>{
                      snapshotfilter.forEach(childfilter=>{
                          const filterage=db1.orderByChild("age_of_child").endAt(String(this.state.ageval))
                          filterage.on("value",snapshotfilterage=>{
                            snapshotfilterage.forEach(childagefilter=>{
                              name.push(child2.val().first_name)
                              email.push(child2.val().email)
                              price.push(child2.val().payment_hour)
                            })
                          })
                      })
                    })
                  }
                  else{
                    name.push(child2.val().first_name)
                    email.push(child2.val().email)
                    price.push(child2.val().payment_hour)
                  }
                });
              });
  
              const listpostpc3=db1.orderByChild("post_code_3").equalTo(child.val()["post_code_1"]);
              listpostpc3.on("value",snapshot3=>{
                snapshot3.forEach(child3=>{
                  if(this.state.priceval>0){
                    const filterpayment=db1.orderByChild("payment_hour").endAt(String(this.state.priceval))
                    filterpayment.on("value",snapshotfilter=>{
                      snapshotfilter.forEach(childfilter=>{
                          const filterage=db1.orderByChild("age_of_child").endAt(String(this.state.ageval))
                          filterage.on("value",snapshotfilterage=>{
                            snapshotfilterage.forEach(childagefilter=>{
                              name.push(child3.val().first_name)
                              email.push(child3.val().email)
                              price.push(child3.val().payment_hour)
                            })
                          })
                      })
                    })
                  }
                  else{
                    name.push(child3.val().first_name)
                    email.push(child3.val().email)
                    price.push(child3.val().payment_hour)
                  }
                });
              });
            }

            
            if(this.state.filterpostcode==="post code 2"){
              if(child.val()["post_code_2"]!==""){
                const listpostpc1_1=db1.orderByChild("post_code_1").equalTo(child.val()["post_code_2"]);
                listpostpc1_1.on("value",snapshot1_1=>{
                  snapshot1_1.forEach(child1=>{
                    if(this.state.priceval>0){
                      const filterpayment=db1.orderByChild("payment_hour").endAt(String(this.state.priceval))
                      filterpayment.on("value",snapshotfilter=>{
                        snapshotfilter.forEach(childfilter=>{
                            const filterage=db1.orderByChild("age_of_child").endAt(String(this.state.ageval))
                            filterage.on("value",snapshotfilterage=>{
                              snapshotfilterage.forEach(childagefilter=>{
                                name.push(child1.val().first_name)
                                email.push(child1.val().email)
                                price.push(child1.val().payment_hour)
                              })
                            })
                        })
                      })
                    }
                    else{
                      name.push(child1.val().first_name)
                      email.push(child1.val().email)
                      price.push(child1.val().payment_hour)
                    }
                  });
                });
                const listpostpc2_1=db1.orderByChild("post_code_2").equalTo(child.val()["post_code_2"]);
                listpostpc2_1.on("value",snapshot2_1=>{
                  snapshot2_1.forEach(child2=>{
                    if(this.state.priceval>0){
                      const filterpayment=db1.orderByChild("payment_hour").endAt(String(this.state.priceval))
                      filterpayment.on("value",snapshotfilter=>{
                        snapshotfilter.forEach(childfilter=>{
                            const filterage=db1.orderByChild("age_of_child").endAt(String(this.state.ageval))
                            filterage.on("value",snapshotfilterage=>{
                              snapshotfilterage.forEach(childagefilter=>{
                                name.push(child2.val().first_name)
                                email.push(child2.val().email)
                                price.push(child2.val().payment_hour)
                              })
                            })
                        })
                      })
                    }
                    else{
                      name.push(child2.val().first_name)
                      email.push(child2.val().email)
                      price.push(child2.val().payment_hour)
                    }
                  });
                });
      
                const listpostpc3_1=db1.orderByChild("post_code_3").equalTo(child.val()["post_code_2"]);
                listpostpc3_1.on("value",snapshot3_1=>{
                  snapshot3_1.forEach(child3=>{
                    if(this.state.priceval>0){
                      const filterpayment=db1.orderByChild("payment_hour").endAt(String(this.state.priceval))
                      filterpayment.on("value",snapshotfilter=>{
                        snapshotfilter.forEach(childfilter=>{
                            const filterage=db1.orderByChild("age_of_child").endAt(String(this.state.ageval))
                            filterage.on("value",snapshotfilterage=>{
                              snapshotfilterage.forEach(childagefilter=>{
                                name.push(child3.val().first_name)
                                email.push(child3.val().email)
                                price.push(child3.val().payment_hour)
                              })
                            })
                        })
                      })
                    }
                    else{
                      name.push(child3.val().first_name)
                      email.push(child3.val().email)
                      price.push(child3.val().payment_hour)
                    }
                  });
                });
              }    
            }

            if(this.state.filterpostcode==="post code 3"){
              if(child.val()["post_code_3"]!==""){
                const listpostpc1_2=db1.orderByChild("post_code_1").equalTo(child.val()["post_code_3"]);
                listpostpc1_2.on("value",snapshot1_2=>{
                  snapshot1_2.forEach(child1=>{
                    if(this.state.priceval>0){
                      const filterpayment=db1.orderByChild("payment_hour").endAt(String(this.state.priceval))
                      filterpayment.on("value",snapshotfilter=>{
                        snapshotfilter.forEach(childfilter=>{
                            const filterage=db1.orderByChild("age_of_child").endAt(String(this.state.ageval))
                            filterage.on("value",snapshotfilterage=>{
                              snapshotfilterage.forEach(childagefilter=>{
                                name.push(child1.val().first_name)
                                email.push(child1.val().email)
                                price.push(child1.val().payment_hour)
                              })
                            })
                        })
                      })
                    }
                    else{
                      name.push(child1.val().first_name)
                      email.push(child1.val().email)
                      price.push(child1.val().payment_hour)
                    }
                  });
                });
      
                const listpostpc2_2=db1.orderByChild("post_code_2").equalTo(child.val()["post_code_3"]);
                listpostpc2_2.on("value",snapshot2_2=>{
                  snapshot2_2.forEach(child2=>{
                    if(this.state.priceval>0){
                      const filterpayment=db1.orderByChild("payment_hour").endAt(String(this.state.priceval))
                      filterpayment.on("value",snapshotfilter=>{
                        snapshotfilter.forEach(childfilter=>{
                            const filterage=db1.orderByChild("age_of_child").endAt(String(this.state.ageval))
                            filterage.on("value",snapshotfilterage=>{
                              snapshotfilterage.forEach(childagefilter=>{
                                name.push(child2.val().first_name)
                                email.push(child2.val().email)
                                price.push(child2.val().payment_hour)
                              })
                            })
                        })
                      })
                    }
                    else{
                      name.push(child2.val().first_name)
                      email.push(child2.val().email)
                      price.push(child2.val().payment_hour)
                    }
                  });
                });
      
                const listpostpc3_2=db1.orderByChild("post_code_3").equalTo(child.val()["post_code_3"]);
                listpostpc3_2.on("value",snapshot3_2=>{
                  snapshot3_2.forEach(child3=>{
                    if(this.state.priceval>0){
                      const filterpayment=db1.orderByChild("payment_hour").endAt(String(this.state.priceval))
                      filterpayment.on("value",snapshotfilter=>{
                        snapshotfilter.forEach(childfilter=>{
                            const filterage=db1.orderByChild("age_of_child").endAt(String(this.state.ageval))
                            filterage.on("value",snapshotfilterage=>{
                              snapshotfilterage.forEach(childagefilter=>{
                                name.push(child3.val().first_name)
                                email.push(child3.val().email)
                                price.push(child3.val().payment_hour)
                              })
                            })
                        })
                      })
                    }
                    else{
                      name.push(child3.val().first_name)
                      email.push(child3.val().email)
                      price.push(child3.val().payment_hour)
                    }
                  });
                });
              }
            }
          
            this.setState({practitionerlist:name})
            this.setState({practitioneremail:email})
            this.setState({practitionerprice:price})
            this.setState({reload:false})
            this.setState({gettingdata:false})
          });
       
        }); 
      }
    });
  }


  updatepractitionerlist(){
    var gotnamer=false
    console.log("0__________")
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        const db=firebase.database().ref("bucket");
        const listoforders=db.orderByChild("practitioneremail").equalTo(user.email);
        listoforders.on("value",snapshot=> {
          var checkout_time=[];
          var buyer=[]
          snapshot.forEach(child=>{
              if(child.val().checkout===true){
                  console.log(child.val().buyer,"her is buyter")
                  checkout_time.push(child.val().checkout_time)
                  const namedb=firebase.database().ref("parents")
                  const name=namedb.orderByChild("email").equalTo(child.val().buyer)
                  name.on("value",namesnapshot=> {
                  namesnapshot.forEach(child1=>{
                    console.log(child1.val().first_name+" "+child1.val().last_name,"its name")
                    buyer.push(child1.val().first_name+" "+child1.val().last_name)
                  })
                  this.setState({gettingdata:false})  
                  })
              }
          })
       console.log(buyer,"they are tuem")
          this.setState({checkout_time:checkout_time})
          this.setState({buyer:buyer}) 
          this.setState({gettingdata:false})
        })
        
      }
  })
  }
                



  

  componentWillMount(){
    const { navigation } = this.props;
    const isparent=navigation.getParam('isparent')
    
    if(isparent==true){
      this.updatethelist()
    }
    else{
      this.updatepractitionerlist()
    }
    
    
  }


  addtobucket=(item,name)=>{
     Alert.alert(
      'Confirm',
      'Are you sure you want to purchase details of this practitioner We only provide the information of following practitioner for £1.99 and then its you resposiblity to contact them',
      [
        {text: 'Ok', onPress: () =>{
          firebase.auth().onAuthStateChanged(user => {
            if(user){
              firebase.database().ref('bucket').push(
              {
                buyer:user.email,
                practitioneremail:item,
                checkout_time:"",
                price:"",
                checkout:false,
                name:name,
                expires:false
              }
              ).then(()=>{
                console.log("inserted!!!!");
        
                this.setState({sendingdata:false})
              }).catch((error)=>{
                console.log("Filed");
                this.setState({sendingdata:false})
              });
            }
             })
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      {cancelable: false},
    );
    }

  gotoprof=(item)=>{
        this.props.navigation.navigate('PRPROFILE', {
              email: item,
              postcode:this.state.filterpostcode
            })
  }

  _renderItem = ({item,index}) => (
  
    <View>
      <TouchableOpacity  style={styles.childstyle} onPress={() => this.gotoprof(this.state.practitioneremail[index])}>
        <View style={{alignItems:'center',justifyContent:'center',width:"33%"}}>
        <Text>{item}</Text>
        </View>
        <View style={{alignItems:'center',justifyContent:'center',width:"33%"}}>
        <Text>{this.state.practitionerprice[index]}£/hr</Text>
        </View>
        <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:"33%"}} 
          onPress={()=>this.addtobucket(this.state.practitioneremail[index],item)}>
          <Image source={add}></Image>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );

  _renderItempractiioner = ({item,index}) => (
    <View>
      <TouchableOpacity  style={styles.childstyle}>
        <View style={{width:"100%"}}>
        <Text>Your information is purchased by {
            item
        } and your contact information is provided to them they will contact you</Text>
        <TimeAgo time={this.state.checkout_time[index]} style={{color:"#606060",fontSize:10}}></TimeAgo>
        </View>
      </TouchableOpacity>
    </View>
)


  render() {
    const { navigation } = this.props;
    if(this.state.gettingdata ){
      return(
        <ActivityIndicator></ActivityIndicator>
      );
    }
   
    if(navigation.getParam('isparent')){
      return (
        <View style={styles.container}>
          <Overlay height={"60%"} isVisible={this.state.filtervisible} onBackdropPress={() => this.setState({ filtervisible: false })}>
             <View>
              <View style={{borderBottomWidth:3,width:"100%"}}>
                <Text style={{fontSize:20,color:"#80635E"}}>Filter</Text>
              </View>
                <Text style={{color:"#80635E"}}>From Post Code</Text>
                <View >
                  <Picker selectedValue={this.state.filterpostcode} onValueChange={(itemValue, itemIndex) =>this.setState({filterpostcode: itemValue})}  placeholder="Post Code" placeholderTextColor="#80635E">
                    <Picker.Item label="Post Code 1" value="post code 1" />
                    <Picker.Item label="Post Code 2" value="post code 2" />
                    <Picker.Item label="Post Code 3" value="post code 3" />
                  </Picker>
                </View>
              <View>
              <Text style={{color:"#80635E"}}>From Price Under</Text>
                    <Slider
                      value={this.state.priceval}
                      onValueChange={priceval => this.setState({ priceval })}
                      step={1}
                      thumbTintColor="#80635E"
                      minimumValue={1}
                      maximumValue={200}
                       />
                      <Text>Price: {this.state.priceval}</Text>
              </View>
              <View>
              <Text style={{color:"#80635E"}}>Age of Child Under</Text>
                    <Slider
                      value={this.state.ageval}
                      onValueChange={ageval => this.setState({ ageval })}
                      step={1}
                      thumbTintColor="#80635E"
                      minimumValue={1}
                      maximumValue={20}
                       />
                      <Text>Age: {this.state.ageval}</Text>
              
              </View>
              <TouchableOpacity style={styles.overlaybtn} onPress={this.updatethelist.bind(this)}>
              <Text>Done</Text>
              </TouchableOpacity>
              </View>
          </Overlay>
          <Header backgroundColor="#fac1b8" centerComponent={{text:'Childcare', style:{color:'#fff',fontSize:20} }} 
          rightComponent={{ icon: 'person', color: '#fff',onPress:() =>this.props.navigation.navigate('USERPROFILE')}}
          leftComponent={{icon:'apps', color: '#fff',onPress:() =>this.setState({filtervisible:true})}}
                       placement="center"></Header>
          <Nav navigate={this.props.navigation.navigate}></Nav>
          <View  style={{width:"95%",height:"80%",flex:1}}>
            {
              this.state.reload?(<ActivityIndicator></ActivityIndicator>):
              (

                  <FlatList
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.practitionerlist}
                    renderItem={this._renderItem}
                  />
            
              )
            }
    
          </View>
        
        </View>
        );
    }
    else{
      return(
        <View style={styles.container}>
      
        <Header backgroundColor="#fac1b8" centerComponent={{text:'Childcare', style:{color:'#fff',fontSize:20} }} 
        rightComponent={{ icon: 'person', color: '#fff',onPress:() =>this.props.navigation.navigate('USERPROFILE')}}
        leftComponent={{icon:'apps', color: '#fff',onPress:() =>this.setState({filtervisible:true})}}
                     placement="center"></Header>
     
        <View  style={{width:"100%",height:"80%",flex:1}}>
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.buyer}
            renderItem={this._renderItempractiioner}
          />
        </View>
      
    
      </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
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
  },
  overlaybtn:{
    backgroundColor:"#80635E",
    width:"86%",
    alignItems: 'center',
    padding:10,
    borderRadius:8,
    margin:23
  }
});

AppRegistry.registerComponent('Home',()=>Home)
