import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  DrawerLayoutAndroid,
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-default";
import FilterDrawer from "./components/FilterDrawer";
import ListServiceItem from "./components/ListServiceItem";
import { comboApi } from "@/service/serviceApi";
import useToast from "@/hooks/useToast";

const fakeData = [
  {
    id: 1,
    name: "service1",
    price: 100000,
    service: "Cut, spa, massage",
  },
  {
    id: 2,
    name: "service1",
    price: 100000,
    service: "Cut, spa, massage",
  },
  {
    id: 3,
    name: "service1",
    price: 100000,
    service: "Cut, spa, massage",
  },
  {
    id: 4,
    name: "service1",
    price: 100000,
    service: "Cut, spa, massage",
  },
];

const ServiceScreen = ({ navigation }: any) => {
  const { success, error, Toast } = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [search, setSearch] = useState<string>("");
  const onChangeSearch = (e: string) => {
    setSearch(e);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await comboApi.getCombo();
        setData(response);
      } catch (err: any) {
        error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={200}
      drawerPosition={"right"}
      renderNavigationView={() => <FilterDrawer />}
      className="flex-1"
    >
      {!loading ? (
        <View className="flex-1">
          <View className="bg-blue-500 w-fit">
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
          <View className="flex-1 py-2  min-h-screen h-screen">
            <FlatList
              numColumns={2}
              data={data}
              contentContainerStyle={{ paddingBottom: 100 }}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item, index }) => {
                const isSingleItemRow =
                  index % 2 === 0 && index === data.length - 1;
                return (
                  <View
                    className={
                      isSingleItemRow
                        ? "flex-1 justify-start"
                        : "flex-1 justify-center"
                    }
                    style={{
                      marginBottom: 10,
                    }}
                  >
                    <ListServiceItem
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
                        navigation.navigate("ServiceDetail", { data: item })
                      }
                    />
                  </View>
                );
              }}
            />
          </View>
          <Toast />
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </DrawerLayoutAndroid>
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

export default ServiceScreen;
