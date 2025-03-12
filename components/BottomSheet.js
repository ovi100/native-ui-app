import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {forwardRef, useImperativeHandle, useCallback} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const BottomSheet = forwardRef(
  ({activeHeight, children, backgroundColor, backDropColor}, ref) => {
    // If you're not using react-native-bars or a transparent Android navigation bar
    // you can remove the inset code below
    const inset = useSafeAreaInsets();
    const {height} = Dimensions.get('screen');
    const newActiveHeight = height - activeHeight;
    const topAnimation = useSharedValue(height);
    const context = useSharedValue(0);

    const expand = useCallback(() => {
      'worklet';
      topAnimation.value = withSpring(newActiveHeight, {
        damping: 100,
        stiffness: 400,
      });
    }, [newActiveHeight, topAnimation]);

    const close = useCallback(() => {
      'worklet';
      topAnimation.value = withSpring(height, {
        damping: 100,
        stiffness: 400,
      });
    }, [height, topAnimation]);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close],
    );

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });
    const backDropAnimation = useAnimatedStyle(() => {
      const opacity = interpolate(
        topAnimation.value,
        [height, newActiveHeight],
        [0, 0.5],
      );
      const display = opacity === 0 ? 'none' : 'flex';
      return {
        opacity,
        display,
      };
    });

    const pan = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value;
      })
      .onUpdate(event => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(context.value + event.translationY, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onEnd(() => {
        if (topAnimation.value > newActiveHeight + 50) {
          topAnimation.value = withSpring(height, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      });

    return (
      <GestureHandlerRootView style={styles.root}>
        <TouchableWithoutFeedback onPress={() => close()}>
          <Animated.View
            style={[
              styles.backDrop,
              backDropAnimation,
              {backgroundColor: backDropColor},
            ]}
          />
        </TouchableWithoutFeedback>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.container,
              animationStyle,
              {
                height: activeHeight,
                backgroundColor: backgroundColor,
                // If you're not using react-native-bars or a transparent Android navigation bar
                // you can remove the paddingBottom code below
                paddingBottom: inset.bottom,
              },
            ]}>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            {children}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    );
  },
);

export default BottomSheet;

const styles = StyleSheet.create({
  root: {flex: 1},
  container: {
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    left: 0,
    right: 0,
  },
  lineContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  backDrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'none',
  },
});
