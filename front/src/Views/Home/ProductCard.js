import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../utils/appColors';
import Label from './Label';

export default function ProductCard({navigation, item}) {
  const {name, description, price, image} = item;
  //console.log({item});
  return (
    <Pressable onPress={() => navigation.navigate('ProductDetails',{item})} style={{}}>
      <View
        style={{
          height: scale(200),
           width: scale(160),
          //backgroundColor:appColors.lightGray
        }}>
        <Image 
        resizeMode='contain'
        style={{height:scale(200), width:scale(180)}} 
        source={{ uri:image}} />
       
      </View>
      <View style={{paddingVertical: scale(3)}}>
        <Label text={name?.substring(0, 20)} style={{fontSize: scale(18), fontWeight: '500'}} />
      </View>

      <View style={{paddingVertical: scale(2)}}>
        <Label
          text={description?.substring(0, 24)}
          style={{fontSize: scale(13), color: appColors.darkGray}}
        />
      </View>

      <View style={{paddingVertical: scale(5)}}>
        <Label
          text={price}
          style={{
            fontSize: scale(18),
            color: appColors.primary,
            fontWeight: '500',
          }}
        />
      </View>
    </Pressable>
  );
}