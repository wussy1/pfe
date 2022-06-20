import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import h from "../../Assets/Images/h.png";
import { Feather as Icon } from "@expo/vector-icons";
import { getUserData } from "../../Utils/AsyncStorageFunctions";

const Accueil = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchedProds, setSearchProds] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const fadeAnim = useRef(
    new Animated.Value(Dimensions.get("window").width)
  ).current; // Initial value for opacity: 0
  const fadeY = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current; // Initial value

  function getSearched(search) {
    axios
      .get(`http://10.1.1.217:5000/api/product/prod/${search}`)
      .then((result) => {
        setSearchProds(result.data);
      });
  }

  useEffect(() => {
    getUserData().then((res) => {
      setUser(JSON.parse(res));
    });
    axios.get("http://10.1.1.217:5000/api/product/").then((res) => {
      console.log("********************************");
      StatusBar.setBackgroundColor("#333333");
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);

  const [carouselItems, setCarousel] = useState([
    {
      title: "Item 1",
      text: "Text 1",
    },
    {
      title: "Item 2",
      text: "Text 2",
    },
    {
      title: "Item 3",
      text: "Text 3",
    },
    {
      title: "Item 4",
      text: "Text 4",
    },
    {
      title: "Item 5",
      text: "Text 5",
    },
  ]);

  function _renderItem({ item, index }) {
    return (
      <View
        style={{
          backgroundColor: "floralwhite",
          borderRadius: 5,
          height: 150,
          padding: 35,
        }}
      >
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  }

  const IconSize = 20;

  function Product({ product }) {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          marginTop: 10,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#999",
          marginHorizontal: 10,

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
          <View style={{ flex: 3, marginLeft: 20 }}>
            {/* -- Ratings View */}
            <View>
              <Text style={{ margin: 10, fontSize: 16, fontWeight: "100" }}>
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
            }}numberOfLines={2}
          >
            {product.description}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showSearch && (
        <View style={{ height: "100%", width: "100%", position: "absolute" }}>
          <Animated.View
            style={{
              width: "100%",
              backgroundColor: "black",
              zIndex: 10,
              borderBottomWidth: 2,
              borderTopWidth: 2,
              borderColor: "#333",
              transform: [
                {
                  translateX: fadeAnim,
                },
              ],
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  padding: 5,
                  width: "15%",
                  marginTop: 10,
                  marginBottom: 10,
                }}
                onPress={() => setShowSearch(false)}
              >
                <Icon
                  name="arrow-left"
                  type="font-awesome"
                  size={25}
                  color="white"
                />
              </TouchableOpacity>
              <TextInput
                onChangeText={(text) => getSearched(text)}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  margin: 10,
                  backgroundColor: "white",
                  borderRadius: 8,
                  padding: 5,
                  color: "black",
                  fontSize: 18,
                }}
              ></TextInput>
            </View>
          </Animated.View>
          <Animated.View
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#ddd",
              zIndex: 20,
              transform: [
                {
                  translateY: fadeY,
                },
              ],
            }}
          >
            <ScrollView style={{ marginBottom: "18%" }}>
              {searchedProds.map((el) => (
                <TouchableOpacity
                  key={el.id}
                  onPress={() => navigation.navigate("Products", el)}
                >
                  <Product product={el} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      )}
      <View>
        <View style={styles.header}>
          <View style={styles.view}>
            <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
              Accueil
            </Text>
          </View>
          <View style={styles.view}></View>

          <View style={styles.views}>
            {
              <TouchableOpacity
                onPress={() => {
                  fadeAnim.setValue(-Dimensions.get("window").width);
                  Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 250, // the duration of the animation
                    easing: Easing.linear, // the style of animation
                    useNativeDriver: true,
                  }).start();
                  fadeY.setValue(Dimensions.get("window").height);

                  setTimeout(() => {
                    Animated.timing(fadeY, {
                      toValue: 0,
                      duration: 150, // the duration of the animation
                      easing: Easing.linear, // the style of animation
                      useNativeDriver: true,
                    }).start();
                  }, 500);
                  setShowSearch(true);
                }}
              >
                <Feather
                  name="search"
                  size={IconSize}
                  color={"white"}
                  style={{ marginLeft: "20%" }}
                />
              </TouchableOpacity>
            }
            {
              <TouchableOpacity
                onPress={() => {
                  user == null
                    ? navigation.navigate("Login")
                    : navigation.navigate("Panier");
                }}
              >
                <Feather name="shopping-cart" size={IconSize} color={"white"} />
              </TouchableOpacity>
            }
          </View>
        </View>
        <ScrollView style={{ padding: 1, marginBottom: "9%" }}>
          <View style={{ width: "100%", padding: 15 }}>
            <Carousel
              data={carouselItems}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={Dimensions.get("window").width * 0.8}
              enableMomentum={false}
              lockScrollWhileSnapping
              autoplay
              loop
              autoplayInterval={2000}
              renderItem={_renderItem}
              onSnapToItem={(index) => setActiveIndex(index)}
            />
          </View>
          <View
            style={{ height: 200, marginTop: "2%", backgroundColor: "white" }}
          >
            <Text
              style={{
                padding: 4,
                fontWeight: "100",
                fontSize: 16,
                color: "#333333",
                textAlign: "center",
                marginBottom: "1%",
              }}
            >
              Service
            </Text>
            <TouchableOpacity
              style={{ borderWidth: 1, height: "80%", width: "100%" }}
              onPress={() => {
                user == null
                  ? navigation.navigate("Login")
                  : navigation.navigate("Service");
              }}
            >
              <ImageBackground style={styles.image} source={h}>
                <Text style={styles.text}>
                  <FontAwesome name="wrench" size={IconSize} color={"white"} />{" "}
                  Prendre rendez-vous{" "}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#003984",
              height: 50,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "white",
                fontWeight: "bold",
                padding: 10,
              }}
            >
              <Ionicons name="flash" size={IconSize} color={"white"} />
              {""} Vente Flash
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "white",
                fontWeight: "bold",
                padding: 10,
              }}
              onPress={() => navigation.navigate("Promition")}
            >
              VOIR TOUT
            </Text>
          </View>
          <>
            <ScrollView horizontal={true}>
              {products.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  onPress={() => navigation.navigate("Products", product)}
                >
                  <Product product={product} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={{ height: 20 }}></View>
          </>
          <View
            style={{
              backgroundColor: "#003984",
              height: 50,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "white",
                fontWeight: "bold",
                padding: 10,
              }}
            >
              <Ionicons name="flash" size={IconSize} color={"white"} />
              {""} Plus de produits
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "white",
                fontWeight: "bold",
                padding: 10,
              }}
              onPress={() => navigation.navigate("Promition")}
            >
              VOIR TOUT
            </Text>
          </View>
          <>
            <ScrollView horizontal={true}>
              {products.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  onPress={() => navigation.navigate("Products", product)}
                >
                  <Product product={product} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={{ height: 20 }}></View>
          </>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: StatusBar.currentHeight,
  },
  containerr: {
    flex: 1,
  },
  header: {
    zIndex: 2,
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
  image: {
    resizeMode: "stretch",
    height: "100%",
    flexDirection: "row",
    alignContent: "stretch",
    alignItems: "flex-end",
  },
  text: {
    width: "100%",
    color: "white",
    fontSize: 18,
    lineHeight: 60,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },

  arrangeProductsBar: {
    flexDirection: "row",
    paddingVertical: 14,
    backgroundColor: "#fafafa",
    borderBottomColor: "#dfe4ea",
    borderBottomWidth: 1,
  },
  arrangeProductsBarItemOpacity: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  arrangeProductsBarItemLabel: {
    marginHorizontal: 10,
    fontSize: 20,
  },
  iconCountView: {
    position: "absolute",
    zIndex: 2,
    right: -4,
    top: -4,
    paddingHorizontal: 4,
    borderRadius: 10,
    backgroundColor: "red",
  },
  iconCountText: { color: "#fff", fontWeight: "bold" },
});
export default Accueil;
