import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { elevations } from '../lib/common';

const DEFAULT_SIZE = 30;
const DEFAULT_ON_COLOR = '#4CD964';
const DEFAULT_OFF_COLOR = '#E5E5EA';

const Switch = ({
  value,
  onChange,
  size = DEFAULT_SIZE,
  onColor = DEFAULT_ON_COLOR,
  offColor = DEFAULT_OFF_COLOR,
  type = 'square',
  disabled = false,
}) => {
  const TRACK_WIDTH = size * 1.8;
  const TRACK_HEIGHT = size;
  const THUMB_SIZE = size * 0.8;
  let MARGIN = type !== 'toggle' ? (TRACK_HEIGHT - THUMB_SIZE) / 2 : -1;
  MARGIN = value ? TRACK_WIDTH - THUMB_SIZE - MARGIN : MARGIN;

  const translateX = useSharedValue(MARGIN);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateX.value = withSpring(MARGIN, { damping: 15, mass: 1, stiffness: 150 });
  }, [value, translateX, TRACK_WIDTH, THUMB_SIZE, MARGIN]);

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { scale: scale.value },
    ],
  }));

  const animatedTrackStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(value ? onColor : offColor, { duration: 200 }),
    borderColor: withTiming(value ? onColor : offColor, { duration: 200 }),
  }));

  const handlePress = () => {
    if (disabled) { return; }
    onChange(!value);
  };

  const handlePressIn = () => {
    if (disabled) { return; }
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    if (disabled) { return; }
    scale.value = withTiming(1, { duration: 100 });
  };

  const getTypeStyles = () => {
    const newHeight = type === 'toggle' ? TRACK_HEIGHT / 2 : TRACK_HEIGHT;
    const newRadius = type === 'square' ? 4 : type === 'rounded' ? TRACK_HEIGHT / 2 : TRACK_HEIGHT / 4;
    return {
      track: {
        width: TRACK_WIDTH,
        height: newHeight,
        borderRadius: newRadius,
        borderWidth: type === 'toggle' ? 0 : 1,
      },
      thumb: {
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: type === 'square' ? 2 : '50%',
        backgroundColor: '#FFFFFF',
        top: type === 'toggle' ? -THUMB_SIZE / 4.3 : undefined,
        ...elevations[2],
      },
    };
  };

  const typeStyles = getTypeStyles();

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      hitSlop={10}
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.track,
            typeStyles.track,
            animatedTrackStyle,
            disabled && styles.disabledTrack,
          ]}
        />
        <Animated.View
          style={[
            styles.thumb,
            typeStyles.thumb,
            animatedThumbStyle,
            disabled && styles.disabledThumb,
          ]}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  track: {
    position: 'relative',
  },
  thumb: {
    position: 'absolute',
  },
  disabledTrack: {
    opacity: 0.5,
  },
  disabledThumb: {
    opacity: 0.5,
  },
});

export default Switch;
