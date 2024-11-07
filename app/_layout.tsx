import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import '../styles/global.css';
import { ThemeProvider } from 'react-native-elements';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginStack from './stack/LoginPageStack/LoginStack';
import Tabs from './(tabs)/_layout';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync();
    };

    hideSplashScreen();
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}
        >
          <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='LoginStack'>
              <Stack.Screen
                name='LoginStack'
                component={LoginStack}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='(tabs)'
                options={{ headerShown: false }}
                component={Tabs}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
