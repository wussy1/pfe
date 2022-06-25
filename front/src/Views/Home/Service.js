import { View, Text, StyleSheet,Image, TouchableOpacity, StatusBar, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { getUserData } from "../../Utils/AsyncStorageFunctions";
import { Surface } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Accueil from "./Accueil";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
const Service = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [service, setService] = useState([]);

  const IconSize = 20;

  useEffect(async () => {
    setUser(JSON.parse(await getUserData()));
    axios.get("http://192.168.41.80:5000/api/serv/").then((res) => {
      setService(res.data);


    });
  }, []);
  if (user === "") {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  function Serv({ serv }) {
    return (
      
        <View style={{ flexDirection: "row" ,alignItems:"center", backgroundColor: "#fff",width:"90%",height:200,
          marginTop: 10,
          borderWidth: 1,
          borderColor: "#999",
          marginHorizontal: 10,
          overflow:"hidden",
          borderRadius:20

          }}>
          {/* serv Image View */}
            <ImageBackground style={styles.image} source={{ uri:serv.icon }}>
                <Text style={styles.texte}>
                  <FontAwesome
                   name="wrench"
                    size={IconSize}
                    color={"white"}
                  />{" "}
                 {serv.name}{" "}
                </Text>
              </ImageBackground>
     </View>
    );
  }





  return (
    <Surface style={styles.container}>
      <View
        style={{
          height: "13%",
          width: "100%",
          backgroundColor: "#282828",
          marginTop: "-1%",
        }}
      >
        <Text style={{ color: "#e98e2f", fontSize: 18, marginTop: "2%" }}>
          Binvenue {user.name}!
        </Text>
        <Text style={{ color: "white", marginBottom: "1%", marginTop: "1%" }}>
          {user.email}
        </Text>
        <Text style={{ color: "white" }}>+{user.number}</Text>
      </View>
      <ScrollView contentContainerStyle={{  justifyContent:'flex-start',
    alignItems:'center',}}
        style={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingTop: 8,
          paddingHorizontal: 10,
          width: "100%",
          backgroundColor: "#f5f5f5",
          flexDirection: "column",
        }}
      >
         <>
            {/* servs List */}
          
                {service.map((serv) => (
                  <TouchableOpacity
                    key={serv.id}
                    onPress={() => navigation.navigate("Form_serv",serv)}
                  >
                    <Serv serv={serv} />
                  </TouchableOpacity>
                ))}
              
            <View style={{ height: 20 }}></View>
          </>
     
    </ScrollView>
    
    </Surface>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 18,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#43b72b",
  },container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#282828",

  
  },  image: {
    resizeMode: "stretch",
    height: "100%",
    flexDirection: "row",
    alignContent: "stretch",
    alignItems: "flex-end",
  },
  texte: {
    width: "100%",
    color: "white",
    fontSize: 18,
    lineHeight: 60,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
});
export default Service;
