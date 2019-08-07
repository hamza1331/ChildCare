import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,AppRegistry,Image,TextInput,Button} from 'react-native';


export default class Loader extends React.Component {

  constructor(props){
    super(props);
  }
 

  render() {
    return (
    <View style={styles.container}>
     <Text>I Your loading screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14d1bb',
    alignItems: 'center',
    
  }
});

AppRegistry.registerComponent('Loader',()=>Loader)
