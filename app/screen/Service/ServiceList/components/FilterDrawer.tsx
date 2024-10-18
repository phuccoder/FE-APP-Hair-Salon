import React, { useState } from "react";
import { Text, View } from "react-native";
import { Chip, Divider } from "react-native-elements";

const categories = [
  { id: 1, name: "Category 1" },
  { id: 2, name: "Category 2" },
  { id: 3, name: "Category 3" },
  { id: 4, name: "Category 4" },
];

const FilterDrawer = () => {
  const [selectedCategories, setSelectedCategories] = useState<number | null>(null);

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) => (prev === id ? null : id));
  };
  return (
    <View className="p-2 flex-col gap-2">
      <Text className="font-bold text-base">Category</Text>
      <Divider />
      <View className="flex-row flex-wrap justify-between">
        {categories.map((element) => (
          <Chip
            title={element.name}
            key={element.id}
            type={selectedCategories === element.id ? "solid" : "outline"}
            onPress={() => toggleCategory(element.id)}
            containerStyle={{
              width: 'auto',
              padding: 4,
            }}
            titleStyle={{
              fontSize: 12
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default FilterDrawer;
