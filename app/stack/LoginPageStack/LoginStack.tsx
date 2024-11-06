import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../../screen/LoginPage/LoginPage";
import HomeScreen from "../../screen/Home";
import RegisterPage from "../../screen/RegisterPage/RegisterPage";
import HomeStack from "../HomeStack/HomeStack";
import Tabs from "@/app/(tabs)/_layout";

const Stack = createNativeStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
        component={Tabs}
      />
      <Stack.Screen
        name="RegisterPage"
        component={RegisterPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
