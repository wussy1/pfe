import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Categorie = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  function CategorieItem(props) {
    const [catProds, setCatProds] = useState([]);
    const el = props.el;

    function getCtagoryProds() {
      axios
        .get(`http://192.168.1.61:5000/api/product/prodbycat/${el.id_cat}`)
        .then((res) => setCatProds(res.data));
    }
    useEffect(() => {
      getCtagoryProds();
    }, []);

    function Product({ product }) {
      return (
        <View
          style={{
            width:350,
            backgroundColor: "#fff",
            margin:5,
            borderColor: "#dfe4ea",
            borderWidth: 1,
        
            borderRadius:20
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {/* Product Image View */}
            <View style={{ flex: 1, paddingHorizontal: 8 }}>
              <Image
                style={{ height: 100, resizeMode: "center" }}
                source={{ uri: product.prod_image }}
              />
            </View>
            {/* Product Details View */}
            <View style={{ flex: 3 }}>
              {/* -- Ratings View */}
              <View>
                <Text style={{fontWeight:"bold"}}>{product.prod_name}</Text>
              </View>
              {/* -- prix View */}
              <View style={{ margin:5}}>
                <Text style={{ fontSize: 16 }}>
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
              }}numberOfLines={2}
            >
              {product.description}
            </Text>
          </View>
        </View>
      );
    }
    return (
      <View>
        <View
          style={{
            backgroundColor: "#003984",
            height: 50,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Image
            style={{ width:"12%",resizeMode: "center" }}
            source={{ uri: el.icon }}
          />
          <Text
            style={{
              fontSize: 14,
              color: "white",
              fontWeight: "bold",
              padding: 10,
            }}
          >
             {el.name_cat}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "white",
              fontWeight: "bold",
              padding: 10,
            }}
            onPress={() =>
              navigation.navigate("ProductsByCategorie", { CatId: el.id_cat })
            }
          >
            VOIR TOUT
          </Text>
        </View>
        <ScrollView horizontal={true}>
          {catProds.slice(0, 4).map((product) => (
            <TouchableOpacity
              key={product.id}
              onPress={() => navigation.navigate("Products", product)}
            >
              <Product product={product} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  useEffect(() => {
    axios
      .get("http://192.168.1.61:5000/api/cat")
      .then((res) => setCategories(res.data));
  }, []);

  return (
    <View>
      {categories.map((el) => (
        <CategorieItem el={el} />
      ))}
    </View>
  );
};

export default Categorie;
