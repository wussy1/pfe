import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("user");
  
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const storeUserData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  export const LogoutUser = async (value) => {
    try {
   
      await AsyncStorage.removeItem("user");
    } catch (e) {
      console.log(e);
    }
  };