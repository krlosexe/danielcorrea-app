import React, { useState, useEffect } from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  ImageBackground
} from 'react-native';
import Head from '../components/Head';
import { Icon } from 'react-native-eva-icons';
import Menu from '../components/Menu';
import UserContext from '../contexts/UserContext'
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import { colorDark, colorTertiary, colorLight, primaryColor, colorSecundary, colorBack2, primaryColorOpacity } from '../Colors.js'

function App(props) {
  const { navigation } = props
  const data = props.route.params.data
  const userDetails = React.useContext(UserContext)
  const [localCar, setlocalCar] = useState([]);
  const [Count, setCount] = useState(0);
  const [cantidad, setCantidad] = useState(1);


  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  }

  useEffect(() => {
    const backAction = () => {
      goToShop("Shop2")
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);




  useEffect(() => {
    console.log("** random -> getCarLocal()")
    getCarLocal()
  }, [randomCode]);





  function goToScreen(screen, data, shop) {
    navigation.navigate(screen, { randomCode: Math.random(), data, shop })
  }


  async function getCarLocal() {
    console.log("get local")
    try {
      let car = JSON.parse(await AsyncStorage.getItem('carrito'))

      if (car == null) {
        console.log("carrito local no existe")
        let data = {
          "data": [],
          "total": "0,00",
          "total_pay": 0
        }
      }
      else {
        setlocalCar(car.data)

        console.log("datos de carrito local obtenidos en otro screen!")
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    updateCarLocal()

    setTimeout(() => {
      if (localCar !== []) {
        setCount(localCar.length)
      }
    }, 1000);
  }, [localCar]);



  useEffect(() => {
    if (cantidad < 1) {
      setCantidad(1)
      Toast.show("Cantidad minima es 1")
    }
  }, [cantidad]);


  function goToShop(screen) {


    navigation.navigate(screen, { randomCode: Math.random() })

  }


  function goToBack() {

    console.log("F: ", props.route.params.from)

    navigation.navigate(props.route.params.from, { randomCode: Math.random(), })


  }




  function goToCar() {
    let screen = "ShopCar"
    let car = props.route.params.car
    let from = "ShopProductsView"
    navigation.navigate(screen, { randomCode: Math.random(), car, from })
  }



  const WindowAlert = () =>
    Alert.alert(
      "Por favor inicie sesión para añadir productos al carrito",
      "Si no tiene una cuenta, registrese",
      [
        { text: "Login", onPress: () => goToScreen('Login') },
        { text: "Registrarme", onPress: () => goToScreen('Register') },
        { text: "Salir", onPress: () => console.log("OK Pressed"), style: "cancel" }]);










  async function AddCar(id, i) {
    console.log("AddCar", id)

    console.log(i.description)



    const user_info = userDetails.id
    const item_info = id
    const item_price = i.price_cop
    const created_at = i.created_at
    const updated_at = i.updated_at
    const description = i.description
    const photo = i.photo
    const presentation = i.presentation
    const Value = +1




    let NewRegister = []

    if (localCar.length == 0) {
      console.log("no hay registros, registrando nuevo...")
      NewRegister = {
        "id_client": user_info,
        "id_product": item_info,
        "qty": 1,
        "price_cop": item_price,
        "created_at": created_at,
        "updated_at": updated_at,
        "description": description,
        "photo": photo,
        "presentation": presentation
      }
    }

    else {
      console.log("existen registros - buscando item...")
      let Updating = localCar.find(id => id.id_product == item_info)
      if (Updating === undefined) {
        console.log("undefinido (no encontardo)")

        NewRegister = {
          "id_client": user_info,
          "id_product": item_info,
          "qty": Value,
          "price_cop": item_price,
          "created_at": created_at,
          "updated_at": updated_at,
          "description": description,
          "photo": photo,
          "presentation": presentation
        }


      }
      else {
        console.log("actualixando a: ", item_info)
        let NewQty = Updating.qty + Value
        console.log("nueva qty: ", NewQty)
        for (var i in localCar) {
          if (localCar[i].id_product == item_info) {
            localCar[i].qty = NewQty;
            break;
          }
        }
        setlocalCar(localCar)
        Toast.show("Producto Actualizado")
        setlocalCar([...localCar])
        return false
      }
    }

    Toast.show("Producto agregado al carrito de compras")
    console.log("send: ", NewRegister)
    setlocalCar([...localCar, NewRegister])
    console.log(localCar.length)
    console.log("_________________________________ end")
  }




  async function updateCarLocal() {
    console.log("updateCarLocal")
    var total = 0
    for (var i in localCar) {
      total += localCar[i].price_cop * localCar[i].qty
    }
    let data = {
      "data": localCar,
      "total": total,
      "total_pay": total / 100
    }
    await AsyncStorage.setItem('carrito', JSON.stringify(data))
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F3F3" }}>
      <StatusBar backgroundColor={primaryColor} barStyle="dark-content" />
      <ImageBackground source={require('../src/images/background.png')} style={{ flex: 1, justifyContent: "flex-end", resizeMode: "cover", width: "100%", height: "100%" }}>
        <ScrollView>

        <Head name_user={userDetails.nombres} />




        <View style={styles.content_head}>
            <TouchableOpacity onPress={() => goToBack()}>
              <Icon name='chevron-left' width={30} height={30} fill={colorLight} />
            </TouchableOpacity>







            <TouchableOpacity onPress={() => goToCar()}>
              <Text style={styles.qty_car}>{Count}</Text>
              <Icon name='shopping-cart-outline' width={30} height={30} fill={colorLight} />
            </TouchableOpacity>
          </View>




       
         
        


<Text style={styles.title_product}>{data.description}</Text>

<View style={styles.product_detail_content}>
            <View style={styles.product_detail_content_img}>
              {data.photo != null
                ? (<Image style={styles.product_detail_img} source={{ uri: data.photo }} />)
                : (<Image style={styles.product_detail_img} source={require('../src/images/emtyp.png')} />)
              }
            </View>
          </View>







          <View style={styles.wrapperInfo}>
            <View style={styles.info}>
              <View style={styles.group}>
                <Text style={styles.infoTitle}>Descripción</Text>
                <Text style={styles.infoResponse}>{data.description}</Text>
              </View>
              <View style={styles.group}>
                <Text style={styles.infoTitle}>Precio</Text>
                <Text style={styles.infoResponse}>COP. {data.price_cop}</Text>
              </View>
              <View style={styles.panel}>
                <View style={styles.newcantidad}>
                  <TouchableOpacity onPress={() => setCantidad(cantidad - 1)} style={styles.iconCantidad}>
                    <Icon name='minus' width={10} height={10} fill={colorLight} />
                  </TouchableOpacity>
                  <Text style={styles.cantidad}>
                    {cantidad}
                  </Text>
                  <TouchableOpacity onPress={() => setCantidad(cantidad + 1)} style={styles.iconCantidad}>
                    <Icon name='plus' width={10} height={10} fill={colorLight} />
                  </TouchableOpacity>
                </View>
                {userDetails.email == null &&
                  <TouchableOpacity onPress={() => WindowAlert()} style={styles.BtnPrimary}>
                    <Icon name='shopping-cart-outline' width={16} height={16} fill={primaryColor} />
                    <Text style={styles.loginText}>Añadir al carrito</Text>
                  </TouchableOpacity>
                }
                {userDetails.email != null &&
                  <TouchableOpacity onPress={() => AddCar(data.id, data, cantidad)} style={styles.BtnPrimary}>
                    <Icon name='shopping-cart-outline' width={16} height={16} fill={primaryColor} />
                    <Text style={styles.loginText}>Añadir al carrito</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>

          </View>
        </ScrollView>
        <Menu props={{ ...props }} />
      </ImageBackground>
    </SafeAreaView>
  )
}
export default App;


const styles = StyleSheet.create({
  content_head: {
    height: 100,
    paddingHorizontal: 15,
top:-85,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
marginBottom:-120
  },
  wrapImg: {
    flex: 1,
    backgroundColor: "yellow"
  },
  img: {
    width: 160,
    height: 140,
    resizeMode: "contain",
  },
  title_product: {
    textAlign: "center",
    fontSize: 22,
    width: "100%",
    marginVertical: 20,
    color: "black"
  },
  product_detail_content: {
    marginTop: -10,
    marginBottom: -20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  product_detail_content_img: { //caja
    flex: 1,
    width: "60%",
    overflow: "hidden",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: colorLight,



    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,

  },
  product_detail_img: {
    width: "110%",
    height: 300,


  },



  qty_car: {
    color: colorLight,
    marginLeft: 0,
    marginBottom: -5,
    fontWeight: "bold",
    width: 30,
    textAlign: "center"
  },



  wrapperInfo: {
    top:-10,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
  },

  info: {
    paddingTop:40,
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 40,
    padding: 20,
    height: 320,
    marginBottom: 100,
    borderWidth: 1,
    borderTopColor: "rgba(255,255,255,0.5)",
    borderLeftColor: "rgba(255,255,255,0.5)",
    borderRightColor: "white",
    borderBottomColor: "white",
  },


  group: {
    paddingVertical: 10,
    borderColor: "white",
    borderBottomWidth: 1
  },

  infoTitle: {
    color: "#262626"
  },

  infoResponse: {
    color: "black",
    fontWeight: "bold"
  },

  panel: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  newcantidad: {
    flexDirection: "row",
    top: 20
  },

  iconCantidad: {
    top: 2,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: primaryColor,
    width: 25,
    height: 25
  },
  cantidad: {
    backgroundColor: colorLight,
    borderRadius: 12,
    textAlign: "center",

    width: 50,
    padding: 4,
    fontWeight: "bold",
    color: "#000",
    fontSize: 14
  },
  BtnPrimary: {
    flexDirection: "row",
    width: "70%",
    backgroundColor: colorLight,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 30,
    shadowOffset: {
      width: 10,
      height: 30,
    },
    shadowOpacity: 1.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 12,

  },
  loginText: {
    marginLeft: 20,
    fontWeight: "bold",
    color: primaryColor
  },




})

