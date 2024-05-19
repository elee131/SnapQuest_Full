import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword , User} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import {  db , auth } from 'firebaseConfig';
import { useUser } from '../context/UserContext';

const CreateAccountScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserUID } = useUser();


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
        images: []
      });
      setUserUID(user.uid);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "50%",
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  
  },
  title: {
    fontSize: 28,
    // fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: "margarsa",
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
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CreateAccountScreen;

