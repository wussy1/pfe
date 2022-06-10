import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Categorie = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.1.22:5000/api/cat")
      .then((res) => setCategories(res.data));
  }, []);

  return (
    <View>
      {categories.map((el) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProductsByCategorie", { CatId: el.id_cat })
          }
          style={{ borderWidth: 1, padding: 10, margin: 10 }}
        >
          <Text>{el.name_cat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Categorie;
