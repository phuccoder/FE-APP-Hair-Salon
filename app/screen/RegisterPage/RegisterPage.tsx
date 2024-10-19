import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type RootStackParamList = {
    LoginPage: undefined;
    Home: undefined;
    RegisterPage: undefined;
  };

export default function RegisterPage() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'RegisterPage'>>();

    //   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: 'YOUR_WEB_CLIENT_ID',
//       offlineAccess: true,
//     });
//   }, []);

  const handleSubmit = async () => {
    if (fullname && email && username && password && confirmPassword) {
      if (password === confirmPassword) {
        Alert.alert('Register', `Fullname: ${fullname}\nEmail: ${email}\nUsername: ${username}`, [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      } else {
        Alert.alert('Error', 'Passwords do not match');
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  const handleGoogleRegister = async () => {
    try {
      
    } catch {
      
    }
  };

  const handlePhoneRegister = () => {
    Alert.alert('Phone Register', 'Register with Phone Number is clicked');
  };

  const handleLogin = () => {
    navigation.push('LoginPage');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://www.revealhairstudiorye.com/wp-content/uploads/2021/01/Untitled-design.jpg' }} 
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View className="bg-white p-6 rounded-lg w-4/5">
        <Text className="text-2xl font-bold mb-4">Register</Text>

        <View className="w-full mb-4">
          <Text className="text-gray-700 mb-1">Fullname</Text>
          <TextInput
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Enter your fullname"
            value={fullname}
            onChangeText={setFullname}
          />
        </View>

        <View className="w-full mb-4">
          <Text className="text-gray-700 mb-1">Email</Text>
          <TextInput
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
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
        </View>

        <TouchableOpacity
          style={{ marginBottom: 20 }} 
          className="bg-emerald-400 px-4 py-2 rounded"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center">Register</Text>
        </TouchableOpacity>

        <Text className="text-center mb-4">-----Or register with-----</Text>

        <TouchableOpacity
          className="bg-emerald-400 px-4 py-2 rounded flex-row items-center justify-center" 
          onPress={handleGoogleRegister}
        >
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' }} 
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          <Text className="text-white">Register with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-emerald-400 px-4 py-2 rounded flex-row items-center justify-center" 
          style={{ marginTop: 5 }}
          onPress={handlePhoneRegister}
        >
          <Text className="text-white">Register with Phone Number</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
          <Text className="text-center" style={{ lineHeight: 24 }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text className="text-blue-500" style={{ lineHeight: 24 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
