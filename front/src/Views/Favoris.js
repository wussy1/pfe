import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getUserData } from "../Utils/AsyncStorageFunctions";
import axios from "axios";

const Favoris = ({ navigation }) => {
  const [favorisList, setFavorisList] = useState([]);
  useEffect(() => {
    getUserData().then((res) => {
      axios
        .get(`http://192.168.1.61:5000/api/favoris/get/${JSON.parse(res).id}`)
        .then((result) => {
          setFavorisList(result.data);
          console.log(result.data);
        });
    });
  }, []);

  function Product({ product }) {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          borderBottomColor: "#dfe4ea",
          borderBottomWidth: 1,
          paddingVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {/* Product Image View */}
          <View style={{ flex: 1, paddingHorizontal: 8 }}>
            <Image
              style={{ width: 100, height: 100, resizeMode: "center" }}
              source={{ uri: product.prod_image }}
            />
          </View>
          {/* Product Details View */}
          <View style={{ flex: 3 }}>
            {/* -- Ratings View */}
            <View>
              <Text style={{ margin: 10, fontSize: 16, fontWeight: "bold" }}>
                {product.prod_name}
              </Text>
            </View>
            {/* -- prix View */}
            <View style={{ marginTop: 4 }}>
              <Text style={{ fontSize: 16, marginLeft: 10 }}>
                {product.discount == null
                  ? `${product.prix.toFixed(2)} TND `
                  : `${(
                      product.prix -
                      product.prix * (product.discount / 100)
                    ).toFixed(2)} TND`}
              </Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={{
                    color: "#57606f",
                    fontSize: 13,
                    textDecorationLine: "line-through",
                    marginLeft: 10,
                  }}
                >
                  {product.discount !== null ? ` ${product.prix} TND ` : null}
                </Text>
                <Text style={{ color: "green" }}>
                  {product.discount == null ? "" : `  ${product.discount}%`}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Offer View */}
        {/*<View
          style={{
            paddingHorizontal: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <RNEIcon prod_name="tag" type="font-awesome" size={16} />
          <Text style={{ marginLeft: 10, fontSize: 16 }}>{product.offer}</Text>
        </View>*/}
        {/* description Wrap */}
        <View
          style={{
            marginTop: 4,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginTop: 4,
              marginBottom: 4,
              marginLeft: 4,
              marginRight: 4,
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "#f2f2f2",
              alignSelf: "baseline",
              paddingHorizontal: 6,
              paddingVertical: 4,
              borderRadius: 4,
            }}
            numberOfLines={2}
          >
            {product.description}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      <ScrollView>
        {favorisList.map((el) => (
          <TouchableOpacity
            key={el.id}
            onPress={() => navigation.navigate("Products", el)}
          >
            <Product product={el} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Favoris;
