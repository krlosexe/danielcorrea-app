import React, { useContext } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity } from 'react-native';
import Head from '../components/Head';
import OptionsHead from '../components/OptionsHead';
import Menu from '../components/Menu';
import InitProcess from '../components/InitProcess';
import Venues from '../components/Venues';
import News from '../components/News';
import UserContext from '../contexts/UserContext'
import { primaryColor, colorBack1, colorBack2, colorLight } from '../Colors.js'
import Emergency from '../components/Emergency.js'


function App(props) {
  const { navigation } = props
  const userDetails = useContext(UserContext)
  function goToScreen(screen) {
    navigation.navigate(screen)
    console.log("go:", screen)

  }
  function goToCar() {
    console.log("go car")
    // navigation.navigate(screen)

  }



  console.log("user: ", userDetails)


  // props.goToScreen1
  // props.goToScreen2
  // props.countCar

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F3F3" }}>
      <StatusBar backgroundColor="#e8faff" barStyle="dark-content" />
      <ImageBackground source={require('../src/images/background.png')} style={{ flex: 1, justifyContent: "flex-end", resizeMode: "cover", width: "100%", height: "100%" }}>
      <ScrollView>

        <Head name_user={userDetails.nombres} />
        <OptionsHead props={props} />

        <InitProcess props={props} />

       



        {/*  
<TouchableOpacity
 onPress={() => goToScreen("Splash")}
>
  <Text>ver</Text>
</TouchableOpacity> */}




        <Venues props={{ ...props }} />

        <Emergency props={{ ...props }} />

        
        <News props={{...props}} />
      </ScrollView>
      <Menu props={{ ...props }} />
      </ImageBackground>
    </SafeAreaView >
  )
}
export default App;