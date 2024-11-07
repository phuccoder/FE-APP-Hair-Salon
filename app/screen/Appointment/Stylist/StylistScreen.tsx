import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/utils/navigation';
import { StylistDTO } from '@/dtos/Stylist.dto';
import { ServiceDTO } from '@/dtos/Service.dto';
import { ComboDTO } from '@/dtos/Combo.dto';
import { hairStylistServices } from '@/service/hairStylistServices';

type RouteParams = {
  params: {
    selectedCombos: ComboDTO[];
    selectedServices: ServiceDTO[];
    selectedStylist: StylistDTO;
  };
};

const StylistScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedStylist, setSelectedStylist] = useState<StylistDTO | null>(null);
  const route = useRoute<RouteProp<RouteParams>>();
  const { selectedCombos, selectedServices, selectedStylist: stylistFromParams } = route.params || { selectedCombos: [], selectedServices: [], selectedStylist: null };
  const [stylists, setStylists] = useState<StylistDTO[]>([]);

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const response = await hairStylistServices.getAllStylist().toPromise();
        if (response && response.data) {
          setStylists(response.data);
        }
      } catch (error) {
        console.error('Error fetching stylists:', error);
      }
    };
    fetchStylists();
  }, []);

  useEffect(() => {
    // Set the selected stylist if it's passed from the previous screen
    if (stylistFromParams) {
      setSelectedStylist(stylistFromParams);
    }
  }, [stylistFromParams]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {stylists.map((stylist) => (
          <TouchableOpacity
            key={stylist.stylistID}
            style={[
              styles.stylistCard,
              selectedStylist?.stylistID === stylist.stylistID && styles.selectedCard,
            ]}
            onPress={() => setSelectedStylist(stylist)}
          >
            <Image
              source={{ uri: stylist.stylistAvatar }}
              style={styles.stylistImage}
            />
            <View style={styles.stylistInfo}>
              <Text style={styles.stylistName}>{stylist.stylistName}</Text>
              <Text style={styles.stylistSpeciality}>{stylist.stylistInfor}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !selectedStylist && styles.buttonDisabled]}
          disabled={!selectedStylist}
          onPress={() => {
            if (selectedStylist) {
              console.log('Selected Services:', selectedServices);
              console.log('Selected Combos:', selectedCombos);

              navigation.navigate('DateTimeSelection', {
                selectedServices,
                selectedCombos,
                selectedStylist: selectedStylist,
              });
            } else {
              console.warn('No stylist selected');
            }
          }}
        >
          <Text style={styles.buttonText}>Next: Choose Date & Time</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
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
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
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
});

export default StylistScreen;