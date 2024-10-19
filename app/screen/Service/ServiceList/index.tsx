import useToast from "@/hooks/useToast";
import { Combo, Service } from "@/model/Service";
import { comboApi } from "@/service/serviceApi";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  DrawerLayoutAndroid,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Tab, Text } from "react-native-elements";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-default";
import FilterDrawer from "./components/FilterDrawer";
import ListCombo from "./tabs/ListCombo";
import ListService from "./tabs/ListService";

const ServiceScreen = ({ navigation }: any) => {
  const { success, error, Toast } = useToast();
  const [index, setIndex] = useState(0); // State for selected tab index
  const [data, setData] = useState<Combo[]>([]);
  const [dataService, setDataService] = useState([]);
  const [loading, setLoading] = useState(false);
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [search, setSearch] = useState<string>("");
  const [filtered, setFiltered] = useState<Combo[]>([]);
  const [filteredService, setFilteredService] = useState<Service[]>([]); // Filtered Service list
  const [totalSearch, setTotalSearch] = useState(0);

  // Handle search input change
  const onChangeSearch = (query: string) => {
    setSearch(query);
    if (query.trim() === "") {
      // Reset both lists if the search query is empty
      setFiltered(data);
      setFilteredService(dataService);
      return;
    }

    // Filter Combo list
    const filteredComboList = data.filter((item: Combo) =>
      item.comboName.toLowerCase().includes(query.toLowerCase())
    );

    // Filter Service list (adjust the filter logic based on your data structure)
    const filteredServiceList = dataService.filter((item: any) =>
      item.serviceName.toLowerCase().includes(query.toLowerCase())
    );

    // Update state with filtered data
    setFiltered(filteredComboList);
    setFilteredService(filteredServiceList);
  };

  // Fetch combo data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseCombo = await comboApi.getCombo();
        const responseService = await comboApi.getService();
        setDataService(responseService);
        setFilteredService(responseService);
        setData(responseCombo);
        setFiltered(responseCombo);
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
              <View>
                <Button
                  className="w-full"
                  icon={<Ionicons name="filter" size={25} />}
                  onPress={() => drawer.current?.openDrawer()}
                  buttonStyle={style.buttonStyle}
                />
              </View>
            </View>
          </View>
          {search.trim() !== "" && (
            <Text className="p-2 text-base">
              <Text className="font-bold">
                {index === 0 ? filtered.length : filteredService.length}
              </Text>{" "}
              result
              {(index === 0 ? filtered.length : filteredService.length) >
                1 && <Text>s</Text>}
            </Text>
          )}
          <View style={{ flex: 1 }}>
            <Tab value={index} onChange={setIndex} style={{ flex: 1 }}>
              <Tab.Item title="Combo" key={0} />
              <Tab.Item title="Service" key={1} />
            </Tab>
            {index === 0 && (
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 0 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <ListCombo navigation={navigation} data={filtered} />
              </ScrollView>
            )}
            {index === 1 && (
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 0 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <ListService navigation={navigation} data={filteredService} />
              </ScrollView>
            )}
          </View>
          <Toast />
        </View>
      ) : (
        <ActivityIndicator />
      )}
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
