// HomeStack.tsx
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServiceScreen from "@/app/screen/Service/ServiceList";
import ServiceDetail from "@/app/screen/Service/ServiceDetail";
import CustomHeader from "@/app/components/Header/CustomHeader";

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
        name="ServiceDetail"
        component={ServiceDetail}
        options={{
          title: "Details",
          header: () => <CustomHeader title="Details" />, // Use custom header
        }}
      />
    </Stack.Navigator>
  );
}
