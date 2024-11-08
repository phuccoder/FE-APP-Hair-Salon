import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/utils/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApplicationConstants } from '@/constants/ApplicationConstants';
import { AppointmentService } from '@/service/appointmentService';

const AppointmentConfirmation: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 16,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 8,
    },
    serviceItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    serviceName: {
      fontSize: 14,
    },
    servicePrice: {
      fontSize: 14,
      fontWeight: '500',
    },
    divider: {
      height: 1,
      backgroundColor: '#eee',
      marginVertical: 16,
    },
    detailText: {
      fontSize: 16,
      marginBottom: 4,
    },
    subText: {
      fontSize: 14,
      color: '#666',
    },
    totalSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: '500',
    },
    totalAmount: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#007AFF',
    },
    footer: {
      padding: 16,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 16,
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
    },
    buttonDisabled: {
      backgroundColor: '#ccc',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
    },
    editButton: {
      flex: 1,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#007AFF',
    },
    editButtonText: {
      color: '#007AFF',
      fontSize: 16,
      fontWeight: '500',
    },
    confirmButton: {
      flex: 2,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: '#007AFF',
    },
    confirmButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
    },
  });

  const {
    selectedServices = [], // Default to an empty array
    selectedCombos = [], // Default to an empty array
    selectedStylist = { stylistName: '', stylistInfor: '', stylistID: '' }, // Default to an empty object
    appointmentDate = new Date().toISOString(), // Default to current date as string
    appointmentTime = '', // Default to empty string
    paymentMethod = null // Default to null
  } = route.params as {
    selectedServices: { serviceID: string; serviceName: string; servicePrice: number }[];
    selectedCombos: { comboID: string; comboName: string; comboPrice: number }[];
    selectedStylist: { stylistName: string; stylistInfor: string; stylistID: number | string };
    appointmentDate: string; // Expecting appointmentDate as string
    appointmentTime: string;
    paymentMethod: { id: number; name: string; icon: string } | null;
  };

  const totalAmount = [
    ...selectedServices,
    ...selectedCombos
  ].reduce((sum, item) => sum + ('servicePrice' in item ? item.servicePrice : item.comboPrice), 0);

  console.log("Received parameters in AppointmentConfirmation:", {
    selectedServices,
    selectedCombos,
    selectedStylist,
    appointmentDate,
    appointmentTime,
    paymentMethod,
  });

  const handleConfirmBooking = async () => {
    try {
      const token = await AsyncStorage.getItem(ApplicationConstants.ACCESS_TOKEN);
      if (!token) {
        throw new Error('No access token found');
      }

      const details = [
        ...selectedServices.map(service => ({ serviceID: Number(service.serviceID) })),
        ...selectedCombos.map(combo => ({ comboID: Number(combo.comboID) })),
      ];

      const decodeToken = (token: string) => {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          console.log('Decoded token payload:', jsonPayload); 
          return JSON.parse(jsonPayload);
        } catch (error) {
          console.error('Error decoding token:', error);
          return { accountID: 0 };
        }
      };

      const decodedToken = decodeToken(token);
      const accountID = decodedToken.sub;
      console.log('Decoded accountID:', accountID);

      const datePart = appointmentDate.split('T')[0];
      const formattedDateTime = `${datePart} ${appointmentTime}:00`;

      const data = {
        appointmentDate: formattedDateTime,
        accountID: Number(accountID),
        stylistID: Number(selectedStylist.stylistID),
        details,
      };

      console.log('Sending appointment data:', JSON.stringify(data, null, 2));

      const response = await AppointmentService.createAppointment(data, token).toPromise();
      console.log('Appointment created successfully:', response);

      // Navigate to Account screen or show a success message
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Appointment Summary</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Services</Text>
          {selectedServices.map(service => (
            <View key={service.serviceID} style={styles.serviceItem}>
              <Text style={styles.serviceName}>{service.serviceName}</Text>
              <Text style={styles.servicePrice}>{service.servicePrice} VND</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Combos</Text>
          {selectedCombos.map(combo => (
            <View key={combo.comboID} style={styles.serviceItem}>
              <Text style={styles.serviceName}>{combo.comboName}</Text>
              <Text style={styles.servicePrice}>{combo.comboPrice} VND</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stylist</Text>
          <Text style={styles.detailText}>{selectedStylist.stylistName}</Text>
          <Text style={styles.subText}>{selectedStylist.stylistInfor}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date & Time</Text>
          <Text style={styles.detailText}>
            {new Date(appointmentDate).toLocaleDateString()}
          </Text>
          <Text style={styles.subText}>{appointmentTime}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <Text style={styles.detailText}>
            {paymentMethod ? paymentMethod.name : 'N/A'}
          </Text>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>{totalAmount} VND</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AppointmentConfirmation;