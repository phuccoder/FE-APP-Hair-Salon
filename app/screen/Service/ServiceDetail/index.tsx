import React from "react";
import { Text, View } from "react-native";

interface ServiceDetailProps {
  data?: any;
}

const ServiceDetail = ({ data }: ServiceDetailProps) => {
  return (
    <View>
      <Text>ServiceDetail</Text>
    </View>
  );
};

export default ServiceDetail;
