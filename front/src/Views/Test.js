import { View, Text } from 'react-native'
import React, { useEffect,useState } from 'react'
import axios from 'axios'
const Test = () => {
const [kraheb,setKraheb]=useState([]);

function getdonnes(){
  axios.get('https://jsonplaceholder.typicode.com/posts').then((res)=>setKraheb(res.data))
}
useEffect(() => {
 getdonnes();
}, [])

  return (
    <View>
      {kraheb.map((el)=><View style={{display:'flex',flexDirection:'column'}}><Text>{el.title}</Text><Text>{el.id}</Text></View>)}
      <Text>Test</Text>
    </View>
  )
}

export default Test