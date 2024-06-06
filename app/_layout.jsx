import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { UserProvider } from 'context/UserContext'; // Correct import statement



export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'inter-black': require('../assets/fonts/Inter-Black.ttf'),
    'inter-bold': require('../assets/fonts/Inter-Bold.ttf'),
    'inter-extra-bold': require('../assets/fonts/Inter-ExtraBold.ttf'),
    'inter-semi-bold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'inter-extra-light': require('../assets/fonts/Inter-ExtraLight.ttf'),
    'inter-light': require('../assets/fonts/Inter-Light.ttf'),
    'inter-thin': require('../assets/fonts/Inter-Thin.ttf'),
    'inter-medium': require('../assets/fonts/Inter-Medium.ttf'),
    'inter': require('../assets/fonts/Inter-Regular.ttf'),
    



  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider> 
      <RootLayoutNav />
    </UserProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
