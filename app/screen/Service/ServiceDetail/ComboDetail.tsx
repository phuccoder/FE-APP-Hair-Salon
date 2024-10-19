import { Combo } from "@/model/Service";
import { formatPrice } from "@/utils/formatPrice";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { Button, Chip, Divider } from "react-native-elements";

interface ServiceDetailProps {
  route?: any;
}

const { width } = Dimensions.get("window"); // Get screen width for button layout

const ComboDetail = ({ route }: ServiceDetailProps) => {
  const { data } = route.params;
  const [detail, setDetail] = useState<Combo>(data);

  useEffect(() => {
    if (data) {
      setDetail(data);
    }
  }, []);

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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: 8,
              }}
            >
              {detail.comboDetails.map((element) => (
                <View key={element.serviceID} style={{ marginRight: 4 }}>
                  <Chip
                    title={element.serviceName}
                    buttonStyle={{
                      borderRadius: 8,
                      backgroundColor: "rgb(231,211,199)",
                      borderWidth: 1,
                      borderColor: "#94731a",
                    }}
                    titleStyle={{
                      color: "black",
                    }}
                  />
                </View>
              ))}
            </View>
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
            onPress={() => console.log("Booking")}
          />
        </View>
        <View style={{ width: width / 2 - 10, paddingHorizontal: 5 }}>
          <Button
            buttonStyle={[styles.buttonStyle, styles.buttonMoveTo]}
            titleStyle={{ color: "#94731a" }}
            containerStyle={{ borderWidth: 1, borderColor: "#94731a" }}
            title={"Move to booking"}
            onPress={() => console.log("Move to booking")}
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
