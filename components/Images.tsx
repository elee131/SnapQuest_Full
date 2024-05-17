import { View, Text, ScrollView, StyleSheet, Image} from 'react-native'
import React from 'react'
import {images} from "@/assets/data/images"


const Images = () => {
    return (
      <ScrollView horizontal contentContainerStyle={{ padding: 15 }}>
        {images.map((image, index) => (
          <View style={styles.picHolder} key={index}>
            <Image source={image.img} style={styles.image} resizeMode="contain" />
          </View>
        ))}
      </ScrollView>
    );
  };
  

  const styles = StyleSheet.create({
    scrollViewContent: {
      paddingVertical: 15,
      paddingHorizontal: 10, // Adjust horizontal padding as needed
    },
    picHolder: {
      width: 120, // Adjust the width as needed
      height: 120, // Adjust the height as needed to accommodate text below the image
      marginHorizontal: 5, // Add horizontal margin for spacing between images
      alignItems: 'center', // Center the contents horizontally
    },
    image: {
      width: '100%',
      height: '80%', // Adjust the height percentage to ensure the image fits within the container
    },
    textfont: {
      paddingVertical: 5,
      fontSize: 12,
      fontWeight: 'bold',
    },
  });


export default Images