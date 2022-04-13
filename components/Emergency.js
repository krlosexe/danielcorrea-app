import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Linking, Image, Modal } from 'react-native'
import { Icon } from 'react-native-eva-icons';
import { primaryColor } from '../Colors.js'
export default function Emergency() {
  const [modal, setmodal] = useState(false);
  function Sure() {
    setmodal(true)
  }
  function Cancel() {
    setmodal(false)
  }
  const Call = async () => {
    setmodal(false)
    await Linking.openURL("tel:+573172687813")
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => Sure()} style={styles.wrap}  >
        <Text style={styles.title}>¿tienes una emergencia?</Text>
        <View style={styles.info}>
          <Text style={styles.text}>Comunícate de manera inmediata con nosotros.</Text>
          <View style={styles.imageWrap}>
            <Image style={styles.imagen}
             source={require('../src/images/emergency.png')} />
          </View>
        </View>
        <View style={styles.shadow}></View>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={styles.modal}>
          <View style={styles.modalCard}>
            <Icon name='alert-circle-outline' width={80} height={80} fill={primaryColor} />
            <Text style={styles.modalTitle}>Deseas comunicarte con las líneas de emergencia?</Text>
            <View style={styles.modalFoot}>
              <TouchableOpacity onPress={() => Cancel()} style={styles.btn}>
                <Icon name='phone-off-outline' width={25} height={25} fill='#FFF' />
                <Text style={styles.btnText}>NO</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Call()} style={styles.btn}>
                <Icon name='phone-outline' width={25} height={25} fill='#FFF' />
                <Text style={styles.btnText}>SI</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginBottom : 20
  },
  wrap: {
    overflow: "hidden",
    backgroundColor: primaryColor,
    width: "90%",
    borderRadius: 20,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  title: {
    paddingVertical: 5,
    width: "100%",
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    textTransform: "uppercase",
    textAlign: "center"
  },
  info: {
    paddingBottom: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  text: {
    width: "55%",
    color: "white",
    textAlign: "center",
    lineHeight:20,
    fontSize:16,
  },
  imageWrap: {
    marginLeft: 15,
    width: 120,
    height: 120
  },
  imagen: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "cover"
  },
  shadow: {
    position: "absolute",
    zIndex: -1,
    backgroundColor: "rgba(0,0,0,0.05)",
    width: "200%",
    height: 200,
    marginTop: 100,
    marginLeft: -60,
    transform: [
      { rotateZ: "10deg" }
    ]
  },
  modal: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 9,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  modalCard: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    alignContent: "center"
  },

  modalTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: primaryColor,
    marginBottom: 15
  },
  modalFoot: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  btn: {
    backgroundColor: primaryColor,
    width: "40%",
    borderRadius: 12,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center",

  },
  btnText: {
    marginLeft: 10,
    color: "white",
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "bold",
    textAlign: "center"
  }
})