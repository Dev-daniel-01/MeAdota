// components/Slider.tsx
import React from 'react';
import { View, Image, Dimensions, StyleSheet, ImageSourcePropType } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');
const height = 506;

interface SliderProps {
  images: {
    id: number;
    image: ImageSourcePropType;
  }[];
}

export const Slider: React.FC<SliderProps> = ({ images }) => {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={height}
        autoPlay={true}
        autoPlayInterval={3000}  
        scrollAnimationDuration={100}
        data={images}
        renderItem={({ item }) => (
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  alignItems: 'center',

  },
  image: {
    width: '100%',
    height: height,
   
  },
});

export default Slider;
