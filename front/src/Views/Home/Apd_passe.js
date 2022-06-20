import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Surface, TextInput } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import { getUserData, storeUserData } from "../../Utils/AsyncStorageFunctions";
import { Icon } from "react-native-elements";
const Apd_passe = ({ navigation }) => {
  const [passwordSecured, setPasswordSecured] = useState(true);
  const [pass, setPass] = useState("");
  const [newpassme, setNewpass] = useState("");
  const [user, setUser] = useState("");

  async function getuser() {
    setUser(JSON.parse(await getUserData()));
  }
  useEffect(async () => {
    getuser();
  }, []);
  if (user === "") {
    return (
      <View style={{flex:1 ,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
        <Text>Veuillez patienter...</Text>
      </View>
    );
  }

  function upd_passe() {
    console.log("it's here 0");

    axios
      .put("http://10.1.1.217:5000/api/user/updatepassword/"+ user.id, {
        password: newpassme,
      })
      .then(async (res) => {
     
        
          alert("Succefuly changed");
          navigation.reset({
            index: 0,
            routes: [{ name: "Navigation" }],
          });
      
      })
      .catch((err) => console.log("error =" + err));
  }
  const IconSize = 20;
  return (
    <Surface style={styles.container}>
      <Surface style={styles.header}>
        <View style={styles.view}>
          
          <Text style={{ fontSize: 14, color: "white" }}>
            Changer le mot de passe
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
            <TouchableOpacity onPress={() => navigation.navigate("Panier")}>
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
            marginRight: "68%",
            marginTop: "1%",
            marginBottom: "1%",
            fontSize: 16,
            color: "333333",
          }}
        >
          MOT DE PASSE
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
        <View style={styles.inputView}> 
        <TextInput
          onChangeText={(text) => setPass(text)}
          placeholder="Mot de passe actuel"
          placeholderTextColor="#666666"
          autoCorrect={false}
          secureTextEntry={passwordSecured}
          style={{ backgroundColor: "white",  width: "92%" }}
        />
        <TouchableOpacity
      style={{marginRight:10 }}
       onPress={() => {
         setPasswordSecured(!passwordSecured);
         }}
         >
      <Icon name='eye' type='font-awesome-5' stze={20} />
       </TouchableOpacity>
       </View>




       <View style={styles.inputView}>
        <TextInput
          onChangeText={(text) => setNewpass(text)}
          placeholder="Nouveau mot de passe"
          placeholderTextColor="#666666"
          autoCorrect={false}
          secureTextEntry={passwordSecured}
          style={{
            backgroundColor: "white",
            
           
            width: "92%",
          }}
        /><TouchableOpacity
        style={{marginTop:10 ,marginRight:10 
         }}
         onPress={() => {
           setPasswordSecured(!passwordSecured);
           }}
           >
        <Icon name='eye' type='font-awesome-5' stze={20} />
         </TouchableOpacity>
         </View>

        <TouchableOpacity
          style={{
            height: "10%",
            width: "90%",
            marginTop: "10%",
            marginLeft: "5%",
          }}
          onPress={() => upd_passe()}
        >
          <Text style={styles.text}>CHANGER LE MOT DE PASSE</Text>
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
    width: "100%",
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
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: "3%",
    marginTop: "-449%",
  },
  inputView:{
    width:'95%',
    height: 44,
    margin:10,
    
    
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:"space-between"
    }
});

export default Apd_passe;
