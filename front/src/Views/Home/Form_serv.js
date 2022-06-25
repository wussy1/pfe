import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getUserData } from "../../Utils/AsyncStorageFunctions";
import { Surface } from "react-native-paper";

import { ScrollView, TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { StatusBar } from "react-native";
const Form_serv = ({ navigation, route }) => {
  const [user, setUser] = useState("");
  const [data, setData] = useState({ description: "", carmodel: "" });
  const serv = route.params;

  function addServCom() {
    if (data.description.length > 0 && data.carmodel.length > 0) {
      console.log({
        user_id: user.id,
        service_id: serv.id,
        cars_model: data.carmodel,
        description: data.description,
      });
      axios
        .post("http://192.168.1.61:5000/api/serv/add-commande", {
          user_id: user.id,
          service_id: serv.id,
          cars_model: data.carmodel,
          description: data.description,
        })
        .then((result) => {
          if (result.data.added) {
            alert("Added Succefully");
            navigation.navigate("Accueil");
          } else {
            alert("Something wrong happend");
            console.log(result);
          }
        })
        .catch((err) => alert("Error occured " + err));
    } else {
      alert("Veuillez repmlir les champs");
    }
  }

  useEffect(async () => {
    setUser(JSON.parse(await getUserData()));
  }, []);
  if (user === "") {
    return (
      <View>
        <Text>Loading</Text>
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-1%",
        }}
      >
        <Text
          style={{
            color: "#e98e2f",
            fontSize: 30,
            fontWeight: "bold",
            marginTop: "2%",
          }}
        >
          {serv.name}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingTop: 8,
          paddingHorizontal: 10,
          flex: 1,
          width: "100%",
          backgroundColor: "#f5f5f5",
          flexDirection: "column",
        }}
      >
        <Text style={{ margin: 15 }}>
          Veuillez remplir le formulaire en décrivant ce que vous voulez
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#282828",
            padding: 20,
           
            width:"70%",
            justifyContent: "space-around",
            borderTopRightRadius: 30,
            borderBottomLeftRadius: 30,
          }}
        >
            <TextInput
              onChangeText={(text) => setData({ ...data, carmodel: text })}
              placeholder="Car Model"
              style={{
                borderWidth: 1,
                borderColor: "#282828",
                paddingHorizontal: 10,
              }}
            />
            <TextInput
              placeholder="Description ... "
              multiline={true}
              onChangeText={(text) => setData({ ...data, description: text })}
              numberOfLines={10}
              style={{
                borderColor: "#282828",
                padding: 10,
                marginVertical:10,
                borderWidth: 1,
                textAlignVertical: "center",
              }}
            />
            <TouchableOpacity onPress={() => addServCom()}>
              <Text
                style={{
                  textAlign: "center",
                  backgroundColor: "orange",
                  padding: 5,
                  marginVertical:10,
                  borderRadius: 10,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Envoyer
              </Text>
            </TouchableOpacity>
        </View>
      </View>
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
  },
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#282828",
  },
  image: {
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
export default Form_serv;
