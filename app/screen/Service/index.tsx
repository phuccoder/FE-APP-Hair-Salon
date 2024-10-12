import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { DrawerLayoutAndroid, StyleSheet, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-default";
import FilterDrawer from "./components/FilterDrawer";
import RNPickerSelect from 'react-native-picker-select';

const ServiceScreen = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [search, setSearch] = useState<string>("");
  const onChangeSearch = (e: string) => {
    setSearch(e);
  };

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={200}
      drawerPosition={"right"}
      renderNavigationView={() => <FilterDrawer />}
    >
      <View className="bg-blue-500">
        <View className="py-4 px-4 flex-row w-full items-center gap-2">
          <View className="w-[85%]">
            <SearchBar
              platform="default"
              placeholder="Search..."
              onChangeText={onChangeSearch as any}
              value={search}
              containerStyle={style.containerSearch}
              inputStyle={style.inputSearch}
            />
          </View>
          <View className="">
            <Button
              className="w-full"
              icon={<Ionicons name="filter" size={25} />}
              onPress={() => drawer.current?.openDrawer()}
              buttonStyle={style.buttonStyle}
            />
          </View>
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

const style = StyleSheet.create({
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
});

export default ServiceScreen;
