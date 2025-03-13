import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
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
  direction = 'horizontal',
  autoPlay = false,
  showControls = false,
  controlStyles = null,
  showIndicators = true,
  indicatorStyles = null,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const autoSlideTimer = useRef(null);

  const startAutoSlide = () => {
    if (!autoPlay) { return; }
    autoSlideTimer.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      updateAnimation(nextIndex);
    }, slideInterval);
  };

  const stopAutoSlide = () => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
      autoSlideTimer.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const updateAnimation = (index) => {
    if (direction === 'horizontal') {
      translateX.value = withTiming(-index * width, { duration: 300 });
    } else {
      translateY.value = withTiming(-index * width, { duration: 300 });
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const handleSwipe = (dir) => {
    stopAutoSlide();
    let newIndex;
    if (dir === 'left') {
      newIndex = (currentIndex + 1) % images.length;
    } else if (dir === 'right') {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }
    setCurrentIndex(newIndex);
    updateAnimation(newIndex);
    startAutoSlide();
  };

  const panGesture = Gesture.Pan()
    .onEnd((event) => {
      if (direction === 'horizontal') {
        if (event.translationX < -50) {
          runOnJS(handleSwipe)('left');
        } else if (event.translationX > 50) {
          runOnJS(handleSwipe)('right');
        }
      } else {
        if (event.translationY < -50) {
          runOnJS(handleSwipe)('up');
        } else if (event.translationY > 50) {
          runOnJS(handleSwipe)('down');
        }
      }
    });

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              styles.slider,
              animatedStyle,
              // eslint-disable-next-line react-native/no-inline-styles
              { flexDirection: direction === 'horizontal' ? 'row' : 'column' },
            ]}
          >
            {images.map((image, index) => (
              <View key={index} style={styles.slide}>
                <Image source={{ uri: image }} style={styles.image} />
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
          <View style={styles.pagination}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentIndex && styles.activeDot,
                ]}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  slider: {
    flex: 1,
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
  pagination: {
    position: 'absolute',
    bottom: -20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
});

export default Carousel;