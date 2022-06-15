import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Splash_Screen from "./src/Views/Splash_Screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/Views/Login";
import React, { useState,useEffect } from 'react'
import Introduction from "./src/Views/Introduction";
import Accueil from "./src/Views/Home/Accueil";
import Connexion from "./src/Views/Connexion";
import Sign_up from "./src/Views/Sign_up";
import Navigation from "./src/Views/Navigation";
import Profil from "./src/Views/Home/Profil";
import Apd_passe from "./src/Views/Home/Apd_passe";
import Panier from "./src/Views/Home/Panier";
import Service from "./src/Views/Home/Service";
import { getUserData } from "./src/Utils/AsyncStorageFunctions.js";
import Products from "./src/Views/Home/Products";
import Form_serv from "./src/Views/Home/Form_serv";

const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState("");

  useEffect(async () => {
    setUser(await getUserData())
  }, []);


  if (user === "") {
    return (
      <View style={{flex:1 ,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
        <Text>Veuillez patienter...</Text>
      </View>
    )}
    else{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user == null ? "splash" : "Navigation"}>
      <Stack.Screen name="splash" options={{headerShown: false}} component={Splash_Screen} />
      <Stack.Screen name="introduction" options={{headerShown: false}} component={Introduction} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Connexion" component={Connexion} />
      <Stack.Screen name="Products" options={{headerShown: false}} component={Products} /> 

      <Stack.Screen name="Accueil" options={{headerShown: false}} component={Accueil} />
      <Stack.Screen name="Sign_up" component={Sign_up} />
      <Stack.Screen name="Navigation" options={{headerShown: false}} component={Navigation} />
      <Stack.Screen name="Profil" options={{headerShown: false}} component={Profil} />
      <Stack.Screen name="Apd_passe" options={{headerShown: false}} component={Apd_passe} />
      <Stack.Screen name="Panier"  options={{headerShown: false}} component={Panier} />
      <Stack.Screen name="Service"  component={Service} />  
      <Stack.Screen name="Form_serv"  component={Form_serv} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
