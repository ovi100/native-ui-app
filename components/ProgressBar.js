import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

const defaultProps = {
  size: 'medium',
  variant: 'default',
  progress: 55,
  duration: 1000,
  edge: 'rounded',
};

const ProgressBar = ({ size, variant, progress, edge, duration }) => {
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withTiming(progress, { duration: duration });
  }, [duration, progress, progressWidth]);

  size = size || defaultProps.size;
  variant = variant || defaultProps.variant;
  progress = progress || defaultProps.progress;
  duration = duration || defaultProps.duration;
  edge = edge || defaultProps.edge;

  const sizes = {
    small: { height: 'h-1.5', fontSize: 'text-sm' },
    medium: { height: 'h-2.5', fontSize: 'text-base' },
    large: { height: 'h-3.5', fontSize: 'text-lg' },
  };

  const variants = {
    default: { track: 'bg-gray-300', fill: 'bg-gray-700' },
    brand: { track: 'bg-gray-300', fill: 'bg-brand' },
    primary: { track: 'bg-gray-300 ', fill: 'bg-blue-500' },
    secondary: { track: 'bg-gray-300', fill: 'bg-purple-500' },
    danger: { track: 'bg-gray-300', fill: 'bg-red-500' },
    success: { track: 'bg-gray-300', fill: 'bg-green-500' },
    warn: { track: 'bg-gray-300', fill: 'bg-orange-400' },
  };

  const edges = {
    square: 'rounded-none',
    medium: 'rounded-md',
    rounded: 'rounded-full',
  };

  return (
    <View className={`relative w-full ${variants[variant].track} ${sizes[size].height} ${edges[edge]}`}>
      <Animated.View
        style={{ width: `${progress}%` }}
        className={`h-full ${variants[variant].fill} ${edges[edge]}`}
      />
    </View>
  );
};

export default ProgressBar;
