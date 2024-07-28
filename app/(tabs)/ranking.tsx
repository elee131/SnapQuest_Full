import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import themeContext from '@/assets/theme/themeContext';
import { useUser } from "../../context/UserContext";
import {Image} from "react-native";
import { profile } from "@/assets/data/images";

const RewardScreen = () => {
  const theme = useContext(themeContext)

  const {
    username,
    currStreak,
    profilePic,
    point,
  } = useUser();

  return (


    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={[styles.titleContainer, {backgroundColor: theme.midrange}]}>
        <Text style={styles.label}><FontAwesome5 name="crown" size={20} color="black" /> Current Rankings <FontAwesome5 name="crown" size={20} color="black" /> </Text>
      </View>

      <View>
      <Text style={[styles.Heading, {color: theme.color}, {marginBottom: 10}]}>Longest Current Streak</Text>

      <View style = {[styles.userRanking, {backgroundColor: theme.content}]}>
      

      <View><Image
            source={{ uri: profilePic || profile }}
            style={[styles.profileImage, {backgroundColor: theme.background}]}
          />
        <Text>{username}</Text>
        </View>
        <Text>YOU</Text>


    
      </View>

      </View>

      <View>
      <Text style={[styles.Heading, {color: theme.color}]}>Point Ranking</Text>
      </View>

      </View>


  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'inter', 
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700', // Gold color for premium feel
    borderRadius: 20,
    marginTop: "15%", 
    marginBottom: "5%",
    marginHorizontal: '5%', 
    paddingVertical: "10%",
    paddingHorizontal: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    fontFamily: "inter", 
  },
  label: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600',
    marginBottom: 8,
  },
  Heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    paddingHorizontal: 20,
  },
  userRanking:{
    backgroundColor: '#fff',
    width: '90%', 
    height: '30%', 
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: "row", 
  }, 
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 65,

  },
});

export default RewardScreen;
