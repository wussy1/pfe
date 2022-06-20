import { View, Text, StatusBar, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getUserData } from "../Utils/AsyncStorageFunctions";
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';

const Commandes = () => {
  const [commandes, setCommandes] = useState([]);

  async function getCommandes() {
    await getUserData().then((res) =>
      axios
        .get(`http://10.1.1.217:5000/api/comd/all/${JSON.parse(res).id}`)
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
          <View style={{ borderWidth: 1, margin: 10, padding: 10 }}>
            <Text>
              {new Date(el.date).toLocaleDateString() +
                " " +
                new Date(el.date).toLocaleTimeString()}{" "}
              + {el.total} Tnd{" "}
            </Text>
            {el.products.map((prod)=><View><Text>{prod.prod_name} = {prod.quantity}</Text></View>)}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Commandes;
