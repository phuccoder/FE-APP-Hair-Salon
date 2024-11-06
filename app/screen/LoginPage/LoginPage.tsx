import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { authServices } from '@/service/authServices';
import { Subscription } from 'rxjs';

type RootStackParamList = {
  LoginPage: undefined;
  Home: undefined;
  RegisterPage: undefined;
  '(tabs)': undefined;
};

export default function LoginPage() {
  const subscriptionsRef = useRef<Subscription[]>([]);
  const [loading, setLoading] = useState(true); // Initialize loading state to true
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'LoginPage'>>();

  useEffect(() => {
    const checkToken = () => {
      subscriptionsRef.current.push(
        authServices.extractToken().subscribe({
          next: (token) => {
            if (token) {
              navigation.replace('(tabs)');
            } else {
              setLoading(false); // Set loading to false if no token is found
            }
          },
          error: () => {
            console.log('No valid token found, stay on login page');
            setLoading(false); // Set loading to false if an error occurs
          },
        })
      );
    };
    checkToken();
    return (): void => {
      subscriptionsRef.current.forEach((subscription: Subscription): void =>
        subscription.unsubscribe()
      );
      subscriptionsRef.current = [];
    };
  }, [navigation]);

  const onLogin = (): void => {
    setLoading(true);
    subscriptionsRef.current.push(
      authServices
        .signIn({
          emailOrPhone: emailOrPhone,
          password: password,
        })
        .subscribe({
          next: (): void => {
            setEmailOrPhone('');
            setPassword('');
            setLoading(false);
            navigation.push('(tabs)');
          },
          error: (): void => {
            setLoading(false);
            Alert.alert('Error', 'Invalid email or password');
          },
        })
    );
  };

  const handleGoogleLogin = async () => {
    Alert.alert('Google Login', 'Login with Google is clicked');
  };

  const handlePhoneLogin = () => {
    setPhoneModalVisible(true);
  };

  const handlePhoneSubmit = () => {
    setPhoneModalVisible(false);
    Alert.alert('Phone Login', `Logged in with phone number: ${phoneNumber}`);
    setPhoneNumber('');
    navigation.push('Home');
  };

  const handleRegister = () => {
    navigation.push('RegisterPage');
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://www.revealhairstudiorye.com/wp-content/uploads/2021/01/Untitled-design.jpg',
      }}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View className='bg-white p-6 rounded-lg w-4/5'>
        <Text className='text-2xl font-bold mb-4 text-center'>Login</Text>

        <View className='w-full mb-4'>
          <Text className='text-gray-700 mb-1'>Email</Text>
          <TextInput
            className='border border-gray-300 rounded px-4 py-2'
            placeholder='Enter your email'
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
          />
        </View>

        <View className='w-full mb-4'>
          <Text className='text-gray-700 mb-1'>Password</Text>
          <TextInput
            className='border border-gray-300 rounded px-4 py-2'
            placeholder='Enter your password'
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={{ backgroundColor: '#ff4d4d', marginBottom: 20 }}
          className='px-4 py-2 rounded'
          onPress={onLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color='#fff' />
          ) : (
            <Text className='text-white text-center'>Login</Text>
          )}
        </TouchableOpacity>

        <Text className='text-center mb-4'>-----Or login with-----</Text>

        <TouchableOpacity
          className=' px-4 py-2 rounded flex-row items-center justify-center'
          style={{ backgroundColor: '#ff4d4d', marginTop: 5 }}
          onPress={handlePhoneLogin}
        >
          <Text className='text-white'>Login with Phone Number</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16,
          }}
        >
          <Text className='text-center' style={{ lineHeight: 24 }}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={{ color: '#ff4d4d', lineHeight: 24 }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={phoneModalVisible}
        onRequestClose={() => setPhoneModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View className='bg-white p-6 rounded-lg w-4/5'>
            <Text className='text-2xl font-bold mb-4 text-center'>
              Enter Phone Number
            </Text>
            <TextInput
              className='border border-gray-300 rounded px-4 py-2 mb-4'
              placeholder='Enter your phone number'
              keyboardType='phone-pad'
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TouchableOpacity
              style={{ backgroundColor: '#ff4d4d' }}
              className=' px-4 py-2 rounded'
              onPress={handlePhoneSubmit}
            >
              <Text className='text-white text-center'>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='mt-2'
              onPress={() => setPhoneModalVisible(false)}
            >
              <Text className='text-center text-blue-500'>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
