import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, Animated, Easing } from 'react-native';
import { images } from '@/assets/data/images';
import { profile } from '@/assets/data/images';
import moment from 'moment-timezone';
import Icon from 'react-native-vector-icons/FontAwesome';

// Define an interface for the props
interface MyProgressBarProps {
  progress: number; // Define the type of the 'progress' prop
}

// Use the interface for the component's props
const MyProgressBar: React.FC<MyProgressBarProps> = ({ progress }) => {
  const progressBarWidth = progress * 100; // Assuming progress is between 0 and 1
  return (
    <View style={styles.progressBarBackground}>
      <View style={[styles.progressBarFill, { width: `${progressBarWidth}%` }]} />
    </View>
  );
};

const ProfileScreen = () => {
  const userName = 'Taylor Doe'; // Replace 'John Doe' with the actual user's name
  const currentStreak = 17; // Replace with the actual current streak
  const longestStreak = 21; // Replace with the actual longest streak
  const progress = currentStreak / longestStreak; // Progress bar value

  // Set due date and time
  const dueDateTime = moment.tz("2024-04-07T23:59:00", "America/Los_Angeles");

  // Calculate time remaining
  const calculateTimeRemaining = () => {
    const now = moment();
    const duration = moment.duration(dueDateTime.diff(now));
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes() % 60);
    return { hours, minutes };
  };

  // State to hold the time remaining
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  // Animated value for rotation
  const [spin] = useState(new Animated.Value(0));

  // Function to start rotation animation
  const startAnimation = () => {
    Animated.loop(
      Animated.timing(
        spin,
        {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    ).start();
  };

  // Update time remaining every minute
  useEffect(() => {
    startAnimation(); // Start the rotation animation
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Interpolate animated value for rotation
  const spinAnimation = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const rewards = 105; 

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={profile} style={styles.profileImage} />
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.streakText}>
            Current Streak: {currentStreak} days | Longest Streak: {longestStreak} days
          </Text>
          <Text style={styles.streakText}>
            Current Rewards: {rewards} Points
          </Text>
        </View>



        <Text style={styles.header}>
          Pictures you have taken:
        </Text>
        <View style={styles.imagesContainer}>
          {images.map((image, index) => (
            <View style={styles.picHolder} key={index}>
              <Image source={image.img} style={styles.image} />
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
  userName: {
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
