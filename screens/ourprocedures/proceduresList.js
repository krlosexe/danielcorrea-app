import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList
} from 'react-native';
import Menu from '../../components/Menu';
import { Icon } from 'react-native-eva-icons';
import UserContext from '../../contexts/UserContext'
import { AllProcedures } from '../../components/processItemShop'
import Head from '../../components/Head';
import { colorBack1, colorBack2, primaryColor, primaryColorOpacity } from '../../Colors.js'
import Loading from '../../components/loading.js'
import LinearGradient from 'react-native-linear-gradient';




function ProceduresList(props) {


  const [Load, setLoad] = useState(true)
  const [allPro, setAllPro] = useState([])
  const userDetails = useContext(UserContext)
  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }





  useEffect(() => {
    Get()
  }, [randomCode])

  async function Get() {
    const pro = await AllProcedures()

    await setLoad(false)
    setAllPro(pro)

  }




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F3F3" }}>
      <StatusBar backgroundColor="#e8faff" barStyle="dark-content" />
      <ImageBackground source={require('../../src/images/background.png')} style={{ flex: 1, justifyContent: "flex-end", resizeMode: "cover", width: "100%", height: "100%" }}>
      <ScrollView>
       <Head name_user={userDetails.nombres} />



          {
            Load == true &&
            <View style={{ marginTop: 80 }}>
              <Loading color={primaryColor} />
            </View>
          }
          <View style={{ alignContent: "center", alignItems: "center" }}>
            {!Load &&
              <FlatList

                data={allPro}
                numColumns={2}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => (
                  <Card i={item} key={index} props={{ ...props }} width={140} height={200} mt={80} />
                )}
              />
            }
          </View>

      </ScrollView>
      <Menu props={{ ...props }} />
      </ImageBackground>
    </SafeAreaView>

  )
}


function Card(props) {
  const [show, setShow] = useState(false)
  const userDetails = React.useContext(UserContext)
  const { navigation } = props
  function goToScreen(screen, id, from) {
    let data = id.child
    props.props.navigation.navigate(screen, { randomCode: Math.random(), data, from })
    console.log("go to...")
  }

  return (
    <View style={[style.wrapCard, { width: props.width, height: props.height }]}>

      {
        show == false &&
        <TouchableOpacity style={style.btnCard} onPress={() => goToScreen('ProceduresView', props.i, props.i.name)}>
          <Text style={[style.textCar, style.textFront, { marginTop: props.mt }]}>{props.i.name}</Text>
        </TouchableOpacity>
      }
      {/* {
        show == true &&
        <View>
          <TouchableOpacity style={style.btnCard} onPress={() => setShow(!show)}>
            <Text style={[style.textCar, style.textBack]}>{props.i.description}</Text>

            <Text style={[style.textCar, style.textBack]}>{props.i.description}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => goToScreen('ProceduresView', props.i, props.i.name)}
            style={style.btnViewMore}>
            <Icon style={{ top: 5, right: 5 }} name='edit-outline' width={30} height={30} fill={primaryColor} />
            <Text style={{ lineHeight: 40, color: primaryColor }}>Ver mas</Text>
          </TouchableOpacity>
        </View>
      }
      {
        show == true &&
        <View style={{ backgroundColor: primaryColorOpacity, width: "100%", height: "100%", position: "absolute", zIndex: -1, filter: `blur(20px)`, }}></View>
      } */}
      <Image
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -2
        }}
        source={{ uri: props.i.img }} />
    </View>
  )
}

const style = StyleSheet.create({




  wrapCard: {
    margin: 15,
    maxHeight: 280,
    justifyContent: "space-between",
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3, },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,

  },



  btnCard: {
    width: "100%",
    padding: 10,
    justifyContent: "center",
  },





  textCar: {
    textAlign: "center",
    fontWeight: "bold",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    textShadowColor: 'rgba(0,0,0,0.5)',
  },

  textFront: {
    textTransform: "capitalize",
    position: "relative",
    color: "#FFF",
    fontSize: 20,
  },


  textBack: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "bold"
  },

  btnViewMore: {
    position: "absolute",
    bottom: -40,
    left: 40,
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: 100,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
  },


});

export default ProceduresList;