import React, { useState, useEffect, useContext } from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';
import theme from 'assets/theme/theme';
import themeContext from 'assets/theme/themeContext';
import { FontAwesome6 } from '@expo/vector-icons';


const Main = ({ navigation }: any) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setDarkMode(data);
    });

    return () => {
      EventRegister.removeAllListeners();
    };
  }, [darkMode]);

  return (
    <themeContext.Provider value={darkMode ? theme.dark : theme.light}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: darkMode ? theme.dark.navButton : theme.light.navButton,
          tabBarActiveBackgroundColor: darkMode ? theme.dark.navColor : theme.light.navColor,
          tabBarInactiveBackgroundColor: darkMode ? theme.dark.navColor : theme.light.navColor,
          tabBarLabelStyle: {
            fontFamily: 'inter-semi-bold',
          },
          tabBarStyle: {
            borderTopWidth: darkMode ? 0 : 0.5,
            borderTopColor: "#F7CE5B", 
          },
        }}
        
      >
        {/* Home tab */}
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: 'Home',
            title: 'Home',
            headerShown: false, 
            tabBarIcon: ({ color, size }) => <AntDesign name="home" size={24} color={color} />,
          }}
        />
        {/* Ranking tab */}
        <Tabs.Screen
          name="ranking"
          options={{
            tabBarLabel: 'Ranking',
            title: 'Ranking',
            headerShown: false, 
            tabBarIcon: ({ color, size }) => <FontAwesome6 name="ranking-star" size={24} color={color} />,
          }}
        />
        {/* Upload tab */}
        <Tabs.Screen
          name="upload"
          options={{
            tabBarLabel: 'Upload',
            headerShown: false, 
            title: 'Upload Image',
            tabBarIcon: ({ color, size }) => <MaterialIcons name="add-a-photo" size={24} color={color} />,
          }}
        />
        {/* Other Users tab */}
        <Tabs.Screen
          name="following"
          options={{
            tabBarLabel: 'Other Users',
            headerShown: false, 
            title: 'Other Users',
            tabBarIcon: ({ color, size }) => <FontAwesome name="users" size={24} color={color} />,
          }}
        />
        {/* My Profile tab */}
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'My Profile',
            headerShown: false, 
            title: 'Profile',
            tabBarIcon: ({ color, size }) => <AntDesign name="profile" size={24} color={color} />,
          }}
        />
      </Tabs>
    </themeContext.Provider>
  );
};

export default Main;
