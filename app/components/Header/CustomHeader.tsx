import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const CustomHeader = ({ title }: any) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View className="w-1/4">
        <TouchableOpacity 
          style={styles.backButtonContainer} // Use this for the icon container
          onPress={() => navigation.goBack()} // Make the entire area pressable
        >
          <Ionicons
            name="arrow-back-sharp"
            size={15}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View className="!w-1/2 flex-row justify-center">
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    shadowRadius: 2,
  },
  backButtonContainer: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 100,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    backgroundColor: 'grey',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomHeader;
