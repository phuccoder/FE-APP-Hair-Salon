import {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Alert, Image, ImageBackground, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {authServices} from "@/service/authServices";
import {Subscription} from "rxjs";

type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    RegisterPage: undefined;
};

export default function LoginPage() {
    // IMPORTANT: When subscribing to a subscription, we need to store the subscription in a ref to prevent memory leaks
    const subscriptionsRef = useRef<Subscription[]>([]);
    useEffect(() => {
        return (): void => {
            subscriptionsRef.current.forEach((subscription: Subscription): void => subscription.unsubscribe());
            subscriptionsRef.current = [];
        };
    }, []);
    // end of note
    const [loading, setLoading] = useState(false);
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();

    const onLogin = (): void => {
        setLoading(true);
        subscriptionsRef.current.push(
            authServices
                .signIn({
                    emailOrPhone: emailOrPhone,
                    password: password
                })
                .subscribe({
                    next: (): void => {
                        setEmailOrPhone('');
                        setPassword('');
                        setLoading(false);
                        navigation.push('Home');
                    },
                    error: (): void => {
                        setLoading(false);
                        Alert.alert('Error', 'Invalid email or password');
                    }
                }));
    }

    const handleGoogleLogin = async () => {
        Alert.alert('Google Login', 'Login with Google is clicked');
    };

    const handlePhoneLogin = () => {
        Alert.alert('Phone Login', 'Login with Phone Number is clicked');
    };

    const handleRegister = () => {
        navigation.push('RegisterPage');
    };
    return (
        <ImageBackground
            source={{uri: 'https://www.revealhairstudiorye.com/wp-content/uploads/2021/01/Untitled-design.jpg'}}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
            <View className="bg-white p-6 rounded-lg w-4/5">
                <Text className="text-2xl font-bold mb-4 text-center">Login</Text>

                <View className="w-full mb-4">
                    <Text className="text-gray-700 mb-1">Email</Text>
                    <TextInput
                        className="border border-gray-300 rounded px-4 py-2"
                        placeholder="Enter your email"
                        value={emailOrPhone}
                        onChangeText={setEmailOrPhone}
                    />
                </View>

                <View className="w-full mb-4">
                    <Text className="text-gray-700 mb-1">Password</Text>
                    <TextInput
                        className="border border-gray-300 rounded px-4 py-2"
                        placeholder="Enter your password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity
                    style={{marginBottom: 20}}
                    className="bg-emerald-400 px-4 py-2 rounded"
                    onPress={onLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff"/>
                    ) : (
                        <Text className="text-white text-center">Login</Text>
                    )}
                </TouchableOpacity>

                <Text className="text-center mb-4">-----Or login with-----</Text>

                <TouchableOpacity
                    className="bg-emerald-400 px-4 py-2 rounded flex-row items-center justify-center"
                    onPress={handleGoogleLogin}
                >
                    <Image
                        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png'}}
                        style={{width: 20, height: 20, marginRight: 8}}
                    />
                    <Text className="text-white">Login with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-emerald-400 px-4 py-2 rounded flex-row items-center justify-center"
                    style={{marginTop: 5}}
                    onPress={handlePhoneLogin}
                >
                    <Text className="text-white">Login with Phone Number</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16}}>
                    <Text className="text-center" style={{lineHeight: 24}}>
                        Don't have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={handleRegister}>
                        <Text className="text-blue-500" style={{lineHeight: 24}}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}
