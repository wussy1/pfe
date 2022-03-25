import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Accueil from "./Accueil";
const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={{marginBottom:'30%',fontSize:25,marginTop:'8%',color:"#003984"}}>CONNEXION</Text>
          <Text style={{marginRight:'47%',marginBottom:'1%',marginTop:'5%',fontSize:16}}>Adresse e-mail</Text>
          <TextInput style={{width:'75%',borderColor:'#003984',borderWidth:2,padding:5,borderRadius:5}} placeholder='Taper votre Adresse e-mail'></TextInput>
          <Text style={{marginRight:'47%',marginBottom:'1%',marginTop:'5%',fontSize:16}}>Mot de passe</Text>
          <TextInput style={{width:'75%',borderColor:'#003984',borderWidth:2,padding:5,borderRadius:5}} placeholder='Taper votre Mot de passe'></TextInput>
          <TouchableOpacity  style={{height:'10%',width:'75%',marginTop:'10%'}} >
      <Text style={styles.text}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={{height:'10%',width:'75%'}} >
      <Text style={styles.texte}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={{height:'15%',width:'70%',marginTop:'35%'}} onPress={()=>navigation.navigate('Accueil')} >
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

texte: {
  color: "#cfb72f",
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