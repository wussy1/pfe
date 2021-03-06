import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from "react-native";
import { getUserData } from "../../Utils/AsyncStorageFunctions";
import Feather from "react-native-vector-icons/Feather";
import Constants from "expo-constants";
import { Feather as Icon, FontAwesome as FAIcon } from "@expo/vector-icons";
import axios from "axios";
const Rating = ({ rating, maxRating }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {Array(rating)
        .fill(1)
        .map((el) => (
          <FAIcon name="star" size={20} color="#2e2e2e" />
        ))}
      {Array(maxRating - rating)
        .fill(1)
        .map((el) => (
          <FAIcon name="star-o" size={20} color="#2e2e2e" />
        ))}
    </View>
  );
};

const Products = ({ route, navigation }) => {
  const [user, setUser] = useState(null);
  const [isFavourite, setFavourite] = useState(null);
  const [isit, setIsit] = useState("default");
  const [color] = useState([
    { id: 1, label: "white" },
    { id: 1, label: "black" },
    { id: 1, label: "blue" },
    { id: 1, label: "red" },
  ]);

  const [selectedColor, setselectedColor] = useState("white");

  

  const [seeFullDescription, setSeeFullDescription] = useState(false);

  const [moreProducts, setmoreProducts] = useState([]);
  function addtofav() {
    axios.post("http://192.168.1.61:5000/api/favoris/add-remove", {
      user_id: user.id,
      product_id: prod.id_prod,
    });
  }
  async function AddItem(idproduit) {
    await axios
      .post("http://192.168.1.61:5000/api/pan/add", {
        id_user: user.id,
        id_prod: idproduit,
      })

      .then((res) => console.log(res));
  }
  function checkFav(userid) {
    axios
      .post("http://192.168.1.61:5000/api/favoris/get", {
        user_id: userid,
        product_id: prod.id_prod,
      })
      .then((res) => {
        setFavourite(res.data.exist);
      })
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    console.log("el user id is");
    getUserData().then((res) => {
      setUser(JSON.parse(res));
      checkFav(JSON.parse(res).id);
    });
    axios.get("http://192.168.1.61:5000/api/product/").then((res) => {
      setmoreProducts(res.data);
    });
  }, [isFavourite]);

  const prod = route.params;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            paddingRight: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" type="font-awesome" size={25} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products {isFavourite}</Text>
        <TouchableOpacity
          style={{
            paddingRight: 10,
          }}
          onPress={() => {
            user == null
              ? navigation.navigate("Login")
              : navigation.navigate("Panier");
          }}
        >
          <Feather name="shopping-cart" size={25} color={"#111"} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            style={{ height: 500, resizeMode: "cover" }}
            source={{ uri: prod.prod_image }}
          />
        </View>
        <View style={styles.detailsView}>
          <View style={styles.productTitleView}>
            <Text style={styles.productTitle}>{prod.prod_name}</Text>
            <TouchableOpacity
              onPress={() => {
                setFavourite(!isFavourite);
                addtofav();
              }}
            >
              <FAIcon
                name={
                  isFavourite == true
                    ? "heart"
                    : isFavourite == false
                    ? "heart-o"
                    : "spinner"
                }
                size={22}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.prixView}>
            <Text style={styles.discountedPriceText}>
              {" "}
              {prod.discount == null
                ? `${prod.prix.toFixed(2)} TND `
                : `${(prod.prix - prod.prix * (prod.discount / 100)).toFixed(
                    2
                  )} TND`}
            </Text>
            <Text style={styles.actualPriceText}>{prod.prix} TND</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Rating rating={4} maxRating={5} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 10,
              }}
            >
              color:
            </Text>
            <View style={{ flexDirection: "row" }}>
              {color.map((s) => (
                <TouchableOpacity
                  style={
                    selectedColor === s.label ? styles.tagSelected : styles.tag
                  }
                  onPress={() => setselectedColor(s.label)}
                >
                  <Text
                    style={
                      selectedColor === s.label
                        ? styles.tagLabelSelected
                        : styles.tagLabel
                    }
                  >
                    {s.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
          <TouchableOpacity
            style={styles.buyNowButton}
            onPress={() => {
              user == null
                ? navigation.navigate("Login")
                : AddItem(prod.id_prod);ToastAndroid.show("produit ajout?? avec succ??s", ToastAndroid.SHORT);
            }}
          >
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10, backgroundColor: "#fff" }}>
          <TouchableOpacity
            style={styles.productDescriptionHeader}
            onPress={() => setSeeFullDescription((prev) => !prev)}
          >
            <Text style={{ fontSize: 18 }}>Product Description</Text>
            <TouchableOpacity
              onPress={() => setSeeFullDescription((prev) => !prev)}
            >
              {seeFullDescription ? (
                <Icon name="chevron-up" size={26} />
              ) : (
                <Icon name="chevron-down" size={26} />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={{ padding: 10 }}>
            <Text>
              {seeFullDescription
                ? `${prod.description}`
                : `${prod.description.split("\n")[0]}`}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              marginHorizontal: 10,
            }}
          >
            More Products
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flex: 1, flexDirection: "row", paddingTop: 10 }}>
              {moreProducts.map((item) => (
                <View style={{ width: 180, marginHorizontal: 10 }}>
                  <View style={styles.moreprod_imageView}>
                    <Image
                      style={{ flex: 1 }}
                      source={{
                        uri: item.prod_image,
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.moreprod_name}>{item.prod_name}</Text>
                    <View style={styles.moreprixView}>
                      <Text style={styles.moreprix}>{item.prix} TND</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Icon
                          style={styles.moreProductIcon}
                          name="heart"
                          size={18}
                        />
                        <Feather
                          name="shopping-cart"
                          style={styles.moreProductIcon}
                          size={18}
                        />
                        <Icon
                          style={styles.moreProductIcon}
                          name="share"
                          size={18}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.moreProductBuyButton}
                    onPress={() => {
                      user == null
                        ? navigation.navigate("Login")
                        : AddItem(item.id_prod);ToastAndroid.show("produit ajout?? avec succ??s", ToastAndroid.SHORT);
                    }}
                  >
                    <Text style={styles.moreProductBuyButtonText}>Buy</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={{ height: 40 }}></View>
      </ScrollView>
    </View>
  );
};

export default Products;
const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    borderBottomColor: "#dfe4fe",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsView: {
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  productTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productTitle: {
    fontSize: 24,
  },
  prixView: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  discountedPriceText: { fontSize: 20 },
  actualPriceText: {
    color: "#222",
    marginLeft: 10,
    textDecorationLine: "line-through",
    fontSize: 18,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#111",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  addToCartButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
    borderWidth: 1,
    borderColor: "#111",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  tag: {
    borderRadius: 4,
    backgroundColor: "#FFF",
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabel: {
    color: "#333",
  },
  tagSelected: {
    backgroundColor: "#333",
    borderRadius: 4,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabelSelected: {
    color: "#FFF",
  },
  productDescriptionHeader: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#dfe4fe",
  },
  moreprod_imageView: {
    flex: 1,
    height: 240,
    backgroundColor: "#fff",
    borderRadius: 4,
    overflow: "hidden",
  },
  moreprod_name: {
    fontSize: 16,
  },
  moreprixView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  moreprix: {
    fontSize: 16,
  },
  moreProductIcon: {
    marginLeft: 10,
  },
  moreProductBuyButton: {
    backgroundColor: "#111",
    marginTop: 10,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  moreProductBuyButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
