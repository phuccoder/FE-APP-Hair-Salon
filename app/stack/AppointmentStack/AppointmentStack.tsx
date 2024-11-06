import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StylistScreen from '@/app/screen/Appointment/Stylist/StylistScreen';
import DateTimeSelection from '@/app/screen/Appointment/DateTime/DateTimeSelection';
import PaymentSelection from '@/app/screen/Appointment/Payment/PaymentScreen';
import AppointmentConfirmation from '@/app/screen/Appointment/Confirmation/ConfirmationScreen';
import ServiceScreen from '@/app/screen/Service/ServiceList';
import HomeScreen from '@/app/screen/Home';
import ServiceDetail from '@/app/screen/Service/ServiceDetail/ServiceDetail';
import ComboDetail from '@/app/screen/Service/ServiceDetail/ComboDetail';
import AppointmentSelectedItem from '@/app/screen/Appointment/SelectedComboService/SelectedComboService';
 // Adjust the import path as necessary

const Stack = createStackNavigator();

// Main Appointment Stack
const AppointmentStack = () => {
  return (
    <Stack.Navigator initialRouteName="Services">
      <Stack.Screen name='AppointmentSelectedItem' component={AppointmentSelectedItem}/>
      <Stack.Screen name="Stylist" component={StylistScreen} options={{ title: 'Choose Stylist' }} />
      <Stack.Screen name="DateTimeSelection" component={DateTimeSelection} options={{ title: 'Select Date & Time' }} />
      <Stack.Screen name="PaymentSelection" component={PaymentSelection} options={{ title: 'Payment Method' }} />
      <Stack.Screen name="AppointmentConfirmation" component={AppointmentConfirmation} options={{ title: 'Confirm Booking' }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen}/>
    </Stack.Navigator>
  );
};

export default AppointmentStack;