import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Accueil from "./Accueil";
import c from "../Assets/Images/c.png";
const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image resizeMode="stretch" style={{height:'15%',width:'70%',marginBottom:'0%'}} source={c} />
      <Text style={{marginBottom:'15%',fontSize:25,marginTop:'0%',color:"#003984"}}>CONNEXION</Text>
          <Text style={{marginRight:'60%',marginBottom:'1%',marginTop:'0%',fontSize:16}}>E-mail</Text>
          <TextInput style={{width:'75%',borderColor:'#003984',borderWidth:2,padding:5,borderRadius:5}} placeholder='Taper votre Adresse e-mail'></TextInput>
          <Text style={{marginRight:'47%',marginBottom:'1%',marginTop:'5%',fontSize:16}}>Mot de passe</Text>
          <TextInput style={{width:'75%',borderColor:'#003984',borderWidth:2,padding:5,borderRadius:5}} placeholder='Taper votre Mot de passe'></TextInput>
          <TouchableOpacity  style={{height:'10%',width:'75%',marginTop:'10%'}} >
      <Text style={styles.text}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={{height:'10%',width:'75%'}} >
      <Text style={styles.texte}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={{height:'10%',width:'60%'}}  onPress={()=>navigation.navigate('Connexion')}>
      <Text style={styles.te}>Cree un compte</Text></TouchableOpacity>
      <TouchableOpacity  style={{height:'15%',width:'70%',marginTop:'10%'}} onPress={()=>navigation.navigate('Accueil')} >
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
te: {
  color: "white",
  fontSize:18 ,
  borderRadius:10,
  justifyContent:'center',
  alignItems:'center',
  lineHeight: 40,
  fontWeight: "bold",
  textAlign: "center",
  backgroundColor: "#43b72b",
},

texte: {
  color: "#000000",
  fontSize:18 ,
  borderRadius:10,
  justifyContent:'center',
  alignItems:'center',
  lineHeight: 40,
  fontWeight: "bold",
  textAlign: "center",
  backgroundColor: "white",
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
});

export default Login