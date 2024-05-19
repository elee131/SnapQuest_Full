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
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'cute-font': require('../assets/fonts/ScholarlyAmbitionRegular.ttf'), 
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
    'cursive-font': require('../assets/fonts/CelosiaGolden.ttf'),
    'margarsa': require('../assets/fonts/Maragsa.ttf'),
    'aven': require('../assets/fonts/Aven.ttf'),
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
    <UserProvider> {/* Provide the UserContext */}
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
