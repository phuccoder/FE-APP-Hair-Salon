import { Combo, Service } from '@/model/Service';
import { Stylist } from '@/model/Stylist';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  ServiceScreen: undefined;
  VnPayPage: { data: string };
  ServiceDetail: { data: any };
  ComboDetail: { data: Combo };
  Stylist: { selectedCombos: Combo[]; selectedServices: Service[] };
  DateTimeSelection: { selectedServices: any; selectedStylist: Stylist | null };
  PaymentSelection: {
    selectedServices: any;
    selectedStylist: Stylist | null;
    appointmentDate: string;
    appointmentTime: string;
  };
  AppointmentConfirmation: {
    paymentMethod: { id: number; name: string; icon: string } | null;
  };
  AppointmentSelectedItem: { selectedItem: Service; type: string }; // Added AppointmentSelectedItem
};
// Navigation prop type for screens
export type ServiceDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ServiceDetail'
>;

// Route prop type for receiving params in ServiceDetail screen
export type ServiceDetailRouteProp = RouteProp<
  RootStackParamList,
  'ServiceDetail'
>;
