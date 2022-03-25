import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import Introduction from "./Introduction";
const image = { uri: "https://mfiles.alphacoders.com/773/773337.jpg" };

const Splash_Screen = ({navigation}) => {
const [time, setTime] = useState(false)
    useEffect(() => {
      setTimeout(function() {

setTime(true);
        setTimeout(function() {
          navigation.replace('introduction')
          
        }, 2000);


        
      }, 3000);
      return () => {
        
      }
    }, []);
  return (
    <View style={styles.container}>
    <ImageBackground source={image} resizeMode="stretch" style={styles.image}>
{time && <ActivityIndicator color="#1776ae" size={'30%'}/>}</ImageBackground>
  </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    }
  });
  
export default Splash_Screen;
