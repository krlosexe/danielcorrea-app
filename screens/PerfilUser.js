import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable
} from 'react-native';

import { Icon } from 'react-native-eva-icons';
import Head from '../components/Head';
import Menu from '../components/Menu';
import UserContext from '../contexts/UserContext'
import axios from 'axios'
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-simple-toast';
import {primaryColor,colorTertiary,colorLight} from '../Colors'
import { Api, base_url, file_server1 } from '../Env'

function App(props) {
  const { navigation } = props
  const [menu, setMenu] = useState(false)
  const [modalQR, setmodalQR] = useState(false)

  const userDetails = React.useContext(UserContext)
  const { UserDetails, setUserDetails } = React.useContext(UserContext)

  const [CodeQr, setCodeQR] = useState(`${userDetails.id_cliente}`)
  const [editProfile, seteditProfile] = useState(false);
  const [OptionCamare, setOptionCamare] = useState(false);
  const [Pays, setPays] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [ImagePay, setImagePay] = useState(false);


  
  const [formInfo, setFormInfo] = useState({
    id: userDetails.id_cliente,
    avatar: userDetails.avatar,
    nombres: userDetails.nombres,
    email: userDetails.email,
    telefono: userDetails.telefono,
    code_client: userDetails.code_client,
  })



  console.log("perfil user userDetails: ",userDetails)

  function goToScreen(screen, data, shop) { navigation.navigate(screen, { randomCode: Math.random(), data, shop }) }


  function goToScreen2(screen, user, shop) { navigation.navigate(screen, { randomCode: Math.random(), user, shop }) }


  function EditProfile(userDetails) {
    console.log("editar perfil")
    console.log(userDetails)
  }

  function ShowQR() { setmodalQR(!modalQR) }



  function ShowModalPagos(image) { 
    console.log("HOLA")
    setModalVisible(true) 
    setImagePay(image)
  }





  function EditProfile(data) {
    seteditProfile(!editProfile)
    setMenu(!menu)
  }


  function getCamara() {
    console.log("get camara")
    setOptionCamare(!OptionCamare)
  }


  function onChangeText(text, key) {
    setFormInfo({
      ...formInfo,
      [key]: text
    })
  }



  useEffect(() => {
    getPays()
  }, [])



  const getPays = () => {

    console.log(base_url(Api, `get/pays/client/${userDetails.id_cliente}`))
    axios.get(base_url(Api, `get/pays/client/${userDetails.id_cliente}`)).then(function (response) {
      setPays(response.data)
    })
      .catch(function (error) {
        console.log('Error al enviar formulario')
        console.log(error);
        console.log(error.response);
      })
      .then(function () { });
  }


  async function SaveChange() {
    console.log("SaveChange")
    seteditProfile(!editProfile)
    const data = {
      ...formInfo
    }

    console.log("data: ", data)
    console.log(base_url(Api, `client/edit`), data)
    console.log("________________")



     await axios.post(base_url(Api, `client/edit`), data).then(function (response) {
       console.log("response")
       console.log(response.data)
       setUserDetails({ ...response.data })
     })
       .catch(function (error) {
         console.log(error)
       })
       .then(function () { });
    console.log("save change")
    Toast.show("Cambios Guardados!")
  }

  function goToCar(screen, from) {
    navigation.navigate(screen, { randomCode: Math.random(), from })
  }



  const OpenImage = (image)=>{

  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F3F3" }}>
      <StatusBar backgroundColor="#e8faff" barStyle="dark-content" />
      <ImageBackground source={require('../src/images/background.png')} style={{ flex: 1, justifyContent: "flex-end", resizeMode: "cover", width: "100%", height: "100%" }}>
      <ScrollView>
     
        <Head name_user="Mi Perfil" />
        {editProfile &&
          <TouchableOpacity
            onPress={() => seteditProfile(!editProfile)}
            style={{
              paddingLeft: 15, backgroundColor: "white", flexDirection: "row", width: 140, top: 5, padding: 5, borderTopRightRadius: 15, borderBottomRightRadius: 15, shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
            }}
          >
            <Text>Dejar de editar!</Text>
            <Icon name='close' width={20} height={20} fill="#777" />
          </TouchableOpacity>
        }
        <View style={styles.upper}>
          <View style={styles.btnEdit}>
            <TouchableOpacity style={styles.iconsUp} onPress={() => setMenu(!menu)} ><Icon name={menu == true ? "close" : "menu"} width={30} height={30} fill={primaryColor} /></TouchableOpacity>
            {menu == true &&
              <View>
                <TouchableOpacity style={styles.iconsUp} onPress={() => EditProfile(userDetails)} ><Icon name='edit-outline' width={30} height={30} fill={primaryColor} /></TouchableOpacity>
                <TouchableOpacity style={styles.iconsUp} onPress={() => goToScreen("WishList")}><Icon name='heart' width={30} height={30} fill={primaryColor} /></TouchableOpacity>
                <TouchableOpacity style={styles.iconsUp} onPress={() => goToScreen("Mypurchases")}><Icon name='shopping-bag-outline' width={30} height={30} fill={primaryColor} /></TouchableOpacity>
                <TouchableOpacity style={styles.iconsUp} onPress={() => goToCar("ShopCar", "PerfilUser")}><Icon name='shopping-cart-outline' width={30} height={30} fill={primaryColor} /></TouchableOpacity>
                <TouchableOpacity style={styles.iconsUp} onPress={() => goToScreen2("MyCitas", userDetails.id_cliente)}><Icon name='calendar-outline' width={30} height={30} fill={primaryColor} /></TouchableOpacity>
                <TouchableOpacity style={styles.iconsUp} onPress={() => goToScreen2("Quotation", userDetails.id_cliente)}>
                  <Image
                    style={styles.icon_img}
                    source={require("../src/images/calculator.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconsUp} onPress={() => ShowQR()}>
                  <Image
                    style={styles.icon_img}
                    source={require("../src/images/qr.png")} />
                </TouchableOpacity>
              </View>
            }
          </View>
          <View style={styles.WrapperImg}>
            <View style={[styles.WrapImg, { transform: [{ translateX: 0 }] }]}>
              {userDetails.avatar != null
                ? (<Image style={styles.profileImg} source={{ uri: userDetails.avatar }} />)
                : (<Image style={styles.profileImg} source={require('../src/images/default-user.png')} />)
              }
            </View>
            {
              OptionCamare == true &&
              <View style={{ alignContent: "center", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", flexDirection: "row", top: 10, paddingVertical: 5, paddingHorizontal: 12, borderRadius: 100, width: 100 }}>
                <Icon name='image-outline' width={30} height={30} fill='#e67072' />
                <Icon name='camera-outline' width={30} height={30} fill='#e67072' />
              </View>
            }
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>Nombre</Text>
            {editProfile == false &&
              <Text style={styles.subtitle}>{userDetails.nombres}</Text>
            }
            {editProfile == true &&
              <TextInput value={formInfo.nombres} onChangeText={text => onChangeText(text, 'nombres')} placeholder="Nombre y Apellido..." style={styles.subtitle} placeholderTextColor="#000" />
            }
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Email</Text>
            {editProfile == false &&
              <Text style={styles.subtitle}>{userDetails.email}</Text>
            }
            {editProfile == true &&
              <TextInput value={formInfo.email} onChangeText={text => onChangeText(text, 'email')} placeholder="Email..." style={styles.subtitle} placeholderTextColor="#000" />
            }
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Telefono</Text>
            {editProfile == false &&
              <Text style={styles.subtitle}>{userDetails.telefono}</Text>
            }
            {editProfile == true &&
              <TextInput value={formInfo.telefono} onChangeText={text => onChangeText(text, 'telefono')} placeholder="Telefono Móvil..." style={styles.subtitle} placeholderTextColor="#000" />
            }
          </View>
        </View>




        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>Mi código PRP</Text>
            <Text style={styles.subtitle}>{userDetails.code_client}</Text>
          </View>
        </View>



        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>Mis Pagos</Text>
            {Pays.length > 0 &&
              Pays.map((item, key)=>{
                return <View style={{flexDirection : "row", marginBottom: 10, justifyContent : "space-between"}}>
                  <Text>{item.amount_comission}</Text>
                  <Text>{item.created_at}</Text>
                  <TouchableOpacity
                    onPress={() => ShowModalPagos(item.comprobante)}  >
                    <Icon name='image' width={40} height={40} fill='#fff' />
                  </TouchableOpacity>
                </View>
              })
            }
          </View>
        </View>



        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Image style={{width : 200, height : 200}}
                    source={{
                      uri : `${file_server1}/img/clients/comissions/${ImagePay}`
                    }} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>







        {
          editProfile == true &&
          <TouchableOpacity
            onPress={() => SaveChange()}
            style={styles.BtnPrimary}>
            <Icon name='checkmark-circle-outline' width={20} height={20} fill='#fff' />
            <Text style={styles.loginText}>Guardar Cambios</Text>
          </TouchableOpacity>
        }
        <View style={styles.footSpace}></View>
       
      </ScrollView>
      <Menu props={{ ...props }} />

      </ImageBackground>
      {
        modalQR == true &&
        <View style={{ backgroundColor: "rgba(0,0,0,0.7)", width: "100%", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
          <View style={{ top: "20%" }}>
            <TouchableOpacity
              onPress={() => setmodalQR(!modalQR)}
              style={{
                position: "absolute", right: -10, top: 10
              }}>
              <Icon name="close-circle-outline" fill="#FFF" width={40} height={40} />
            </TouchableOpacity>
            <View style={{ backgroundColor: "#FFF", marginTop: "15%", padding: "10%", borderRadius: 20, width: "90%" }}
            >
              <QRCode
                value={CodeQr}
                size={200}
              />
            </View>
          </View>
        </View>
      }
    </SafeAreaView >
  )
}
export default App;
const styles = StyleSheet.create({
  upper: {
  
  },
  btnEdit: {
    marginTop:-40,
    position: "absolute",
    right: 10,
    zIndex: 99999,
    flexDirection: "column"
  },
  iconsUp: {
    position: "relative",
    zIndex: 9,
    marginLeft: 10,
    marginTop: 4,
    backgroundColor: colorLight,
    padding: 8,
    width: 45,
    height: 45,
    borderRadius: 25,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 4
  },

  icon_img: {
    width: 30,
    height: 30
  },
  WrapperImg: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  WrapImg: {
    width: 180,
    height: 180,
    borderColor: colorTertiary,
    borderWidth: 10,
    borderRadius: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    overflow: "hidden",
    elevation: 12
  },
  profileImg: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  btnCamera: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    alignContent: "center",
    position: "absolute",
    top: 230,
    left: 260
  },
  container: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderColor:"white", borderWidth:1,
    width: "90%",
    marginLeft: "5%",
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
   borderRadius:20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

  },
  row: {
    width: "100%",
    padding: 4
  },
  title: {
    height: 25,
    color: primaryColor,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 22
  },
  subtitle: {
    height: 40,
    color: "#000",
    fontSize: 16
  },
  footSpace: {
    marginBottom: 60
  },
  BtnPrimary: {
    flexDirection: "row",
    margin: "5%",
    width: "90%",
    backgroundColor: colorTertiary,
    borderRadius: 10,
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

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }


})