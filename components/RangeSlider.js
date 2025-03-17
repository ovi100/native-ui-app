import React, {useEffect} from 'react';
import {View, StyleSheet, Text, useWindowDimensions} from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolateColor,
} from 'react-native-reanimated';

const CONTROLLER_SIZE = 20; // Circle controller size

const RangeSlider = ({min = 0, max = 100, onChange}) => {
  const {width} = useWindowDimensions();
  const SLIDER_WIDTH = width * 0.9; // 90% of screen width

  const translateXPercent = useSharedValue(0); // Store percentage (0 to 100)
  const isActive = useSharedValue(0); // 0 = default, 1 = touched
  const value = useSharedValue(min); // Store the slider value

  useEffect(() => {
    runOnJS(onChange)?.({ value: min });
  }, []);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isActive.value = 1; // Change color when touched
    })
    .onChange(event => {
      // Convert movement to percentage
      const newXPercent = Math.max(
        0,
        Math.min(
          translateXPercent.value + (event.changeX / SLIDER_WIDTH) * 100,
          100,
        ),
      );
      translateXPercent.value = newXPercent;

      // Convert percentage to actual value
      value.value = Math.round((newXPercent / 100) * (max - min) + min);

      runOnJS(onChange)?.(value.value);
    })
    .onFinalize(() => {
      isActive.value = 0; // Reset color when released
    });

  // Animated styles for the controller
  const animatedControllerStyle = useAnimatedStyle(() => {
    const x = translateXPercent.value;
    const trackValue =
      x > 0
        ? (x / 100) * SLIDER_WIDTH - CONTROLLER_SIZE
        : (x / 100) * SLIDER_WIDTH;
    return {
      transform: [
        {
          translateX: withSpring(trackValue, {
            damping: 10,
            stiffness: 100,
          }),
        },
      ],
      backgroundColor: interpolateColor(
        isActive.value,
        [0, 1],
        ['#007AFF', '#FF3B30'],
      ), // Blue → Red
    };
  });

  // Calculate percentage of max value
  const animatedTrackStyle = useAnimatedStyle(() => ({
    width: `${((value.value - min) / (max - min)) * 100}%`, // Set width in percentage
  }));

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <Animated.Text style={styles.valueText}>{value.value}</Animated.Text>
        <View style={[styles.track, {width: SLIDER_WIDTH}]}>
          <Animated.View style={[styles.filledTrack, animatedTrackStyle]} />
          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={[styles.controller, animatedControllerStyle]}
            />
          </GestureDetector>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  track: {
    height: 6,
    backgroundColor: '#ddd',
    borderRadius: 3,
    marginTop: 10,
  },
  filledTrack: {
    height: 6,
    backgroundColor: '#007AFF',
    position: 'absolute',
    borderRadius: 3,
  },
  controller: {
    width: CONTROLLER_SIZE,
    height: CONTROLLER_SIZE - 5,
    borderRadius: 4, // Makes it a perfect circle
    position: 'absolute',
    top: -5, // Centers it with the track
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 4, // Shadow for Android
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default RangeSlider;
