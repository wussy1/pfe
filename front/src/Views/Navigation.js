import {Text, Dimensions } from 'react-native'
import React from 'react'

import Accueil from "./Home/Accueil";
import Categorie from "./Home/Categorie";
import Mon_Compte from "./Home/Mon_Compte";
import Aide from "./Home/Aide";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Commandes from './Commandes';
import ProductsByCategorie from './ProductsByCategorie';
import Products from './Home/Products';

const fullScreenWidth = Dimensions.get('window').width;

const Stack = createNativeStackNavigator()
function AccueilStackScreen(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Accueil' options={{headerShown: false}}  component={Accueil}></Stack.Screen>
            <Stack.Screen name="Products" options={{headerShown: false}} component={Products} /> 

        </Stack.Navigator>
    );
}
function ProfileStackScreen(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Mon Compte' options={{headerShown: false}} component={Mon_Compte}></Stack.Screen>
            <Stack.Screen name='Commandes' options={{headerShown: false}} component={Commandes}></Stack.Screen>
        </Stack.Navigator>
    );
}
function AideStackScreen(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Aide' options={{headerShown: false}} component={Aide}></Stack.Screen>
        </Stack.Navigator>
    );
}
function CategorieStackScreen(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Categorie' component={Categorie}></Stack.Screen>
            <Stack.Screen name="Products" options={{headerShown: false}} component={Products} /> 
            <Stack.Screen name='ProductsByCategorie' component={ProductsByCategorie}></Stack.Screen>
        </Stack.Navigator>
    );
}
const Tab = createBottomTabNavigator();
export default function Navigation(props){
    return(
  
            <Tab.Navigator  screenOptions={({route}) => ({
                headerShown: false,
                tabBarIcon: ({focused, color,size, padding}) => {
                    let iconName;
                    if(route.name == 'Accueil'){
                        iconName = focused ? 'home' : 'home-outline'
                    }else if(route.name == 'Categorie'){
                        iconName = focused ? 'ios-list-sharp' :'ios-list-sharp'
                    }
                    else if(route.name == 'Mon Compte'){
                        iconName = focused ? 'person' :'person-outline'
                    }
                    else if(route.name == 'Aide'){
                        iconName = focused ? 'help-circle' : 'help-circle-outline'
                    }
                    return(
                        <IonicIcon name={iconName} size={size} color={'#003984'} style={{paddingBottom:padding}} />
                    );

                },
            })}
            tabBarOptions={{
                activeTintColor: 'lightseagreen',
                inactiveTintColor:'#003984',
                labelStyle: {fontSize: 14},
                style:{width : fullScreenWidth}
            }}
            >
                <Tab.Screen name='Accueil'  component={AccueilStackScreen}></Tab.Screen>
                <Tab.Screen name='Categorie' component={CategorieStackScreen}></Tab.Screen>
                <Tab.Screen name='Mon Compte' component={ProfileStackScreen}></Tab.Screen>
                <Tab.Screen name='Aide' component={AideStackScreen}></Tab.Screen>
            </Tab.Navigator>

    );
}
