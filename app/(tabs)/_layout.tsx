import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import HomeScreen from "../screen/Home";
import { Ionicons } from "@expo/vector-icons";
import { Ionicons as IoniconsType } from "@expo/vector-icons";
import HomeStack from "../stack/HomeStack/HomeStack";
import ServiceStack from "../stack/ServiceStack/ServiceStack";

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
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof IoniconsType.glyphMap | undefined; // Explicitly typing iconName

          if (route.name === "HomeStack") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "ServiceStack") {
            iconName = focused ? "bag" : "bag-outline";
          }

          // Check if iconName is defined before using it
          return iconName ? (
            <Ionicons name={iconName} size={size} color={color} />
          ) : null;
        },
        headerShown: false,
      })}
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
    </Tab.Navigator>
  );
}
