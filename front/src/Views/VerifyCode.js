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
const VerifyCode = ({ navigation, route }) => {
  let clockCall = null;
  const defaultCountdown = 30;
  const [countdown, setCountdown] = useState(5);
  const [enableResend, setEnableResend] = useState(false);
  const [code, setCode] = useState("");
  const [user, setUser] = useState("");
  const [valcode, setvalcode] = useState("");
  const [testok, setTestok] = useState(false);
  const [valCode2, setValcode2] = useState("");

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

  function resendCode() {
    axios
      .post("http://192.168.1.31:5000/api/user/forgetpassword", {
        email: route.params.email,
      })
      .then(() => {
        alert("Code renvoyer");
        setCountdown(30);
      })
      .catch((err) => alert("an error occured" + err));
  }

  const Ok = async () => {
    await axios
      .get("http://192.168.1.31:5000/api/user/verifycode/" + `${code}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.message == "success") {
          ToastAndroid.show("Code vérifié avec success", ToastAndroid.SHORT);
          if (route.params.reason == "forget password") {
            navigation.navigate({
              name: "ResetPassword",
              params: { email: route.params.email },
            });
          } else if (route.params.reason == "account verification") {
            navigation.navigate("Login");
          }
        } else Alert.alert("Code Invalide !");
      })
      .catch((error) => {
        Alert.alert("An error occured !");
      });

    setTestok(true);
  };

  const onChangeCode = (code) => {
    setCode(code);
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
          <Text style={styles.text_header}>Vérification du compte</Text>
          <Text style={styles.text}>Tapez le code reçu par email ! </Text>
        </View>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.otpInputStyle}
            placeholder="Tapez le code"
            //maxLength={4}
            value={code}
            onChangeText={onChangeCode}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.button}>
            <TouchableOpacity
              disabled={code.length !== 6}
              style={[
                styles.start,
                { backgroundColor: code.length === 6 ? "#fff" : "#DCECFD" },
              ]}
              onPress={() => {
                Ok();
              }}
            >
              <Text
                style={[
                  styles.textStart,
                  { opacity: code.length == 6 ? 0.6 : 0.45 },
                ]}
              >
                Continuer
              </Text>
              <AntDesign
                style={[
                  styles.icon,
                  {
                    opacity: code.length == 6 ? 0.6 : 0.45,
                    color: code.length == 6 ? "green" : "red",
                  },
                ]}
                name={code.length === 6 ? "checkcircle" : "rightcircle"}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => resendCode()}
        disabled={countdown != 0}
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Text
          style={[
            {
              color: countdown == 0 ? "green" : "red",
              fontWeight: "bold",
              alignSelf: "center",
              textDecorationLine: "underline",
              flexDirection: "row",
            },
          ]}
        >
          <Text style={{ color: countdown == 0 ? "#121212" : "#666" }}>
            Renvoyer le code de Verification
          </Text>{" "}
          {countdown}{" "}
        </Text>
      </TouchableOpacity>
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
export default VerifyCode;
