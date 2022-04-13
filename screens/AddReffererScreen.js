import React from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, ToastAndroid, ActivityIndicator } from 'react-native'
import RoundButton from '../components/RoundButton/Index'
import { primaryColor, colorBack, modalBack, colorLight } from '../Colors'
import UserContext from '../contexts/UserContext'
import { base_url, Api } from '../Env'
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Head from '../components/Head';
import Loading from '../components/loading.js'

function AddReffererScreen(props) {
  const [terminos, setTerminos] = React.useState(false)
  const { route, navigation } = props
  const [requesting, setRequesting] = React.useState(false)
  const userDetails = React.useContext(UserContext)
  const [sendSuccess, setSendSuccess] = React.useState(false)
  const [Load, setLoad] = React.useState(false)





  const [formInfo, setFormInfo] = React.useState({
    nombres: '',
    identificacion: '',
    telefono: '',
    email: '',
    city: '',
    affiliate: userDetails.id_cliente,
  })


  function onChangeText(text, key) {
    setFormInfo({
      ...formInfo,
      [key]: text
    })
  }

  function sendForm() {
    const data = {
      ...formInfo,
    }
    setLoad(true)
    //if (data.nombres === '' || data.identificacion === '' || data.telefono === '' || data.email === '' || data.city === '') {
      if (data.nombres === '' ||  data.telefono === '' || data.city === '') {
      Toast.show("1 Completa el formulario")
      setLoad(false)
      return false;
    }
    data.phone = `+57${data.phone}`
    setRequesting(true)
    console.log('Enviando formulario')
    console.log(base_url(Api, `v2/register/referred`))
    console.log(data)
    axios.post(base_url(Api, `v2/register/referred`), data).then(function (res) {
      setLoad(false)
      setSendSuccess(true)
      setRequesting(false)
      setTimeout(() => { setSendSuccess(false) }, 4500)
      setTimeout(() => {
        navigation.navigate('ReferredListScreen', { randomCode: Math.random() })
        //navigation.navigate('ReferredListScreen')
      }, 5000)
    })
      .catch(function (error) {
        console.log('Error al enviar formulario')
        console.log(error.response.data); //.response.data.mensagge
        Toast.show(error.response.data.mensagge)
        setRequesting(false)
        setLoad(false)
      })
      .then(function () {
        setRequesting(false)
        setLoad(false)
      });
  }













  return (
    <SafeAreaView style={styles.container}>

      <Head name_user={userDetails.nombres} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View style={styles.content}>
          <Text style={styles.title}> Registrar nuevo referido.</Text>

          <Text style={styles.label}>Nombres y Apellidos</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Nombre y Apellido"
            onChangeText={text => onChangeText(text, 'nombres')}
            value={formInfo.nombres} />

          <Text style={styles.label}>Numero de cédula</Text>
          <TextInput
            style={styles.TextInput}
            keyboardType="number-pad"
            placeholder="Nº de Identidad"
            onChangeText={text => onChangeText(text, 'identificacion')}
            value={formInfo.identificacion} />

          <Text style={styles.label}>Telefono</Text>
          <TextInput
            style={styles.TextInput}
            keyboardType="number-pad"
            placeholder="Nº telefono móvil"
            onChangeText={text => onChangeText(text, 'telefono')}
            value={formInfo.telefono}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            onChangeText={text => onChangeText(text, 'email')}
            value={formInfo.email} />

          <Text style={styles.label}>Ciudad</Text>
          <TextInput style={styles.TextInput}
            placeholder="Ciudad"
            onChangeText={text => onChangeText(text, 'city')}
            value={formInfo.city}
          //placeholder='Ciudad'
          />
        </View>
      </ScrollView>






      {!Load &&
        <TouchableOpacity
          style={{ backgroundColor: colorBack, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', width: '100%', height: 60, paddingBottom: 30 }}>
          <RoundButton
            onPressHandler={() => sendForm()}
            style={{ backgroundColor: primaryColor, marginRight: 30 }}
            icon='save-outline' />
        </TouchableOpacity>
      }






      {
        requesting &&
        <View style={{ backgroundColor: modalBack, width: "100%", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center" }}>
          <View style={{ justifyContent: 'center',alignContent:"center", paddingVertical:20, alignItems: 'center', backgroundColor: colorLight, width: "80%",  marginTop: "60%", borderRadius: 20 }}>
            <Loading color={primaryColor}/>
            <Text>Espere un momento por favor . . .</Text>
          </View>
        </View>
      }







      {
        sendSuccess &&

        <View style={{ justifyContent: 'center', alignItems: "center", backgroundColor: modalBack, position: "absolute", width: "100%", height: "100%", }}>

          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFF", width: "80%", height: "40%", borderRadius: 10 }}>

            <Text style={{ marginBottom: 30, fontSize: 16 }}>Referido registrado con éxito</Text>

            <RoundButton
              onPressHandler={() => navigation.navigate('ReferredListScreen')}
              style={{ backgroundColor: primaryColor, marginRight: 30 }}
              icon='checkmark-outline'
            />
          </View>


        </View>
      }






      {/* {
        sendSuccess &&
        setTimeout(() => { navigation.navigate('ReferredListScreen') }, 5000)

      }
 */}








    </SafeAreaView>
  )
}


export default AddReffererScreen


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colorBack


  },
  content: {

    backgroundColor: "#FFF",
    flex: 1,
    flexDirection: 'column',
    width: '90%',
    paddingTop: 20,
    marginLeft: "5%",
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4,
    elevation: 6,
  },


  buttonWizardText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    color: 'black',
    paddingHorizontal: 20,
    textAlign: 'center',
    marginBottom: 30
  },

  TextInput: {


    borderColor: primaryColor,
    borderWidth: 1,

    //borderColor: 'black',
    backgroundColor: 'white',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
    padding: 10,

  },
  label: {
    fontSize: 12,
    paddingHorizontal: 15,
  }
});










