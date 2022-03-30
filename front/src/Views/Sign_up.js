import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import c from "../Assets/Images/c.png";

const Sign_up = ({navigation}) => {
  return (
    <View style={styles.container}>
    <Image resizeMode="stretch" style={{height:'15%',width:'70%',marginBottom:'0%'}} source={c} />
    <Text style={{marginBottom:'10%',fontSize:25,marginTop:'-1%',color:"#003984"}}>Créer un compte</Text>
         <Text style={{marginRight:'64%',marginBottom:'1%',marginTop:'3%',fontSize:15}}>Nom</Text>
        <TextInput style={{width:'75%',borderColor:'#003984',borderWidth:2,padding:5,borderRadius:5}} placeholder='Taper votre nom'></TextInput>
        <Text style={{marginRight:'62%',marginBottom:'1%',marginTop:'3%',fontSize:15}}>E-mail</Text>
        <TextInput style={{width:'75%',borderColor:'#003984',borderWidth:2,padding:5,borderRadius:5}} placeholder='Taper votre Adresse e-mail'></TextInput>
        <Text style={{marginRight:'50%',marginBottom:'1%',marginTop:'3%',fontSize:15}}>Mot de passe</Text>
        <TextInput style={{width:'75%',borderColor:'#003984',borderWidth:2,padding:5,borderRadius:5}} placeholder='Mot de passe'></TextInput>
        <Text style={{marginRight:'16%',marginBottom:'1%',marginTop:'3%',fontSize:15}}>Entrez le mot de passe à nouveau</Text>
        <TextInput style={{width:'75%',borderColor:'#003984',borderWidth:2,padding:5,borderRadius:5}} placeholder='Nouveaux Mot de passe'></TextInput>
        <TouchableOpacity  style={{height:'10%',width:'75%',marginTop:'10%',marginBottom:'-5%'}} >
    <Text style={styles.text}>Valider</Text>
    </TouchableOpacity>
    <View style={styles.containere}>
      <Text style={styles.tet}>Déjà membre ?</Text>
      <TouchableOpacity  style={{height:'100%',width:'30%'}} onPress={()=>navigation.navigate('Login')} >
      <Text style={styles.tee}>Connextion</Text>
      </TouchableOpacity>
      </View>
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
  containere: {
    
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    
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
  tet: {
    color: "#000000",
    fontSize:18,
    
    justifyContent:'center',
    alignItems:'center',
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",},
    tee: {marginRight:'15%',
      color: "#f04536",
      fontSize:15,
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center',
      lineHeight: 40,
      fontWeight: "bold",
      textAlign: "center",},
  });
  
export default Sign_up