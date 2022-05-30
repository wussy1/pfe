import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import { ListItem, Left, Right, Radio, Content } from "native-base";
import axios from "axios";
import { getUserData } from "../../Utils/AsyncStorageFunctions";
const Panier = ({ navigation }) => {
  const [total,setTotal]=useState(0);
  const [cart, setCart] = useState([]);
  const [shippingMethod, setShippingMethod] = useState("Normal");

  async function getPanier(){
    await getUserData().then((res) =>
    axios.get(`http://192.168.1.18:5000/api/ligne/by-user-id/${JSON.parse(res).id}`).then((rslt)=>setCart(rslt.data)))
  }

 async function PlusItem(idpanier,idproduit){
   await axios.post("http://192.168.1.18:5000/api/ligne/add",{
      "id_panier":idpanier,
      "id_prod":idproduit
      }).then(()=>getPanier())
    
  }
  async function MinusItem(idpanier,idproduit){
    await axios.post("http://192.168.1.18:5000/api/ligne/minus",{
       "id_panier":idpanier,
       "id_prod":idproduit
       }).then(()=>getPanier())
     
   }

  useEffect(async () => {
    getPanier();
    StatusBar.setBarStyle("light-content", true);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            paddingRight: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="angle-left" type="font-awesome" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.paymentTitle}>Payment</Text>
      <View style={styles.cartContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cartTitleView}>
            <Icon name="shopping-cart" type="font-awesome-5" />
            <Text style={styles.cartTitle}>My Cart</Text>
          </View>

          {cart.length > 0 ? (
            <View>
              {cart.map((product) => (
                  <View style={styles.productView}>
                    <Image
                      style={styles.productImage}
                      source={{
                        uri: product.prod_image,
                      }}
                    />
                    <View style={styles.productMiddleView}>
                      <Text style={styles.productTitle}>{product.prod_name}</Text>
                      <Text style={styles.productCompanyTitle}>
                        {product.company}
                      </Text>
                    </View>
                    <View style={styles.productRightView}>
                      <Text
                        style={styles.productPriceText}
                      >{`$${product.prix}`}</Text>
                      <View style={styles.productItemCounterView}>
                        <TouchableOpacity
                          onPress={() => {
                            if (product.quantity === 1) {
                              return Alert.alert(
                                `Remove ${product.name}?`,
                                "",
                                [
                                  { text: "Cancel" },
                                  {
                                    text: "Remove",
                                    onPress: () => {
                                      MinusItem(product.panier_id,product.id_prod)
                                    },
                                  },
                                ]
                              );
                            }
                            MinusItem(product.panier_id,product.id_prod)
                          }}
                        >
                          <Icon
                            style={styles.toggleCounterButton}
                            name="minus-circle"
                            type="font-awesome"
                          />
                        </TouchableOpacity>
                        <Text style={styles.counterValue}>
                          {product.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                           PlusItem(product.panier_id,product.id_prod)}}
                        >
                          <Icon
                            style={styles.toggleCounterButton}
                            name="plus-circle"
                            type="font-awesome"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              <View style={styles.couponInputView}>
                <TextInput
                  placeholder="Coupon Code"
                  style={styles.couponInput}
                />
                <TouchableOpacity style={styles.couponButton}>
                  <Text style={styles.couponButtonText}>Apply Coupon</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.subtotalView}>
                <Text style={styles.subtotalText}>Subtotal -</Text>
                <Text style={styles.subtotalPrice}>
                  ${
                   cart.reduce((partialSum, a) => partialSum + a.prix*a.quantity, 0)
                   }
                </Text>
              </View>
              <View style={styles.shippingView}>
                <Text style={styles.shippingText}>Shipping -</Text>
                <View style={styles.shippingItemsView}>
                  <TouchableOpacity
                    style={styles.shippingItem}
                    onPress={() => {
                      setShippingMethod("Normal");
                    }}
                  >
                    <Text style={styles.shippingItemText}>Normal (Free)</Text>
                    <Radio selected={shippingMethod === "Normal"} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.shippingItem}
                    onPress={() => {
                      setShippingMethod("Express");
                    }}
                  >
                    <Text style={styles.shippingItemText}>Express ($60)</Text>
                    <Radio selected={shippingMethod === "Express"} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.totalView}>
                <Text style={styles.totalText}>Total -</Text>
                {shippingMethod === "Normal" ? (
                  <Text style={styles.totalPrice}>
                    ${cart.reduce((acc, val) => val.price + acc, 0)}
                  </Text>
                ) : (
                  <Text style={styles.totalPrice}>
                    ${cart.reduce((acc, val) => val.price + acc, 0) + 60}
                  </Text>
                )}
              </View>
              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>
                  Proceed to Checkout
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyCartView}>
              <Text style={styles.emptyCartViewText}>Your cart is empty.</Text>
            </View>
          )}

          <View style={{ height: 100 }}></View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    paddingTop: 40,
  },
  header: {
    alignItems: "flex-start",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  paymentTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#fff",
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  cartContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 30,
    paddingHorizontal: 16,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  cartTitleView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cartTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginLeft: 10,
  },
  productView: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 8,
    // borderRadius: 10,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    // shadowRadius: 2,
    elevation: 2,
    marginTop: 14,
  },
  productImage: {
    width: 60,
    height: 60,
    alignSelf: "center",
  },
  productMiddleView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  productCompanyTitle: {
    fontSize: 16,
    fontWeight: "300",
  },
  productRightView: {
    alignItems: "center",
    justifyContent: "center",
  },
  productItemCounterView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 4,
  },
  counterValue: {
    fontSize: 20,
    fontWeight: "500",
  },
  productPriceText: {
    alignSelf: "flex-end",
    paddingRight: 10,
    fontSize: 20,
    fontWeight: "700",
  },
  toggleCounterButton: {
    paddingHorizontal: 10,
  },
  couponInputView: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#333",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  couponInput: {
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  couponButton: {
    backgroundColor: "#333",
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  couponButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  subtotalView: {
    display: "flex",
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: "500",
  },
  subtotalPrice: {
    fontSize: 18,
    fontWeight: "300",
  },
  shippingView: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    paddingBottom: 10,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  shippingItemsView: {
    marginTop: 10,
  },
  shippingText: {
    fontSize: 18,
    fontWeight: "500",
  },
  shippingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  shippingItemText: {
    fontSize: 16,
    paddingVertical: 4,
    fontWeight: "300",
  },
  totalView: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    paddingBottom: 10,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "500",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "300",
  },
  checkoutButton: {
    backgroundColor: "#333",
    paddingVertical: 14,
    marginTop: 30,
    alignItems: "center",
  },
  checkoutButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  emptyCartView: {
    flex: 1,
    marginTop: 140,
  },
  emptyCartViewText: {
    fontSize: 20,
    fontWeight: "300",
    alignSelf: "center",
  },
});
export default Panier;
