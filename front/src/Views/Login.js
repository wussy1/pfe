import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import c from "../Assets/Images/c.png";
import { storeUserData } from "../Utils/AsyncStorageFunctions";
import axios from "axios";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wronginfo, setwronginfo] = useState(false);

  function signin() {
    console.log("executing");
    axios
      .post("http://192.168.1.61:5000/api/user/login", {
        email: email,
        password: password,
      })
      .then(async (res) => {
        if (res.status == 200) {
          if (res.data.message === "Invalid password") {
            console.log("password invalid");
            setwronginfo(true);
          } else if (res.data.message === "not active") {
            console.log(res.data.message);
            ToastAndroid.show(
              "Account not verified , a new verification code will be sent to your email.",
              ToastAndroid.SHORT
            );

            axios
              .post("http://192.168.1.61:5000/api/user/forgetpassword", {
                email: email,
              })
              .then(() => {
                navigation.navigate({
                  name: "VerifyCode",
                  params: { email, reason: "account verification" },
                });
              })
              .catch((err) => alert("an error occured" + err));
          } else if (res.data.message === "User does not exist") {
            console.log("user does not exist");
            setwronginfo(true);
          } else {
            storeUserData(res.data).then(() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Navigation" }],
              })
            );
          }
        }
      })
      .catch((err) => setwronginfo(true));
  }
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      style={styles.container}
    >
      <Image
        resizeMode="stretch"
        style={{ height: 100, width: "70%", marginBottom: "0%" }}
        source={c}
      />
      <Text style={{ marginBottom: "15%", fontSize: 25, color: "#003984" }}>
        CONNEXION
      </Text>
      <Text style={{ marginRight: "60%", marginBottom: "1%", fontSize: 16 }}>
        E-mail
      </Text>
      <TextInput
        style={{
          width: "75%",
          borderColor: "#003984",
          borderWidth: 2,
          padding: 5,
          borderRadius: 5,
        }}
        placeholder="Taper votre Adresse e-mail"
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <Text
        style={{
          marginRight: "47%",
          marginBottom: "1%",
          marginTop: "5%",
          fontSize: 16,
        }}
      >
        Mot de passe
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
        placeholder="Taper votre Mot de passe"
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      <TouchableOpacity
        onPress={() => signin()}
        style={{
          height: "10%",
          width: "75%",
          marginTop: "10%",
          marginBottom: "0%",
        }}
      >
        <Text style={styles.text}>Se connécter</Text>
      </TouchableOpacity>
      {wronginfo && (
        <Text style={{ color: "red", marginBottom: "4%" }}>
          email ou mot de passe incorrect
        </Text>
      )}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate({
            name: "typeemail",
          })
        }
        style={{ height: "10%", width: "75%" }}
      >
        <Text style={styles.texte}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ height: "10%", width: "60%" }}
        onPress={() => navigation.navigate("Connexion")}
      >
        <Text style={styles.te}>Créer un compte</Text>
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
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",

    backgroundColor: "white",
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
});

export default Login;
