import { SuccessResponse } from "@/dtos/Authentication.dto";
import { ServiceDTO } from "@/dtos/Service.dto";
import { UserDetailsDTO } from "@/dtos/User.dto";
import { hairServices } from "@/service/hairService";
import { userServices } from "@/service/userServices";
import { useEffect, useRef, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import { Subscription } from "rxjs";

export default function HomeScreen({ navigation }: any) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // IMPORTANT: When subscribing to a subscription, we need to store the subscription in a ref to prevent memory leaks
    const subscriptionsRef = useRef<Subscription[]>([]);
    useEffect(() => {
        return (): void => {
            subscriptionsRef.current.forEach((subscription: Subscription): void => subscription.unsubscribe());
            subscriptionsRef.current = [];
        };
    }, []);
    // end of note
    const [user, setUser] = useState<UserDetailsDTO | null>(null);
    const [services, setServices] = useState<ServiceDTO[]>([]);

    useEffect(() => {
        subscriptionsRef.current.push(
            userServices.getCurrentUser().subscribe({
                next: (response: SuccessResponse<UserDetailsDTO>) => {
                    setUser(response.data);
                    setLoading(false);
                },
                error: (err) => {
                    setError('Failed to load user details');
                    setLoading(false);
                }
            })
        );
        subscriptionsRef.current.push(
            hairServices.getAllService().subscribe({
                next: (services: ServiceDTO[]) => {
                    setServices(services);
                }
            })
        );
    }, []);

    const banners = [
        'https://freedesignfile.com/upload/2022/10/Sale-banner-beauty-salon-vector.jpg',
        'https://img.freepik.com/free-vector/flat-design-beauty-salon-banner_23-2150068560.jpg',
        'https://img.freepik.com/free-vector/hand-drawn-beauty-salon-facebook-cover_23-2149646009.jpg?semt=ais_hybrid'
    ];

    const stylists = [
        {
            name: 'Stylist 1',
            experience: '5 năm',
            rating: '⭐⭐⭐⭐⭐',
            image: 'https://media.istockphoto.com/id/1398386378/vi/anh/ch%C3%A2n-dung-th%E1%BB%A3-l%C3%A0m-t%C3%B3c-v%E1%BB%9Bi-m%C3%A1i-t%C3%B3c-nhu%E1%BB%99m-t%E1%BA%A1i-ti%E1%BB%87m-l%C3%A0m-t%C3%B3c.jpg?s=612x612&w=0&k=20&c=cmlVo8xgiMtqM3Z3PtLkN2Zh6xI0Sflm3ZOP8520r9M='
        },
        {
            name: 'Stylist 2',
            experience: '3 năm',
            rating: '⭐⭐⭐⭐',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMmwSpKlcTS7L6ahcRLsasmBNxUmsv7jZYDQ&s'
        },
        {
            name: 'Stylist 3',
            experience: '4 năm',
            rating: '⭐⭐⭐⭐',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4lmzqgbRdBCNlc9psX4luq1LkuD8tqD7gOQ&s'
        },
    ];

    return (
        <ScrollView>
            <View style={{ flex: 1, backgroundColor: '#f4f4f4' }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 20,
                    backgroundColor: 'white',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20
                }}>
                    <Image
                        source={{ uri: 'https://img.freepik.com/premium-vector/woman-hair-salon-logo-design-luxury-vector_487414-1667.jpg' }}
                        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 20 }}
                    />
                    <View>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: '300' }}>
                            {user ? `Hello ${user.accountName}` : 'Hello, anonymous!'}
                        </Text>
                        <Text style={{ color: 'black', fontSize: 20, fontWeight: '300' }}>
                            Welcome to HairSalon!
                        </Text>
                    </View>
                </View>

                <View style={{ marginVertical: 20 }}>
                    <FlatList
                        data={banners}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <View style={{ width: 300, height: 200, marginRight: 10 }}>
                                <Image
                                    source={{ uri: item }}
                                    style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 20 }}
                                />
                            </View>
                        )}
                    />

                </View>

                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, padding: 10 }}>My service</Text>
                <View style={{ padding: 20 }}>
                    <FlatList
                        data={services}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{ width: '48%', alignItems: 'center', marginBottom: 10 }}
                                onPress={() => {
                                    console.log(`Clicked on ${item.serviceName}`);
                                    navigation.navigate('ServiceDetail');
                                }}
                            >
                                {/* <Image
                                    source={{ uri: item.logo }}
                                    style={{ width: 80, height: 80, borderRadius: 40 }}
                                /> */}
                                <Text style={{ textAlign: 'center' }}>{item.serviceName}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.serviceName}
                        numColumns={2}
                    />
                </View>


                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, padding: 10 }}>My Stylist</Text>
                <FlatList
                    data={stylists}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={{ width: 150, marginRight: 10, alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log(`Clicked on ${item.name}`);
                                    navigation.navigate('StylistScreen');
                                }}
                            >
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ width: 100, height: 100, borderRadius: 50 }}
                                />
                            </TouchableOpacity>
                            <Text style={{ textAlign: 'center' }}>{item.name}</Text>
                            <Text>Kinh nghiệm: {item.experience}</Text>
                            <Text>Đánh giá: {item.rating}</Text>
                        </View>
                    )}
                />


                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, padding: 10 }}>Combo</Text>
                <View style={{ padding: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#ffdab9',
                            padding: 15,
                            borderRadius: 10,
                            width: '48%',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}
                        onPress={() => {
                            console.log('Chọn Combo 1');
                            navigation.navigate('ComboDetail');
                        }}
                    >
                        <Text style={{ color: '#000', fontSize: 16 }}>Combo 1: Cắt & Gội</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#ffdab9',
                            padding: 15,
                            borderRadius: 10,
                            width: '48%',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}
                        onPress={() => {
                            console.log('Chọn Combo 2');
                            navigation.navigate('ComboDetail');
                        }}
                    >
                        <Text style={{ color: '#000', fontSize: 16 }}>Combo 2: Uốn & Nhuộm</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#ffdab9',
                            padding: 15,
                            borderRadius: 10,
                            width: '48%',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}
                        onPress={() => {
                            console.log('Chọn Combo 3');
                            navigation.navigate('ComboDetail');
                        }}
                    >
                        <Text style={{ color: '#000', fontSize: 16 }}>Combo 3: Duỗi & Dưỡng</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#ffdab9',
                            padding: 15,
                            borderRadius: 10,
                            width: '48%',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}
                        onPress={() => {
                            console.log('Chọn Combo 4');
                            navigation.navigate('ComboDetail');
                        }}
                    >
                        <Text style={{ color: '#000', fontSize: 16 }}>Combo 4: Nhuộm & Cắt</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ alignItems: 'center' }}>
                    <Button
                        title="Đặt Lịch Ngay"
                        buttonStyle={{
                            backgroundColor: '#f08080',
                            marginTop: 20,
                            marginBottom: 20,
                            borderRadius: 5,
                            justifyContent: 'center'
                        }}
                        containerStyle={{ width: 150 }}
                    />
                </View>
            </View>
        </ScrollView>
    );
}
