import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import React, { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

const Accueil = () => {
  const [fileResponse, setFileResponse] = useState([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container} >
      <StatusBar barStyle={'dark-content'} />
      {fileResponse.map((file, index) => (
        <Text
          key={index.toString()}
          style={styles.uri}
          numberOfLines={1}
          ellipsizeMode={'middle'}>
          {file?.uri}
        </Text>
      ))}
      <Button title="Select 📑" onPress={handleDocumentSelection} />
    </SafeAreaView>
  );
};
export default Accueil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});