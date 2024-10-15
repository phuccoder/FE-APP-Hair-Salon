import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";

interface ServiceDetailProps {
  route?: any;
}

const ServiceDetail = ({ route }: ServiceDetailProps) => {
  const { data } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
        resizeMode="cover"
        height={350}
      />
      <View className="flex-1 flex-col gap-2">
        <View className="p-2">
          <Text className="font-bold text-xl">{data.name}</Text>
          <Text className="font-normal text-lg text-orange-600">
            {data.price}
          </Text>
        </View>
        <View className="w-fit absolute bottom-0 flex-row justify-between">
          <View className="w-1/2 p-2">
            <Button
              buttonStyle={style.buttonStyle}
              titleStyle={{
                color: "#94731a",
              }}
              containerStyle={{
                borderColor: "#94731a",
                borderWidth: 1,
              }}
              title={"Booking"}
              onPress={() => console.log("aha")}
            />
          </View>
          <View className="w-1/2 p-2">
            <Button
              buttonStyle={[style.buttonStyle, style.buttonMoveTo]}
              titleStyle={{
                color: "#94731a",
              }}
              containerStyle={{
                borderWidth: 1,
                borderColor: "#94731a",
              }}
              title={"Move to booking"}
              onPress={() => console.log("aha")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "white", // Light transparent blue
    opacity: 100,
    padding: 10,
  },
  buttonMoveTo: {
    backgroundColor: "rgb(231,211,199)",
  },
});

export default ServiceDetail;
