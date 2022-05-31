import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Surface, TextInput } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { getUserData,storeUserData } from "../../Utils/AsyncStorageFunctions";
import PhoneInput from "react-native-phone-number-input";
import axios from "axios";

const Profil = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState("");

  async function getuser (){
    setUser(JSON.parse(await getUserData()));

  }
  useEffect(async () => {
    getuser()
  }, []);
  const phoneInput = useRef(null);
  

  if (user === "") {
    return (
      <View style={{flex:1 ,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
        <Text>Veuillez patienter...</Text>
      </View>
    );
  }

  const IconSize = 20;
  function upd_profile() {
    console.log("it's here 0")

    axios
      .put("http://192.168.1.74:5000/api/user/updateuser/"+user.id, {
        name: name,
        number: phoneNumber,
      })
      .then(async (res) => {
       storeUserData(res.data).then(()=> {
         alert("Succefuly changed")
        navigation.reset({
          index: 0,
          routes: [{ name: "Navigation" }],
        })
       }
       );
      }).catch((err)=>console.log("error ="+err));
  }
  return (
    <Surface style={styles.container}>
      <Surface style={styles.header}>
        <View style={styles.view}>
          <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
            Mon Profil
          </Text>
        </View>

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
              <Feather name="shopping-cart" color={"white"} size={IconSize} />
            </TouchableOpacity>
          }
        </View>
      </Surface>
      <View
        style={{
          height: 35,
          width: "100%",
          backgroundColor: "#f5f5f5",
          marginTop: "1%",
          marginBottom: "3%",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            padding: 4,
            fontWeight: "100",
            marginRight: "31%",
            marginTop: "1%",
            marginBottom: "1%",
            fontSize: 16,
            color: "333333",
          }}
        >
          VOS DONNEES PERSONNELLES
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <View>
          <Text
            style={{
              height: 45,
              width: "95%",
              backgroundColor: "white",
              padding: 10,
              color: "#c8c7cd",
              marginLeft:"11%"
            }}
          >
           
            Prénom
          </Text>
          <View
            style={{
             marginTop:"-5%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
              <FontAwesome style={{ margin: "2%", marginTop: "5%" }} name="user-o" size={30} />
            <TextInput
            onChangeText={(text) => setName(text)}
              placeholder={user.name}
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={{
                backgroundColor: "white",
                width: "100%",
              }}
            />
          </View>
        </View>
        <Text
          style={{
            height: 45,
            width: "95%",
            backgroundColor: "white",
            padding: 10,
            color: "#c8c7cd",
            marginTop:"3%",
            marginLeft:"10%"
           
          }}
        >
          {" "}
          Nom{" "}
        </Text>
        <View
          style={{
            marginTop:"-5%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <TextInput
            placeholder="Tper votre nom"
           
            autoCorrect={false}
            style={{
              backgroundColor: "white",
              width: "90%",
              marginLeft:"10%"
            }}
          />
        </View>
          <Text
            style={{
              height: 45,
              width: "95%",
              backgroundColor: "white",
              padding: 10,
              color: "#c8c7cd",
              marginTop:"3%",
              marginLeft:"11%"
             
            }}
          >
            {" "}
            E-mail{" "}
          </Text>
          <View
            style={{
              marginTop:"-5%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              marginBottom:"6%"
            }}
          >
              <FontAwesome style={{ margin: "2%", marginTop: "5%" }} name="envelope-o" size={30} />
            <TextInput
              placeholder={user.email}
              editable={false}
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={{
                backgroundColor: "white",
                width: "100%",
              }}
            />
          </View>
        <View >
          <PhoneInput
            ref={phoneInput}
            defaultValue={user.number}
            defaultCode="TN"
            layout="first"
            containerStyle={styles.phoneNumberView}
            textContainerStyle={{ paddingVertical: 0 }}
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
          />
        </View>
          <TouchableOpacity
          onPress={() => upd_profile()}
            style={{
            margin:30,
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            alignSelf:'center',
            }}
          >
            <Text style={styles.text}>ENREGISTRER</Text>
          </TouchableOpacity>
      </View>
    </Surface>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",

    justifyContent: "flex-start",
    alignItems: "flex-start",

    marginTop: "-3%",
  },
  header: {
    height: 55,
    elevation: 4,

    justifyContent: "space-between",

    alignItems: "center",

    flexDirection: "row",
    backgroundColor: "#333333",
    marginTop: "10%",
  },
  text: {
    color: "white",
    fontSize: 18,
    paddingHorizontal:20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#e98e2f",
  },
  view: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#333333",
    margin: 10,

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
  phoneNumberView: {
    width: "100%",
    height: 50,
    borderBottomColor:'gray',
    marginTop:10,
    borderBottomWidth:1,
    backgroundColor: "white",
    borderRadius: 10,
  
  },
});
export default Profil;
