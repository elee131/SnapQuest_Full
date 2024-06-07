import React from 'react';
import { View, Animated, Easing, Image, StyleSheet, Dimensions } from 'react-native';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const FallingLeavesBackground = () => {
  const windowWidth = Dimensions.get('window').width;
  const leaves = Array.from({ length: 25 }).map((_, index) => ({
    key: index.toString(),
    x: Math.random() * windowWidth,
    y: -50,
    speed: Math.random() * 30 + 1, 
    rotation: Math.random() * 360,
  }));

  const animations = leaves.map((leaf) => {
    const translateY = new Animated.Value(leaf.y);
    Animated.loop(
      Animated.timing(translateY, {
        toValue: Dimensions.get('window').height + 50,
        duration: leaf.speed * 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    return { translateY };
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      {leaves.map((leaf, index) => (
        <AnimatedImage
          key={leaf.key}
          source={require('../assets/images/leaf.jpg')}
          style={[
            styles.leaf,
            {
              left: leaf.x,
              transform: [
                { translateY: animations[index].translateY },
                { rotate: `${leaf.rotation}deg` },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  leaf: {
    position: 'absolute',
    width: 40,
    height: 40,
  },
});

export default FallingLeavesBackground;
