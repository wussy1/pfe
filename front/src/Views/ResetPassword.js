import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ToastAndroid,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import axios from "axios";
const ResetPassword = ({ navigation, route }) => {
  let clockCall = null;
  const defaultCountdown = 30;
  const [countdown, setCountdown] = useState(30);
  const [enableResend, setEnableResend] = useState(false);
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [user, setUser] = useState("");
  const [valcode, setvalcode] = useState("");
  const [testok, setTestok] = useState(false);
  const [valCode2, setValcode2] = useState("");
  const [equal, setEqual] = useState(true);
  const Callforput = () => {
    //if (code.length === 4){}
    //setTestok(false)
  };

  useEffect(() => {
    if (testok == true) {
      Callforput();
      //setValcode2(valcode)
    }
    if (valcode !== "") {
      setValcode2(valcode);
      setTimeout(function () {
        setValcode2("");
      }, 1000);
    }
  }, [testok, valcode]);

  function changepass() {
    if (pass.length > 0 && pass2.length > 0) {
      if (pass == pass2) {
        setEqual(true);
        axios
          .put("http://192.168.1.31:5000/api/user/updatepasswordbyemail", {
            email: route.params.email,
            password: pass,
          })
          .then((res) => {ToastAndroid.show("Password changed successfully",ToastAndroid.SHORT);navigation.navigate("Login")}).catch((err)=>alert("Error "+err))
      } else {
        setEqual(false);
      }
    } else {
      alert("Please fill in password");
    }
  }

  const onChangeCode = (code) => {
    setPass(code);
  };

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };
  return (
    <LinearGradient
      colors={["#0dacfa", "#45d3f4", "#70e9ef"]}
      style={styles.container}
      start={{ x: -1, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View behavior={"padding"} style={styles.containerAvoidingView}>
        <View style={styles.header}>
          <Text style={styles.text_header}>
            Récuperation du mot de passe pour
          </Text>
          <Text style={styles.text_headerr}>{route.params.email}</Text>
          <Text style={styles.text}>Tapez votre nouveau mot de passe ! </Text>
        </View>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.otpInputStyle}
            placeholder="Tapez votre mot de passe"
secureTextEntry={true}            value={pass}
            onChangeText={onChangeCode}
          />
        </View>
        <View style={styles.containerInputt}>
          <TextInput
            style={styles.otpInputStyle}
            placeholder="Vérifier votre mot de passe"
secureTextEntry={true}            value={pass2}
            onChangeText={(text) => setPass2(text)}
          />
        </View>
        {!equal && (
          <Text
            style={{
              textAlign: "center",
              padding: 10,
              opacity: 0.8,
              color: "red",
            }}
          >
            Password does not match
          </Text>
        )}
        <View style={{ flexDirection: "row" }}>
          <View style={styles.button}>
            <TouchableOpacity
              style={[styles.start, { backgroundColor: "#eee" }]}
              onPress={() => {
                changepass();
              }}
            >
              <Text style={{ opacity: 0.7, color: "black" }}>
                Changer mot de passe
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  containerAvoidingView: {
    padding: 10,
  },
  header: {
    paddingTop: 22,
    alignItems: "center",
  },
  number: {
    color: "#000",
    opacity: 0.6,
  },
  start: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
  },
  icon: {
    marginLeft: 10,
  },
  button: {
    flex: 1,
    margin: 6,
  },
  textStart: {
    fontWeight: "bold",
    color: "#000",
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  text_headerr: {
    color: "#fff",
    fontSize: 18,
  },
  text: {
    color: "#fff",
    opacity: 0.7,
    marginTop: 8,
    fontSize: 16,
  },
  containerInput: {
    flexDirection: "row",
    paddingHorizontal: 12,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    borderBottomColor: "gray",
    marginTop: 50,
    marginBottom: 40,
    borderBottomWidth: 1.5,
  },
  containerInputt: {
    flexDirection: "row",
    paddingHorizontal: 12,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    borderBottomColor: "gray",
    marginBottom: 25,
    borderBottomWidth: 1.5,
  },
  openDialogView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  otpInputStyle: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -12,
    paddingLeft: 12,
    color: "#05375a",
    height: 50,
  },
});
export default ResetPassword;
