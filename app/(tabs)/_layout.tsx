import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import HomeScreen from "../screen/Home";
import { Ionicons } from "@expo/vector-icons";
import { Ionicons as IoniconsType } from "@expo/vector-icons";
import HomeStack from "../stack/HomeStack/HomeStack";
import ServiceStack from "../stack/ServiceStack/ServiceStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import AppointmentStack from "../stack/AppointmentStack/AppointmentStack";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route);

        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap | undefined; 

            if (route.name === "HomeStack") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Account") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "ServiceStack") {
              iconName = focused ? "bag" : "bag-outline";
            } else if (route.name === "AppointmentStack"){
              iconName = focused ? "calendar" : "calendar-outline";
            }

            return iconName ? (
              <Ionicons name={iconName} size={size} color={color} />
            ) : null;
          },
          unmountOnBlur: true,
          headerShown: false,
          tabBarStyle: {
            display: routeName === "ServiceDetail" ? "none" : "flex",
          },
        };
      }}
      
    >
      <Tab.Screen
        name="HomeStack"
        options={{ tabBarLabel: "Home" }}
        component={HomeStack}
      />
      <Tab.Screen
        name="ServiceStack"
        options={{ tabBarLabel: "Service" }}
        component={ServiceStack}
      />
      <Tab.Screen name="Account" component={SettingsScreen} />
      <Tab.Screen 
        name="AppointmentStack" 
        options={{ tabBarLabel: "Appointment" }}
        component={AppointmentStack}      
      />
    </Tab.Navigator>
  );
}
