import React from 'react';
import {
  View, Dimensions,
  Text, ImageBackground,
  Image, TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  primaryColor, colorSecundary, colorTertiary, colorSilver, colorBack, colorDark, colorLight, disableColor, primaryColorOpacity, TextDark, TextLight, modalBack
} from '../Colors.js'
import { Icon } from 'react-native-eva-icons';


function App(props) {

console.log("from: ", props.fromScreen)
  // const windowWidth = Dimensions.get('window').width;
  // const windowHeight = Dimensions.get('window').height;
  // console.log("H:", windowHeight, " x W: ", windowWidth)




  return (
    <View style={styles.wrap}>
      <ImageBackground source={require('../src/images/BGHeader.png')} style={styles.Background}>
        <View style={styles.up}>
          <View style={styles.wrapText}>
            <Text style={styles.text_head}>
              {props.name_user}
            </Text>
          </View>
          <View syle={styles.wrapImg}>
            <Image
              style={styles.img}
              source={require('../src/images/Logo-blue.png')}
            />
          </View>
        </View>

     <View style={styles.down}>
          <TouchableOpacity >
            <Icon name='arrow-ios-back-outline' width={20} height={20} fill={colorLight} />
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={styles.btnCar}>
              <Text style={styles.btnText}>{props.countCar}</Text>
              <Icon name='shopping-cart-outline' width={20} height={20} fill={colorLight} />
            </View>
          </TouchableOpacity>
        </View> 

      </ImageBackground>
    </View>
  )
}
export default App;

const styles = StyleSheet.create({
  wrap: {
    height: 170,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  Background: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  up: {
    flexDirection: "row",
    top: 0,
    height: 100,
    overflow: "hidden"},
  wrapText: {
    height: "50%",

    width: "60%",
    padding: 10,
    justifyContent: "center",
  },
  text_head: {
    textAlign: "center",
    left: -20,
    top: 20,
    color: primaryColor,
    fontSize: 17,
    textTransform: "capitalize"
  },
  wrapImg: {
    flex: 1,
    width: "40%",
    backgroundColor: "yellow"
  },
  img: {
    marginRight: 20,
    top: 0,
    width: 110,
    height: 110,
    resizeMode: "contain",
  },
  down: {
    opacity:0,
    flexDirection: "row",
    height: 50,
    top: 0,
    paddingTop:5,
    overflow: "hidden",
    paddingHorizontal: 15,
    justifyContent: "space-between", 
    position:"relative",
    zIndex:99
  },
  btnCar: {
    height:40,
    marginTop: -10,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  btnText: {
    color: colorLight,
    fontSize: 10
  }

})