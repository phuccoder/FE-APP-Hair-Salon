import { Text, View } from "react-native";
import { Button, Input } from "react-native-elements";

export default function HomeScreen({ navigation }: any) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="!text-red-500">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Button
        title={"Go to detail"}
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}
