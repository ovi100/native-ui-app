import React, {useEffect, useState} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {Svg, Circle} from 'react-native-svg';

const {width} = Dimensions.get('window');

const CircularTimer = ({time = 30, size = 'medium', variant = 'default'}) => {
  const progress = useSharedValue(0);
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: time * 1000,
      easing: Easing.linear,
    });

    const interval = setInterval(() => {
      setRemainingTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [time, progress]);

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
  };

  const SIZE = width * sizes[size].width;
  const strokeWidth = sizes[size].strokeWidth;
  const radius = (SIZE - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  const getSvgStyle = s => {
    return {
      width: s,
      height: s,
      transform: [{rotate: '-90deg'}],
    };
  };

  return (
    <View style={styles.container}>
      <Svg style={getSvgStyle(SIZE)}>
        {/* Background Circle */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          stroke={variants[variant].track}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Circle */}
        <AnimatedCircle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          stroke={variants[variant].fill}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>
      <Animated.Text
        style={[
          styles.text,
          {color: variants[variant].text, fontSize: sizes[size].fontSize},
        ]}>
        {remainingTime}s
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  text: {
    position: 'absolute',
  },
});

export default CircularTimer;
