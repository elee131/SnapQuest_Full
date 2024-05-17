import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

// Mock user posts data
const mockUserPosts = [
  { id: 1, username: 'Jane', postImage: require('@/assets/images/post1.jpg') },
  { id: 2, username: 'Richard', postImage: require('@/assets/images/post2.jpg') },
  { id: 3, username: 'Martha', postImage: require('@/assets/images/post3.jpg') },
  // Add more mock data as needed
];

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchField}>
        <Ionicons style={styles.searchIcon} name='search' size={20} color={Colors.medium} />
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
  return (
    <View style={styles.postContainer}>
      <Image source={post.postImage} style={styles.postImage} />
      <Text style={styles.username}>Picture by {post.username}</Text>
    </View>
  );
};

const Following = () => {
  const [filteredPosts, setFilteredPosts] = useState(mockUserPosts);

  const handleSearch = (searchText) => {
    const filtered = mockUserPosts.filter(post => post.username.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredPosts(filtered);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity>
          <Image source={require("@/assets/images/searchIcon.jpg")} style={styles.iconStyle} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Other Users</Text>
          <View style={styles.locationName}>
            <Text style={styles.subtitle}>Search</Text>
            <Ionicons name='chevron-down' size={20} color={Colors.primary} />
          </View>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-outline" size={20} color="blue" />
        </TouchableOpacity>
      </View>
      <SearchBar onSearch={handleSearch} />
      {/* Render user posts */}
      <FlatList
        data={filteredPosts}
        renderItem={({ item }) => <UserPost post={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
   

  },
  container: {
    height: 60,
    backgroundColor: '#fff',
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
    color: Colors.medium,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  profileButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,

  },
  iconStyle: {
    width: 20,
    height: 20
  },
  locationName: { flexDirection: 'row', alignItems: 'center' },
  searchContainer: {
    height: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchField: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
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
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  postContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark,
  },
});

export default Following;
