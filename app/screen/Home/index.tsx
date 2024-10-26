import {SuccessResponse} from "@/dtos/Authentication.dto";
import {UserDetailsDTO} from "@/dtos/User.dto";
import {userServices} from "@/service/userServices";
import {useEffect, useRef, useState} from "react";
import {FlatList, Image, ScrollView, Text, View} from "react-native";
import {Button} from "react-native-elements";
import {Subscription} from "rxjs";

export default function HomeScreen({navigation}: any) {
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
    }, []);

    const banners = [
        'https://freedesignfile.com/upload/2022/10/Sale-banner-beauty-salon-vector.jpg',
        'https://img.freepik.com/free-vector/flat-design-beauty-salon-banner_23-2150068560.jpg',
        'https://img.freepik.com/free-vector/hand-drawn-beauty-salon-facebook-cover_23-2149646009.jpg?semt=ais_hybrid'
    ];

    const services = [
        {
            name: 'Hair Cut',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdBljpp0aBj1UUcrYXpJT4OFi9rNKTLM5hpg&s'
        },
        {
            name: 'Hair dying',
            logo: 'https://static.vecteezy.com/system/resources/previews/010/411/253/non_2x/hair-paint-or-hair-polish-logo-design-silhouette-of-a-brush-comb-and-a-woman-s-face-with-a-soft-color-concept-vector.jpg'
        },
        {
            name: 'Hair Care',
            logo: 'https://cdn5.vectorstock.com/i/1000x1000/47/74/hair-styling-line-icon-concept-sign-outline-vector-29704774.jpg'
        },
        {
            name: 'Hair Styling',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE-x2b8rjXPLjD1GnCy1EUygt1-2UWE3rFjqDAtRCgHW5zHaJOwx8a0OWG1WgNzQu_6w4&usqp=CAU'
        },
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
            <View style={{flex: 1, backgroundColor: '#f4f4f4'}}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 20,
                    backgroundColor: 'white',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20
                }}>
                    <Image
                        source={{uri: 'https://img.freepik.com/premium-vector/woman-hair-salon-logo-design-luxury-vector_487414-1667.jpg'}}
                        style={{width: 40, height: 40, borderRadius: 20, marginRight: 20}}
                    />
                    <View>
                        <Text style={{color: 'black', fontSize: 20, fontWeight: '300'}}>
                            {user ? `Hello ${user.accountName}` : 'Hello, anonymous!'}
                        </Text>
                        <Text style={{color: 'black', fontSize: 20, fontWeight: '300'}}>
                            Welcome to HairSalon!
                        </Text>
                    </View>
                </View>

                <View style={{marginVertical: 20}}>
                    <FlatList
                        data={banners}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item}
                        renderItem={({item}) => (
                            <View style={{width: 300, height: 200, marginRight: 10}}>
                                <Image
                                    source={{uri: item}}
                                    style={{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 20}}
                                />
                            </View>
                        )}
                    />

                </View>

                <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10, padding: 10}}>My service</Text>
                <View style={{padding: 20}}>
                    <FlatList
                        data={services}
                        renderItem={({item}) => (
                            <View style={{width: '48%', alignItems: 'center', marginBottom: 10}}>
                                <Image
                                    source={{uri: item.logo}}
                                    style={{width: 80, height: 80, borderRadius: 40}}
                                />
                                <Text style={{textAlign: 'center'}}>{item.name}</Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.name}
                        numColumns={2}
                    />
                </View>


                <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10, padding: 10}}>My Stylist</Text>
                <FlatList
                    data={stylists}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.name}
                    renderItem={({item}) => (
                        <View style={{width: 150, marginRight: 10, alignItems: 'center'}}>
                            <Image
                                source={{uri: item.image}}
                                style={{width: 100, height: 100, borderRadius: 50}}
                            />
                            <Text style={{textAlign: 'center'}}>{item.name}</Text>
                            <Text>Kinh nghiệm: {item.experience}</Text>
                            <Text>Đánh giá: {item.rating}</Text>
                        </View>
                    )}
                />
                <View style={{alignItems: 'center'}}>
                    <Button
                        title="Đặt Lịch Ngay"
                        buttonStyle={{
                            backgroundColor: '#808080',
                            marginTop: 20,
                            marginBottom: 20,
                            borderRadius: 5,
                            justifyContent: 'center'
                        }}
                        containerStyle={{width: 150}}
                    />
                </View>
            </View>
        </ScrollView>
    );
}
