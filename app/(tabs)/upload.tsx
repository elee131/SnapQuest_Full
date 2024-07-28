import React, { useState, useContext} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from 'context/UserContext';
import FallingLeavesBackground from '../../components/FallingLeavesBackground';
import themeContext from '@/assets/theme/themeContext';

const UploadScreen = () => {
  const [image, setImage] = useState("");
  const [labels, setLabels] = useState([]);
  const {  addImage } = useUser();
  const theme = useContext(themeContext);



  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      analyzeImage(result.assets[0].uri);      
    }
  };

  const handleUpload = async (uri : string) => {
    console.log("in handle upload")
    try {
      let imageURL

      if (!uri) {
        console.log("empty url")
        return
      }

      const image = new FormData();
      const img = {
        uri: uri,
        type: 'image/jpeg', // or the appropriate mime type of the file
        name: 'upload.jpg' // the name of the file
      };
      image.append("file", img);
      image.append("cloud_name", "du40sblw6");
      image.append("upload_preset", "userImage");

      const response = await fetch (
        "https://api.cloudinary.com/v1_1/du40sblw6/image/upload",
        {
          method: "post",
          body: image
          
        }
      );
      const imgData = await response.json();
      imageURL = imgData.secure_url.toString();      
      console.log(imageURL)
      addImage(imageURL)


    } catch (error) {
      console.log("caught error:", error);
    }
  }



  const analyzeImage = async (uri : string) => {
    try {
      if (!uri) {
        alert('Please select an image first.');
        return;
      }

      const apiKey = process.env.EXPO_PUBLIC_GCV_API_KEY;
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
      // Read the image file from local URI and convert it to base64
      const base64ImageData = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const requestData = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [{ type: 'LABEL_DETECTION', maxResults: 20 }],
          },
        ],
      };

      const apiResponse = await axios.post(apiUrl, requestData);

      setLabels(apiResponse.data.responses[0].labelAnnotations);
      const variableString = ['desk', 'brown', 'beige', 'bottle', 'drink', 'cup', 'Plastic bottle', 'glass', 'circle', 'liquid', 'drinkware']; 
      const hasMatch = parseResponse(apiResponse.data.responses[0], variableString);
      if (hasMatch) {
        showAlert("Success!");
        handleUpload(uri)
      } else {
        showAlert("Hmm, that doesnt seem correct. Try again");
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Error analyzing image. Please try again later.');
    }
  };

  const parseResponse = (response: any, variableString: string[]) => {
    const matchedDescriptions: string[] = [];
  
    if (!response || !response.labelAnnotations || !variableString) {
      return false;
    }
  
    let foundMatch = false; // Flag to track if a match is found
  
    for (const annotation of response.labelAnnotations) {
      console.log(annotation.description); 

      matchedDescriptions.push(annotation.description);
      if (variableString.includes(annotation.description.toLowerCase())) {
        foundMatch = true;
        break
      }
    }
  
    if (foundMatch) {
      return true;
    } else {
      return false;

    }
  };


  const showAlert = (message: string) => {
    Alert.alert(
      'Notification',
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  return (
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <FallingLeavesBackground/>
      <View style={[styles.uploadContainer, {backgroundColor: theme.content, borderColor: theme.dark}]}>
        <Text style={[styles.title, {color: theme.color}]}>Upload Your Photo!</Text>
        <TouchableOpacity onPress={pickImage} style={[styles.uploadButton, {backgroundColor: theme.midrange}]}>
        <MaterialIcons name="add-a-photo" size={28} color="black" />
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}
      </View>

    </View>
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFF8F0',
    justifyContent: 'center',
  },
  uploadContainer: {
    alignItems: 'center',
    marginHorizontal: "5%",
    paddingHorizontal: "3%", 
    paddingVertical: "5%", 
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: "#FFA62B",
    borderWidth: 5,
    elevation: 10, 
  },
  title: {
    fontSize: 25,
    marginTop: "3%", 
    marginBottom: "3%", 
    color: "#2C241D",
    fontFamily: "inter-bold",
  },
  uploadButton: {
    backgroundColor: '#F7CE5B',
    padding: 15,
    borderRadius: 10,
    marginTop: 10, 
    alignItems: 'center',
  },
  previewImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginTop: 10, 
  },  
});

export default UploadScreen;