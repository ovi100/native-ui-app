import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const PendingBar = ({duration = 3000}) => {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    const animate = () => {
      animatedProgress.value = withTiming(
        1,
        {
          duration,
          easing: Easing.linear,
        },
        () => {
          animatedProgress.value = 0;
          runOnJS(animate)();
        },
      );
    };
    runOnJS(animate)();
  }, [animatedProgress, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    left: `${animatedProgress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View style={[styles.progress, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  track: {
    width: '100%',
    height: 6,
    backgroundColor: '#E0DCE3',
    borderRadius: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    width: '20%',
    height: '100%',
    backgroundColor: '#5D4BA0',
    borderRadius: 0,
  },
});

export default PendingBar;
