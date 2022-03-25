import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Splash_Screen from "./src/Views/Splash_Screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/Views/Login";
import Introduction from "./src/Views/Introduction";
import Accueil from "./src/Views/Accueil";



const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="splash" options={{headerShown: false}} component={Splash_Screen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="introduction" options={{headerShown: false}} component={Introduction} />
        <Stack.Screen name="Accueil" component={Accueil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
