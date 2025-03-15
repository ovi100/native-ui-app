import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Pressable, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const Carousel = ({
  images,
  slideInterval = 3000,
  autoPlay = false,
  showControls = false,
  showIndicators = true,
  indicatorType = 'capsules',
  indicatorPosition = 'inside',
  // indicatorStyles = null,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const autoSlideTimer = useRef(null);

  const startAutoSlide = useCallback(() => {
    if (!autoPlay) { return; }
    autoSlideTimer.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      updateAnimation(nextIndex);
    }, slideInterval);
  }, [autoPlay, currentIndex, images.length, slideInterval, updateAnimation]);

  const stopAutoSlide = () => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
      autoSlideTimer.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide]);

  const updateAnimation = useCallback((index) => {
    translateX.value = withTiming(-index * width, { duration: 300 });
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
      ],
    };
  });

  const handleSwipe = (dir) => {
    autoPlay && stopAutoSlide();
    let newIndex;
    if (dir === 'left') {
      newIndex = (currentIndex + 1) % images.length;
    } else if (dir === 'right') {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }
    setCurrentIndex(newIndex);
    updateAnimation(newIndex);
    autoPlay && startAutoSlide();
  };

  const handleIndicator = (index) => {
    autoPlay && stopAutoSlide();
    setCurrentIndex(index);
    updateAnimation(index);
    autoPlay && startAutoSlide();
  };

  const panGesture = Gesture.Pan()
    .onEnd((event) => {
      if (event.translationX < -50) {
        runOnJS(handleSwipe)('left');
      } else if (event.translationX > 50) {
        runOnJS(handleSwipe)('right');
      }
    });

  const getIndicatorPositionStyles = (pos) => {
    if (pos === 'inside') {
      return { bottom: 20 };
    } else {
      return { bottom: -20 };
    }
  };

  const getIndicatorStyles = (type) => {
    let styles = {
      backgroundColor: '#ccc',
      marginHorizontal: 5,
    };
    if (type === 'dots') {
      return {
        width: 10,
        height: 10,
        borderRadius: '50%',
        ...styles,
      };
    } else {
      return {
        width: 25,
        height: 5,
        borderRadius: type === 'bars' ? 0 : 100,
        ...styles,
      };
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.slider, animatedStyle]}>
            {images.map((image, index) => (
              <View key={index} style={styles.slide}>
                {typeof image === 'string' ? (
                  <Image source={{ uri: image }} style={styles.image} />
                ) : (
                  <Image source={image} style={styles.image} />
                )}
              </View>
            ))}
          </Animated.View>
        </GestureDetector>
        {showControls && (
          <View style={styles.controls}>
            <Pressable onPress={() => handleSwipe('right')}>
              <View style={styles.controlLeft} />
            </Pressable>

            <Pressable onPress={() => handleSwipe('left')}>
              <View style={styles.controlRight} />
            </Pressable>
          </View>
        )}
        {showIndicators && (
          <View style={[styles.indicators, getIndicatorPositionStyles(indicatorPosition)]}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  getIndicatorStyles(indicatorType),
                  index === currentIndex && styles.active,
                ]}
                onPress={() => handleIndicator(index)}
              />
            ))}
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    flexDirection: 'row',
    width: width,
    height: '100%',
  },
  slide: {
    width: width,
    height: '100%',
  },
  image: {
    width: width,
    height: 250,
    resizeMode: 'cover',
  },
  controls: {
    position: 'absolute',
    top: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  controlLeft: {
    width: 18,
    height: 18,
    borderColor: '#fff',
    borderBottomWidth: 3,
    borderRightWidth: 3,
    transform: [{ rotate: '130deg' }],
  },
  controlRight: {
    width: 18,
    height: 18,
    borderColor: '#fff',
    borderBottomWidth: 3,
    borderRightWidth: 3,
    transform: [{ rotate: '-40deg' }],
  },
  indicators: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#22c55e',
  },
});

export default Carousel;
