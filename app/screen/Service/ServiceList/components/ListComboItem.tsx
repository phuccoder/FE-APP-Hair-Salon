import { formatPrice } from "@/utils/formatPrice";
import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Card, CardProps } from "react-native-elements";

interface ListServiceItemProps {
  props?: CardProps;
  cardImage?: any;
  data: any;
  onPress?: any;
}

const ListComboItem = ({
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
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL1bx5wd1PTncyaHk8dNGV0i5I4Bmr3T6LHQ&s",
          }}
        ></Card.Image>
        <View className="p-3">
          <Text className="font-medium !text-base">{data.comboName}</Text>
          <Text className="text-orange-600">
            {formatPrice(data.comboPrice)}
          </Text>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

export default ListComboItem;
