import React from 'react';
import { View, Image, useWindowDimensions, StyleSheet, ImageSourcePropType } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

interface SliderProps {
  images: {
    id: number;
    image: ImageSourcePropType;
  }[];
}

export const Slider: React.FC<SliderProps> = ({ images }) => {
  const { width } = useWindowDimensions();
  const height = width * 1.5; // Aumenta a altura do carrossel

  return (
    <View style={{ width }}>
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
            style={{ width, height }}
            resizeMode="contain" // evita corte
          />
        )}
      />
    </View>
  );
};

export default Slider;
