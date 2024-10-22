// src/types/navigation.ts
import { Stylist } from "@/model/Stylist";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Add HomeScreen to the param list
export type RootStackParamList = {
  HomeScreen: undefined;
  ServiceScreen: undefined;
  ServiceDetail: { data: any };
  DateTimeSelection: { selectedServices: any; selectedStylist: Stylist | null };
  PaymentSelection: { selectedServices: any; selectedStylist: Stylist | null; appointmentDate: string; appointmentTime: string };
  AppointmentConfirmation: { paymentMethod: { id: number; name: string; icon: string } | null };
};
// Navigation prop type for screens
export type ServiceDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ServiceDetail"
>;

// Route prop type for receiving params in ServiceDetail screen
export type ServiceDetailRouteProp = RouteProp<
  RootStackParamList,
  "ServiceDetail"
>;
