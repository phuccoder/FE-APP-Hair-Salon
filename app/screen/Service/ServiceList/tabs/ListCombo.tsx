import { Combo } from "@/model/Service";
import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import ListComboItem from "../components/ListComboItem";

interface ListComboProps {
  data?: Combo[];
  navigation?: any;
}

const ListCombo = ({ data, navigation }: ListComboProps) => {
  return (
    <FlatList
      numColumns={2}
      scrollEnabled={false}
      data={data}
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item, index }) => {
        const isSingleItemRow =
          data && index % 2 === 0 && index === data.length - 1;
        return (
          <View
            className={
              isSingleItemRow ? "flex-1 justify-start" : "flex-1 justify-center"
            }
            style={{
              marginBottom: 10,
            }}
          >
            <ListComboItem
              key={index}
              data={item}
              props={{
                containerStyle: {
                  padding: 0,
                  borderRadius: 10,
                  overflow: "hidden",
                  ...style.shadowStyle,
                  ...style.container,
                },
              }}
              onPress={() =>
                navigation.navigate("ComboDetail", { data: item })
              }
            />
          </View>
        );
      }}
    />
  );
};

const { width } = Dimensions.get("window");

const style = StyleSheet.create({
  container: {
    width: width / 2 - 10,
    height: "auto",
    justifyContent: "center",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  containerSearch: {
    backgroundColor: "white",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    borderRadius: 30,
    paddingVertical: 0,
  },
  inputSearch: {
    fontSize: 16,
    color: "black",
  },
  buttonStyle: {
    backgroundColor: "white",
    borderRadius: 20,
  },
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    elevation: 8,
    backgroundColor: "white",
  },
});

export default ListCombo;
