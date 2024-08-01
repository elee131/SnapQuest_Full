import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { signInWithEmailAndPassword , User } from "firebase/auth";
import { auth } from "firebaseConfig";
import { useUser } from "../context/UserContext";
import { useFocusEffect } from "@react-navigation/native";
import LottieView from "lottie-react-native";


const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null); // Set the type to User | null
  const { initUser } = useUser();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      initUser(user.uid); // Ensure initUser is defined and imported
      navigation.navigate('Main');
    }
  }, [user, navigation]);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        initUser(user.uid);

        navigation.navigate("Main");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const handleCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setPassword("");
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        
      <LottieView
          autoPlay
          style={styles.sunflower}
          source={require("../assets/animation/sunflower.json")}
        />
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Please log in to check your profile</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleCreateAccount}
        >
          <Text style={styles.createAccountText}>Create an Account</Text>
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
    paddingVertical: "15%",
    borderWidth: 3, 
    alignItems: 'center',
    borderRadius: 2,
    elevation:20, 
    marginHorizontal: "5%", 
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#F7CE5B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "inter-semi-bold",
  },
  createAccountButton: {
    marginTop: 10,
    width: "100%",
    height: 40,
    backgroundColor: "#FFA62B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  createAccountText: {
    color: "white",
    fontSize: 16,
    fontFamily: "inter-semi-bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    fontFamily: "inter-extra-bold",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#888",
    fontFamily: "inter-semi-bold",
  },
  sunflower:{
    width: 200, 
    height: 200, 
  }
});

export default LoginScreen;
