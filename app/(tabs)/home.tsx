import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Animated, Easing, Switch } from 'react-native';
import moment from 'moment-timezone';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Fontisto } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '@/assets/theme/themeContext';

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

const Homescreen = () => {

  // Replace 'USERNAME' with your state variable or prop
  const username = 'Taylor';
  const completeQuest = false; 
  const questImage = require('../../assets/cherryblossom.png');
  // Current and longest streak as placeholders, replace with state/logic
  const currentStreak = 17;
  const longestStreak = 21;
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

  const completeText = () => {
    return completeQuest ? 'Completed' : 'Not Completed';
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

const theme = useContext(themeContext)
const [darkMode, setDarkMode] = useState(false)
  return (

    <ScrollView style={[styles.container, {backgroundColor: theme.backgroundHome }]}>
      {/* Header Section */}

      <View style = {styles.toggle}>
      <Text style = {styles.text}>Color Blindness Friendly Mode</Text>
      <Switch
          value = {darkMode}   
          onValueChange ={(value) => {
           
          setDarkMode(value);
          EventRegister.emit('ChangeTheme', value)
     }}
      />
      </View>



      <View style={[styles.header, {backgroundColor: theme.background}]}>
        <Text style={[styles.headerText, {color: theme.color}]}><Fontisto name="day-cloudy" size={24} color = {theme.color} /> Hello, {username}! <Fontisto name="day-cloudy" size={24} color = {theme.color} /> </Text>
      </View>

      {/* Quest Card Section */}
      <View style={[styles.questCard, {backgroundColor: theme.background}]}>
        <Image source={questImage} style={styles.questImage}/>
        <Text style={[styles.questTitle , {color: theme.color}]}>TODAY'S QUEST:</Text>
        <Text style={[styles.questName, {color: theme.snapColor}]}>"Step outside and snap a photo of the stunning cherry blossoms in bloom!"</Text>
        <Text style={[styles.questStatus, {color: theme.completeColor}]}>{completeText()}!</Text>
        <Text style={[styles.dueDateTime, {color: theme.timeColor}]}>Upload your photo by {dueDateTime.format('MMMM Do, YYYY [at] h:mm A z')} to maintain your streak</Text>
        <View style={styles.timeRemainingContainer}>
          <Animated.View style={[styles.hourglassIcon, { transform: [{ rotate: spinAnimation }] }]}>
            <Icon name="hourglass" size={20} color="#666666" />
          </Animated.View>
          <Text style={[styles.timeRemaining, {color: theme.timeColor}]}>Time Remaining:  {timeRemaining.hours} hours {timeRemaining.minutes} minutes</Text>
        </View>
      </View>

      {/* Streak Section */}
      <View style={[styles.streakSection, {backgroundColor: theme.background}]}>
        <Text style={[styles.streakTitle1, {color: theme.streakColor}]}>WELLNESS CHALLENGE</Text>
        <Text style={[styles.streakTitle2, {color: theme.streakColor}]}>You can do this!</Text>
        <View style={styles.streakInfo}>
          <Text style={[styles.streakText, {color: theme.timeColor}]}>Current Streak: {currentStreak} days</Text>
          <Text style={[styles.streakText, {color: theme.timeColor}]}>Longest Streak: {longestStreak} days</Text>
          <MyProgressBar progress={progress} />
        </View>
      </View>

      {/* Additional components will go here */}
    </ScrollView>
  )
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFC0CB', //pink color
  },
  header: {
    marginTop: 20,
    padding: 16,
    // backgroundColor: '#FFFFFF', // white colour
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: '#D1D1D1', // Light gray border color
  },
  headerText: {
    fontSize: 50,
    fontFamily: 'cursive-font',
    // fontWeight: 'bold',
    // marginTop: 15,
    color: '#333333', // dark gray color for text
  },
  questCard: {
    marginHorizontal: 16,
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#F7FFF7', // Card background color
    shadowColor: '#000000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
    alignItems: 'center',
  },

  questImage: {
    width: 300, // Set the width of the image
    height: 200, // Set the height of the image
    borderRadius: 0, // Optional: if you want the image to be round
    marginBottom: 16, // Add some space between the image and the title text
  },

  questTitle: {
    fontSize: 23,
    color: '#333333', // dark gray colour
    marginBottom: 8,
    fontWeight: 'bold',
    
    
  },

  questName: {
    fontSize: 20,
    marginTop: 10, 
    marginBottom: 10, 
    // fontWeight: 'bold',
    fontFamily: "margarsa", 
    // color: '#1A535C', // Darker shade of green for the quest name
  },
  questStatus: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    // color: '#FF6B6B', // Adjust as needed, this is usually a highlight color
  },
  dueDateTime: {
    marginTop: 8,
    fontSize: 16,
    fontStyle: 'italic',
    // color: '#666666',
  },
  timeRemainingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  timeRemaining: {
    marginLeft: 8,
    fontSize: 16,
    fontStyle: 'italic',
    // color: '#666666',
  },
  hourglassIcon: {
    marginRight: 5,
  },
  streakSection: {
    marginTop: 20,
    padding: 20,
    marginHorizontal: 16,
    // backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  streakTitle1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A535C',
    marginBottom: 10,
  },

  streakTitle2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A535C',
    marginBottom: 10,
  },

  streakInfo: {
    alignSelf: 'stretch', // Stretch to the width of the parent
    alignItems: 'center',
  },
  streakText: {
    fontSize: 16,
    // color: '#333333',
    marginBottom: 4,
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

  toggle:{
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align items vertically
    justifyContent: 'space-between', // Space items evenly along the main axis
    paddingHorizontal: 10, // Add padding horizontally
    paddingVertical: 5, // Add padding vertically
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
   
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 0, // Add margin to separate Text and Switch
    marginLeft: "30%", 
  },


});

export default Homescreen;
