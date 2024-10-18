import { Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen({ navigation }: any) {

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken'); 
    navigation.navigate("LoginPage"); 
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="!text-red-500">
        Homepage
      </Text>
      <Button
        title={"Go to detail"}
        onPress={() => navigation.navigate("Details")}
      />
      <Button
        title={"Logout"}
        onPress={handleLogout} 
        buttonStyle={{ backgroundColor: 'blue', marginTop: 10 }} 
      />
    </View>
  );
}

