import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import h from "../../Assets/Images/h.png";

const Accueil = ({navigation}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://192.168.1.18:5000/api/product/").then((res) => {
      console.log("********************************");
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
            <TouchableOpacity onPress={()=>navigation.navigate('Panier')}>
              <Feather name="shopping-cart" size={IconSize} color={"white"} />
            </TouchableOpacity>}
         
          
        </View>
      </View>
      <ScrollView style={{ padding: 1 }}>
      <View style={{width:"100%",padding: 15,}}>
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
      </View><View style={{height:200,marginTop:"2%",backgroundColor:"white"}}>
      <Text style={{padding:4,fontWeight:"100",fontSize:16,color:'#333333',textAlign: "center",marginBottom:"1%"}}>Service</Text>
      <TouchableOpacity style={{borderWidth:1,height:"80%",width:"100%"}}onPress={()=>navigation.navigate('Service')} >
            <ImageBackground style={styles.image} source={h}>
            <Text style={styles.text}>
              <FontAwesome name="wrench" size={IconSize} color={"white"} />   Prendre rendez-vous </Text>
            </ImageBackground>  
       </TouchableOpacity>
       </View>
       
        {products.map((el) => (
          <View
            key={el.id_prod}
            style={{ borderWidth: 1, borderColor: "red",backgroundColor:"white",}}
          >
            <Text>{el.prod_name}</Text>
            <Text>{el.prix}</Text>
            <Text>{el.description}</Text>
            <Text>{el.prod_image}</Text>
          </View>
        ))}
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
  image:{
    
      
      resizeMode: 'stretch',
      height:"100%",
      flexDirection:"row",
      alignContent:"stretch",
      alignItems:"flex-end"
      
  },
  text: {
    width:"100%",
    color: "white",
    fontSize: 18,
    lineHeight: 60,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
 
});
export default Accueil;
