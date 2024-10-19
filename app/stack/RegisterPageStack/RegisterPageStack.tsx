import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../../screen/LoginPage/LoginPage';
import RegisterPage from '../../screen/RegisterPage/RegisterPage';
import HomeScreen from '../../screen/Home';

const Stack = createNativeStackNavigator();

export default function RegisterPageStack() {
  return (
    <Stack.Navigator initialRouteName="RegisterPage">
    <Stack.Screen 
      name="RegisterPage" 
      component={RegisterPage} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen
      name="Home" 
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Login" 
      component={LoginPage} 
      options={{ headerShown: false }} 
    />
  </Stack.Navigator>
  );  
}
