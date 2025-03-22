import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const Drawer = ({
  visible,
  onClose,
  position = 'left',
  children,
  width: customWidth,
  height: customHeight,
}) => {
  const drawerSize =
    position === 'top' || position === 'bottom'
      ? customHeight || height * 0.4
      : customWidth || width * 0.7;

  const getHiddenPosition = useCallback(() => {
    switch (position) {
      case 'top':
        return -drawerSize;
      case 'bottom':
        return drawerSize;
      case 'left':
        return -drawerSize;
      case 'right':
        return drawerSize;
      default:
        return 0;
    }
  }, [drawerSize, position]);

  const translate = useSharedValue(visible ? 0 : getHiddenPosition());

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform:
        position === 'top' || position === 'bottom'
          ? [{ translateY: translate.value }]
          : [{ translateX: translate.value }],
    };
  });

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (position === 'left' && event.translationX < 0) {
        translate.value = event.translationX;
      } else if (position === 'right' && event.translationX > 0) {
        translate.value = event.translationX;
      } else if (position === 'top' && event.translationY < 0) {
        translate.value = event.translationY;
      } else if (position === 'bottom' && event.translationY > 0) {
        translate.value = event.translationY;
      }
    })
    .onEnd(() => {
      if (Math.abs(translate.value) > drawerSize / 3) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

  const openDrawer = useCallback(() => {
    translate.value = withTiming(0);
  }, [translate]);

  const closeDrawer = useCallback(() => {
    translate.value = withTiming(getHiddenPosition(), {}, () => {
      runOnJS(onClose)();
    });
  }, [getHiddenPosition, onClose, translate]);

  useEffect(() => {
    if (visible) {
      openDrawer();
    } else {
      closeDrawer();
    }
  }, [closeDrawer, openDrawer, visible]);

  const showOverlay = () => {
    if (position === 'top' || position === 'bottom') {
      return height !== customHeight;
    } else {
      return width !== customWidth;
    }
  };

  console.log('overlay condition', showOverlay());

  return (
    <View style={styles.container}>
      {visible && showOverlay() && <Pressable style={styles.overlay} onPress={closeDrawer} />}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.drawer, getDrawerStyle(), animatedStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );

  function getDrawerStyle() {
    switch (position) {
      case 'top':
        return { top: 0, left: 0, right: 0, height: drawerSize };
      case 'bottom':
        return { bottom: 0, left: 0, right: 0, height: drawerSize };
      case 'left':
        return { left: 0, top: 0, bottom: 0, width: drawerSize };
      case 'right':
        return { right: 0, top: 0, bottom: 0, width: drawerSize };
      default:
        return {};
    }
  }
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    position: 'absolute',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Drawer;
