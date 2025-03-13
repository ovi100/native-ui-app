import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

let toastInstance = null;

const Toast = () => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-50);
  const toastData = useRef({ message: '', type: 'default', position: 'bottom', duration: 3000 });

  useEffect(() => {
    toastInstance = {
      show: ({ message, type = 'default', position = 'top', duration = 3000 }) => {
        toastData.current = { message, type, position, duration };

        opacity.value = withTiming(1, { duration: 300 });
        translateY.value = withTiming(0, { duration: 300 });

        if (duration !== 0) {
          setTimeout(() => hideToast(), duration);
        }
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opacity, translateY]);

  const hideToast = () => {
    opacity.value = withTiming(0, { duration: 300 });
    translateY.value = withTiming(-50, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        animatedStyle,
        getPositionStyle(toastData.current.position),
        getToastStyle(toastData.current.type),
      ]}
    >
      <Text style={styles.toastText}>{toastData.current.message}</Text>
      <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
        <View style={[styles.closeBar, styles.closeBarPosition1]} />
        <View style={[styles.closeBar, styles.closeBarPosition2]} />
      </TouchableOpacity>
    </Animated.View>
  );
};

// Function to get the instance of Toast
export const showToast = (options) => {
  if (toastInstance) {
    toastInstance.show(options);
  }
};

// Dynamic styles
const getPositionStyle = (position) => ({
  top: position === 'top' ? 10 : undefined,
  bottom: position === 'bottom' ? 10 : undefined,
  alignSelf: 'center',
});

const getToastStyle = (type) => {
  switch (type) {
    case 'success':
      return { backgroundColor: '#4CAF50' };
    case 'error':
      return { backgroundColor: '#F44336' };
    case 'warn':
      return { backgroundColor: '#FFC107' };
    case 'info':
      return { backgroundColor: '#2196F3' };
    default:
      return { backgroundColor: '#262626' };
  }
};

// Base styles
const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    width: width - 20,
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    position: 'relative',
    marginLeft: 10,
    padding: 4,
  },
  closeBar: {
    backgroundColor: '#fff',
    width: 20,
    height: 2,
    borderRadius: 2,
    margin: 2,
  },
  closeBarPosition1: {
    transform: [{ translateX: 6 },{ translateY: 1 }, { rotate: '45deg' }],
  },
  closeBarPosition2: {
    transform: [{ translateX: 6 },{ translateY: -5 },{ rotate: '-45deg' }],
  },
});

export default Toast;
