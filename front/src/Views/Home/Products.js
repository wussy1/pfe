import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
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
  const [userid,setUserid]=useState();
  const [isFavourite, setFavourite] = useState(false);
  const [color] = useState([
    { id: 1, label: "white" },
    { id: 1, label: "black" },
    { id: 1, label: "blue" },
    { id: 1, label: "red" },
  ]);

  const [selectedSize, setSelectedSize] = useState("M");

  const [productDescription] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ornare urna. Duis egestas ligula quam, ut tincidunt ipsum blandit at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae justo congue, tempor urna vitae, placerat elit. Nulla nec consectetur dolor, in convallis erat. Fusce hendrerit id sem tristique congue. \n\nVestibulum mauris sapien, vulputate in lacus in, lacinia efficitur magna. Sed id massa ut magna eleifend lacinia et id tellus. Sed dignissim mollis lacus. Etiam laoreet ex eu sem euismod congue. In maximus porttitor imperdiet. Nulla eu dolor vehicula ligula mollis tristique ut in enim. Phasellus quis tempor velit. Vivamus sit amet orci ornare, pulvinar purus et, commodo magna. Nunc eu tortor vitae leo varius vehicula quis volutpat dolor.\n\nDonec interdum rutrum tellus, et rhoncus risus dignissim at. Aliquam sed imperdiet tortor, non aliquam sapien. Cras quis enim a elit fringilla vehicula. Aenean pulvinar ipsum a magna feugiat, a fermentum ante pellentesque. Mauris tincidunt placerat placerat. Quisque tincidunt enim sed metus fermentum maximus. Fusce eu tempus est.`
  );

  const [seeFullDescription, setSeeFullDescription] = useState(false);

  const [moreProducts, setmoreProducts] = useState([]);
  async function AddItem(idproduit) {
    await axios
      .post("http://192.168.1.31:5000/api/ligne/add", {
        id_user: userid,
        id_prod: idproduit,
        
      })
      
      .then((res) =>console.log(res) );}
  useEffect( () => {
    getUserData().then((res)=>setUserid(JSON.parse(res).id))
    axios.get("http://192.168.1.31:5000/api/product/").then((res) => {
   
      setmoreProducts(res.data);
    });
  }, []);

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
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity
          style={{
            paddingRight: 10,
          }}
          onPress={() => navigation.navigate("Panier")}
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
            <TouchableOpacity onPress={() => setFavourite(!isFavourite)}>
              <FAIcon name={isFavourite ? "heart" : "heart-o"} size={22} />
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
                    selectedSize === s.label ? styles.tagSelected : styles.tag
                  }
                  onPress={() => setSelectedSize(s.label)}
                >
                  <Text
                    style={
                      selectedSize === s.label
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
              AddItem(prod.id_prod);
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
                ? `${productDescription}`
                : `${productDescription.split("\n")[0]}`}
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
                  <TouchableOpacity style={styles.moreProductBuyButton}>
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
