import React, {useState} from 'react';
import {Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const Switch = ({
  size = 50,
  trackColors = {on: '#4caf50', off: '#cccccc'},
  onToggle,
}) => {
  const [isOn, setIsOn] = useState(false);
  const translateX = useSharedValue(0);

  const handleToggle = () => {
    setIsOn(prev => !prev);
    translateX.value = withSpring(isOn ? 0 : size, {
      velocity: 50,
    });
    if (onToggle) {
      onToggle(!isOn);
    }
  };

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const getContainerStyle = (ts, tc) => {
    return {
      width: ts * 2,
      height: ts,
      borderRadius: ts / 2,
      backgroundColor: isOn ? tc.on : tc.off,
      padding: 2,
      justifyContent: 'center',
    };
  };

  const getControlStyle = ts => {
    return {
      width: ts - 5,
      height: ts - 5,
      borderRadius: '50%',
      backgroundColor: 'white',
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
