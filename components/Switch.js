import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { elevations } from '../lib/common';

const Switch = ({
  size = 50,
  theme = 'm',
  trackColors = { on: '#4caf50', off: '#cccccc' },
  onToggle,
}) => {
  const [isOn, setIsOn] = useState(false);
  const translateX = useSharedValue(0);

  const handleToggle = () => {
    setIsOn(prev => !prev);
    translateX.value = withSpring(isOn ? 0 : theme === 'classic' ? size + (size * 0.1) : size + (size * 0.1), {
      velocity: 50,
    });
    if (onToggle) {
      onToggle(!isOn);
    }
  };

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const getContainerStyle = (ts, tc) => {
    return {
      position: 'relative',
      width: ts * 2,
      height: theme === 'classic' ? ts - (ts / 3) : ts,
      borderRadius: ts / 2,
      backgroundColor: isOn ? tc.on : tc.off,
      padding: 2,
      justifyContent: 'center',
    };
  };

  const getControlStyle = ts => {
    return {
      position: 'absolute',
      left: 0,
      top: theme === 'classic' ? -(ts / (ts * 0.1)) : 2,
      width: theme === 'classic' ? ts : ts - 5,
      height: theme === 'classic' ? ts : ts - 5,
      borderRadius: '50%',
      backgroundColor: 'white',
      ...elevations[3],
    };
  };

  return (
    <Pressable
      onPress={handleToggle}
      style={getContainerStyle(size, trackColors)}>
      <Animated.View style={[getControlStyle(size), thumbStyle]} />
    </Pressable>
  );
};

export default Switch;
