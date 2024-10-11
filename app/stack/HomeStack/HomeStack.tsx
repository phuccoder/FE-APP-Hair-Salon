// HomeStack.tsx
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screen/Home"; // Assuming your Home screen is here
import { View } from "react-native";
import { Button, Text } from "react-native-elements";

const Stack = createNativeStackNavigator();
function DetailsScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text className="text-red-500">Details Screen</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  );
}
