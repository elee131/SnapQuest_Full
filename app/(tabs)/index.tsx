import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  Switch
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { profile } from "@/assets/data/images";
import { useUser } from "../../context/UserContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Gallery from "@/components/Gallery";
import themeContext from '@/assets/theme/themeContext';
import { EventRegister } from 'react-native-event-listeners';

const Index = () => {
  const theme = useContext(themeContext)
  const [darkMode, setDarkMode] = useState(false)

  const {
    username,
    currStreak,
    longestStreak,
    profilePic,
    point,
    setProfilePic,
    setUserUID,
  } = useUser();
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    navigation.navigate("Login");
    setUserUID(null);
  };

  const handleVerification = () => {
    Alert.alert("Verification Required", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Canceled"),
        style: "cancel",
      },
      { text: "Logout", onPress: () => handleLogout() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleVerification}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <View style = {styles.toggle}>
      <Text style = {styles.text}>Dark Mode</Text>
      <Switch
          value = {darkMode}   
          onValueChange ={(value) => {
           
          setDarkMode(value);
          EventRegister.emit('ChangeTheme', value)
     }}
      />
      </View>


      <View style = {styles.topHalf}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: profilePic || profile }}
            style={styles.profileImage}
          />
          <TouchableOpacity onPress={pickImage} style={styles.editIconContainer}>
            <Image
              source={require("../../assets/images/edit.png")}
              style={styles.editImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.profileText}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.streakText}>
            Current Streak: {currStreak} days
            {'\n'}
            Longest Streak: {longestStreak} days
          </Text>
          </View>
          </View>
          <View style={styles.rewardsContainer}>
            <Text style={styles.rewardsText}>Current Rewards:</Text>

            <Text style={{ marginBottom: 10, fontFamily: "inter-bold", fontSize: 20}}>
              <MaterialCommunityIcons
                name="crown-outline"
                size={28}
                color="gold"
                style={{ marginLeft: 3, marginRight: 3 }}
              />
              {point} Points
              <MaterialCommunityIcons
                name="crown-outline"
                size={28}
                color="gold"
                style={{ marginLeft: 3 }}
              />
            </Text>
          </View>
  
       
        <Gallery />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF8F0",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
    marginTop: "10%", 
  },
  profileContainer: {
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "2%",
    position: "relative",
  },
  topHalf: {
    marginTop: "8%", 
    marginHorizontal: "5%",
    borderColor: "#FFF8F0",
    borderWidth: 3, 
    paddingBottom: "5%", 
    elevation: 5,
    borderRadius: 65, 
    backgroundColor: "white", 
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#FFF8F0", 
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: "25%",
  },
  editImage: {
    width: 30,
    height: 30,
    marginLeft: "70%",
  },
  profileText: {
    alignItems: "center",
  },
  username: {
    marginTop: 0,
    fontSize: 20,
    fontFamily: "inter-bold",
    marginBottom: 10,
  },
  streakText: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 18,
    color: "gray",
    fontFamily: "inter-semi-bold",
  },
  rewardsContainer: {
    backgroundColor: "#fff",
    width: "80%",
    alignItems: "center",
    paddingBottom:"5%",
    paddingTop: "5%", 
    marginTop: "5%",
    borderRadius:  60,
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 3, 
    borderColor: "#FFF8F0", 
    elevation: 5, 
  },
  rewardsText: {
    fontSize: 20,
    fontFamily: "inter-extra-bold",
    textAlign: "center",
  },
  buttonfont: {
    fontSize: 12,
    fontFamily: "inter-bold",
    textAlign: "center",
  },
  imageIcon: {
    marginTop: 10,
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  logoutButton: {
    position: "absolute",
    top: 0,
    right: 20,
    backgroundColor: "#F7CE5B",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  toggle:{
    flexDirection: 'row', 
    position: "absolute",
    alignItems: 'center', 
    top: 0,
    left: 20,
    paddingBottom: 100, 
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: "inter-bold",
    marginRight: "4%", 
  },
});

export default Index;
