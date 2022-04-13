//import { create } from 'eslint/lib/rules/*';
import React, { useState } from 'react'
import { Platform, Alert, SafeAreaView, StatusBar, ImageBackground, ScrollView, Image, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, } from 'react-native'
import Menu from '../../components/Menu';
import UserContext from '../../contexts/UserContext'
import { Icon } from 'react-native-eva-icons';
import Video from 'react-native-video';
import { colorBack1, colorBack2, primaryColor, colorTertiary } from '../../Colors.js'
import { file_server1 } from '../../Env.js'
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';
import HTML from 'react-native-render-html';

function Procedure(props) {
  const userDetails = React.useContext(UserContext)
  const [agendar, setagendar] = useState(false)
  const [data, setdata] = useState(props.route.params.data)
  const [videoLoad, setVideoLoad] = useState(true)
  function goToScreen(screen, user, procedure) {
    console.log("go to new cita...")
    console.log("id cliente: ", user)
    props.navigation.navigate(screen, { randomCode: Math.random(), user, procedure })
  }
  const WindowAlert = () =>
    Alert.alert(
      "Por favor inicie sesión para continuar",
      "Si no tiene una cuenta, registrese",
      [
        {
          text: "Login",
          onPress: () => goToScreen('Login')
          // onPress: () => console.log("Ask me later pressed"),
        },
        {
          text: "Registrarme",
          onPress: () => goToScreen('Register')
        },
        {
          text: "Salir",
          onPress: () => console.log("OK Pressed"),
          style: "cancel"
        }
      ]
    );
  //end- init session to add item to car
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F3F3" }}>
      <StatusBar backgroundColor="#e8faff" barStyle="dark-content" />
      <ImageBackground source={require('../../src/images/background.png')} style={{ flex: 1, justifyContent: "flex-end", resizeMode: "cover", width: "100%", height: "100%" }}>
        <ScrollView>
          <Image
            style={style.banner}
            source={{ uri: `${file_server1}/img/category/picture/${props.route.params.data.img}` }}
          />

          {/* <Text style={style.info}>
          <Text style={[style.titles, { color: primaryColor }]}>{props.route.params.data.name}</Text>
          <Text style={style.information}>{"\n"}{"\n"}{props.route.params.data.information}{"\n"}</Text>
        </Text> */}

          <View style={{ marginBottom: 20, marginTop: -40, width: "100%", alignSelf: "center", borderRadius: 14, overflow: "hidden", alignContent: "center", alignItems: "center" }}>
            <View style={{ backgroundColor: "white", overflow: "hidden", borderRadius: 12, padding: 20, width: "90%" }}>
            
            <Text style={{color:primaryColor, fontSize:22, width:"100%", fontWeight:"bold", textTransform:"uppercase", marginBottom:15, textAlign:"center"}}>{props.route.params.data.name}</Text>
            
              <HTML html={`<style>p{ font-size: 450px !important }</style>${props.route.params.data.description}`} imagesMaxWidth={100} />
            </View>
          </View>
          <View style={{ alignContent: "center", alignItems: "center" }}>
            {
              userDetails.email == null &&
              <TouchableOpacity
                onPress={() => WindowAlert("DashboardPrp")}
                style={[style.BtnPrimary, { backgroundColor: primaryColor }]}>
                <Icon name='calendar-outline' width={20} height={20} fill='#fff' />
                <Text style={style.loginText}>Agendar Cita</Text>
              </TouchableOpacity>
            }
            {
              userDetails.email != null &&
              <TouchableOpacity
                onPress={() => goToScreen('NewCita', userDetails.id_cliente, props.route.params.data)}
                style={[style.BtnPrimary, { backgroundColor: primaryColor }]}>
                <Icon name='calendar-outline' width={20} height={20} fill='#fff' />
                <Text style={style.loginText}>Agendar Cita</Text>
              </TouchableOpacity>
            }
          </View>
          <View style={{ height: 20 }}></View>
          <View style={style.footSpace}></View>
        </ScrollView>
        <Menu props={{ ...props }} />
      </ImageBackground>
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
  banner: {
    width: "100%",
    height: 300,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35
  },
  info: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    margin: "4%",
    width: "92%",
    borderRadius: 15,
    textAlign: 'justify',
    color: "#555"
  },
  titles: {
    fontWeight: "bold"
  },
  BtnPrimary: {
    flexDirection: "row",
    width: "80%",
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    shadowOffset: {
      width: 10,
      height: 30,
    },
    shadowOpacity: 1.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  loginText: {
    fontSize: 16,
    marginLeft: 20,
    color: "white"
  },
  backgroundVideo: {
    flex: 1,
    //width:"80%",
    // height:"60%",
    //width:200,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "relative"
    //position:"absolute"
  },
})
export default Procedure;