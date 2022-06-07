import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native";
import React from "react";
import logo from "../Assets/Images/a.png";
import hyun from "../Assets/Images/b.png";

const Introduction = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image resizeMode="stretch" style={{height:'5%',width:'70%',marginBottom:'10%'}} source={logo} />
      <Image resizeMode="stretch" style={{height:'15%',width:'70%'}} source={hyun} />
      <TouchableOpacity  style={{height:'15%',width:'70%',marginTop:'40%'}} onPress={()=>navigation.navigate('Login')} >
      <Text style={styles.text}>S'IDENTIFIER</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={{height:'15%',width:'70%'}} onPress={()=>navigation.reset({
            index: 0,
            routes: [{ name: "Accueil" }],
          })} >
      <Text style={styles.texte}>IGNORER</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,    
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"white",
  },
  image: {

    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize:18 ,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#003984",
  },
  texte: {
    color: "#003984",
    fontSize:18 ,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
  },
});
export default Introduction;
