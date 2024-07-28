import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
} from "react-native";
import { useUser } from "../context/UserContext";
import themeContext from '@/assets/theme/themeContext';

const Gallery = () => {
    const {images} = useUser();
    const theme = useContext(themeContext)

    return(
      <View style={[styles.imagesContainer, {backgroundColor: theme.content}]}>
          {images.map((image, index) => (
            <View style={[styles.picHolder, {borderColor:theme.content}]} key={index}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
          ))}
        </View>
    );
}; 

const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginTop: "5%", 
    paddingVertical: "3%", 
    marginHorizontal: "5%", 
    borderRadius: 20, 
    marginBottom: "5%"
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 5,

  },
  picHolder: {
    width: 100,
    height: 100,
    marginVertical: 5,
    borderWidth: 2, 
    borderRadius: 5,
  },
});
export default Gallery
