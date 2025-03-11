import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {Svg, Circle} from 'react-native-svg';
const {width} = Dimensions.get('window');

const CircularProgress = ({
  size = 'medium',
  variant = 'default',
  progress = 75,
  duration = 1000,
}) => {
  const progressValue = useSharedValue(0);

  const sizes = {
    small: {width: 0.15, fontSize: 12, strokeWidth: 6},
    medium: {width: 0.2, fontSize: 14, strokeWidth: 8},
    large: {width: 0.25, fontSize: 16, strokeWidth: 10},
  };

  const variants = {
    default: {track: '#e5e7eb', fill: '#374151', text: '#374151'},
    brand: {track: '#e5e7eb', fill: '#c03221', text: '#c03221'},
    primary: {track: '#e5e7eb', fill: '#3b82f6', text: '#3b82f6'},
    secondary: {track: '#e5e7eb', fill: '#a855f7', text: '#a855f7'},
    danger: {track: '#e5e7eb', fill: '#ef4444', text: '#ef4444'},
    success: {track: '#e5e7eb', fill: '#22c55e', text: '#22c55e'},
    warn: {track: '#e5e7eb', fill: '#ff8904', text: '#ff8904'},
    // custom: custom,
  };
  const SIZE = width * sizes[size].width;
  const strokeWidth = sizes[size].strokeWidth;
  const radius = (SIZE - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  // Animate the progress value
  useEffect(() => {
    progressValue.value = withTiming(progress, {
      duration: duration,
      easing: Easing.linear,
    });
  }, [duration, progress, progressValue]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset =
      circumference - (progressValue.value / 100) * circumference;
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} style={styles.svg}>
        {/* Background Circle */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          stroke={variants[variant].track}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <AnimatedCircle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          stroke={variants[variant].fill}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>
      <Animated.View style={styles.progress}>
        <Text
          style={[
            styles.progressText,
            {color: variants[variant].text, fontSize: sizes[size].fontSize},
          ]}>
          {Math.round(progress)}%
        </Text>
      </Animated.View>
    </View>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    transform: [{rotate: '-90deg'}],
  },
  progress: {
    position: 'absolute',
  },
  progressText: {
    fontWeight: 'semibold',
  },
  label: {
    color: '#000000',
  },
});
