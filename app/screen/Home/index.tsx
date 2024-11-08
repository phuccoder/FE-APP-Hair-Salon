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
import {authServices} from "@/service/authServices";
import {Icon} from "react-native-elements";

export default function HomeScreen({navigation}: any) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const subscriptionsRef = useRef<Subscription[]>([]);

    const [user, setUser] = useState<UserDetailsDTO | null>(null);
    const [services, setServices] = useState<ServiceDTO[]>([]);
    const [stylists, setStylists] = useState<StylistDTO[]>([]);
    const [combos, setCombos] = useState<ComboDTO[]>([]);

    useEffect(() => {
        const checkAuthenticationAndLoadData = () => {
            subscriptionsRef.current.push(
                authServices.extractToken().subscribe({
                    next: (token) => {
                        if (token) {
                            // User is authenticated, proceed with API calls
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
                                        setCombos(combos);
                                    },
                                })
                            );
                        } else {
                            // No valid token, navigate to login page
                            navigation.replace("LoginPage");
                        }
                    },
                    error: () => {
                        console.log("No valid token found, navigate to login page");
                        navigation.replace("LoginPage");
                    },
                })
            );
        };

        checkAuthenticationAndLoadData();

        return () => {
            subscriptionsRef.current.forEach((subscription) =>
                subscription.unsubscribe()
            );
            subscriptionsRef.current = [];
        };
    }, [navigation]);

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
            onPress={() => navigation.navigate("ServiceDetail", {data: item})}
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
            <TouchableOpacity>
                <Image
                    source={{uri: item.stylistAvatar}}
                    style={{width: 100, height: 100, borderRadius: 50, marginBottom: 5}}
                />
            </TouchableOpacity>
            <Text style={{textAlign: "center"}}>{item.stylistName}</Text>
            <Text>Phone Number: {item.stylistPhone}</Text>
            <Text>Info: {item.stylistInfor}</Text>
        </View>
    );

    const handleLogout = () => {
        subscriptionsRef.current.push(
            authServices.logout().subscribe({
                next: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{name: "LoginStack"}],
                    });
                },
                error: () => {
                    console.error("Failed to logout");
                },
            })
        );
    };

    return (
        <FlatList
            data={[1]}
            keyExtractor={() => "unique-key"}
            renderItem={() => (
                <View style={{flexGrow: 1, backgroundColor: "#f4f4f4", padding: 10}}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 20,
                            backgroundColor: "white",
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                        }}
                    >
                        <Image
                            source={{
                                uri: "https://img.freepik.com/premium-vector/woman-hair-salon-logo-design-luxury-vector_487414-1667.jpg",
                            }}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                marginRight: 20,
                            }}
                        />
                        <View>
                            <Text style={{color: "black", fontSize: 16, fontWeight: "300"}}>
                                {user ? `Hello ${user.accountName}` : "Hello, anonymous!"}
                            </Text>
                            <Text style={{color: "black", fontSize: 16, fontWeight: "300"}}>
                                Welcome to HairSalon!
                            </Text>
                        </View>
                        <View style={{marginLeft: "auto"}}>
                            <TouchableOpacity onPress={handleLogout}>
                                <Icon
                                    name="logout"
                                    type="material-community"
                                    color="#ff4d4d"
                                    size={28}
                                    containerStyle={{
                                        backgroundColor: "#fff",
                                        padding: 10,
                                        borderRadius: 20,
                                        shadowColor: "#000",
                                        shadowOffset: {width: 0, height: 2},
                                        shadowOpacity: 0.2,
                                        shadowRadius: 4,
                                        elevation: 5,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <FlatList
                        data={banners}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item}
                        renderItem={renderBanner}
                    />

                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            marginBottom: 10,
                            padding: 10,
                        }}
                    >
                        My Service
                    </Text>
                    <FlatList
                        data={services}
                        renderItem={renderService}
                        keyExtractor={(item) => item.serviceName}
                        numColumns={2}
                        columnWrapperStyle={{justifyContent: "space-between"}}
                    />

                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            marginBottom: 10,
                            padding: 10,
                        }}
                    >
                        My Stylist
                    </Text>

                    <FlatList
                        data={stylists}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.stylistName}
                        renderItem={renderStylist}
                    />

                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            marginBottom: 10,
                            padding: 10,
                        }}
                    >
                        Combo
                    </Text>
                    <FlatList
                        data={combos}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#ffdab9",
                                    margin: 5,
                                    padding: 15,
                                    borderRadius: 10,
                                    width: "48%",
                                    alignItems: "center",
                                    marginBottom: 10,
                                }}
                                onPress={() => navigation.navigate("ComboDetail", {data: item})}
                            >
                                <Text style={{color: "#000", fontSize: 16}}>
                                    {item.comboName}
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.comboID.toString()}
                        numColumns={2}
                    />
                    <View style={{alignItems: "center"}}>
                        <Button
                            title="Đặt Lịch Ngay"
                            onPress={() => navigation.navigate("AppointmentSelectItem")}
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
        />
    );
}