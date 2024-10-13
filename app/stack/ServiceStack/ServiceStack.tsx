// HomeStack.tsx
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screen/Home"; // Assuming your Home screen is here
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import ServiceScreen from "@/app/screen/Service/ServiceList";
import ServiceDetail from "@/app/screen/Service/ServiceDetail";

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
          headerShown: true,
        }}

      />
    </Stack.Navigator>
  );
}
