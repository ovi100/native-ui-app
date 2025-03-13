import {useState, useEffect} from 'react';
import {View, Image, Dimensions, Pressable, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const Carousel = ({
  images,
  autoSlide = true,
  direction = 'horizontal',
  slideDuration = 3000,
  animationDuration = 500,
}) => {
  const isHorizontal = direction === 'horizontal';
  const translateValue = useSharedValue(0);
  const index = useSharedValue(0);

  useEffect(() => {
    if (autoSlide) {
      const timer = setInterval(() => {
        runOnJS(handleSlide)('next');
      }, 3000);
      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSlide]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: isHorizontal
        ? [{translateX: translateValue.value}]
        : [{translateY: translateValue.value}],
    };
  });

  const gestureHandler = Gesture.Pan().onEnd(event => {
    if (isHorizontal) {
      if (event.translationX < -50) {
        runOnJS(handleSlide)('next');
      } else if (event.translationX > 50) {
        runOnJS(handleSlide)('prev');
      }
    } else {
      if (event.translationY < -50) {
        runOnJS(handleSlide)('next');
      } else if (event.translationY > 50) {
        runOnJS(handleSlide)('prev');
      }
    }
  });

  const handleSlide = direction => {
    if (direction === 'next') {
      index.value = Math.min(images.length - 1, index.value + 1);
    } else if (direction === 'prev') {
      index.value = Math.max(0, index.value - 1);
    }
    translateValue.value = withTiming(
      -(isHorizontal ? width : height) * index.value,
      {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      },
    );
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <GestureDetector gesture={gestureHandler}>
        <Animated.View
          style={[{width, height: isHorizontal ? 250 : height * 0.5}]}>
          <Animated.View
            style={[
              {flexDirection: isHorizontal ? 'row' : 'column'},
              animatedStyle,
            ]}>
            {images.map((img, i) => (
              <Image
                key={i}
                source={{uri: img}}
                style={{
                  width,
                  height: isHorizontal ? 250 : height * 0.5,
                  resizeMode: 'cover',
                }}
              />
            ))}
          </Animated.View>
          {/* Dots */}
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
            {images.map((_, i) => (
              <Pressable
                key={i}
                onPress={() =>
                  runOnJS(handleSlide)(
                    index.value === i
                      ? 'stay'
                      : index.value < i
                      ? 'next'
                      : 'prev',
                  )
                }>
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    margin: 4,
                    backgroundColor: i === index.value ? 'white' : 'gray',
                  }}
                />
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContaier: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContaierExample2: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: undefined,
    aspectRatio: 1,
  },
  imageExample2: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.65636588,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  buttonText: {
    color: '#DAD3C8',
  },
  textContainer: {
    marginHorizontal: 20,
  },
  text: {
    color: '#000000',
    fontSize: 16,
  },
  textExample2: {
    color: '#000000',
    fontSize: 26,
  },
  textPrice: {
    color: '#000000',
    marginVertical: 20,
    fontSize: 16,
  },
});
