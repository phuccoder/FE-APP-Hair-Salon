import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { formatPrice } from '@/utils/formatPrice';
import { Combo, Service } from '@/model/Service';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/utils/navigation';
import { comboApi } from '@/service/serviceApi';
import { hairComboServices } from '@/service/hairComboServices';
import { ComboDTO } from '@/dtos/Combo.dto';
import { Button } from 'react-native-elements';
import { ServiceDTO } from '@/dtos/Service.dto';

interface AppointmentItem {
  id: string;
  name: string;
  price: number;
  type: 'service' | 'combo';
  data: Service | Combo;
}

const AppointmentSelectedItem: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [appointmentItems, setAppointmentItems] = useState<AppointmentItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<AppointmentItem[]>([]);

  useEffect(() => {
    // Fetch services and combos added by the user and store them in the state
    const fetchData = async () => {
      try {
        const services = await comboApi.getService();
        const combosData = await hairComboServices.getAllCombos().toPromise();
        const combos = (combosData || []).map((combo: ComboDTO) => ({
          id: `combo-${combo.comboID}`,
          name: combo.comboName,
          price: combo.comboPrice,
          type: 'combo',
          data: {
            ...combo,
            comboDetails: combo.comboDetails.map((detail: any) => ({
              ...detail,
              comboDetailID: detail.comboDetailID ?? 0, // Ensure comboDetailID is a number
            })),
          } as ComboDTO,
        }));

        const items: AppointmentItem[] = [
          ...services.map((service: Service) => ({
            id: `service-${service.serviceID}`,
            name: service.serviceName,
            price: service.servicePrice,
            type: 'service',
            data: service,
          })),
          ...combos,
        ];

        setAppointmentItems(items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectItem = (item: AppointmentItem) => {
    setSelectedItems((prev) => {
      const updatedItems = prev.some(i => i.id === item.id) 
        ? prev.filter((i) => i.id !== item.id) 
        : [...prev, item];
      console.log('Selected items:', updatedItems); // Debugging statement
      return updatedItems;
    });
  };
  
  const handleNavigateToStylist = () => {
    console.log('Selected items before navigation:', selectedItems); // Debugging statement
    if (selectedItems.length > 0) {
      const selectedCombos = selectedItems.filter(item => item.type === 'combo').map(item => item.data as ComboDTO);
      const selectedServices = selectedItems.filter(item => item.type === 'service').map(item => item.data as ServiceDTO);
      console.log('Selected Combos:', selectedCombos); // Debugging statement
      console.log('Selected Services:', selectedServices); // Debugging statement
      navigation.navigate('Stylist', {
        selectedCombos,
        selectedServices,
      });
    } else {
      console.warn('No services or combos selected');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={appointmentItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              selectedItems.includes(item) && styles.selectedItem,
            ]}
            onPress={() => handleSelectItem(item)}
          >
            {item.type === 'combo' && (
              <Image
                source={{ uri: (item.data as Combo).comboDetails[0].serviceImage }}
                style={styles.stylistImage}
                resizeMode="cover"
              />
            )}
            <View style={styles.itemContentContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
      <Button
        title="Proceed to Stylist"
        onPress={handleNavigateToStylist}
        disabled={selectedItems.length === 0}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  item: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#d3d3d3',
  },
  stylistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
  },
  itemContentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  listContainer: {
    paddingBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
});

export default AppointmentSelectedItem;