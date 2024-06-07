import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseConfig";
import { useUser } from "../context/UserContext";
import { useFocusEffect } from "@react-navigation/native";
// import FallingLeavesBackground from "./FallingLeavesBackground";
import LottieView from "lottie-react-native";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { initUser } = useUser();

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
      {/* <FallingLeavesBackground /> */}
      <View>
        <LottieView
          autoPlay
          style={styles.sunflower}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../assets/animation/sunflower.json")}
        />
      </View>
      <View style={styles.secondContainer}>
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
  },
  secondContainer: {
    borderColor: "#FFF8F0",
    paddingHorizontal: "10%",
    backgroundColor: "#fff",
    paddingVertical: "15%",
    borderWidth: 3,
    alignItems: "center",
    marginRight: "2%",
    marginLeft: "2%",
    borderRadius: 2,
    elevation: 10,
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
    alignSelf: "center", 
  }
});

export default LoginScreen;
