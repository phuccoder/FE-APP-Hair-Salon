import { ServiceDetailNavigationProp } from "@/utils/navigation";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { Card, CardProps } from "react-native-elements";

interface ListServiceItemProps {
  props?: CardProps;
  cardImage?: any;
  data: any;
  navigation?: any
}

const ListServiceItem = ({ props, cardImage, data, navigation }: ListServiceItemProps) => {
  return (
    <TouchableWithoutFeedback onPress={navigation}>
      <Card {...props}>
        <Card.Image
          {...cardImage}
          source={{
            uri: "https://www.google.com/imgres?q=salon%20service&imgurl=https%3A%2F%2Ftechsquadteam.com%2Fassets%2Fprofile%2Fblogimages%2F15ef18d25c3c9cfef0b0aff23927d6ab.png&imgrefurl=https%3A%2F%2Ftechsquadteam.com%2Fblog%2F5-benefits-of-inhouse-beauty-services&docid=2VCBHmR6gie_EM&tbnid=2Qq4bGPWv1i86M&vet=12ahUKEwieqvHk0YqJAxUXh1YBHWtXAbkQM3oECBsQAA..i&w=850&h=440&hcb=2&ved=2ahUKEwieqvHk0YqJAxUXh1YBHWtXAbkQM3oECBsQAA",
          }}
        ></Card.Image>
        <View className="p-3">
          <Text className="font-medium !text-base">{data.name}</Text>
          <Text className="text-orange-600">{data.price}</Text>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

export default ListServiceItem;
