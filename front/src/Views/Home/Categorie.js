import { View, Text } from 'react-native'
import React from 'react'
import Product_card from '../../Components/Product_card'

const Categorie = () => {
  return (
    <View style={{flex:1 ,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <Product_card></Product_card>
    </View>
  )
}

export default Categorie