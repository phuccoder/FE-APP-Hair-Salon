// src/types/navigation.ts
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define the param list for the routes
export type RootStackParamList = {
  ServiceScreen: undefined;
  ServiceDetail: { data: any }; // ServiceDetail expects data as a param
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
