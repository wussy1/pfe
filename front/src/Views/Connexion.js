import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import g from "../Assets/Images/g.png";
import f from "../Assets/Images/f.png";
import c from "../Assets/Images/c.png";
const Connexion = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image resizeMode="stretch" style={{height:'15%',width:'70%',marginBottom:'0%'}} source={c} />
      <Text style={{marginBottom:'25%',fontSize:25,marginTop:'0%',color:"#003984"}}>CONNEXION</Text>
      <TouchableOpacity  style={{height:'10%',width:'75%',marginBottom:'5%'}} onPress={()=>navigation.navigate('Sign_up')}  >
      <Text style={styles.texte}>Créer un compte</Text></TouchableOpacity>
      <TouchableOpacity
          style={styles.buttonFacebookStyle}>
          <Image style={styles.image} source={g} />
      <Text style={styles.text}>Connextion via Google</Text></TouchableOpacity>
      <TouchableOpacity
          style={styles.buttonFacebookStyles}>
          <Image style={styles.image} source={f} />
      <Text style={styles.text}>Connextion via Facebook</Text></TouchableOpacity>
      <View style={styles.containere}>
      <Text style={styles.tet}>Déjà membre ?</Text>
      <TouchableOpacity  style={{height:'100%',width:'30%'}} onPress={()=>navigation.navigate('Login')} >
      <Text style={styles.te}>Connexion</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity  style={{height:'15%',width:'70%',marginTop:'43%'}} onPress={()=>navigation.reset({
            index: 0,
            routes: [{ name: "Accueil" }],
          })} >
      <Text style={styles.tex}>IGNORER</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:'flex',
    flexDirection:'column',
    
    
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:"white",
  },
  containere: {
    
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    
  },
  texte: {
    color: "white",
    fontSize:18 ,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
  backgroundColor: "#43b72b"},
  tet: {
    color: "#000000",
    fontSize:15 ,
    
    justifyContent:'center',
    alignItems:'center',
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",},
    te: {marginRight:'15%',
      color: "#f04536",
      fontSize:18,
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center',
      lineHeight: 40,
      fontWeight: "bold",
      textAlign: "center",},
  text: {
    color: "white",
    fontSize:18 ,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
    
},
buttonFacebookStyle: {
  flexDirection: 'row',
  alignItems: 'center',
  alignContent:'center',
  backgroundColor: '#003984',
  borderWidth: 0.5,
  borderColor: '#fff',
  height: '5%',
  width:'75%',
  borderRadius: 10,
  margin: 10,                                       
},
buttonFacebookStyles: {
  flexDirection: 'row',
  alignItems: 'center',
  alignContent:'center',
  backgroundColor: '#4267b2',
  borderWidth: 0.5,
  borderColor: '#fff',
  height: '5%',
  width:'75%',
  borderRadius: 10,
  margin: 10,                                       
},
image:{
  padding: 10,
    margin: 5,
    marginRight:'10%',
    height: 28,
    width: 28,
    resizeMode: 'stretch',
},
tex: {
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


})  
export default Connexion