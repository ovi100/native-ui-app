import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  measure,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {sizes, variants} from './common';

const accordionStyle = {color: '#fff', fontSize: 14};

const Accordion = ({
  item = {
    title: 'Accordion 1',
    content: (
      <View>
        <Text style={accordionStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>
    ),
  },
  size = 'medium',
  variant = 'default',
  brandColor = '',
}) => {
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const rotate = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  if (variant === 'brand' && brandColor) {
    variants[variant].bg = brandColor;
  }

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotate.value * 90}deg`}],
  }));

  const toggleContent = () => {
    if (heightValue.value === 0) {
      runOnUI(() => {
        'worklet';
        const measuredHeight = measure(listRef);
        if (measuredHeight) {
          heightValue.value = withTiming(measuredHeight.height);
        }
      })();
    } else {
      heightValue.value = withTiming(0);
    }
    open.value = !open.value;
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: variants[variant].bg,
          borderColor: variants[variant].bg,
        },
      ]}>
      <Pressable
        onPress={() => toggleContent()}
        style={[styles.titleContainer, {padding: sizes[size].space}]}>
        <Text
          style={{
            color: variants[variant].text,
            fontSize: sizes[size].fontSize,
          }}>
          {item.title}
        </Text>
        <Animated.View style={iconStyle}>
          <Icon
            name="chevron-forward-outline"
            size={sizes[size].iconSize}
            color={variants[variant].iconColor}
          />
        </Animated.View>
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View style={styles.contentContainer} ref={listRef}>
          <View
            style={[
              styles.content,
              {
                paddingHorizontal: sizes[size].space,
                paddingBottom: sizes[size].space,
              },
            ]}>
            {item.content}
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    overflow: 'hidden',
  },
  titleContainer: {
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  content: {
    backgroundColor: 'transparent',
  },
});
