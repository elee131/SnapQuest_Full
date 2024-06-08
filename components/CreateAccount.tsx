import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword , User} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import {  db , auth } from 'firebaseConfig';
import { useUser } from '../context/UserContext';
// import FallingLeavesBackground from './FallingLeavesBackground';
import LottieView from "lottie-react-native";


const CreateAccountScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { initUser } = useUser();


  const createUserProfile = async(user: User) => {
    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        name: name,
        email: email,
        point: 0,
        currStreak: 0,
        longestStreak: 0,
        completedDaily : false,
        images: [],
        profilePic: ""
      });
      initUser(user.uid);

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  };


  // const navigation = useNavigation();
  const handleCreateAccount = async() => {
    console.log("in handleCreate");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("created user");
      await createUserProfile(userCredential.user);
      navigation.navigate('Profile'); 
    } catch (e: any) {
      console.error('Error creating account:', e.code, e.message);
    }
  };

  // navigation to login page 
  const handleLoginScreen = () => {
    navigation.navigate('Login')
  }

  return (
  
    <View style={styles.container}>
      {/* <FallingLeavesBackground/> */}
      <View style={styles.secondContainer}>

      <LottieView
          autoPlay
          style={styles.pinkflower}
          source={require("../assets/animation/pinkflower.json")}
        />
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="User Name"
        placeholderTextColor="grey" 
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="grey" 
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="grey" 
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backToProfileButton} onPress={handleLoginScreen}>
      <Text style={styles.buttonText}>Back to Login Page</Text>
      </TouchableOpacity>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
   backgroundColor: "#FFF8F0",
    justifyContent: 'center',
  },
  secondContainer: {
    borderColor: "#FFF8F0",
    paddingHorizontal: "10%", 
    backgroundColor: "#fff",
    paddingVertical: "10%",
    borderWidth: 3, 
    alignItems: 'center',
    borderRadius: 2,
    elevation:20, 
    marginHorizontal: "5%", 

  }, 

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'inter-extra-bold'
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontFamily: "inter", 
  },
  button: {
    width: '100%',
    height: 40,
    marginTop: 10,
    backgroundColor: "#F7CE5B",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  backToProfileButton: {
    width: '100%',
    height: 40,
    marginTop: 10,
    backgroundColor: "#FFA62B",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'inter-semi-bold',
    fontSize: 16,
  },
  pinkflower:{
    width: 200, 
    height: 200, 
  }
});

export default CreateAccountScreen;

