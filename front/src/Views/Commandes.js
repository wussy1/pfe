import { View, Text, StatusBar, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getUserData } from "../Utils/AsyncStorageFunctions";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const Commandes = () => {
  const [commandes, setCommandes] = useState([]);

  async function getCommandes() {
    await getUserData().then((res) =>
      axios
        .get(`http://192.168.1.61:5000/api/comd/all/${JSON.parse(res).id}`)
        .then((result) => setCommandes(result.data))
    );
  }
  useFocusEffect(
    React.useCallback(() => {
      getCommandes();
    }, [])
  );

  return (
    <View style={{ marginTop: StatusBar.currentHeight, padding: 15 }}>
      <ScrollView>
        {commandes.map((el) => (
          <View
            style={{
              margin: 10,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "#ddd",
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text>
                {new Date(el.date).toLocaleDateString() +
                  " " +
                  "a " +
                  new Date(el.date).toLocaleTimeString()}
              </Text>
              <Text
                style={{
                  backgroundColor: "orange",
                  marginTop: -10,
                  marginRight: -10,
                  borderBottomLeftRadius: 10,
                  borderTopRightRadius: 10,
                  paddingHorizontal: 10,
                  textAlignVertical: "center",
                  color: "white",
                  fontSize: 15,
                }}
              >
                {el.total} Tnd
              </Text>
            </View>
            <View style={{margin:10}}>
              {el.products.map((prod) => (
                <View style={{flexDirection:"row",alignItems:"center",margin:5}}>
                  <Image source={{ uri: prod.prod_image }} style={{height:50,width:50,marginRight:10}} />
                  <Text>
                  {prod.quantity} x {prod.prod_name}
                  </Text>
                  
                </View>
              ))}
            </View>
            <Text style={{textAlign:"center",fontSize:18,opacity:0.7,color:el.etat=="en attente"?"orange":el.etat=="accepté"?"green":el.etat=="annulé"?"red":"black"}}>{el.etat}</Text>

          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Commandes;
