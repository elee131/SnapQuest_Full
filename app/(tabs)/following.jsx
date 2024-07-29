import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import themeContext from '@/assets/theme/themeContext';

// Mock user posts data
const mockUserPosts = [
  { id: 1, username: 'Jane', postImage: require('@/assets/images/post1.jpg') },
  { id: 2, username: 'Richard', postImage: require('@/assets/images/post2.jpg') },
  { id: 3, username: 'Martha', postImage: require('@/assets/images/post3.jpg') },
  // Add more mock data as needed
];

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const theme = useContext(themeContext);

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={styles.searchContainer}>
      <View style={[styles.searchField]}>
        <Ionicons style={styles.searchIcon} name='search' size={20} color={theme.background} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor={Colors.medium}
          value={searchText}
          onChangeText={handleSearch}
          autoFocus={true}
        />
      </View>
      <TouchableOpacity style={styles.optionButton} onPress={() => onSearch(searchText)}>
        <Ionicons name="options-outline" size={20} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const UserPost = ({ post }) => {
  const theme = useContext(themeContext);
  return (
    <View style={[styles.postContainer, { backgroundColor: theme.content }]}>
      <Image source={post.postImage} style={styles.postImage} />
      <Text style={[styles.username, { color: theme.color }]}>Picture by {post.username}</Text>
    </View>
  );
};

const Following = () => {
  const theme = useContext(themeContext);
  const [filteredPosts, setFilteredPosts] = useState(mockUserPosts);

  const handleSearch = (searchText) => {
    const filtered = mockUserPosts.filter(post => post.username.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredPosts(filtered);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.headerContainer, { backgroundColor: theme.background }]}>
          <TouchableOpacity>
            <Image source={require("@/assets/images/searchIcon.jpg")} style={styles.iconStyle} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.color }]}>Other Users</Text>
            <View style={styles.locationName}>
              <Text style={[styles.subtitle, { color: theme.color }]}>Search</Text>
              <Ionicons name='chevron-down' size={20} color={Colors.primary} />
            </View>
          </View>
          <TouchableOpacity style={[styles.profileButton, { backgroundColor: theme.background }]}>
            <Ionicons name="person-outline" size={20} color={theme.dark} />
          </TouchableOpacity>
        </View>
        <SearchBar onSearch={handleSearch} />
        <FlatList
          data={filteredPosts}
          renderItem={({ item }) => <UserPost post={item} />}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={[styles.postsContainer, { backgroundColor: theme.background }]}
        />
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
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  titleContainer: {
    marginLeft: 20,
    flex: 1,
  },
  title: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  locationName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: "7%",
  },
  searchField: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  input: {
    flex: 1,
    padding: 10,
    color: "#000",
  },
  searchIcon: {
    marginRight: 10,
  },
  optionButton: {
    padding: 10,
  },
  postsContainer: {
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  postContainer: {
    marginBottom: 15,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 2,
  },
  postImage: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark,
  },
});

export default Following;
