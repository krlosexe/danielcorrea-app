import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-eva-icons';

import UserContext from '../contexts/UserContext'
import { primaryColor, colorLight } from '../Colors.js'


function App(props) {
  const userDetails = React.useContext(UserContext);
  const { navigation } = props.props


  function goToCar(screen, car, from) {
    props.updateCarLocal()
    navigation.navigate(screen, { randomCode: Math.random(), car, from })
  }

  function goToScreen(screen, data, shop) {
    navigation.navigate(screen, { randomCode: Math.random(), data, shop })
  }


  return (

    <ImageBackground source={require('../src/images/BGHeader.png')} style={styles.Background}>


      <View style={styles.up}>



        {/* <Image style={styles.icon} source={{uri: 'https://pielis.com/wp-content/uploads/2020/12/cropped-LOGO-PNG-3.png'}}/> */}
        <Image style={styles.icon} source={require('../src/images/Logo-blue.png')} />

      </View>






      <View style={styles.down}>

        <TouchableOpacity
          style={styles.btnL}
          onPress={() => goToScreen("Dashboard")}
        >
          <Icon name='chevron-left' width={25} height={25} fill={colorLight} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnR}
          onPress={() => goToCar("ShopCar", props.Car, "Shop2")}
        >
          {
            userDetails.email != null &&
            <Text style={styles.qty_car}>
              {
                props.Car == undefined ? "0" : props.Car.length
              }</Text>
          }
          <Icon name='shopping-cart-outline' width={25} height={25} fill={colorLight} />
        </TouchableOpacity>

      </View>



    </ImageBackground>


  )
}
export default App;

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },

  up: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    top: 5,
    width: 130,
    height: 130,
    resizeMode: "contain"
  },



  down: {
    height: 40,
    top: -10,
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",

  },

  btnL: {
    width: "50%",
    marginLeft:15
  },


  btnR: {
    top: -10,
    width: "50%",
    alignContent: "flex-end",
    alignItems: "flex-end",
    marginRight:25
  },



  qty_car: {
    color: colorLight,
    marginLeft: 0,
    marginBottom: -5,
    fontWeight: "bold",
    width: 30,
    textAlign: "center",
    left:3
  },






})

