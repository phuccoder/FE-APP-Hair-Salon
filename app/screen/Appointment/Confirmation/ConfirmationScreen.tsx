import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/utils/navigation';

type RouteParams = {
  selectedServices: { id: string; name: string; price: number }[];
  selectedStylist: { name: string; speciality: string };
  appointmentDate: Date;
  appointmentTime: string;
  paymentMethod: { name: string };
};

const AppointmentConfirmation: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const {
    selectedServices,
    selectedStylist,
    appointmentDate,
    appointmentTime,
    paymentMethod
  } = route.params as RouteParams;

  const totalAmount = selectedServices.reduce((sum, service) => sum + service.price, 0);

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
    stylistCard: {
      flexDirection: 'row',
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    selectedCard: {
      backgroundColor: '#e6f3ff',
      borderColor: '#007AFF',
      borderWidth: 1,
    },
    stylistImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#ddd',
    },
    stylistInfo: {
      marginLeft: 12,
      flex: 1,
    },
    stylistName: {
      fontSize: 16,
      fontWeight: '500',
    },
    stylistSpeciality: {
      fontSize: 14,
      color: '#666',
      marginTop: 4,
    },
    timeSlotGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
    },
    timeSlot: {
      width: '30%',
      padding: 12,
      margin: '1.5%',
      backgroundColor: '#fff',
      borderRadius: 8,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    selectedSlot: {
      backgroundColor: '#007AFF',
    },
    timeSlotText: {
      color: '#000',
      fontSize: 14,
    },
    paymentCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 8,
    },
    paymentIcon: {
      fontSize: 24,
      marginRight: 12,
    },
    paymentName: {
      fontSize: 16,
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Appointment Summary</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Services</Text>
          {selectedServices.map(service => (
            <View key={service.id} style={styles.serviceItem}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>${service.price}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stylist</Text>
          <Text style={styles.detailText}>{selectedStylist.name}</Text>
          <Text style={styles.subText}>{selectedStylist.speciality}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date & Time</Text>
          <Text style={styles.detailText}>
            {appointmentDate.toLocaleDateString()}
          </Text>
          <Text style={styles.subText}>{appointmentTime}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <Text style={styles.detailText}>{paymentMethod.name}</Text>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>${totalAmount}</Text>
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
          onPress={() => {
            // Handle appointment confirmation
            navigation.navigate('HomeScreen');
          }}
        >
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default AppointmentConfirmation