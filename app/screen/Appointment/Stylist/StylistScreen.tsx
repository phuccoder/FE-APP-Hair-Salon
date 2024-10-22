import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/utils/navigation';

type RouteParams = {
  params: {
    selectedServices: any; // Replace 'any' with the appropriate type if known
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

import { Stylist } from 'c:/FPTUni/FALL2024_FPT/MMA301/Project/HairSalon/FE-APP-Hair-Salon/model/Stylist';

  const StylistScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
    const route = useRoute<RouteProp<RouteParams>>();
    const { selectedServices } = route.params || { selectedServices: [] };
  
    const stylists: Stylist[] = [
      { id: 1, name: 'Sarah Johnson', specialty: 'Color Specialist', experience: 5 , rating: 4.5, available: true },
      { id: 2, name: 'Mike Chen', specialty: 'Cutting Expert', experience: 7, rating: 4.7, available: true },
      { id: 3, name: 'Emma Davis', specialty: 'Styling Professional', experience: 4, rating: 4.6, available: true }
    ];
  
    return (
      <View style={styles.container}>
        <ScrollView>
          {stylists.map(stylist => (
            <TouchableOpacity
              key={stylist.id}
              style={[
                styles.stylistCard,
                selectedStylist?.id === stylist.id && styles.selectedCard
              ]}
              onPress={() => setSelectedStylist(stylist)}
            >
              <View style={styles.stylistImage} />
              <View style={styles.stylistInfo}>
                <Text style={styles.stylistName}>{stylist.name}</Text>
                <Text style={styles.stylistSpeciality}>{stylist.specialty}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
  
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, !selectedStylist && styles.buttonDisabled]}
            disabled={!selectedStylist}
            onPress={() => navigation.navigate('DateTimeSelection', {
              selectedServices,
              selectedStylist
            })}
          >
            <Text style={styles.buttonText}>Next: Choose Date & Time</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default StylistScreen;
