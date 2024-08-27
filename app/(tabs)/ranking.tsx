import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { doc, getDocs, collection, getDoc } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { FontAwesome5 } from '@expo/vector-icons';
import themeContext from '@/assets/theme/themeContext';
import { useUser } from "../../context/UserContext";
import { profile } from "@/assets/data/images";

interface UserData {
  userUID: string;
  name: string;
  profilePic: string;
  currStreak: number;
  point: number;
}

const RewardScreen = () => {
  const theme = useContext(themeContext);
  const {
    username,
    currStreak,
    longestStreak,
    profilePic,
    point,
    setProfilePic,
    setUserUID,
    userUID
  } = useUser();
  const [users, setUsers] = useState<UserData[]>([]);
  const [pointRanking, setPointRanking] = useState<UserData[]>([]);
  const [streakRanking, setStreakRanking] = useState<UserData[]>([]);
  const [pointRank, setPointRank] = useState(-1);
  const [streakRank, setStreakRank] =useState(-1);

  useEffect(() => {
    fetchUserData();
  }, []);
  
  const fetchUserData = async () => {
    try {
      const data = await getDocs(collection(db, "users"));
      const userData: UserData[] = [];
  
      data.forEach((doc) => {
        const currData = doc.data();
        const currUser = {
          userUID: currData.userUID as string,
          name: currData.name as string,
          profilePic: currData.profilePic as string, 
          currStreak: currData.currStreak as number,
          point: currData.point as number,
        };
        userData.push(currUser);
      });
  
      setUsers(userData);
      console.log("Fetched user data: ", userData);
  
      // Sort by points and streak after fetching user data
      sortAndRankUsers(userData);
  
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };
  
  const sortAndRankUsers = (userData: UserData[]) => {
    // Sort by points
    const sortedByPoints = [...userData].sort((a, b) => b.point - a.point);
    setPointRanking(sortedByPoints);
    console.log("Sorted by points: ", sortedByPoints);
  
    // Sort by streak
    const sortedByStreaks = [...userData].sort((a, b) => b.currStreak - a.currStreak);
    setStreakRanking(sortedByStreaks);
    console.log("Sorted by streak: ", sortedByStreaks);
  
    // Find user ranking
    findUserRanking(sortedByPoints, sortedByStreaks);
  };
  
  const findUserRanking = (sortedByPoints: UserData[], sortedByStreaks: UserData[]) => {
    const pointRank = sortedByPoints.findIndex(user => user.userUID === userUID);
    const streakRank = sortedByStreaks.findIndex(user => user.userUID === userUID);
  
    setPointRank(pointRank + 1);
    setStreakRank(streakRank + 1);
  
    console.log("User point rank: ", pointRank + 1); // Log point rank
    console.log("User streak rank: ", streakRank + 1); // Log streak rank
  };

  const getBorderColor = (rank: number) => {
    switch (rank) {
      case 1: return 'gold';    
      case 2: return 'silver';  
      case 3: return '#CD7F32'; 
      default: return '#ccc';   
    }
  };
  


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>
        <View style={[styles.titleContainer, { backgroundColor: theme.midrange }]}>
          <Text style={styles.label}>
            <FontAwesome5 name="crown" size={15} color="black" /> Current Rankings <FontAwesome5 name="crown" size={15} color="black" />
          </Text>
        </View>

        <View>
          <Text style={[styles.Heading, { color: theme.color }]}>Longest Current Streak</Text>

          <View style={[styles.userRanking, { backgroundColor: theme.content, borderColor: theme.dark, borderWidth: 1.5 }]}>
            <View style={styles.userInfo}>
             
              <Image
                source={{ uri: profilePic || "https://res.cloudinary.com/du40sblw6/image/upload/v1724113705/profile_wmmkwa.png"  }}
                style={[styles.profileImage, { backgroundColor: theme.background }]}
              />
              <Text style={[styles.username, { color: theme.color }]}>{username} (YOU)</Text>
            </View>
            <View>
              <Text style={[{ color: theme.color, fontWeight: '600', paddingRight: 10, fontSize: 18 }]}>RANK: {streakRank}</Text>
              <Text style={[{ color: theme.color, fontWeight: '600', paddingRight: 10 }]}>Current Streak: {currStreak}</Text>
            </View>
          </View>
        </View>

        {streakRanking.map((user, index) => (
          <View key={index} style={[styles.userRanking, { backgroundColor: theme.content }]}>
            <View style={styles.userInfo}>
              <Text style={[{ color: theme.color, fontWeight: '600', padding: 10, fontSize: 28 }]}>{index + 1}</Text>
              <Image
                source={{ uri: user.profilePic || "https://res.cloudinary.com/du40sblw6/image/upload/v1724113705/profile_wmmkwa.png" }}
                style={[styles.profileImage, { backgroundColor: theme.background }]}
              />
              <Text style={[styles.username, { color: theme.color, marginRight: 7 }]}>{user.name}</Text>
              <FontAwesome5 name="medal" size={24} color={getBorderColor(index + 1)} />
            </View>
            <View>
              <Text style={[{ color: theme.color, fontWeight: '600', paddingRight: 10 }]}>Current Streak: {user.currStreak}</Text>
            </View>
          </View>
        ))}

        <View>
          <Text style={[styles.Heading, { color: theme.color }]}>Point Ranking</Text>

          <View style={[styles.userRanking, { backgroundColor: theme.content, borderColor: theme.dark, borderWidth: 1.5 }]}>
            <View style={styles.userInfo}>
              <Image
                source={{ uri: profilePic || "https://res.cloudinary.com/du40sblw6/image/upload/v1724113705/profile_wmmkwa.png" }}
                style={[styles.profileImage, { backgroundColor: theme.background }]}
              />
              <Text style={[styles.username, { color: theme.color}]}>{username} (YOU)</Text>
            </View>
            <View>
              <Text style={[{ color: theme.color, fontWeight: '600', paddingRight: 10, fontSize: 18 }]}>RANK: {pointRank}</Text>
              <Text style={[{ color: theme.color, fontWeight: '600', paddingRight: 10 }]}>Points : {point}</Text>
            </View>
          </View>



          {pointRanking.map((user, index) => (
            <View key={index} style={[styles.userRanking, { backgroundColor: theme.content, }]}>
              <View style={styles.userInfo}>
              <Text style={[{ color: theme.color, fontWeight: '600', padding: 10, fontSize: 28 }]}>{index + 1}</Text>
                <Image
                  source={{ uri: user.profilePic  || "https://res.cloudinary.com/du40sblw6/image/upload/v1724113705/profile_wmmkwa.png" }}
                  style={[styles.profileImage, { backgroundColor: theme.background }]}
                />
                <Text style={[styles.username, { color: theme.color ,marginRight: 7  }]}>{user.name}</Text>
                <FontAwesome5 name="medal" size={24} color={getBorderColor(index + 1)} />
              </View>
              <View>
                <Text style={[{ color: theme.color, fontWeight: '600', paddingRight: 10 }]}>Points: {user.point}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
    borderRadius: 20,
    marginTop: "15%",
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
    marginTop: 10
  },
  Heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    paddingHorizontal: 20,
    marginBottom: "5%",
    marginTop: "10%",
  },
  userRanking: {
    backgroundColor: '#fff',
    width: '90%',
    height: 105,
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    flexDirection: "row",
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    padding: 10,
    marginBottom: "5%",
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RewardScreen;