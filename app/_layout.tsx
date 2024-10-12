import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "../styles/global.css";
import { ThemeProvider } from 'react-native-elements';
import { SafeAreaView, Platform, StatusBar } from 'react-native'; // Import SafeAreaView and Platform utilities

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaView 
        style={{ 
          flex: 1, 
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
        }}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaView>
    </ThemeProvider>
  );
}
