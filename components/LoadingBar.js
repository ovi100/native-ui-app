import React, { useEffect } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { edges } from '../lib/common';

const { width } = Dimensions.get('window');

const LoadingBar = ({
  height = 8,
  variant = 'default',
  duration = 3000,
  edge = 'square',
}) => {
  const translateX = useSharedValue(-width);
  const scaleX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, { duration, easing: Easing.linear }),
      -1,
      false
    );

    scaleX.value = withRepeat(
      withSequence(
        withTiming(1, { duration: duration, easing: Easing.linear }),
        withTiming(0, { duration: duration, easing: Easing.linear })
      ),
      -1
    );
  }, [duration, scaleX, translateX]);


  const variants = {
    default: { track: '#e5e7eb', fill: '#374151' },
    brand: { track: '#e5e7eb', fill: '#c03221' },
    primary: { track: '#e5e7eb', fill: '#3b82f6' },
    secondary: { track: '#e5e7eb', fill: '#a855f7' },
    danger: { track: '#e5e7eb', fill: '#ef4444' },
    success: { track: '#e5e7eb', fill: '#22c55e' },
    warn: { track: '#e5e7eb', fill: '#ff8904' },
  };

  const trackStyle = {
    height,
    backgroundColor: variants[variant].track,
    borderRadius: edges[edge],
  };

  const barStyle = {
    height,
    backgroundColor: variants[variant].fill,
    borderRadius: edges[edge],
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scaleX: scaleX.value }],
  }));

  return (
    <View style={[styles.container, trackStyle]}>
      <Animated.View style={[styles.bar, animatedStyle, barStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
  },
});

export default LoadingBar;
