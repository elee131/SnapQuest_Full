import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginNavigation from "../../components/LoginNavigation";
import Main from "../../components/main";
import { useUser } from "../../context/UserContext";

const Stack = createStackNavigator();

const Layout = () => {
  const { userUID } = useUser();
  const [initialRouteName, setInitialRouteName] = useState<
    "LoginNavigation" | "Main"
  >(userUID ? "Main" : "LoginNavigation");

  useEffect(() => {
    setInitialRouteName(userUID ? "Main" : "LoginNavigation");
  }, [userUID]);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="LoginNavigation"
          component={LoginNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
