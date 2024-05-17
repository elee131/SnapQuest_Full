import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@/components/Login';
import CreateAccountScreen from '@/components/CreateAccount';
import ProfileScreen from '@/components/Profile';
const Stack = createStackNavigator();

const Page = () => {
  return (
    <NavigationContainer independent = {true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="CreateAccount" options={{ headerShown: false }} component={CreateAccountScreen} />
        <Stack.Screen name="Profile" options={{ headerShown: false }}  component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Page;
