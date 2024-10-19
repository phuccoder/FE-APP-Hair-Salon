// HomeStack.tsx
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServiceScreen from "@/app/screen/Service/ServiceList";
import CustomHeader from "@/app/components/Header/CustomHeader";
import ComboDetail from "@/app/screen/Service/ServiceDetail/ComboDetail";
import ServiceDetail from "@/app/screen/Service/ServiceDetail/ServiceDetail";

const Stack = createNativeStackNavigator();
export default function ServiceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Service"
        component={ServiceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ComboDetail"
        component={ComboDetail}
        options={{
          header: () => <CustomHeader title="Combo Detail" />, // Use custom header
        }}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetail}
        options={{
          header: () => <CustomHeader title="Service Detail" />, // Use custom header
        }}
      />
    </Stack.Navigator>
  );
}
