import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { getUserData, LogoutUser } from "../../Utils/AsyncStorageFunctions";
import { Surface } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
const Mon_Compte = ({ navigation }) => {
  const [user, setUser] = useState("");

  useEffect(async () => {
    setUser(JSON.parse(await getUserData()));
  }, []);

  if (user === "") {
    return (
      <View style={{flex:1 ,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        
          
        <Text>Veuillez patienter... </Text>
      </View>
    );
  }
  const IconSize = 20;
  return (
    <Surface style={styles.container}>
      <Surface style={styles.header}>
        <View style={styles.view}>
          <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
            Mon compte
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
            <Text style={{ fontSize: 14 }}>
              {" "}
              <Feather
                name="shopping-bag"
                size={IconSize}
                color={"black"}
              />{" "}
              Mes commende
            </Text>
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
            <Text style={{ fontSize: 14 }}>
              {" "}
              <Feather name="mail" size={IconSize} color={"black"} /> Boite de
              reception
            </Text>
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
            <Text style={{ fontSize: 14 }}>
              {" "}
              <SimpleLineIcons name="note" size={19} color={"black"} /> Notes en
              attente
            </Text>
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
            <Text style={{ fontSize: 14 }}>
              {" "}
              <Feather name="heart" size={IconSize} color={"black"} /> Ma liste
              d'envie
            </Text>
            <Feather name="chevron-right" size={IconSize} color={"black"} />
          </TouchableOpacity>
        }

        <Text
          style={{
            padding: 4,
            fontWeight: "100",
            fontSize: 15,
            marginRight: "56%",
            marginTop: "1%",
            marginBottom: "1%",
            color: "#333333",
          }}
        >
          MES PARAMETRES
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
            onPress={() => navigation.navigate("Profil")}
          >
            <Text style={{ fontSize: 14 }}> Mon profil</Text>
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
            <Text style={{ fontSize: 14 }}> Adresse</Text>
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
            onPress={() => navigation.navigate("Apd_passe")}
          >
            <Text style={{ fontSize: 14 }}> Changer le mot de passe</Text>
            <Feather name="chevron-right" size={IconSize} color={"black"} />
          </TouchableOpacity>
        }

        <TouchableOpacity
          style={{}}
          onPress={async () => {
            await LogoutUser();
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          }}
        >
          <Text
            style={{
              padding: 4,
              fontWeight: "blod",
              color: "#e98e2f",
              fontSize: 18,
              marginTop: "4%",
            }}
          >
            SE DECONNECTER
          </Text>
        </TouchableOpacity>
      </View>
    </Surface>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#282828",

    justifyContent: "flex-start",
    alignItems: "flex-start",

    marginTop: "7%",
  },
  header: {
    height: "7%",
    elevation: 4,

    justifyContent: "space-between",

    alignItems: "center",

    flexDirection: "row",
    backgroundColor: "#333333",
  },
  view: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#333333",
    margin: 9,

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
export default Mon_Compte;
