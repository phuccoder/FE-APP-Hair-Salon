import { Combo } from "@/model/Service";
import { formatPrice } from "@/utils/formatPrice";
import { RootStackParamList } from "@/utils/navigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Divider } from "react-native-elements";

interface ServiceDetailProps {
  route?: any;
  navigation: any;
}

const { width } = Dimensions.get("window"); // Get screen width for button layout

const ComboDetail = ({ route, navigation }: ServiceDetailProps) => {
  const { data } = route.params;
  const [detail, setDetail] = useState<Combo>(data);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (data) {
      setDetail(data);
    }
  }, []);

  const handleBooking = () => {
    navigation.navigate('Stylist', {
      selectedItem: detail,
      type: 'combo'
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1, marginBottom: 70 }} // Leave space for the fixed buttons
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL1bx5wd1PTncyaHk8dNGV0i5I4Bmr3T6LHQ&s",
          }}
          resizeMode="stretch"
          style={{ height: 350 }}
        />
        <View className="flex-1 flex-col gap-2 p-2">
          <Text className="font-medium text-xl">{detail.comboName}</Text>
          <Text className="font-bold text-lg text-orange-600">
            {formatPrice(detail.comboPrice)}
          </Text>
          <View
            className="border-[1px] border-gray-300 p-2 rounded-lg"
            style={styles.shadowBox}
          >
            <Text className="text-lg font-bold">Combo include</Text>
            <Divider />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                paddingTop: 8,
              }}
            >
              {detail.comboDetails.map((element) => (
                <TouchableOpacity
                  key={element.serviceID}
                  onPress={() =>
                    navigation.push("ServiceDetail", { data: element })
                  }
                >
                  <View
                    style={[
                      {
                        backgroundColor: "red",
                        borderRadius: 10,
                        alignItems: "center",
                        alignSelf: "flex-start", // Ensures the card width fits content
                        marginBottom: 8,
                        marginRight: 10,
                        overflow: "hidden",
                      },
                      styles.shadowBox,
                    ]}
                  >
                    <Image
                      source={{ uri: element.serviceImage }}
                      style={{ width: 100, height: 100 }}
                      resizeMode="cover"
                    />
                    <View className="p-2 flex-col gap-1">
                      <Text>{element.serviceName}</Text>
                      <Text className="text-orange-600">
                        {formatPrice(element.servicePrice)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View
            className="border-[1px] border-gray-300 p-2 rounded-lg"
            style={styles.shadowBox}
          >
            <Text className="text-lg font-bold">Combo description</Text>
            <Divider />
            <Text className="font-normal text-base">
              {detail.comboDescription}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Buttons at the Bottom */}
      <View style={styles.fixedButtonContainer}>
        <View style={{ width: width / 2 - 10, paddingHorizontal: 5 }}>
          <Button
            buttonStyle={styles.buttonStyle}
            titleStyle={{ color: "#94731a" }}
            containerStyle={{ borderColor: "#94731a", borderWidth: 1 }}
            title={"Booking"}
            onPress={handleBooking}
          />
        </View>
        <View style={{ width: width / 2 - 10, paddingHorizontal: 5 }}>
          <Button
            buttonStyle={[styles.buttonStyle, styles.buttonMoveTo]}
            titleStyle={{ color: "#94731a" }}
            containerStyle={{ borderWidth: 1, borderColor: "#94731a" }}
            title={"Move to booking"}
            onPress={handleBooking}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowBox: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
    backgroundColor: "white",
    marginBottom: 10,
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white", // Ensure it's visible
    width: "100%",
    elevation: 8, // Add shadow/elevation on Android
  },
  buttonStyle: {
    backgroundColor: "white",
    opacity: 1,
    padding: 10,
  },
  buttonMoveTo: {
    backgroundColor: "rgb(231,211,199)",
  },
});

export default ComboDetail;
