import { Service } from "@/model/Service";
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
  View,
} from "react-native";
import { Button } from "react-native-elements";

interface ServiceDetailProps {
  route?: any;
}

const { width } = Dimensions.get("window"); // Get screen width for button layout

const ServiceDetail = ({ route }: ServiceDetailProps) => {
  const { data } = route.params || {}; // Add fallback for undefined parameters
  const [detail, setDetail] = useState<Service | null>(data);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (data) {
      setDetail(data);
    }
  }, [data]);

  const handleBooking = () => {
    navigation.navigate('AppointmentSelectedItem', {
      selectedServices: [],
      selectedCombos: [],
    });
  };

  if (!detail) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1, marginBottom: 70 }} 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Image
          source={{
            uri: detail.serviceImage,
          }}
          resizeMode="cover"
          style={{ height: 500 }}
        />
        <View className="flex-1 flex-col gap-2 p-2">
          <Text className="font-medium text-xl">{detail.serviceName}</Text>
          <Text className="font-bold text-lg text-orange-600">
            {formatPrice(detail.servicePrice)}
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Buttons at the Bottom */}
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

export default ServiceDetail;