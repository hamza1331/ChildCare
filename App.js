import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './login';
import Signupotp from './signupoption'
import Signup from './signup'
import Signuppract from './signuppractitioner'
import Home from './home'
import Prprofile from './practitionerprofile'
import Userprofile from './userprofile'
import Editprofile from './editprofile'
import Bucket from './bucket'
import Invoice from './invoice'
import Fullprofile from './fullprofile'
import Notification from './notification'
import Buckethistory from './buckethistory'
import {createStackNavigator,createAppContainer} from 'react-navigation'




class App extends React.Component {

  gotoScreen=(name)=>{
    this.props.navigation.navigate(name)
  }
  render() {
    return (
      
        <Login gotoscreen={this.gotoScreen}></Login>
      
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const AppNavigator = createStackNavigator({
  Home: {
    screen: Login
  },
  LOGIN: {
    screen:Login
  },
  SIGNUPOPT: {
    screen:Signupotp
  },
  PARENTSIGNUP: {
    screen:Signup
  },
  PRACTITIONERSIGNUP: {
    screen:Signuppract
  },
  MAIN: {
    screen:Home
  },
  PRPROFILE: {
    screen:Prprofile
  },
  USERPROFILE: {
    screen: Userprofile
  },
  EDITPROFILE: {
    screen: Editprofile
  },
  BUCKET :{
    screen: Bucket
  },
  INVOICE: {
    screen:Invoice
  },
  FULLPROFILE: {
    screen:Fullprofile
  },
  NOTIFICATION:{
    screen:Notification
  },
  BUCKETHISTORY:{
    screen:Buckethistory
  }
},{
  headerMode: 'none',
  
  navigationOptions: {
    headerVisible: false,
  }
 }
);

export default createAppContainer(AppNavigator);