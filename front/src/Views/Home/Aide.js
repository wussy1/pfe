import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,Switch,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Surface } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
const Aide = ({ navigation }) => {
  const IconSize = 20;
  const [switchVal, setSwitchVal] =useState(false)
  return (
    <Surface style={styles.container}>
      <Surface style={styles.header}>
        <View style={styles.view}>
          <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
            Aide
          </Text>
        </View>

        <View style={styles.view}></View>

        <View style={styles.views}>
          {
            <TouchableOpacity>
              <Feather
                name="search"
                size={IconSize}
                color={"white"}
                style={{ marginLeft: "20%" }}
              />
            </TouchableOpacity>
          }
          {
            <TouchableOpacity onPress={() => navigation.navigate("Panier")}>
              <Feather name="shopping-cart" size={IconSize} color={"white"} />
            </TouchableOpacity>
          }
        </View>
      </Surface>
      <View
        style={{
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
            marginRight: "31%",
            marginTop: "1%",
            marginBottom: "1%",
            fontSize: 16,
            color: "333333",
          }}
        >
          À PROPOS DE HYNDAI SERVICES
        </Text>
        {
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 45,
              width: "95%",
              backgroundColor: "white",
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 14 }}> Contactez-nous</Text>
            <Feather name="chevron-right" size={IconSize} color={"black"} />
          </TouchableOpacity>
        }
        {
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 45,
              width: "95%",
              backgroundColor: "white",
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 14 }}> Commandez par téléphone</Text>
            <Feather name="chevron-right" size={IconSize} color={"black"} />
          </TouchableOpacity>
        }
        <Text
          style={{
            padding: 4,
            fontWeight: "100",
            marginRight: "68%",
            fontSize: 15,
            color: "333333",
            marginTop: "1%",
            marginBottom: "1%",
          }}
        >
          PARAMÈTRES
        </Text>
        <View
          style={{
            flexDirection: "row",
              justifyContent: "space-between",
            height: 45,
            width: "95%",
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <Text>
          Notifications
        </Text>
        <Switch
        rackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={switchVal ? '#fff': '#f4f3f4'} 
        onValueChange={()=> setSwitchVal((prevVal) => !prevVal)}
        value={switchVal}
          />
          </View>
          
        {
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 45,
              width: "95%",
              backgroundColor: "white",
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 14 }}> Pays</Text>
            <Text style={{ fontSize: 12 }}>
              TUNISIA
              <Feather name="chevron-right" size={IconSize} color={"black"} />
            </Text>
          </TouchableOpacity>
        }
        
        <View
          style={{
            flexDirection: "row",
          justifyContent: "space-between",
            height: 45,
            width: "95%",
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <Text>
          {" "}
          Langue
        </Text>
        <Text style={{ color: "#c8c7cd", fontSize: 12 }}>FRENCH</Text></View>
        <Text
          style={{
            padding: 4,
            fontWeight: "100",
            marginRight: "30%",
            fontSize: 15,
            color: "333333",
            marginTop: "1%",
            marginBottom: "1%",
          }}
        >
          INFORMATIONS SUR L'APPLICATION
        </Text>

        <View
          style={{
          flexDirection: "row",
          justifyContent: "space-between",
            height: 45,
            width: "95%",
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <Text>
          Version de l'application 0.6.0
          </Text>
        <Text style={{ color: "#c8c7cd", fontSize: 12 }}>À JOUR</Text></View>
        {
          <TouchableOpacity
            style={{
              height: 45,
              width: "95%",
              backgroundColor: "white",
              padding: 10,
            }}
          >
            <Text> Cache utilisé:</Text>
          </TouchableOpacity>
        }
      </View>
    </Surface>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",

    justifyContent: "flex-start",
    alignItems: "flex-start",

    marginTop: "-3%",
  },
  header: {
    height: 55,
    elevation: 4,

    justifyContent: "space-between",

    alignItems: "center",

    flexDirection: "row",
    backgroundColor: "#333333",
    marginTop: "10%",
  },
  view: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#333333",
    margin: 10,

    alignItems: "center",
  },
  views: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#333333",
    margin: 5,
    marginLeft: "10%",
    justifyContent: "flex-end",
  },
});
export default Aide;
