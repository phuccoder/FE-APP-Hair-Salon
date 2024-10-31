import {SuccessResponse} from "@/dtos/Authentication.dto";
import {ServiceDTO} from "@/dtos/Service.dto";
import {StylistDTO} from "@/dtos/Stylist.dto";
import {UserDetailsDTO} from "@/dtos/User.dto";
import {hairServices} from "@/service/hairService";
import {hairStylistServices} from "@/service/hairStylistServices";
import {userServices} from "@/service/userServices";
import {useEffect, useRef, useState} from "react";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Button} from "react-native-elements";
import {Subscription} from "rxjs";
import {hairComboServices} from "@/service/hairComboServices";
import {ComboDTO} from "@/dtos/Combo.dto";

export default function HomeScreen({navigation}: any) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const subscriptionsRef = useRef<Subscription[]>([]);

    const [user, setUser] = useState<UserDetailsDTO | null>(null);
    const [services, setServices] = useState<ServiceDTO[]>([]);
    const [stylists, setStylists] = useState<StylistDTO[]>([]);
    const [combos, setCombos] = useState<ComboDTO[]>([]);

    useEffect(() => {
        subscriptionsRef.current.push(
            userServices.getCurrentUser().subscribe({
                next: (response: SuccessResponse<UserDetailsDTO>) => {
                    setUser(response.data);
                    setLoading(false);
                },
                error: () => {
                    setError("Failed to load user details");
                    setLoading(false);
                },
            })
        );
        subscriptionsRef.current.push(
            hairServices.getAllHairServices().subscribe({
                next: (services: ServiceDTO[]) => {
                    setServices(services);
                },
            })
        );
        subscriptionsRef.current.push(
            hairStylistServices.getAllStylist().subscribe({
                next: (response: SuccessResponse<StylistDTO[]>) => {
                    setStylists(response.data);
                },
            })
        );
        subscriptionsRef.current.push(
            hairComboServices.getAllCombos().subscribe({
                    next: (combos: ComboDTO[]) => {
                        setCombos(combos)
                    }
                }
            )
        );

        return () => {
            subscriptionsRef.current.forEach((subscription) => subscription.unsubscribe());
            subscriptionsRef.current = [];
        };
    }, []);

    const banners = [
        "https://freedesignfile.com/upload/2022/10/Sale-banner-beauty-salon-vector.jpg",
        "https://img.freepik.com/free-vector/flat-design-beauty-salon-banner_23-2150068560.jpg",
        "https://img.freepik.com/free-vector/hand-drawn-beauty-salon-facebook-cover_23-2149646009.jpg?semt=ais_hybrid",
    ];

    const renderBanner = ({item}: { item: string }) => (
        <View style={{width: 300, height: 200, marginRight: 10}}>
            <Image
                source={{uri: item}}
                style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderRadius: 20,
                }}
            />
        </View>
    );

    const renderService = ({item}: { item: ServiceDTO }) => (
        <TouchableOpacity
            style={{width: "48%", alignItems: "center", marginBottom: 10}}
            onPress={() => navigation.navigate("ServiceDetail")}
        >
            <Image
                source={{uri: item.serviceImage}}
                style={{width: 80, height: 80, borderRadius: 40}}
            />
            <Text style={{textAlign: "center"}}>{item.serviceName}</Text>
        </TouchableOpacity>
    );

    const renderStylist = ({item}: { item: StylistDTO }) => (
        <View style={{width: 150, marginRight: 10, alignItems: "center"}}>
            <TouchableOpacity
                onPress={() => navigation.navigate("StylistScreen")}
            >
                {/* Uncomment to show stylist image */}
                {/* <Image source={{ uri: item.stylistImage }} style={{ width: 100, height: 100, borderRadius: 50 }} /> */}
            </TouchableOpacity>
            <Text style={{textAlign: "center"}}>{item.stylistName}</Text>
            <Text>Phone Number: {item.stylistPhone}</Text>
            <Text>Info: {item.stylistInfor}</Text>
        </View>
    );

    return (
        <FlatList
            data={[1]} // Chỉ cần một phần tử để có thể cuộn
            keyExtractor={() => "unique-key"}
            renderItem={() => (
                <View style={{flexGrow: 1, backgroundColor: "#f4f4f4", padding: 10}}>
                    {/* Header */}
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 20,
                        backgroundColor: "white",
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                    }}>
                        <Image
                            source={{uri: "https://img.freepik.com/premium-vector/woman-hair-salon-logo-design-luxury-vector_487414-1667.jpg"}}
                            style={{width: 40, height: 40, borderRadius: 20, marginRight: 20}}
                        />
                        <View>
                            <Text style={{color: "black", fontSize: 20, fontWeight: "300"}}>
                                {user ? `Hello ${user.accountName}` : "Hello, anonymous!"}
                            </Text>
                            <Text style={{color: "black", fontSize: 20, fontWeight: "300"}}>
                                Welcome to HairSalon!
                            </Text>
                        </View>
                    </View>

                    {/* Banner */}
                    <FlatList
                        data={banners}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item}
                        renderItem={renderBanner}
                    />

                    {/* Services */}
                    <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10, padding: 10}}>My Service</Text>
                    <FlatList
                        data={services}
                        renderItem={renderService}
                        keyExtractor={(item) => item.serviceName}
                        numColumns={2}
                        columnWrapperStyle={{justifyContent: "space-between"}}
                    />

                    {/* Stylists */}
                    <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10, padding: 10}}>My Stylist</Text>
                    <FlatList
                        data={stylists}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.stylistName}
                        renderItem={renderStylist}
                    />

                    {/* Combos */}
                    <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10, padding: 10}}>Combo</Text>
                    <FlatList
                        data={combos}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#ffdab9",
                                    padding: 15,
                                    borderRadius: 10,
                                    width: "48%",
                                    alignItems: "center",
                                    marginBottom: 10,
                                }}
                                onPress={() => navigation.navigate("ComboDetail")}
                            >
                                <Text style={{color: "#000", fontSize: 16}}>{item.comboName}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.comboID.toString()}
                        numColumns={2}
                    />

                    {/* Booking Button */}
                    <View style={{alignItems: "center"}}>
                        <Button
                            title="Đặt Lịch Ngay"
                            buttonStyle={{
                                backgroundColor: "#f08080",
                                marginTop: 20,
                                marginBottom: 20,
                                borderRadius: 5,
                            }}
                            containerStyle={{width: 150}}
                        />

                    </View>
                </View>
            )}
            // Thêm header/footer nếu cần
        />
    );
}
