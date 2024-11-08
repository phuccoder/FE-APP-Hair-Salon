import { ComboDTO } from '@/dtos/Combo.dto';
import { ServiceDTO } from '@/dtos/Service.dto';
import { StylistDTO } from '@/dtos/Stylist.dto';
import { Combo, Service } from '@/model/Service';
import { Stylist } from '@/model/Stylist';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeScreen: undefined;
  ServiceScreen: { data: string };
  VnPayPage: { data: string };
  ServiceDetail: { data: Service };
  ComboDetail: { data: Combo };
  Stylist: { selectedCombos: ComboDTO[]; selectedServices: ServiceDTO[] | null };
  DateTimeSelection: {
    selectedServices: ServiceDTO[];
    selectedCombos: ComboDTO[];
    selectedStylist: StylistDTO;
  };
  PaymentSelection: {
    selectedServices: ServiceDTO[];
    selectedCombos: ComboDTO[];
    selectedStylist: StylistDTO;
    appointmentDate: string;
    appointmentTime: string;
  };
  AppointmentConfirmation: {
    selectedServices: ServiceDTO[];
    selectedCombos: ComboDTO[];
    selectedStylist: StylistDTO;
    appointmentDate: string;
    appointmentTime: string;
    paymentMethod: { id: number; name: string; icon: string } | null;
  };
  AppointmentSelectedItem: {
    selectedServices: ServiceDTO[];
    selectedCombos: ComboDTO[];
  };
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
