import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/utils/navigation';

const PaymentSelection: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedMethod, setSelectedMethod] = useState<{ id: number; name: string; icon: string } | null>(null);
  const route = useRoute();

  const paymentMethods = [
    { id: 1, name: 'Credit Card', icon: '💳' },
    { id: 2, name: 'Debit Card', icon: '💳' },
    { id: 3, name: 'Cash', icon: '💵' },
    { id: 4, name: 'Digital Wallet', icon: '📱' }
  ];

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
    <View style={styles.container}>
      <ScrollView>
        {paymentMethods.map(method => (
          <TouchableOpacity
            key={method.id.toString()}
            style={[
              styles.paymentCard,
              selectedMethod?.id === method.id && styles.selectedCard
            ]}
            onPress={() => setSelectedMethod(method)}
          >
            <Text style={styles.paymentIcon}>{method.icon}</Text>
            <Text style={styles.paymentName}>{method.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !selectedMethod && styles.buttonDisabled]}
          disabled={!selectedMethod}
          onPress={() => navigation.navigate('AppointmentConfirmation', {
            ...route.params,
            paymentMethod: selectedMethod
          })}
        >
          <Text style={styles.buttonText}>Review Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
 export default PaymentSelection;