import React, { useEffect } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';
const { width } = Dimensions.get('window');

const defaultProps = {
  size: 'medium',
  variant: 'default',
  progress: 55,
  duration: 1000,
};

const CircularProgress = ({ size, variant, progress, duration }) => {
  const progressValue = useSharedValue(0);

  size = size || defaultProps.size;
  variant = variant || defaultProps.variant;
  progress = progress || defaultProps.progress;
  duration = duration || defaultProps.duration;

  const sizes = {
    small: { width: 0.1, fontSize: 'text-xs', strokeWidth: 5 },
    medium: { width: 0.18, fontSize: 'text-sm', strokeWidth: 8 },
    large: { width: 0.28, fontSize: 'text-base', strokeWidth: 11 },
  };

  const variants = {
    default: { track: '#e5e7eb', fill: '#374151', text: '#374151' },
    brand: { track: '#e5e7eb', fill: '#c03221', text: '#c03221' },
    primary: { track: '#e5e7eb', fill: '#3b82f6', text: '#3b82f6' },
    secondary: { track: '#e5e7eb', fill: '#a855f7', text: '#a855f7' },
    danger: { track: '#e5e7eb', fill: '#ef4444', text: '#ef4444' },
    success: { track: '#e5e7eb', fill: '#22c55e', text: '#22c55e' },
    warn: { track: '#e5e7eb', fill: '#ff8904', text: '#ff8904' },
    // custom: custom,
  };
  const SIZE = width * sizes[size].width; // Size of the circular progress
  const strokeWidth = sizes[size].strokeWidth; // Width of the progress bar
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
    const strokeDashoffset = circumference - (progressValue.value / 100) * circumference;
    return {
      strokeDashoffset,
    };
  });

  const styles = {
    textColor: { color: variants[variant].text },
  };

  return (
    <View className="items-center justify-center">
      <Svg width={SIZE} height={SIZE} className="-rotate-90">
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
      <Animated.View className="absolute">
        <Text className={`${sizes[size].fontSize} font-semibold`} style={styles.textColor}>
          {Math.round(progress)}%
        </Text>
      </Animated.View>
    </View>
  );
};

export default CircularProgress;
