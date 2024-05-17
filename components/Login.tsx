import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform authentication logic here
    // For simplicity, assume successful login for now
    navigation.navigate('Profile'); 
  };

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount'); 
  };
return (
    <View style =  {styles.container}>

<Image source={require("@/assets/images/logo.jpg")} style={styles.logoStyle} />

    <Text style={styles.title}>Welcome Back!</Text>
    <Text style={styles.subtitle}>Please log in to check your profile</Text>
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

       <TouchableOpacity style={styles.button} onPress={handleLogin}>
         <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

          <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
       <Text style={styles.createAccountText}>Create an Account</Text>
      </TouchableOpacity>
 

    </View>
); 
}





const styles = StyleSheet.create({

  container: {
    // flex: 1,
   // alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: "25%", 
    backgroundColor: "fff", 
    alignItems: 'center',

  },
  check: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // marginTop: "50%", 
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
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
  createAccountButton: {
    marginTop: 10,
    width: '100%',
    height: 40,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  createAccountText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "black", 
    marginBottom: 10,
    fontFamily: 'mon-b'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#888',
    fontFamily: 'mon-sb'
  },
  color:{
    backgroundColor: "#fff", 
  },
  logoStyle: {
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    marginBottom: 20, // Optional: add margin if needed
    resizeMode: 'contain', // Ensure the image fits the container without stretching
  },
});

export default LoginScreen;
