import React, { useState, useEffect } from 'react'
import { ImageBackground, Alert, SafeAreaView, ActivityIndicator, StatusBar, ScrollView, Image, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import Menu from '../components/Menu';
import Head from '../components/Head';
import UserContext from '../contexts/UserContext'
import { Icon } from 'react-native-eva-icons';
import { colorBack1, colorBack2, primaryColor, colorTertiary, colorLight } from '../Colors.js'
import { Api, base_url } from '../Env'
import axios from 'axios'
function AddQuotation(props) {
  const [load, setload] = useState(true);
  const userDetails = React.useContext(UserContext)
  const { UserDetails, setUserDetails } = React.useContext(UserContext)
  const [addList, setaddList] = useState([]);
  let randomCode
  if (props.route.params) { randomCode = props.route.params.randomCode }
  else { randomCode = Math.random() }
  useEffect(() => {
    setload(true);
    Get();
  }, [randomCode]);

  async function Get() {
    let list
    await axios.get(base_url(Api,`surgeries/client/${userDetails.id_cliente}`)).then(function (response) {
      console.log("list: ", list)
      list = response.data
    })
      .catch(function (error) { console.log(error) })
      .then(function () { });
    if (list !== undefined) {
      setaddList(list);
    }
    setload(false);
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F3F3" }}>
    <StatusBar backgroundColor="#e8faff" barStyle="dark-content" />
    <ImageBackground source={require('../src/images/background.png')}
        style={styles.image}>
        <Head name_user="Mis Cotizaciones" />
        <ScrollView>
          {load &&
            <ActivityIndicator color={primaryColor} size="large" style={{ marginTop: "50%" }} />
          }
          {!load && addList.length > 0 &&
            <View style={styles.wrap}>
              {addList.map((i, key) => {
                return (
                  <Quo key={key} data={i} />
                )
              })
              }
            </View>
          }
          {!load && addList.length == 0 &&
            <View style={styles.wrap}>
              <View style={{ alignContent: "center", marginTop: "30%", alignItems: "center", justifyContent: "center", borderColor: primaryColor, borderWidth: 2, borderStyle: "dashed", borderRadius: 20, width: "80%", paddingVertical: 20 }}>
                <Icon name="alert-triangle-outline" fill={primaryColor} width={40} height={50} />
                <Text style={{ textAlign: "center", color: primaryColor, fontSize: 20, fontWeight: "bold" }}>No se han encontrado registros.</Text>
              </View>
            </View>
          }
          <View style={{ height: 20 }}></View>
        </ScrollView>
        <Menu props={{ ...props }} />
      </ImageBackground>
    </SafeAreaView>
  )
}
function Quo(props) {
  const [display, setdisplay] = useState(false);
  function currencyFormat(num) { return '$. ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.card_title}>Procedimiento: </Text>
        <Text style={styles.card_sub_title}>{props.data.surgerie_name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.card_title}>Monto: </Text>
        <Text style={styles.card_sub_title}>{currencyFormat(props.data.amount)}</Text>
      </View>
      {display === true &&
        <>
          <View style={styles.row}>
            <Text style={styles.card_title}>Lugar: </Text>
            <Text style={styles.card_sub_title}>{props.data.name_clinic}</Text>
          </View>
          <Text style={styles.title}>Adicionales</Text>
          <View style={styles.wrapper_list}>
            {props.data.aditionals.map((i, key) => {
              return (
                <View style={styles.row_list}>
                  <Text style={styles.card_list_title}>{i.description}</Text>
                  <Text style={styles.card_list_sub_title}>COP. {i.price_aditional}</Text>
                </View>
              )
            })}
          </View>
        </>
      }
      <TouchableOpacity
        onPress={() => setdisplay(!display)}
        style={styles.card_btn}>
        <Icon name={display ? 'close-outline' : 'arrow-ios-downward-outline'} fill={colorLight} width={20} height={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
    width: "100%",
    height: "100%"
  },
  wrap: {
    paddingTop: 20,
    alignItems: "center",
    alignContent: "center"
  },
  card: {
    marginBottom: 15,
    backgroundColor: "white",
    width: "90%",
    borderRadius: 12,
    padding: 10,
    flexDirection: "column"
  },
  row: {
    flexDirection: "column",
    padding: 5,
  },
  card_title: {
    fontSize: 16,
    color: primaryColor,
    fontWeight: "600"
  },
  card_sub_title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  title: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
    color: primaryColor
  },
  wrapper_list: {
    borderColor: primaryColor,
    borderWidth: 0.5,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 5
  },
  row_list: {
    marginBottom: -1,
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomColor: primaryColor,
    borderBottomWidth: 0.5
  },
  card_list_title: {
    textTransform: "capitalize",
    width: "40%",
    textAlign: "right",
    fontSize: 16,
    fontWeight: "bold"
  },
  card_list_sub_title: {
    marginLeft: 10,
    width: "40%",
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold"
  },
  card_btn: {
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: primaryColor,
    position: "absolute",
    top: 0,
    right: 0,
    height: 25,
    width: 50,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  }
})
export default AddQuotation;