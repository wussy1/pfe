import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { getUserData } from "../../Utils/AsyncStorageFunctions";
import { Surface } from "react-native-paper";

const Service = () => {
  const [user, setUser] = useState("");

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
      <View
        style={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingTop: 8,
          paddingHorizontal: 10,
          height: "100%",
          width: "100%",
          backgroundColor: "#f5f5f5",
          marginTop: "-1%",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            padding: 4,
            fontWeight: "100",
            marginRight: "49%",
            fontSize: 15,
            color: "#333333",
          }}
        >
          MON COMPTE HYNDAI
        </Text>
      <TouchableOpacity
        style={{
          height: "10%",
          width: "60%",
          marginTop: "10%",
          marginBottom: "0%",
        }}
      >
        <Text style={styles.text}>Prendre rendez-vous</Text>
      </TouchableOpacity>
    </View></Surface>
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

    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
export default Service;
