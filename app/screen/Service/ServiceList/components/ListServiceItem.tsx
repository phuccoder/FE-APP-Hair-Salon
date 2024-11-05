import { Service } from "@/model/Service";
import { formatPrice } from "@/utils/formatPrice";
import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Card, CardProps } from "react-native-elements";

interface ListServiceItemProps {
  props?: CardProps;
  cardImage?: any;
  data: Service;
  onPress?: any;
}

const ListServiceItem = ({
  props,
  cardImage,
  data,
  onPress,
}: ListServiceItemProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Card {...props}>
        <Card.Image
          resizeMode="contain"
          {...cardImage}
          source={{
            uri: data.serviceImage,
          }}
        ></Card.Image>
        <View className="p-3">
          <Text className="font-medium !text-base">{data.serviceName}</Text>
          <Text className="text-orange-600">
            {formatPrice(data.servicePrice)}
          </Text>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

export default ListServiceItem;
