import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import {primaryColor} from '../../Colors'

function Index(props){

  return <TouchableOpacity style={styles.container} onPress={()=>props.onPressHandler()}>
           <View style={styles.item}>
             <Icon name={props.icon} width={20} height={20} fill='white'/>
           </View>
   </TouchableOpacity>
}


export default Index


const styles = StyleSheet.create({
   item : {
       backgroundColor : primaryColor,
       width : 50,
       height : 50,
       borderRadius : 25,
       marginHorizontal : 10,
       display : 'flex',
       justifyContent : 'center',
       alignItems : 'center'
   }
 });

 