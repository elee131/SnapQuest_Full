import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Animated} from 'react-native';
import themeContext from '@/assets/theme/themeContext';
import { useUser } from "../../context/UserContext";


const Homescreen = () => {

  const {
    username,
    currStreak,
    longestStreak,
    completedDaily,
  } = useUser();

  const questImage = require('../../assets/cherryblossom.png');

  const completeText = () => {
    return completedDaily ? 'Completed' : 'Not Completed';
  };

const theme = useContext(themeContext)
  return (

    <ScrollView style={[styles.container, {backgroundColor: theme.background}]} >
          <View style={[styles.secondContainer, ]}>
      {/* Header Section */}
      <View style={[styles.header, {backgroundColor: theme.content}]}>
        <Text style={[styles.headerText, {color: theme.color}]}> Hello, {username}!</Text>
      </View>

      {/* Quest Card Section */}
      <View style={[styles.questCard, {backgroundColor: theme.content}]}>
        <Image source={questImage} style={styles.questImage}/>
        <Text style={[styles.questTitle , {color: theme.color}]}>TODAY'S QUEST:</Text>
        <Text style={[styles.questName, {color: theme.color}]}>"Step outside and snap a photo of the stunning cherry blossoms in bloom!"</Text>
        <Text style={[styles.questStatus, {color: theme.color}]}>{completeText()}!</Text>
      </View>

      {/* Streak Section */}
      <View style={[styles.streakSection, {backgroundColor: theme.content}]}>
        <Text style={[styles.streakTitle1, {color: theme.color}]}>WELLNESS CHALLENGE</Text>
        <Text style={[styles.streakTitle2, {color: theme.color}]}>You can do this!</Text>
        <View style={styles.streakInfo}>
          <Text style={[styles.streakText, {color: theme.color}]}>Current Streak: {currStreak} days</Text>
          <Text style={[styles.streakText, {color: theme.color}]}>Longest Streak: {longestStreak} days</Text>
        </View>
      </View>
      {/* Additional components will go here */}
      </View>
    </ScrollView>
 
  )
};




const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  secondContainer: {
    marginTop: "15%", 
    marginBottom: "5%"

  }, 
  header: {
    marginTop: 20,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: "5%", 
    borderRadius: 10, 
    shadowColor: '#000000', // For iOS shadow
    elevation: 5, // For Android shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerText: {
    fontSize: 38,
    fontFamily: 'inter-bold',
  },
  questCard: {
    marginHorizontal: 16,
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000000', // For iOS shadow
    elevation: 5, // For Android shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
  },

  questImage: {
    width: 300, // Set the width of the image
    height: 200, // Set the height of the image
    borderRadius: 10, 
    marginBottom: 16, // space between the image and the title text
  },

  questTitle: {
    fontSize: 23,
    fontFamily: "inter-bold", 
    marginBottom: 8,
    
  },

  questName: {
    fontSize: 20,
    marginTop: 10, 
    marginBottom: 10, 
    fontFamily: "inter-semi-bold", 
  },
  questStatus: {
    marginTop: 8,
    fontSize: 19,
    fontFamily: "inter-extra-bold", 
  },
  streakSection: {
    marginTop: 20,
    padding: 20,
    marginHorizontal: 16,
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
    fontFamily: "inter-bold",
    marginBottom: 10,
  },

  streakTitle2: {
    fontSize: 16,
    fontFamily: "inter-semi-bold",
    marginBottom: 10,
  },

  streakInfo: {
    alignSelf: 'stretch', 
    alignItems: 'center',
  },
  streakText: {
    fontSize: 16,
    fontFamily: "inter",
    marginBottom: 4,
  },

});

export default Homescreen;
