import {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Alert, Image, ImageBackground, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {authServices} from "@/service/authServices";
import {Subscription} from "rxjs";

type RootStackParamList = {
    LoginPage: undefined;
    Home: undefined;
    RegisterPage: undefined;
};

export default function RegisterPage() {
    // IMPORTANT: When subscribing to a subscription, we need to store the subscription in a ref to prevent memory leaks
    const subscriptionsRef = useRef<Subscription[]>([]);
    useEffect(() => {
        return (): void => {
            subscriptionsRef.current.forEach((subscription: Subscription): void => subscription.unsubscribe());
            subscriptionsRef.current = [];
        };
    }, []);
    // end of note
    // form fields
    const [mandatoryError, setMandatoryError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false);
    const phoneInput = useRef<TextInput>(null);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'RegisterPage'>>();
    const validateEmail = (email: string): boolean => {
        // TODO: choose the correct email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validatePhone = (phone: string): boolean => {
        // TODO: choose the correct phone number regex
        const phoneRegex = /(0[0-9]{9})/;
        return phoneRegex.test(phone);
    }
    const [loading, setLoading] = useState(false);

    const onSignUp = (): void => {
        // validate
        if (email && phoneNumber && email && username && password && confirmPassword) {
            if (!validateEmail(email)) {
                setEmailError('Please enter a valid email.');
                return;
            }
            if (!validatePhone(phoneNumber)) {
                setPhoneError('Please enter a valid phone number.');
                return;
            }
            if (password !== confirmPassword) {
                setPasswordError('Password and confirm password do not match.');
                return;
            }
        } else {
            setMandatoryError('Please fill in all fields');
            return;
        }
        setEmailError('');
        setPasswordError('');
        setMandatoryError('');
        setLoading(true);
        subscriptionsRef.current.push(
            authServices
                .signUp({
                    accountName: username,
                    accountEmail: email,
                    accountPhone: '',
                    password: password,
                    confirmPassword: confirmPassword
                })
                .subscribe({
                    next: (): void => {
                        setPhoneNumber('');
                        setEmail('');
                        setUsername('');
                        setPassword('');
                        setConfirmPassword('');
                        setLoading(false);
                        Alert.alert('Success', 'Register successfully, please check your mail to verify your account');
                        navigation.push('LoginPage');
                    },
                    error: (): void => {
                        setLoading(false);
                        Alert.alert('Error', 'Register failed');
                    }
                })
        );
    }

    const handleGoogleRegister = async () => {
        try {

        } catch {

        }
    };

    const handlePhoneRegister = () => {
        setIsPhoneModalVisible(true);
        // Focus vào input khi modal mở
        setTimeout(() => {
            phoneInput.current?.focus();
        }, 100); // Delay một chút để đảm bảo modal đã hiển thị trước khi focus
    };

    const handleLogin = () => {
        navigation.push('LoginPage');
    };

    return (
        <ImageBackground
            source={{uri: 'https://www.revealhairstudiorye.com/wp-content/uploads/2021/01/Untitled-design.jpg'}}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
            <View className="bg-white p-6 rounded-lg w-4/5">
                <Text className="text-2xl font-bold mb-4">Register</Text>

                {mandatoryError ? (
                    <Text className="text-red-500">{mandatoryError}</Text>
                ) : null}

                <View className="w-full mb-4">
                    <Text className="text-gray-700 mb-1">Phone Number</Text>
                    <TextInput
                        className="border border-gray-300 rounded px-4 py-2"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    {phoneError ? (
                        <Text className="text-red-500">{phoneError}</Text>
                    ) : null}
                </View>

                <View className="w-full mb-4">
                    <Text className="text-gray-700 mb-1">Email</Text>
                    <TextInput
                        className="border border-gray-300 rounded px-4 py-2"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    {emailError ? (
                        <Text className="text-red-500">{emailError}</Text>
                    ) : null}
                </View>

                <View className="w-full mb-4">
                    <Text className="text-gray-700 mb-1">Username</Text>
                    <TextInput
                        className="border border-gray-300 rounded px-4 py-2"
                        placeholder="Enter your username"
                        value={username}
                        onChangeText={setUsername}
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
                    {passwordError ? (
                        <Text className="text-red-500">{passwordError}</Text>
                    ) : null}
                </View>

                <View className="w-full mb-4">
                    <Text className="text-gray-700 mb-1">Confirm Password</Text>
                    <TextInput
                        className="border border-gray-300 rounded px-4 py-2"
                        placeholder="Enter your confirm password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    {passwordError ? (
                        <Text className="text-red-500">{passwordError}</Text>
                    ) : null}
                </View>

                <TouchableOpacity
                    style={{marginBottom: 20, backgroundColor: '#ff4d4d'}}
                    className=" px-4 py-2 rounded"
                    onPress={onSignUp}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff"/>
                    ) : (
                        <Text className="text-white text-center">Register</Text>
                    )}
                </TouchableOpacity>

                <Text className="text-center mb-4">-----Or register with-----</Text>

                <TouchableOpacity
                    className=" px-4 py-2 rounded flex-row items-center justify-center"
                    style={{marginTop: 5, backgroundColor: '#ff4d4d'}}
                    onPress={handlePhoneRegister}
                >
                    <Text className="text-white">Register with Phone Number</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16}}>
                    <Text className="text-center" style={{lineHeight: 24}}>
                        Already have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={{ color: '#ff4d4d', lineHeight: 24 }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {isPhoneModalVisible && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View className="bg-white p-6 rounded-lg w-4/5">
                        <Text className="text-2xl font-bold mb-4 text-center">Enter Phone Number</Text>
                        <TextInput
                            ref={phoneInput}
                            className="border border-gray-300 rounded px-4 py-2 mb-4"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                        <TouchableOpacity
                            style={{backgroundColor: '#ff4d4d'}}
                            className=" px-4 py-2 rounded"
                            onPress={() => {
                                setIsPhoneModalVisible(false);
                                // Xử lý đăng ký với số điện thoại ở đây
                                // Ví dụ: gọi API đăng ký hoặc chuyển trang
                                navigation.push('Home');
                            }}
                        >
                            <Text className="text-white text-center">Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-gray-300 px-4 py-2 rounded mt-2"
                            onPress={() => setIsPhoneModalVisible(false)}
                        >
                            <Text className="text-center">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ImageBackground>
    );
}
