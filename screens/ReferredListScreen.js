import React, { useState, useEffect } from 'react'
import { ImageBackground, View, StatusBar, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text, } from 'react-native'
import Profile from '../components/Profile/Index'
import RoundButton from '../components/RoundButton/Index'
import axios from 'axios'
import UserContext from '../contexts/UserContext'
import Head from '../components/Head';
import { Api, base_url } from '../Env'
import { Icon } from 'react-native-eva-icons';
import SearchBar from '../components/SearchBar/Index'
import Toast from 'react-native-simple-toast';
import { primaryColor, colorBack1, colorBack2, colorLight, } from '../Colors.js'
import Loading from '../components/loading.js'
import LinearGradient from 'react-native-linear-gradient';

function ReferredListScreen(props) {
  const [display, setDisplay] = React.useState('all')
  const [refferers, setRefferers] = React.useState([])
  const [Load, setLoad] = React.useState(false)
  const userDetails = React.useContext(UserContext)
  const [searchText, setSearchText] = React.useState('')
  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }

  React.useEffect(() => {
    List(),
      console.log("111")
  }, [searchText])

  React.useEffect(() => {
    List(),
      console.log("222")
  }, [randomCode])

  function List() {
    console.log("????")
    setLoad(true)
    console.log(base_url(Api, `v2/prp/refferers/${userDetails.id_cliente}/${searchText}`))
    axios.get(base_url(Api, `v2/prp/refferers/${userDetails.id_cliente}/${searchText}`))
      .then((res) => {
        // console.log(res.data)
        setRefferers(res.data)
        setLoad(false)
      }).then(() => {
        //. . . 
      }).catch((error) => {
        // console.log(error)
        setLoad(false)
      })
    setTimeout(() => {
      StatusBar.setHidden(true);
    }, 2000)
  }

  function changeQueryParam(value) { setDisplay(value) }
  const { navigation } = props
  function goToScreen(screen, data) { navigation.navigate(screen, data) }
  const [totalReffers, settotalReffers] = useState(0)

  useEffect(() => {
    conntador()
  }, [refferers]);

  function conntador() {
    let i
    let grupos = refferers.length
    let Count = 0
    for (i = 0; i < grupos; i++) {
      Count = Count + refferers[i].child.length
    }
    settotalReffers(Count)
  }
  function showreferidos() {
    Toast.show("Usted tiene " + totalReffers + " referidos")
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F3F3" }}>
      <StatusBar backgroundColor="#e8faff" barStyle="dark-content" />
      <ImageBackground source={require('../src/images/background.png')} style={{ flex: 1, justifyContent: "flex-end", resizeMode: "cover", width: "100%", height: "100%" }}>
        {
          totalReffers > 0 &&
          <TouchableOpacity

            onPress={() => showreferidos()}
            style={{

              position: "absolute", zIndex: 3,
              flexDirection: "row",
              top: 115,
              left: 15,
            }}>
            <View style={{
              width: 25,
              height: 25,
              alignItems: "center",
              backgroundColor: primaryColor,
              alignContent: "center",
              borderRadius: 15,
              borderColor: "white",
              borderWidth: 1
            }}>
              <Text style={{ lineHeight: 20, color: "white" }}>{totalReffers}</Text>
            </View>
            <Text style={{ left: 5, lineHeight: 25, color: "white" }}>Referidos</Text>
          </TouchableOpacity>
        }
        <ScrollView>
          <Head name_user={userDetails.nombres} />
          <View style={{ ...styles.content, paddingVertical: (userDetails.type_user === 'Asesor') ? 70 : 10 }} >
            <SearchBar setSearchText={setSearchText} />
            {
              Load &&
              <View style={{ marginTop: 100 }}>
                <Loading color={primaryColor} />
              </View>
            }
            {totalReffers === 0 && !Load && searchText === "" &&
              <View style={{ width: "100%", marginTop: "25%", justifyContent: "center", alignItems: "center" }}>

                <View style={{ width: "90%", borderColor: primaryColor, borderWidth: 1, borderRadius: 12, borderStyle: "dashed", padding: 20, }}>
                  <Text style={{ color: primaryColor, fontSize: 16, textAlign: "center", fontWeight: "bold" }}>Aun no tienes referidos.</Text>
                </View>
              </View>
            }
            {totalReffers === 0 && !Load && searchText !== "" &&
              <View style={{ width: "100%", marginTop: "25%", justifyContent: "center", alignItems: "center" }}>

                <View style={{ width: "90%", borderColor: primaryColor, borderWidth: 1, borderRadius: 12, borderStyle: "dashed", padding: 20, }}>
                  <Text style={{ color: primaryColor, fontSize: 16, textAlign: "center", fontWeight: "bold" }}>No se han encontrado registros en esta búsqueda.</Text>
                </View>
              </View>
            }
            {
              refferers.length > 0 && !Load && searchText == '' &&
              refferers.map((index, key) => { return <Group key={key} i={index} props={props} /> })
            }
            {
              refferers.length > 0 && !Load && searchText !== '' &&
              refferers.map((index, key) => {
                return index.child.map((c, key) => {
                  return (
                    <TouchableOpacity
                      onPress={
                        () => goToScreen('RefferedDetailScreen', {
                          "item":
                          {
                            "id": c.id_cliente,
                            "nombres": c.nombres,
                            "name_affiliate": userDetails.nombres,
                            "telefono": c.telefono,
                            "email": c.email,
                          }
                        })
                      }
                      key={key}
                      style={{ borderColor: primaryColor, borderWidth: 1, borderRadius: 12, overflow: "hidden", marginBottom: 5, width: "90%" }}
                    >
                      <Text style={{ backgroundColor: primaryColor, paddingHorizontal: 20, paddingVertical: 5, color: "white", fontSize: 14, fontWeight: "bold" }}>Grupo: {c.state}</Text>
                      <Profile name={c.nombres} name_affiliate={userDetails.nombres} state={c.state} />
                    </TouchableOpacity>)
                })
              })
            }
            {
              refferers.length == 0 && !Load &&
              <View style={{ marginTop: 50, borderColor: "#777", borderWidth: 1, width: "90%", height: 60, borderRadius: 20, borderStyle: 'dashed', }}>
                <Text style={{ lineHeight: 35, textAlign: "center", marginTop: 10 }}>No hay datos cargados</Text>
              </View>
            }
          </View>
        </ScrollView>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          height: 60,
          paddingBottom: 30,
        }} >
          <RoundButton onPressHandler={() => goToScreen('AddReffererScreen')} icon='plus-outline' />
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}


function Group(props) {
  const { navigation } = props.props
  const userDetails = React.useContext(UserContext)
  const [open, setOpen] = useState(false)
  function goToScreen(screen, data) { navigation.navigate(screen, data) }
  if (props.i.child.length > 0) {
    return (
      <View style={{ width: "90%", marginLeft: "3%", marginTop: 10 }}>
        <TouchableOpacity onPress={() => { setOpen(!open) }} style={{ width: "94%", marginLeft: "3%", backgroundColor: primaryColor, height: 40, padding: 5, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: (open === true) ? 0 : 10, borderBottomRightRadius: (open === true) ? 0 : 10 }}  >
          <View style={{ color: "#FFF", fontSize: 16, fontWeight: "bold", lineHeight: 28, flexDirection: "row", }}>
            <Icon style={{ marginLeft: 5, marginRight: 5 }} name={open === false ? 'arrow-ios-downward-outline' : 'arrow-ios-upward-outline'} top={5} width={20} height={20} fill='#FFF' />
            <Text style={{ fontSize: 18, color: "#FFF", fontWeight: "bold", textTransform: "capitalize" }}>{props.i.name}</Text>
            <Text style={{ fontSize: 12, color: "#FFF", lineHeight: 28 }}> ({props.i.child.length} personas)</Text>
          </View>
        </TouchableOpacity>
        {open == true &&
          <View style={{
            top: 8,
            paddingBottom: -5,
            width: "94%",
            marginLeft: "3%",
            marginTop: -10,
            marginBottom: 5,
            borderColor: primaryColor,
            borderWidth: 2,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            padding: 5
          }}>
            {
              props.i.child.length == 0 &&
              <View style={{ width: "80%", margin: 5, marginLeft: "10%", borderColor: "#c3c3c3", borderWidth: 2, padding: 10, borderRadius: 20, borderStyle: 'dashed', textAlign: "center", }}>
                <Text style={{ opacity: 0.5, textAlign: "center", width: "100%", color: "#777", textTransform: "uppercase", fontSize: 16, }}>Grupo vacío</Text>
              </View>
            }
            {
              props.i.child.map((item, key) => {
                return <TouchableOpacity
                  onPress={
                    () => goToScreen('RefferedDetailScreen', {
                      "item":
                      {
                        "id": item.id_cliente,
                        "nombres": item.nombres,
                        "name_affiliate": userDetails.nombres,
                        "telefono": item.telefono,
                        "email": item.email,
                        "interes": item.interes,
                        "city": item.city
                      }
                    })
                  }
                  key={key}>
                  <Profile name={item.nombres} name_affiliate={userDetails.nombres} state={item.state} />
                  {/* <Divider /> */}
                </TouchableOpacity>
              })
            }
          </View>
        }
      </View>
    )
  } else { return <></> }
}
export default ReferredListScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colorBack2,
    paddingTop: 0,
  },
  scroll: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    width: "100%",
    flex: 1,
    flexDirection: 'column',
    alignContent: "center",
    alignItems: "center"
  },
  buttonsTabsContainer: {
    position: 'absolute',
    flexDirection: 'row'
  },
  buttonTab: {
    backgroundColor: primaryColor,
    height: 50,
    width: '50%',
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  }
});