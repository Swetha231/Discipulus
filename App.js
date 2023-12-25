import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import firebase from 'firebase/app'
import 'firebase/auth'
import { theme } from './src/core/theme'
import {
  AlumniDetails,
  AlumniList,
  AuthLoadingScreen,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  Dashboard,
  IndivAlumniProfile,
  CurrentProfile,
  AddItems,
  ItemProfile,
  MarketPlaceList,
  AlumniStats,
} from './src/screens'
import { FIREBASE_CONFIG } from './src/core/config'

const Stack = createStackNavigator()
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AuthLoadingScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="AuthLoadingScreen"
            component={AuthLoadingScreen}
          />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="AlumniList" component={AlumniList} />
          <Stack.Screen name="AlumniDetails" component={AlumniDetails} />
          <Stack.Screen name="AddItems" component={AddItems} />
          <Stack.Screen name="ItemProfile" component={ItemProfile} />
          <Stack.Screen name="MarketPlaceList" component={MarketPlaceList} />
          <Stack.Screen name="AlumniStats" component={AlumniStats} />
          <Stack.Screen name="CurrentProfile" component={CurrentProfile} />
          <Stack.Screen
            name="IndivAlumniProfile"
            component={IndivAlumniProfile}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
