import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRoute, useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Schedule } from '@/dtos/Schedule.dto';
import { ApplicationConstants } from '@/constants/ApplicationConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScheduleService } from '@/service/ScheduleServices';

type RouteParams = {
  params: {
    selectedItem: any;
    selectedStylist: any;
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 4,
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

type RootStackParamList = {
  PaymentSelection: {
    selectedItem: any;
    selectedStylist: any;
    appointmentDate: Date;
    appointmentTime: string | null;
  };
};

const DateTimeSelection: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const { selectedItem, selectedStylist } = route.params;
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const token = await AsyncStorage.getItem(ApplicationConstants.ACCESS_TOKEN);
        if (!token) {
          throw new Error('No access token found');
        }
        const response = await ScheduleService.getSchedulesByStylistId(selectedStylist.stylistID, token).toPromise();
        if (response && response.data) {
          const schedules: Schedule[] = response.data;
          const slots = schedules.map(schedule => `${schedule.startTime} - ${schedule.endTime}`);
          setAvailableSlots(slots);
        }
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, [selectedStylist]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Select Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.detailText}>
          {selectedDate.toDateString()} {/* Display selected date */}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(event: any, date: Date | undefined) => {
            setShowDatePicker(false);
            if (date) {
              setSelectedDate(date);
            }
          }}
        />
      )}

      <Text style={styles.sectionTitle}>Available Time Slots</Text>
      <View style={styles.timeSlotGrid}>
        {availableSlots.map(slot => (
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
            selectedItem,
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