import React, { useState } from 'react';
import {
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import { colors, lighten } from '../lib/common';

const { width } = Dimensions.get('window');

const Tab = ({
  tabs = null,
  theme = 'classic',
  size = 'medium',
  variant = 'default',
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useSharedValue(0);

  const sizes = {
    small: { space: 6, fontSize: 14, iconSize: 14 },
    medium: { space: 8, fontSize: 16, iconSize: 16 },
    large: { space: 10, fontSize: 18, iconSize: 18 },
  };

  const baseStyles = {
    text: '#6b7280',
    iconColor: '#000',
  };

  const activeButtonStyles = color => ({
    borderBottomWidth: 2,
    borderColor: color,
  });

  const activeTextStyles = color => ({
    color,
    fontWeight: 'semibold',
  });

  const activeBackgroundStyles = (color, borderRadius) => ({
    backgroundColor: color,
    borderRadius,
    color: '#FFF',
    fontWeight: 'medium',
    paddingHorizontal: 12,
    paddingVertical: 4,
  });

  const getTrackStyles = theme => {
    let styles = {
      backgroundColor: '#fff',
      borderColor: '#fff',
      borderRadius: 0,
    };
    const hexColor = lighten(colors[variant], 40);

    if (theme !== 'classic') {
      styles.backgroundColor = hexColor;
      styles.borderColor = hexColor;
      styles.borderRadius = theme === 'rounded' ? 100 : 8;
    }

    return styles;
  };

  const getActiveStyles = theme => {
    let styles = {};

    if (theme === 'classic') {
      styles.button = activeButtonStyles(colors[variant]);
      styles.text = activeTextStyles(colors[variant]);
    } else {
      const radius = theme === 'square' ? 6 : 100;
      styles.button = {};
      styles.text = activeBackgroundStyles(colors[variant], radius);
    }

    return styles;
  };

  const variants = {
    ...Object.fromEntries(
      Object.entries(colors).map(([key]) => [
        key,
        {
          ...baseStyles,
          active: getActiveStyles(theme),
        },
      ]),
    ),
  };

  const handleTabPress = index => {
    setActiveTab(index);
    translateX.value = withSpring(-width * index, {
      damping: 50,
      stiffness: 200,
    });
  };

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = -width * activeTab + event.translationX;
    })
    .onEnd(event => {
      if (event.translationX > 50 && activeTab > 0) {
        runOnJS(handleTabPress)(activeTab - 1);
      } else if (event.translationX < -50 && activeTab < tabs.length - 1) {
        runOnJS(handleTabPress)(activeTab + 1);
      } else {
        translateX.value = withSpring(-width * activeTab, {
          damping: 50,
          stiffness: 200,
        });
      }
    });

  const contentStyle = { width: width * tabs.length, flexDirection: 'row' };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const tabButtonStyle = index => {
    let styles = {
      alignItems: 'center',
      width: `${100 / tabs.length}%`,
    };
    if (theme === 'classic') {
      styles = {
        ...styles,
        paddingBottom: 5,
      };
    }
    if (activeTab === index) {
      styles = {
        ...styles,
        ...variants[variant].active.button,
      };
    }
    return styles;
  };

  const tabButtonTextStyle = index => {
    if (activeTab === index) {
      return {
        fontSize: sizes[size].fontSize,
        ...variants[variant].active.text,
      };
    } else {
      return {
        fontSize: sizes[size].fontSize,
        color: variants[variant].text,
      };
    }
  };

  if (tabs === null) {
    return null;
  }


  return (
    <View style={styles.container}>
      {/* Tab Headers */}
      <View
        style={[
          styles.header,
          getTrackStyles(theme),
          { padding: sizes[size].space, fontSize: sizes[size].fontSize },
        ]}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleTabPress(index)}
            style={tabButtonStyle(index)}>
            <Animated.Text
              style={tabButtonTextStyle(index)}>
              {tab.label}
            </Animated.Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[contentStyle, animatedStyle]}>
          {tabs.map((tab, index) => (
            <View key={index} style={{ width }}>
              {tab.content}
            </View>
          ))}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
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
