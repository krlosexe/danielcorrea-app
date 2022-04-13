import React, { useContext, useRef, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  SwipeableListView,

} from 'react-native';
import UserContext from '../../contexts/UserContext'
import Menu from '../../components/Menu';
//import { Icon } from 'react-native-eva-icons';
import Head from '../../components/Head';



import { file_server1 } from '../../Env.js'
import { colorBack1,colorBack2, colorSecundary, primaryColor } from '../../Colors.js'
import LinearGradient from 'react-native-linear-gradient';
function ProceduresView(props) {

  const userDetails = useContext(UserContext)
  const [data, setData] = useState(props.route.params.data)
  function goToScreen(screen, data) { props.navigation.navigate(screen, { randomCode: Math.random(), data }) }

  return (
<SafeAreaView style={{ flex: 1, backgroundColor: "#F3F3F3" }}>
      <StatusBar backgroundColor="#e8faff" barStyle="dark-content" />
      <ImageBackground source={require('../../src/images/background.png')} style={{ flex: 1, justifyContent: "flex-end", resizeMode: "cover", width: "100%", height: "100%" }}>
      <ScrollView>
      <Head name_user={userDetails.nombres} />

        <View style={{ marginTop:-5, alignContent: "center", alignItems: "center", marginVertical: 10 }}>
          <View style={{ backgroundColor: "#FFF", width: "80%", height: 30, borderRadius: 15 }}>
            <Text style={{ textAlign: "center", fontSize: 15, lineHeight: 30, textTransform: "uppercase", fontWeight: "bold", color: primaryColor }}>
              {props.route.params.from}
              </Text>
          </View>
        </View>



       


        <FlatList
          style={{ marginBottom: 40, }}
          data={props.route.params.data}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card i={item} go={goToScreen} key={item} />
          )} />


        {/* {props.route.params.data.map((i, key) => { return <Card i={i} go={goToScreen} key={key} /> })} */}



        {/* <Grid data={props.route.params.data} /> */}



      </ScrollView>
      <Menu props={{ ...props }} />
      </ImageBackground>
    </SafeAreaView>
  )
}



function Card(props) {

  //console.log(`${file_server1}/img/category/picture/${props.i.img}`)
  const [count, setCount] = useState(props.count)
  const [id, setid] = useState(props.i.id)
  const [view, setview] = useState(false)
  const userDetails = React.useContext(UserContext)
  const { navigation } = props
  return (
    <TouchableOpacity
      onPress={() => props.go('Procedure', props.i)}
      style={style.card}
    >




      <View style={[style.dashed,{alignItems:"center", alignContent:"center", justifyContent:"center"}]}>
        <View style={{top:"25%",borderColor:"#FFF",backgroundColor:"rgba(0,0,0,0.2)", borderWidth:1, padding: 3,borderRadius:10, width:"95%"}}>
          <Text style={{
            color:"#FFF", fontSize:13, textAlign:"center", fontWeight:"bold", textTransform:"uppercase"
          }}>{props.i.name}</Text>
        </View>
      </View>


      <Image style={style.img} source={{ uri: `${file_server1}/img/category/picture/${props.i.img}` }} />
    </TouchableOpacity>
  )
}



const style = StyleSheet.create({
  card: {
    margin: 8,
    marginLeft: 10,
    backgroundColor: colorSecundary,// primaryColor,
    width: "45%",
    height: 150,
    // borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center", alignContent: "center", justifyContent: "center"
  },
  dashed: {
    borderRadius: 8,
    borderStyle: "dashed",
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 2,
    width: "90%",
    height: "90%",
  },
  info: {
    padding: 5,
  },
  img: {
    position: "absolute", zIndex: -1,
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
    //opacity: 0.5,
  },
  bannerWrap: {
    width: "100%",
    height: 180,
    overflow: "hidden",
    backgroundColor: "red",
    flexDirection: "column"
  },
  title: {
    // position: "absolute",
    // left: 15,
    // bottom: 15,
    top: 20,
    color: "#FFF",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
    textShadowColor: 'rgba(0,0,0,0.5)',
  },
  banner: {
    position: "absolute",
    zIndex: -1,
    width: "100%",
    height: "100%",
    resizeMode: 'stretch',
  }
});
export default ProceduresView;