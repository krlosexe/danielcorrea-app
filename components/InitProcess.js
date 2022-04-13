import React from 'react';
import { StyleSheet, Alert, View, Text, Image, TouchableOpacity } from "react-native";
import UserContext from '../contexts/UserContext'
//import styles from '../Styles';
import { colorLight, primaryColor } from '../Colors.js'


function Index(props) {
  const userDetails = React.useContext(UserContext)
  const { navigation } = props.props
  function goToScreen(screen, id) { navigation.navigate(screen, { randomCode: Math.random(), id }) }
  function goToCita(screen, user) {
    const procedure = 0
    navigation.navigate(screen, { randomCode: Math.random(), user, procedure })
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

  return (
    <TouchableOpacity onPress={() =>
      userDetails.email != null
        ? goToCita("NewCita", userDetails.id_cliente)
        : WindowAlert("DashboardPrp")

    } style={styles.card_init_process}>
      <View style={[styles.card_init_process_content]}>
        <View style={{ width: "60%", top:15}}>
          <Text style={styles.card_init_process_titile}>Solicitar una Cita</Text>
          <Text style={styles.card_init_process_info}>Reserva tu cita en línea con nosotros</Text>
        </View>
        <View style={{ width: "40%" }}>
          <Image
            style={styles.card_init_process_image}
            source={require("../src/images/cita.png")} />
        </View>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  card_init_process: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,

  },
  card_init_process_content: {
    marginTop: -15,
    width: "90%",
    height: 150,
    flexDirection: "row",
    padding: 20,
    backgroundColor: primaryColor,
    borderRadius: 50
  },

  card_init_process_titile: {
    marginLeft: 10,
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  card_init_process_info: {
    color: colorLight,
    top:5,
    fontSize: 14,
    marginLeft: 10,
    textAlign: "justify",

  },
  card_init_process_image: {
    top: -10,
    width: 130,
    height: 130,
    resizeMode: "contain"
  },
})


export default Index;

