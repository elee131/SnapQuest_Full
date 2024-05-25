import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, Animated, Easing } from 'react-native';
import { profile } from '@/assets/data/images';
import { useUser } from '../context/UserContext';


const ProfileScreen = () => {
  const { userUID, username, email, currStreak, longestStreak, profilePic, point, images  } = useUser();

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.profileContainer}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.profileImage} />
        ) : (
          <Image source={profile} style={styles.profileImage} />
        )}
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.streakText}>
            Current Streak: {currStreak} days | Longest Streak: {longestStreak} days
          </Text>
          <Text style={styles.streakText}>
            Current Rewards: {point} Points
          </Text>
        </View>
        <Text style={styles.header}>
          Pictures you have taken:
        </Text>
        <View style={styles.imagesContainer}>
          {images.map((image, index) => (
            <View style={styles.picHolder} key={index}>
              <Image source={{uri: image}} style={styles.image} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: "5%", 
    marginBottom: "15%",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
  header: {
    fontSize: 25,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontFamily: "cute-font",
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10, // Add padding to the sides of the images container
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
    borderRadius: 10,
  },
  textfont: {
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    width: '100%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginTop: 10, // Add margin to the top of the progress bar
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1A535C',
    borderRadius: 10,
  },
});

export default ProfileScreen;
