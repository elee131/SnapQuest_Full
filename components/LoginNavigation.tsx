import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "@/components/Login";
import Main from "./Main";
import Profile from "@/app/(tabs)/index";
import CreateAccountScreen from "@/components/CreateAccount";

import { useUser } from "../context/UserContext";
const Stack = createStackNavigator();

const LoginNavigation = () => {
  const { userUID } = useUser();
  const [initialRouteName, setInitialRouteName] = useState(
    userUID ? "Main" : "Login"
  );

  useEffect(() => {
    setInitialRouteName(userUID ? "Main" : "Login");
  }, [userUID]);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="CreateAccount"
          options={{ headerShown: false }}
          component={CreateAccountScreen}
        />
        <Stack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={Profile}
        />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={Main}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigation;
