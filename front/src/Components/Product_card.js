import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';
const Product_card = (props) => {
  return (
        <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Card>
          <Text style={styles.paragraph}>
           vevevevevmeknmvlknùl
          </Text>
        </Card>
      </View>
    </SafeAreaView>
  
  )
}

export default Product_card
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 20
    },
  });
  