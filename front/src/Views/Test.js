import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import axios from 'axios'
const Test = () => {

function getdonnes(){
  axios.get('https://jsonplaceholder.typicode.com/todos/2').then((res)=>console.log(res.data))
}
useEffect(() => {
 getdonnes();
}, [])

  return (
    <View>
      <Text>Test</Text>
    </View>
  )
}

export default Test