import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { profile } from '@/assets/data/images';
import { useUser } from '../context/UserContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  const { username, currStreak, longestStreak, profilePic, point, images, setProfilePic } = useUser();
  const [showPictures, setPictures] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: profilePic || profile }} style={styles.profileImage} />
          <TouchableOpacity onPress={pickImage} style={styles.editIconContainer}>
            <Image source={require('../assets/images/edit.png')} style={styles.editImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileText}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.streakText}>
            Current Streak: {currStreak} days | Longest Streak: {longestStreak} days
          </Text>
          <Text style={styles.rewardsText}>
            Current Rewards: 
            <MaterialCommunityIcons name="crown-outline" size={24} color="gold" style={{ marginLeft: 3, marginRight: 3 }} />
            {point} Points 
            <MaterialCommunityIcons name="crown-outline" size={24} color="gold" style={{ marginLeft: 3 }} />
          </Text>
        </View>
        
        {showPictures ? (
          <>
            <TouchableOpacity onPress={() => setPictures(false)}>
              <Image source={require('../assets/images/openImage.png')} style={styles.imageIcon} />
              <Text style={styles.buttonfont}>Hide Pictures</Text>
            </TouchableOpacity>

            <View style={styles.imagesContainer}>
              {images.map((image, index) => (
                <View style={styles.picHolder} key={index}>
                  <Image source={{ uri: image }} style={styles.image} />
                </View>
              ))}
            </View>
          </>
        ) : (
          <TouchableOpacity onPress={() => setPictures(true)}>
            <Image source={require('../assets/images/showImage.png')} style={styles.imageIcon} />
            <Text style={styles.buttonfont}>Show Pictures</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '15%',
    position: 'relative', 
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65, 
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: "25%", 
  },
  editImage: {
    width: 30,
    height: 30,
  },
  profileText: {
    alignItems: 'center', 
  },
  username: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  streakText: {
    marginTop: 5,
    fontSize: 16,
    color: 'gray',
  },
  rewardsText: {
    marginTop: 15,
    fontSize: 20,
    fontFamily: 'CelosiaGolden',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  picHolder: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  buttonfont: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageIcon: {
    marginTop: 0,
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
});

export default ProfileScreen;
