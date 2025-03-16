import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const {width: DEVICE_WIDTH} = Dimensions.get('window');
const SLIDER_WIDTH = DEVICE_WIDTH - 40; // Add margin
const THUMB_SIZE = 30;

const RangeSlider = ({min = 0, max = 1000, step = 50, onChange}) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const stepsCount = Math.floor((max - min) / step);
  const stepWidth = SLIDER_WIDTH / stepsCount;

  const minX = useSharedValue(0);
  const maxX = useSharedValue(SLIDER_WIDTH - THUMB_SIZE); // Ensure maxX starts within range

  const snapToStep = value => {
    'worklet';
    return Math.round(value / stepWidth) * stepWidth;
  };

  const minGesture = Gesture.Pan()
    .onUpdate(event => {
      const newX = Math.min(
        Math.max(0, minX.value + event.translationX * 0.5),
        maxX.value - THUMB_SIZE,
      );
      minX.value = snapToStep(newX);

      const newMinValue = Math.round(
        (minX.value / SLIDER_WIDTH) * (max - min) + min,
      );
      runOnJS(setMinValue)(newMinValue);
      runOnJS(onChange)?.(newMinValue, maxValue);
    })
    .onEnd(() => {
      minX.value = withSpring(snapToStep(minX.value)); // Use spring for smooth effect
    });

  const maxGesture = Gesture.Pan()
    .onUpdate(event => {
      const newX = Math.max(
        Math.min(
          SLIDER_WIDTH - THUMB_SIZE,
          maxX.value + event.translationX * 0.5,
        ),
        minX.value + THUMB_SIZE,
      );
      maxX.value = snapToStep(newX);

      const newMaxValue = Math.round(
        (maxX.value / SLIDER_WIDTH) * (max - min) + min,
      );
      runOnJS(setMaxValue)(newMaxValue);
      runOnJS(onChange)?.(minValue, newMaxValue);
    })
    .onEnd(() => {
      maxX.value = withSpring(snapToStep(maxX.value));
    });

  const minThumbStyle = useAnimatedStyle(() => ({
    transform: [{translateX: minX.value}],
  }));

  const maxThumbStyle = useAnimatedStyle(() => ({
    transform: [{translateX: maxX.value}],
  }));

  const getDynamicWidth = () => ({
    width: Math.max(THUMB_SIZE, maxX.value - minX.value),
  });

  const activeTrackStyle = useAnimatedStyle(() => ({
    left: minX.value,
    width: Math.max(THUMB_SIZE, maxX.value - minX.value),
  }));

  console.log('screen width:', SLIDER_WIDTH);
  console.log('dynamic width:', getDynamicWidth());

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={[styles.labelContainer]}>
          <Text style={styles.label}>{minValue}</Text>
          <Text style={styles.label}>{maxValue}</Text>
        </View>

        <View style={[styles.track]}>
          <Animated.View style={[styles.activeTrack, activeTrackStyle]} />
        </View>

        <GestureDetector gesture={minGesture}>
          <Animated.View style={[styles.thumb, minThumbStyle]}>
            <View style={styles.thumbInner} />
          </Animated.View>
        </GestureDetector>

        <GestureDetector gesture={maxGesture}>
          <Animated.View style={[styles.thumb, maxThumbStyle, {right: -2}]}>
            <View style={styles.thumbInner} />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: SLIDER_WIDTH,
    alignItems: 'center',
    marginTop: 20,
  },
  labelContainer: {
    width: SLIDER_WIDTH - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginLeft: -15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  track: {
    width: SLIDER_WIDTH - THUMB_SIZE,
    height: 6,
    backgroundColor: '#ddd',
    borderRadius: 3,
    position: 'relative',
  },
  activeTrack: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#007AFF',
    zIndex: 0,
  },
  thumb: {
    position: 'absolute',
    top: 25,
    left: -12,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: 'rgba(0,122,255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999999,
  },
  thumbInner: {
    width: THUMB_SIZE - 10,
    height: THUMB_SIZE - 10,
    borderRadius: (THUMB_SIZE - 10) / 2,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RangeSlider;
