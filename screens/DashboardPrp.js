/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ImageBackground
} from 'react-native';

import Head from '../components/Head';
import BigIcon from '../components/BigIcon'
import Menu from '../components/Menu';
import UserContext from '../contexts/UserContext'
import {primaryColor,colorBack} from '../Colors.js'


import PRPinfo from '../components/prpinfo'

function App(props) {

  const userDetails = useContext(UserContext)

  const { navigation } = props
  function goToScreen(screen) {
    navigation.navigate(screen)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F3F3" }}>
    <StatusBar backgroundColor="#e8faff" barStyle="dark-content" />
    <ImageBackground source={require('../src/images/background.png')} style={{ flex: 1, justifyContent: "flex-end", resizeMode: "cover", width: "100%", height: "100%" }}>
      <ScrollView>
        <Head name_user={userDetails.nombres} />

        <View style={stylesPrp.gridIcons}>
          <View style={{ flexDirection: "row" }}></View>
          <BigIcon label='Mis Referidos' icon='people-outline' onPress={() => goToScreen('ReferredListScreen')} />
          <BigIcon label='Posts' icon='archive-outline' onPress={() => goToScreen('PostsDetailScreen')} />
          {
            //<BigIcon label='Estadisticas' icon='trending-up-outline' onPress={() => goToScreen('ChartsScreen')} />
            //<BigIcon label='Saldo' icon='credit-card-outline' onPress={()=>goToScreen('PostsDetailScreen')}/>
          }
        </View>

      </ScrollView>




   
      <PRPinfo />
           






      
      <Menu props={{ ...props }} />
      </ImageBackground>
    </SafeAreaView>

  )
}


const stylesPrp = StyleSheet.create({

  scroll: {
    flex: 1,
    flexDirection: 'column',
  },

  content: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  gridIcons: {

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 30
  }
});


export default App;