import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import h from "../../Assets/Images/h.png";
import { Feather as Icon } from "@expo/vector-icons";

// npm i react-native-elements
import { Icon as RNEIcon } from "react-native-elements";

const Accueil = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://192.168.1.31:5000/api/product/").then((res) => {
      console.log("********************************");
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);
  /*const [products] = useState([
    {
      prod_name:
        'HP 15s Ryzen 5 Quad Core - (8 GB/1 TB HDD/Windows 10 Home) 15s-GR0009AU',
      prod_image: 'https://i.prod_imageur.com/FVhuBzL.jpg',
      
      prix: '41,990',
     
      discount: '6% off',
      offer: 'No cost EMI ₹4,666/month. Standard EMI also available',
      description: [
        '8 GB/1 TB HDD',
        'Windows 10 Home',
        '15.6 inch Full HD',
        'Thin and Light Laptop',
      ],
    },
    {
      prod_name:
        'Dell Vostro Core i5 10th Gen - (8 GB/1 TB HDD/256 GB SSD/Windows 10 Home) Vostro 3491',
      prod_image: 'https://i.prod_imageur.com/XZIJXIq.jpg',
      rating: '4.2',
      ratingCount: '112',
      prix: '53,490',
      actualprix: '53,859',
      discount: '',
      offer: 'No cost EMI ₹5,944/month. Standard EMI also available',
      description: [
        '8 GB/1 TB HDD/256 GB SSD',
        'Windows 10 Home',
        '14 inch Full HD Display',
        'Without Optical Disk Drive',
      ],
    },
    {
      prod_name:
        'Apple MacBook Pro Core i9 9th Gen - (16 GB/1 TB SSD/Mac OS Catalina/4 GB Graphics)',
      prod_image: 'https://i.prod_imageur.com/1ge8POI.jpg',
      rating: '4.6',
      ratingCount: '42',
      prix: '2,24,900',
      actualprix: '2,39,900',
      discount: '6% off',
      offer: 'No cost EMI ₹24,989/month. Standard EMI also available',
      description: [
        '16 GB/1 TB SSD/4 GB Graphics',
        'Mac OS Catalina',
        '16 inch, Silver, 2 kg',
        'IPS Retina Display ',
      ],
    },
    {
      prod_name:
        'Asus Vivobook Ryzen 5 Quad Core - (8 GB/1 TB HDD/Windows 10 Pro) D1401D-EK166',
      prod_image: 'https://i.prod_imageur.com/UvL33gA.jpg',
      rating: '4.0',
      ratingCount: '36',
      prix: '50,900',
      actualprix: '',
      discount: '',
      offer: 'Get Google One 3-month Free Trial on purchase of a Laptop',
      description: [
        '8 GB/1 TB HDD/Ryzen 5 Quad Core',
        'Windows 10 Pro',
        '14 inch, Transparent Silver',
        'Without Optical Disk Drive',
      ],
    },
  ]);*/

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
              <Text style={{margin:10,fontSize:16,fontWeight:'100'}}>{product.prod_name}</Text>
            </View>
            {/* -- prix View */}
            <View style={{ marginTop: 4 }}>
              <Text style={{ fontSize: 16 ,marginLeft:10}}>
                {product.discount == null
                  ? `${product.prix.toFixed(2)} TND `
                  : `${(product.prix-(product.prix * (product.discount / 100))).toFixed(
                      2
                    )} TND`}
              </Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={{
                    color: "#57606f",
                    fontSize: 13,
                    textDecorationLine: "line-through",marginLeft:10
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
          >
            {product.description}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.view}>
          <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
            Accueil
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
      </View>
      <ScrollView style={{ padding: 1 }}>
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
            onPress={() => navigation.navigate("Service")}
          >
            <ImageBackground style={styles.image} source={h}>
              <Text style={styles.text}>
                <FontAwesome
                  prod_name="wrench"
                  size={IconSize}
                  color={"white"}
                />{" "}
                Prendre rendez-vous{" "}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <>
          {/* Products List */}
          {Array(1)
            .fill(1)
            .map((el) =>
              products.map((product) => (
                <TouchableOpacity key={product.id} onPress={() => navigation.navigate("Products",product)}>
                  <Product product={product} />
                </TouchableOpacity>
              ))
            )}
          <View style={{ height: 20 }}></View>
        </>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: "7%",
  },
  containerr: {
    flex: 1,
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
