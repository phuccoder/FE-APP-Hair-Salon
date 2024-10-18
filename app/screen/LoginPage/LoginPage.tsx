import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

//   useEffect (()=>{
// GoogleSignin.configure ({
//   webClientId: "YOUR_WEB_CLIENT_ID",
//   offlineAccess: true,
// });
//   }, []);

  const handleSubmit = () => {
    if (username && password) {
      Alert.alert('Login', `Username: ${username}\nPassword: ${password}`);
    } else {
      Alert.alert('Error', 'Please enter both username and password');
    }
  };

  const handleGoogleLogin = async() => {
    try{
      
    }
    catch{
      
    }
  };
  const handlePhoneLogin = () => {
    Alert.alert('Phone Login', 'Login with Phone Number is clicked');
    
  };
  const handleRegister = () => {
    Alert.alert('Register', 'Redirecting to registration page');
   
  };


  return (
    <ImageBackground
      source={{ uri: 'https://www.revealhairstudiorye.com/wp-content/uploads/2021/01/Untitled-design.jpg' }} 
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View className="bg-white p-6 rounded-lg w-4/5">
        <Text className="text-2xl font-bold mb-4">Login</Text>

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

        <TouchableOpacity
          style={{ marginBottom: 20 }} 
          className="bg-emerald-400 px-4 py-2 rounded"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center">Login</Text>
        </TouchableOpacity>

        <Text className="text-center mb-4">-----Or login with-----</Text>

        <TouchableOpacity
          className="bg-emerald-400 px-4 py-2 rounded flex-row items-center justify-center" 
          onPress={handleGoogleLogin}
        >
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' }} 
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          <Text className="text-white">Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-emerald-400 px-4 py-2 rounded flex-row items-center justify-center" 
          style={{ marginTop: 5 }}
          onPress={handlePhoneLogin}
        >
          <Text className="text-white">Login with Phone Number</Text>
        </TouchableOpacity>
        <Text className="text-center mt-4" style={{ lineHeight: 24 }}>
          Don't have an account?{' '}
          <TouchableOpacity onPress={handleRegister}>
            <Text className="text-blue-500" style={{ lineHeight: 20 }}>Register</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </ImageBackground>
  );
}
