import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

type RouteParams = {
  params: {
    selectedServices: any;
    selectedStylist: any;
    };
  };
  
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

type RootStackParamList = {
  PaymentSelection: {
    selectedServices: any;
    selectedStylist: any;
    appointmentDate: Date;
    appointmentTime: string | null;
  };
};

const DateTimeSelection: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const { selectedServices, selectedStylist } = route.params;

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Select Date</Text>
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="calendar"
        minimumDate={new Date()}
        onChange={(event: any, date: Date | undefined) => setSelectedDate(date || new Date())}
      />

      <Text style={styles.sectionTitle}>Available Time Slots</Text>
      <View style={styles.timeSlotGrid}>
        {timeSlots.map(slot => (
          <TouchableOpacity
            key={slot}
            style={[
              styles.timeSlot,
              selectedSlot === slot && styles.selectedSlot
            ]}
            onPress={() => setSelectedSlot(slot)}
          >
            <Text style={styles.timeSlotText}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !selectedSlot && styles.buttonDisabled]}
          disabled={!selectedSlot}
          onPress={() => navigation.navigate('PaymentSelection', {
            selectedServices,
            selectedStylist,
            appointmentDate: selectedDate,
            appointmentTime: selectedSlot
          })}
        >
          <Text style={styles.buttonText}>Next: Choose Payment Method</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DateTimeSelection;