import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const LoadingBar = ({
  size = 'medium',
  variant = 'default',
  duration = 3000,
  edge = 'square',
}) => {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    const animate = () => {
      animatedProgress.value = withTiming(
        1,
        {
          duration,
          easing: Easing.linear,
        },
        () => {
          animatedProgress.value = 0;
          runOnJS(animate)();
        },
      );
    };
    runOnJS(animate)();
  }, [animatedProgress, duration]);

  const sizes = {
    small: { width: 50, height: 2, fontSize: 14 },
    medium: { width: 100, height: 4, fontSize: 16 },
    large: { width: 150, height: 6, fontSize: 18 },
  };

  const variants = {
    default: { track: '#e5e7eb', fill: '#374151' },
    brand: { track: '#e5e7eb', fill: '#c03221' },
    primary: { track: '#e5e7eb', fill: '#3b82f6' },
    secondary: { track: '#e5e7eb', fill: '#a855f7' },
    danger: { track: '#e5e7eb', fill: '#ef4444' },
    success: { track: '#e5e7eb', fill: '#22c55e' },
    warn: { track: '#e5e7eb', fill: '#ff8904' },
  };

  const edges = {
    square: 0,
    rounded: 6,
    capsule: 100,
  };

  const trackStyle = {
    backgroundColor: variants[variant].track,
    height: sizes[size].height,
    borderRadius: edges[edge],
  };

  const progressStyle = {
    position: 'absolute',
    width: sizes[size].width,
    height: sizes[size].height,
    backgroundColor: variants[variant].fill,
    borderRadius: edges[edge],
  };

  const animatedStyle = useAnimatedStyle(() => ({
    left: `${animatedProgress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={[styles.track, trackStyle]}>
        <Animated.View style={[styles.progress, animatedStyle, progressStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
});

export default LoadingBar;
