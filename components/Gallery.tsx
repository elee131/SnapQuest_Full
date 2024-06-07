import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
} from "react-native";
import { profile } from "@/assets/data/images";
import { useUser } from "../context/UserContext";

const Gallery = () => {
    const {images} = useUser();

    return(
      <View style={styles.imagesContainer}>
          {images.map((image, index) => (
            <View style={styles.picHolder} key={index}>
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
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginTop: "5%", 
    backgroundColor: "#fff", 
    marginLeft: "3%",
    marginRight: "3%",
    borderRadius: 20, 
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
  },
});
export default Gallery
