import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../../screen/LoginPage/LoginPage';
import VnPayPage from '@/app/screen/VnpayPage/VnPayPage';

const Stack = createNativeStackNavigator();

export default function VNPayStack() {
  return (
    <Stack.Navigator initialRouteName='VnPayPage'>
      <Stack.Screen
        name='VnPayPage'
        component={VnPayPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
