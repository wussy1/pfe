import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import c from "../Assets/Images/c.png";
import PhoneInput from "react-native-phone-number-input";
import axios from "axios";
import { storeUserData } from "../Utils/AsyncStorageFunctions";
import { ScrollView } from "react-native-gesture-handler";
const Sign_up = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const phoneInput = useRef(null);
  const [isEmailvalid, setIsEmailvalide] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

   function checkInputs() {
    const emailvalid= verifyemail();
    const namevalid= verifyName();
    if (emailvalid && namevalid) {
      return true;
    } else {
      return false;
    }
  }
  function verifyemail() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      setIsEmailvalide(false);
      return false;
    } else {
      setIsEmailvalide(true);
      return true;
    }
  }
  function verifyName() {
    if (name.length > 0) {
      setIsNameValid(true);
      return true;
    } else {
      setIsNameValid(false);
      return false;
    }
  }
   function signup() {
     
    if ( checkInputs()) {
     
     axios
       .post("http://10.1.1.217:5000/api/user/register", {
         name: name,
         email: email,
         password: password,
         number: phoneNumber,
       })
       .then(async (res) => {
         if (res.data.exist === false) {
           console.log("mrigel signup");
            
         } else if (res.data.exist === true) {
           alert("email already exist");
         }
         else{
           console.log("something went wrong")
         }
         storeUserData(res.data.exist).then(()=> navigation.reset({
             index: 0,
             routes: [{ name: "Login" }],
           }));
       }).catch((err)=>console.log("error ="+err));
   }
   else{
     alert("verify inputs balise")
   }
  }

  const getPhoneNumber = () => {
    Alert.alert(phoneNumber);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          resizeMode="stretch"
          style={{ height: 120, width: "70%", marginBottom: "0%" }}
          source={c}
        />
        <Text
          style={{
            marginBottom: "10%",
            fontSize: 25,
            marginTop: "-1%",
            color: "#003984",
          }}
        >
          Créer un Compte
        </Text>
        <Text
          style={{
            marginRight: "64%",
            marginBottom: "1%",
            marginTop: "3%",
            fontSize: 15,
          }}
        >
          Nom
        </Text>
        <TextInput
          autoFocus
          onChangeText={(text) => setName(text)}
          style={{
            width: "75%",
            borderColor: isNameValid ? "#003984" : "#ff0000",
            borderWidth: 2,
            padding: 5,
            borderRadius: 5,
          }}
          placeholder="Taper votre nom"
        ></TextInput>
        <Text
          style={{
            marginRight: "62%",
            marginBottom: "1%",
            marginTop: "3%",
            fontSize: 15,
          }}
        >
          E-mail
        </Text>
        
        <TextInput
          onChangeText={(text) => setEmail(text)}
          style={{
            width: "75%",
            borderColor: isEmailvalid?"#003984":"#ff0000",
            borderWidth: 2,
            padding: 5,
            borderRadius: 5,
          }}
          placeholder="Taper votre E-mail"
        ></TextInput>
        <Text
          style={{
            marginRight: "50%",
            marginBottom: "1%",
            marginTop: "3%",
            fontSize: 15,
          }}
        >
          Mot de passe
        </Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          style={{
            width: "75%",
            borderColor: "#003984",
            borderWidth: 2,
            padding: 5,
            borderRadius: 5,
          }}
          placeholder="Mot de passe"
        ></TextInput>
        <Text
          style={{
            marginRight: "16%",
            marginBottom: "1%",
            marginTop: "3%",
            fontSize: 15,
          }}
        >
          Entrez le mot de passe à nouveau
        </Text>
        <TextInput
          secureTextEntry={true}
          style={{
            width: "75%",
            borderColor: "#003984",
            borderWidth: 2,
            padding: 5,
            borderRadius: 5,
          }}
          placeholder="Nouveaux Mot de passe"
        ></TextInput>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="TN"
          layout="first"
          withShadow
          containerStyle={styles.phoneNumberView}
          textContainerStyle={{ paddingVertical: 0 }}
          onChangeFormattedText={(text) => {
            setPhoneNumber(text);
          }}
        />
        <TouchableOpacity
          onPress={() => signup()}
          style={{
            height: "10%",
            width: "75%",
            marginTop: "5%",
            marginBottom: "-5%",
          }}
        >
          <Text style={styles.text}>Valider</Text>
        </TouchableOpacity>

        <View style={styles.containere}>
          <Text style={styles.tet}>Déjà membre ?</Text>
          <TouchableOpacity
            style={{ height: "100%", width: "30%" }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.tee}>Connextion</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Accueil" }],
            })
          }
          style={{
            height: "10%",
            width: "75%",
            marginTop: "5%",
            marginBottom: "-5%",
          }}
        >
          <Text style={styles.tex}>Continuer sans compte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ height: "15%", width: "70%", marginTop: "10%" }}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Accueil" }],
            })
          }
        >
          <Text style={styles.tex}>IGNORER</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",

    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  containere: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
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
    backgroundColor: "#003984",
  },
  te: {
    color: "white",
    fontSize: 18,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#43b72b",
  },

  texte: {
    color: "#000000",
    fontSize: 18,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
  },
  tex: {
    color: "#003984",
    fontSize: 18,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
  },
  tet: {
    color: "#000000",
    fontSize: 18,

    justifyContent: "center",
    alignItems: "center",
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  tee: {
    marginRight: "15%",
    color: "#f04536",
    fontSize: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  phoneNumberView: {
    width: "75%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: "3%",
  },
});

export default Sign_up;
