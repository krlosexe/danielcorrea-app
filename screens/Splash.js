import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Image, StyleSheet, StatusBar, Text, ImageBackground } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { primaryColor } from '../Colors.js'
import { token_wompi } from '../Env.js';

function Index(props) {

  const [loaded, setLoaded] = useState(false)

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          resizeMode: "cover",
          width: "100%",
          height: "100%",
          alignItems: "center",
          alignContent: "center"
        }}>







        <ActivityIndicator
          style={{
            top: 3,
            left: 3
          }}
          size={120}
          color={primaryColor}
        />





        <Image
          style={{
            width: 65,
            height: 65,
            resizeMode: "contain",
            //marginBottom: 40,
            // backgroundColor:"rgba(255,0,0,0.5)",
            top: -90, left: 3
          }}
          source={require('../src/images/isotype_blue.png')}
        />


        <View style={{

justifyContent:"center", alignContent:"center", alignItems:"center",
marginTop:60, display:"none"
        }}>
          <Text style={{
            color: primaryColor,
            fontWeight: "bold", textTransform: "uppercase", fontSize: 15
          }}>Daniel Andres Correa Posada</Text>

          <Text style={{
            color: primaryColor, textTransform: "uppercase", fontSize: 10
          }}>cirijano plástico</Text>
        </View>

        
        {/* <Image
        style={styles.icon}
        source={require('../src/images/Logo-blue.png')}
      />  */}







      </View>
    </View>
  )
}
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    marginBottom: 40
  }
});


