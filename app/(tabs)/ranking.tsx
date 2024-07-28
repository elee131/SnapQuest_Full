import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import themeContext from '@/assets/theme/themeContext';
import { useUser } from "../../context/UserContext";
import { profile } from "@/assets/data/images";

const RewardScreen = () => {
  const theme = useContext(themeContext);

  const getBorderColor = (rank: number) => {
    switch (rank) {
      case 1: return 'gold';    
      case 2: return 'silver';  
      case 3: return '#CD7F32'; 
      default: return '#ccc';   
    }
  };

  // Fake user data without ranking
  const fakeUserData = [
    {
      username: 'Anica',
      profilePic: 'https://media.istockphoto.com/id/1443562748/photo/cute-ginger-cat.jpg?s=1024x1024&w=is&k=20&c=QaEkKC7lFEBrzzPftMRBVuOZq4FNOnUjOV1VqTmpMfY=',
      currStreak: 20,
      points: 1305,
    },
    {
      username: 'Jenny',
      profilePic: 'https://media.istockphoto.com/id/1201112520/photo/planting-tree-in-garden-concept-save-world-green-earth.jpg?s=1024x1024&w=is&k=20&c=ATz1X5frL8nlset8lIt_xq9R0aYaKdQ_OjrBagIhdMw=',
      currStreak: 18,
      points: 1703,
    },
    {
      username: 'Seva',
      profilePic: 'https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=1024x1024&w=is&k=20&c=U6uwI27fEfgEAl9j_Hz848FgLRidd9Ww0kPCkc0FZB8=',
      currStreak: 15,
      points: 1500,
    },
  ];


  const sortedByStreak = [...fakeUserData].sort((a, b) => b.currStreak - a.currStreak);


  const sortedByPoints = [...fakeUserData].sort((a, b) => b.points - a.points);

  const { username, currStreak, profilePic, point } = useUser();

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
                source={{ uri: profilePic || profile }}
                style={[styles.profileImage, { backgroundColor: theme.background }]}
              />
              <Text style={[styles.username, { color: theme.color }]}>{username} (YOU)</Text>
            </View>
            <View>
              <Text style={[{ color: theme.color, fontWeight: '600', paddingRight: 10, fontSize: 18 }]}>RANK: 7</Text>
              <Text style={[{ color: theme.color, fontWeight: '600', paddingRight: 10 }]}>Current Streak: {currStreak}</Text>
            </View>
          </View>
        </View>

        {sortedByStreak.map((user, index) => (
          <View key={index} style={[styles.userRanking, { backgroundColor: theme.content }]}>
            <View style={styles.userInfo}>
              <Text style={[{ color: theme.color, fontWeight: '600', padding: 10, fontSize: 28 }]}>{index + 1}</Text>
              <Image
                source={{ uri: user.profilePic || profile }}
                style={[styles.profileImage, { backgroundColor: theme.background }]}
              />
              <Text style={[styles.username, { color: theme.color, marginRight: 7 }]}>{user.username}</Text>
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
                source={{ uri: profilePic || profile }}
                style={[styles.profileImage, { backgroundColor: theme.background }]}
              />
              <Text style={[styles.username, { color: theme.color}]}>{username} (YOU)</Text>
            </View>
            <View>
              <Text style={[{ color: theme.color, fontWeight: '600', paddingRight: 10, fontSize: 18 }]}>RANK: 5</Text>
              <Text style={[{ color: theme.color, fontWeight: '600', paddingRight: 10 }]}>Points : {point}</Text>
            </View>
          </View>



          {sortedByPoints.map((user, index) => (
            <View key={index} style={[styles.userRanking, { backgroundColor: theme.content, }]}>
              <View style={styles.userInfo}>
              <Text style={[{ color: theme.color, fontWeight: '600', padding: 10, fontSize: 28 }]}>{index + 1}</Text>
                <Image
                  source={{ uri: user.profilePic || profile }}
                  style={[styles.profileImage, { backgroundColor: theme.background }]}
                />
                <Text style={[styles.username, { color: theme.color ,marginRight: 7  }]}>{user.username}</Text>
                <FontAwesome5 name="medal" size={24} color={getBorderColor(index + 1)} />
              </View>
              <View>
                <Text style={[{ color: theme.color, fontWeight: '600', paddingRight: 10 }]}>Points: {user.points}</Text>
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
