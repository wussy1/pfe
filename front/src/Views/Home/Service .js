import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserData } from '../../Utils/AsyncStorageFunctions';

const Service  = () => {
    const [user, setUser] = useState("");

  useEffect(async () => {
    setUser(JSON.parse(await getUserData()));
  }, []);
  if (user === "") {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )}
  return (
    <View style={{backgroundColor:'#000',flex:1,display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "center",}}>
      <Text style={{color:'#e98e2f',fontSize:20,}}>Binvenue {user.name}!</Text>
      <Text style={{color:'white',marginBottom:'1%',marginTop:'1%',fontSize:16}}>{user.email}</Text>
      <Text style={{color:'white',fontSize:16}}>+{user.number}</Text>
      <TouchableOpacity style={{height:'10%',width:'60%',marginTop:'10%',marginBottom:'0%'}} >
      <Text style={styles.text}>Prendre rendez-vous</Text>
      </TouchableOpacity>
      </View>
  )
}
const styles = StyleSheet.create({
text: {
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
});
export default Service 