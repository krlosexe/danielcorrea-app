import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { primaryColor } from '../Colors.js'



function Index(props) {

  return <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <Text style={styles.label}>{props.label}</Text>



    <View style={styles.item}>
      <View style={styles.stroke}>
        <Icon name={props.icon} width={48} height={48} fill='white' />
      </View>
    </View>


  </TouchableOpacity>
}


export default Index


const styles = StyleSheet.create({
  label: {
    color: 'black',
    fontSize: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: "center"
  },

  item: {
    padding: 6,
    backgroundColor: primaryColor,
    width: 80,
    height: 90,
    borderRadius: 10,
    marginHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  stroke: {
    borderStyle: "dashed",
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 2,
    borderRadius: 8
  },

  container: {
  }
});