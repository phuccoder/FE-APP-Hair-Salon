import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Schedule } from '@/dtos/Schedule.dto';
import { ApplicationConstants } from '@/constants/ApplicationConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '@/utils/navigation';
import { ServiceDTO } from '@/dtos/Service.dto';
import { ComboDTO } from '@/dtos/Combo.dto';
import { StylistDTO } from '@/dtos/Stylist.dto';
import { ScheduleService } from '@/service/scheduleServices';


type RouteParams = {
  params: {
    selectedServices: ServiceDTO[]; // Update to use selectedServices
    selectedCombos: ComboDTO[]; // Update to use selectedCombos
    selectedStylist: StylistDTO | null; // Keep selectedStylist
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
  selectedTimeSlotText: {
    color: '#fff',
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
  noSlotsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

const DateTimeSelection: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const { selectedServices, selectedCombos, selectedStylist } = route.params; // Update here
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const token = await AsyncStorage.getItem(ApplicationConstants.ACCESS_TOKEN);
        if (!token) {
          throw new Error('No access token found');
        }
        if (selectedStylist?.stylistID !== undefined) {
          const response = await ScheduleService.getSchedulesByStylistId(selectedStylist.stylistID, token).toPromise();
          console.log('Selected stylist ID:', selectedStylist.stylistID);
          console.log('API response:', response); // Log the complete response
  
          // Directly set the schedules from the response
          if (Array.isArray(response)) {
            setSchedules(response); // Set schedules directly from the response
            console.log('Fetched schedules:', response);
          } else {
            console.warn('Unexpected response structure:', response);
          }
        } else {
          console.warn('No stylist selected');
        }
        console.log('Selected stylist ID:', selectedStylist?.stylistID);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };
  
    fetchSchedules();
  }, [selectedStylist]);

  useEffect(() => {
    const getDayOfWeek = (date: Date): string => {
      const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
      return days[date.getDay()];
    };

    const currentDayOfWeek = getDayOfWeek(selectedDate).toUpperCase();
    console.log('Current day of week:', currentDayOfWeek);
    console.log('Fetched schedules:', schedules);

    const schedule = schedules.find(s => s.dayOfWeek.trim().toUpperCase() === currentDayOfWeek);
    console.log('Found schedule:', schedule);

    if (schedule && schedule.scheduleStatus === 'AVAILABLE') {
      const slots = generateTimeSlots(schedule.startTime, schedule.endTime);
      setAvailableTimeSlots(slots);
      console.log('Generated time slots:', slots);
    } else {
      setAvailableTimeSlots([]);
    }

    setSelectedSlot(null);
  }, [selectedDate, schedules]);

  const generateTimeSlots = (startTime: string, endTime: string): string[] => {
    const slots: string[] = [];
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);

    while (start < end) {
      const formattedStart = start.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      start.setMinutes(start.getMinutes() + 30);

      if (start <= end) {
        const formattedEnd = start.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });

        slots.push(`${formattedStart} - ${formattedEnd}`);
      }
    }

    return slots;
  };

  const formatDisplayDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Select Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.detailText}>
          {formatDisplayDate(selectedDate)}
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
      {availableTimeSlots.length > 0 ? (
        <View style={styles.timeSlotGrid}>
          {availableTimeSlots.map((slot) => (
            <TouchableOpacity
              key={slot}
              style={[
                styles.timeSlot,
                selectedSlot === slot && styles.selectedSlot,
              ]}
              onPress={() => setSelectedSlot(slot)}
            >
              <Text
                style={[
                  styles.timeSlotText,
                  selectedSlot === slot && styles.selectedTimeSlotText,
                ]}
              >
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.noSlotsText}>
          No available time slots for this date
        </Text>
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !selectedSlot && styles.buttonDisabled]}
          disabled={!selectedSlot}
          onPress={() => {
            console.log('Selected services:', selectedServices);
            console.log('Selected combos:', selectedCombos);
            console.log('Selected stylist:', selectedStylist);
            if (selectedStylist) {
              navigation.navigate('PaymentSelection', {
                selectedServices,
                selectedCombos,
                selectedStylist,
                appointmentDate: selectedDate.toISOString(),
                appointmentTime: selectedSlot!,
              });
            } else {
              console.warn('No stylist selected');
            }
          }}
        >
          <Text style={styles.buttonText}>Next: Choose Payment Method</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DateTimeSelection;