import React, { useEffect, useContext, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  ImageBackground
} from 'react-native';
import Menu from '../components/Menu';
import { Icon } from 'react-native-eva-icons';
import Head from '../components/Head';
import { AllProcedures, AddCita, getSedes, getCitasByClient } from '../components/processItemShop'
import Toast from 'react-native-simple-toast';
import { primaryColor, disableColor, colorBack, colorLight } from '../Colors.js'

function NewCita(props) {
  const { navigation } = props
  const [load, setload] = useState(true)
  const [user, setUser] = useState(0)
  const [ProcedimientosList, setProcedimientosList] = useState(0)
  const [Father, setFather] = useState(false)
  const [OptionsF, setOptionsF] = useState(false)
  const [Child, setChild] = useState(false)
  const [OptionsC, setOptionsC] = useState(false)
  const [CentroList, setCentroList] = useState(false)
  const [Centro, setCentro] = useState(false)
  const [OptionsS, setOptionsS] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [ExistCita, setExistCita] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)//show modal

  function goToScreen(screen) {
    navigation.navigate(screen, { randomCode: Math.random() });
  }

  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = 1 }

  useEffect(() => {
    Get()
    setUser(props.route.params.user)
    getCitasByClient(props.route.params.user).then((data)=>{
      setExistCita(data.data)
    })
  
  }, [randomCode]);


  async function Get() {
    console.log("Get()");
    const response = await getSedes()
    setCentroList(response)
    if (props.route.params.procedure === 0) {
      const prp = await AllProcedures()
      setProcedimientosList(prp)
    }
    else {
      console.log("hijo recibido")
      setChild(props.route.params.procedure)
    }
    setload(false)
  }

  const [display, setdisplay] = useState(false);
  const [listTitle, setlistTitle] = useState("");
  const [getF, setgetF] = useState(false);
  const [getP, setgetP] = useState(false);
  const [getS, setgetS] = useState(false);
  function SelectFather() {
    setdisplay(true);
    setlistTitle("Seleccione el tipo de tratamiento");
    setgetF(true);
    setgetP(false);
    setgetS(false);
  }
  function getFather(e) {
    setFather(e)
    setdisplay(false)
    setgetF(false);
    setgetP(false);
    setgetS(false);
  }
  function SelectChild() {
    setdisplay(true);
    setlistTitle("Seleccione el tratamiento deseado");
    setgetF(false);
    setgetP(true);
    setgetS(false);
  }
  function getChild(e) {
    setChild(e)
    setdisplay(false)
    setgetF(false);
    setgetP(false);
    setgetS(false);
  }
  function SelectListSede() {
    setdisplay(true);
    setlistTitle("Seleccione una de nuestras sedes");
    setgetF(false);
    setgetP(false);
    setgetS(true);
  }
  function getSede(e) {
    setCentro(e);
    setdisplay(false);
    setgetF(false);
    setgetP(false);
    setgetS(false);
    setDisabled(false);
  }

  function AddNewCita() {
    AddCita(user, Child.id, Centro.id)
    Toast.show("Solicitud de cita enviada")
    setSendSuccess(true)
    setTimeout(() => {
      Bye();
      goToScreen('Dashboard');
    }, 10000)
  }

  function Bye() {
    console.log("bye")
    setUser(0)
    setProcedimientosList(0)
    setFather(false)
    setOptionsF(false)
    setChild(false)
    setOptionsC(false)
    setCentroList(false)
    setCentro(false)
    setOptionsS(false)
    setDisabled(true)
    setSendSuccess(false)
    setload(true)
    goToScreen("Home")
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F3F3" }}>
      <StatusBar backgroundColor="#e8faff" barStyle="dark-content" />
      <ImageBackground source={require('../src/images/background.png')} style={{ flex: 1, justifyContent: "flex-end", resizeMode: "cover", width: "100%", height: "100%" }}>
        <ScrollView style={{ backgroundColor: colorBack }}>
          <Head name_user="Registro de citas" />
          {/* 
        <View style={{ borderColor: "silver", borderWidth: 2, padding: 10, top: 5, alignContent: "center", alignItems: "center", width: "90%", alignSelf: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Text>data?: </Text><Text>{ProcedimientosList.length > 0 ? "listo" : "cargando"}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>ProcedimientosList: </Text><Text>{ProcedimientosList !== 0 ? "fill" : "emtyp"}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>CentroList: </Text><Text>{CentroList !== 0 ? "fill" : "emtyp"}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Father:</Text><Text>{Father.name}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>tratamiento:</Text><Text>{Child.name}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>sede:</Text><Text>{Centro.name}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>user:</Text><Text>{user}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>getF:</Text><Text> {getF?"true":"false"} - </Text>
            <Text>getP:</Text><Text> {getP?"true":"false"} - </Text>
            <Text>getS:</Text><Text> {getS?"true":"false"} - </Text>
          </View>
        </View> */}
          {
            load &&
            <ActivityIndicator style={{ marginTop: 20 }} size="large" color={primaryColor} />
          }
          {!load && !ExistCita &&
            <View style={style.wrap}>
              {
                props.route.params.procedure === 0 && ProcedimientosList !== 0 &&
                <View style={[style.group, { borderColor: primaryColor }]}>
                  <Text style={[style.text1, { color: primaryColor }]}>Seleccione el tipo de Tratamiento:</Text>
                  <TouchableOpacity onPress={() => SelectFather()}>
                    {
                      Father !== null &&
                      <Text>{Father.name}</Text>
                    }
                    {
                      Father == false &&
                      <Text>Seleccionar el tipo de tratamiento</Text>
                    }
                  </TouchableOpacity>
                </View>
              }
              {
                Father !== false &&
                <TouchableOpacity onPress={() => SelectChild()}>
                  <View style={[style.group, { borderColor: primaryColor }]}>
                    <Text style={[style.text1, { color: primaryColor }]}>Seleccione el Tratamiento:</Text>
                    {Child !== false && <Text> {Child.name}</Text>}
                    {Child === false && <Text>Seleccionar el tratamiento</Text>}
                  </View>
                </TouchableOpacity>
              }
              {
                props.route.params.procedure !== 0 &&
                <View style={[style.group, { borderColor: primaryColor }]}>
                  <Text style={[style.text1, { color: primaryColor }]}>Nombre de Tratamiento:</Text>
                  {Child !== false && <Text> {Child.name}</Text>}
                  {Child === false && <Text>Seleccionar el tratamiento</Text>}
                </View>
              }
              {
                Child != false &&
                <View style={[style.group, { borderColor: primaryColor }]}>
                  <Text style={[style.text1, { color: primaryColor }]}>Seleccione una de nuestras sedes:</Text>
                  <TouchableOpacity onPress={() => SelectListSede()}>
                    {
                      Centro == false &&
                      <Text> Seleccionar la sede </Text>
                    }
                    {
                      Centro != false &&
                      <Text> {Centro.name}</Text>
                    }
                  </TouchableOpacity>
                </View>
              }
              {!disabled &&
                <TouchableOpacity
                  disabled={disabled}
                  onPress={() => AddNewCita()}
                  style={[style.BtnPrimary, { backgroundColor: disabled ? disableColor : primaryColor }]}>
                  <Icon name='checkmark-circle-2' width={20} height={20} fill={disabled ? '#555' : '#fff'} />
                  <Text style={[style.loginText, disabled ? style.textOff : style.textOn]}
                  >Agendar Cita</Text>
                </TouchableOpacity>
              }
            </View>
          }


          {!load && ExistCita &&

            <View style={style.wrap}>
                <View style={{ alignItems: "center", backgroundColor: "#FFF", width: "80%", borderRadius: 20, padding: 20, alignSelf: "center", alignContent: "center" }}>
                  <Text style={{ marginTop: 10, textAlign: "center", }}>¡La solicitud de tu cita esta siendo procesada!</Text>
                  <TouchableOpacity style={{ borderRadius: 10, marginTop: 20, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "#015093" }} onPress={() => Bye()}   >
                    <Text style={{ color: "#FFF", fontSize: 19 }}>INICIO</Text>
                  </TouchableOpacity>
                </View>
            </View>
           
          }
        </ScrollView>
      </ImageBackground>
      <Menu props={{ ...props }} />
      {
        sendSuccess &&
        <View style={{ justifyContent: 'center', backgroundColor: "rgba(0,0,0,0.5)", width: "100%", height: "100%", position: "absolute", zIndex: 9 }}>
          <View style={{ alignItems: "center", backgroundColor: "#FFF", width: "80%", borderRadius: 20, padding: 20, alignSelf: "center", alignContent: "center" }}>
            <Icon name='checkmark-circle-outline' width={70} height={70} fill="#015093" />
            <Text style={{ marginTop: 10, textAlign: "center", }}>Tu solicitud fue enviada satisfactoriamente, nuestro quipo de revisiones se encargara de agendar tu cita, la cual sera confirmada con una notificacion.</Text>
            <TouchableOpacity style={{ borderRadius: 10, marginTop: 20, paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "#015093" }} onPress={() => Bye()}   >
              <Text style={{ color: "#FFF", fontSize: 19 }}>INICIO</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      <Modal animationType="slide" transparent={true} visible={display}>
        <View style={{ position: "absolute", zIndex: 999, flex: 1, backgroundColor: "rgba(0,0,0,0.5)", width: "100%", height: "100%", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity onPress={() => setdisplay(!display)} style={{ position: "absolute", top: 10, right: 10 }} >
            <Icon name="close-circle-outline" fill={colorLight} width={25} height={25} />
          </TouchableOpacity>
          <View style={{ backgroundColor: colorLight, padding: 15, borderRadius: 12, width: "90%", overflow: "hidden", maxHeight: "90%" }}>
            <Text style={{ textAlign: "center", width: "100%", color: primaryColor, fontSize: 20, fontWeight: "bold" }}>{listTitle}</Text>
            <ScrollView>

              {load === false && getF === true &&
                ProcedimientosList.map((i, key) => {
                  return (
                    <TouchableOpacity key={key}
                      onPress={() => getFather(i)}
                      style={{ padding: 15, borderBottomColor: "silver", borderBottomWidth: 1 }}>
                      <Text style={{ textAlign: "center", width: "100%", fontSize: 14, fontWeight: "bold" }}>{i.name}</Text>
                    </TouchableOpacity>
                  )
                })
              }
              {load === false && getP === true &&
                Father.child.map((i, key) => {
                  return (
                    <TouchableOpacity key={key}
                      onPress={() => getChild(i)}
                      style={{ padding: 15, borderBottomColor: "silver", borderBottomWidth: 1 }}>
                      <Text style={{ textAlign: "center", width: "100%", fontSize: 14, fontWeight: "bold" }}>{i.name}</Text>
                    </TouchableOpacity>
                  )
                })
              }
              {load === false && getS === true &&
                CentroList.map((i, key) => {
                  return (
                    <TouchableOpacity key={key}
                      onPress={() => getSede(i)}
                      style={{ padding: 15, borderBottomColor: "silver", borderBottomWidth: 1 }}>
                      <Text style={{ textAlign: "center", width: "100%", fontSize: 14, fontWeight: "bold" }}>{i.name}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
  wrap: {
    padding: 3,
    paddingHorizontal: 20,
    marginTop: 40,
    margin: "4%",
    width: "90%",
    borderRadius: 15,
    textAlign: 'justify',
    color: "#555"
  },
  group: {
    flexDirection: "column",
    marginBottom: 20,
    borderBottomWidth: 0.5,
  },
  text1: {
    fontWeight: "bold"
  },
  text2: {
    fontSize: 15,
    marginTop: 10, marginBottom: 10
  },
  BtnPrimary: {
    flexDirection: "row",
    margin: "5%",
    width: "90%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
    shadowOffset: {
      width: 10,
      height: 30,
    },
    shadowOpacity: 1.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  textOn: {
    color: "#FFF"
  },
  textOff: {
    color: "#555"
  },
  loginText: {
    fontSize: 16,
    marginLeft: 20,
  },
});
export default NewCita;