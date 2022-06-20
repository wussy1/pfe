import { View, Text,Image,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ProductsByCategorie = ({route,navigation}) => {
    
    const { CatId } = route.params;
const [products,setProducts]=useState([]);
    function getProds(){
        axios.get(`http://10.1.1.217:5000/api/product/prodbycat/${CatId}`).then((res)=>setProducts(res.data))
    }
    useEffect(() => {
        getProds()
    }, [])
    

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
                  <Text>{product.prod_name}</Text>
                </View>
                {/* -- prix View */}
                <View style={{ marginTop: 4 }}>
                  <Text style={{ fontSize: 16 }}>
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
    <View>
     {products.map((product)=>
  <TouchableOpacity key={product.id} onPress={() => navigation.navigate("Products",product)}>
  <Product product={product} />
</TouchableOpacity>
     )}
    </View>
  )
}

export default ProductsByCategorie