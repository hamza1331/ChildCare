import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,AppRegistry,ActivityIndicator,Image,Modal,Platform} from 'react-native';
import {
  WebView
} from 'react-native-webview'
import {Header} from 'react-native-elements'
import firebase from './firbaseconf'
import Nav from './navbar' 
const paypal=require('./assets/paypal.png')
import RNIap, {
  Product,
  requestPurchase,
  ProductPurchase,
  purchaseUpdatedListener,
  purchaseErrorListener,
  PurchaseError,
} from 'react-native-iap';

const itemSkus = Platform.select({
  ios: [
    'CCCAPP', 
  ],
  android: [
    'android.test.purchased', 'android.test.canceled', 'android.test.refunded', 'android.test.item_unavailable',
    // 'point_1000', '5000_point', // dooboolab
  ]
});

export default class Invoice extends React.Component {

  

  constructor(props){
    super(props);
    this.state={
      count:0,
      price:0,
      practitioneremail:"",
      gotdata:false,
      showpaypal:false,
      successfulltrans:false,
      useremail:"",
      successvisible:false,
      singlecheckout:false,
      funcount:0
    }
  }



  componentDidMount(){
    
   // const rrrr=await RNIap.initConnection().then(res=>console.log('connection....'+res))
    
    const { navigation } = this.props;
    console.log("naviggateedd===>",navigation.getParam('count'),
    navigation.getParam('price'),navigation.getParam('pracmail'),navigation.getParam('usermail'))

    this.setState({count:navigation.getParam('count')})
    this.setState({price:navigation.getParam('price')})
    this.setState({practitioneremail:navigation.getParam('pracmail')})
    this.setState({useremail:navigation.getParam('usermail')})
  }
  hadlerespones(data){  
    console.log("checkout follow 0")
    var count=0
    console.log("statecounthere==>",this.state.count)
    if(data==='success'){
      this.setState({showpaypal:false})
      this.setState({successfulltrans:true})
     // this.setState({successvisible:true})
     console.log("checkout follow 1")
     if(this.state.count>1){
      const allorderofthi=firebase.database().ref("bucket")
      const allorderofthis=allorderofthi.orderByChild("buyer").equalTo(this.state.useremail);
      allorderofthis.on("value",snapshot=>{
        console.log("checkout follow 2")
        snapshot.forEach(child=>{
          console.log("checkout follow 3")
                console.log("checkout follow 4")
                if(child.val().practitioneremail===this.state.practitioneremail){
                  child.ref.update({
                    checkout:true,
                    checkout_time:new Date()
                  })
                  firebase.database().ref("notification").push(
                    {
                      datetime:new Date(),
                      email:this.state.useremail,
                      readed:false,
                      title:"You have purchased the information of practitoner you can check his profile now for full information"
                    }
                    ).then(()=>{
                      console.log("inserted!!!!");
                      this.buyItem('CCCAPP')

                    }).catch((error)=>{
                      console.log("Failed");
                    });
                }    
        })
      })
     }
     else{
      const allorderofthi=firebase.database().ref("bucket")
      const allorderofthis=allorderofthi.orderByChild("buyer").equalTo(this.state.useremail).limitToLast(1);
      if(this.state.funcount===0){
        console.log("funcconout==>",this.state.funcount)
      allorderofthis.on("value",snapshot=>{
        snapshot.forEach(child=>{
            child.ref.update({
              checkout:true,
              checkout_time:new Date()
            })
            
            firebase.database().ref("notification").push(
              {
                datetime:new Date(),
                email:this.state.useremail,
                readed:false,
                title:"You have purchased the information of practitoner you can check his profile now for full information"
              }
              ).then(()=>{
                console.log("inserted!!!!");
              }).catch((error)=>{
                console.log("Failed");
              });
            
    
        })
      })
    }
  this.setState({funcount:16})
     }
    }
    if(data==='cancel'){

      this.setState({successfulltrans:false})

    }

  }
 

  async purchaseproduct(){
    try {
      const purchase = await RNIap.buyProduct('CCCAPP');
      
      console.log("purchaseoutput=>>",purchase);
    //  console.log("recipeny===>",RNIap.requestReceiptIOS())
  
  const receiptBody = {
    'receipt-data': purchase.transactionReceipt,
    'password': 'Trrrrr@2333'   //secret key
  };
 
      const result = await RNIap.validateReceiptIos(receiptBody, false);
      console.log("purchase result===>",result);
      if(result.status!==0){
        this.hadlerespones('success')
        return "0"
      }    
      else{
        alert("Invalid Receipt!")
        return result.status
      }

    } catch (err) {
      if (err.message !== 'Cancelled.') {
        alert(err.message);
      }
     // console.warn(err.code, err.message);
  
      return "1";
    }
  }

  purchasefinish(){
   try{ 
    var k= this.purchaseproduct()
    

   }
   catch(e){
     console.log("purchaseerror=>",e)
   }
   /* if(this.purchaseproduct()===true)
    (
      this.hadlerespones('success')
    )
    else{
      alert("Error can't perform trasaction")
    }*/
  }

  render() {
    return (
    <View style={styles.container}>
      
    
      <Header backgroundColor="#fac1b8" centerComponent={{text:'Confirm Checkout', style:{color:'#fff',fontSize:20} }}
                   placement="center"></Header>

      <Nav navigate={this.props.navigation.navigate}></Nav>
      <View style={{backgroundColor:"#fac1b8",width:"100%",alignItems:'center',justifyContent:'center',paddingBottom:"4%"}}>
       <Text style={{fontSize:30,color:"#ffffff",marginTop:"9%"}}>Total Amount</Text>
       <Text style={{fontSize:60,color:"#ffffff"}}>£{Number((this.state.price).toFixed(2))}</Text>
       <Text style={{fontSize:20,color:"#ffffff"}}>Total Count</Text>
        <Text style={{fontSize:20,color:"#ffffff"}}>{this.state.count}</Text>
       </View>
       <Text style={{fontSize:18}}>
        This amount is for only providing you the details of practitioner and its your responsiblity to deal with the practitioner.
      </Text>
      
       <View style={{width:"100%",position:'absolute',bottom:0}}>
     
      <TouchableOpacity style={{width:"100%",backgroundColor:"#80635E",padding:10,marginTop:4,alignItems:'center'}}
      onPress={()=>this.purchasefinish()}>
        <Text style={{color:"#ffffff"}}>Continue</Text>
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

AppRegistry.registerComponent('Invoice',()=>Invoice)
