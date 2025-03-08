import React, { useState } from 'react';
import { Dimensions, View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const defaultProps = {
  tabs: null,
  tabTheme: 'classic',
  size: 'medium',
  variant: 'default',
};

const Tab = ({ tabs, tabTheme, size, variant }) => {
  if (tabs === null) { return null };
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useSharedValue(0);

  size = size || defaultProps.size;
  variant = variant || defaultProps.variant;
  tabTheme = tabTheme || defaultProps.tabTheme;

  const sizes = {
    small: { space: 'p-1', fontSize: 'text-sm', iconSize: 4 },
    medium: { space: 'p-2', fontSize: 'text-base', iconSize: 6 },
    large: { space: 'p-3', fontSize: 'text-lg', iconSize: 8 },
  };

  const variants = {
    classic: {
      track: 'bg-white border-white',
      default: {
        text: 'text-gray-500',
        iconColor: '#000000',
        active: {
          button: 'border-b-2 border-gray-700',
          text: 'text-gray-700 font-medium',
        },
      },
      brand: {
        text: 'text-gray-500',
        iconColor: '#000000',
        active: {
          button: 'border-b-2 border-brand',
          text: 'text-brand font-medium',
        },
      },
      primary: {
        text: 'text-gray-500',
        iconColor: '#000000',
        active: {
          button: 'border-b-2 border-blue-500',
          text: 'text-blue-500 font-medium',
        },
      },
      secondary: {
        text: 'text-gray-500',
        iconColor: '#000000',
        active: {
          button: 'border-b-2 border-purple-500',
          text: 'text-purple-500 font-medium',
        },
      },
      danger: {
        text: 'text-gray-500',
        iconColor: '#000000',
        active: {
          button: 'border-b-2 border-red-500',
          text: 'text-red-500 font-medium',
        }
      },
      success: {
        text: 'text-gray-500',
        iconColor: '#000000',
        active: {
          button: 'border-b-2 border-green-500',
          text: 'text-green-500 font-medium',
        }
      },
    },
    modern: {
      track: 'bg-gray-300 border-gray-300',
      default: {
        text: 'text-gray-500',
        iconColor: '#FFF',
        active: {
          button: '',
          text: 'bg-gray-700 text-white font-medium rounded-full px-4 py-1',
        },
      },
      brand: {
        text: 'text-gray-500',
        iconColor: '#FFF',
        active: {
          button: '',
          text: 'bg-brand text-white font-medium rounded-full px-4 py-1',
        },
      },
      primary: {
        text: 'text-gray-500',
        iconColor: '#FFF',
        active: {
          button: '',
          text: 'bg-blue-500 text-white font-medium rounded-full px-4 py-1',
        },
      },
      secondary: {
        text: 'text-gray-500',
        iconColor: '#FFF',
        active: {
          button: '',
          text: 'bg-purple-500 text-white font-medium rounded-full px-4 py-1',
        },
      },
      danger: {
        text: 'text-gray-500',
        iconColor: '#FFF',
        active: {
          button: '',
          text: 'bg-red-500 text-white font-medium rounded-full px-4 py-1',
        },
      },
      success: {
        text: 'text-gray-500',
        iconColor: '#FFF',
        active: {
          button: '',
          text: 'bg-green-500 text-white font-medium rounded-full px-4 py-1',
        },
      },
    },
  };

  const handleTabPress = (index) => {
    setActiveTab(index);
    translateX.value = withSpring(-width * index, { damping: 20, stiffness: 100 });
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = -width * activeTab + event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > 50 && activeTab > 0) {
        runOnJS(handleTabPress)(activeTab - 1);
      } else if (event.translationX < -50 && activeTab < tabs.length - 1) {
        runOnJS(handleTabPress)(activeTab + 1);
      } else {
        translateX.value = withSpring(-width * activeTab, { damping: 20, stiffness: 100 });
      }
    });

  const contentStyle = { width: width * tabs.length, flexDirection: 'row' };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View className="flex-1">
      {/* Tab Headers */}
      <View className={`tab-header flex-row items-center justify-between border ${variants[tabTheme].track} ${sizes[size].space} rounded-full`}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleTabPress(index)}
            className={`${activeTab === index ? `${variants[tabTheme][variant].active.button}` : ''}`}
          >
            <Text className={`${sizes[size].fontSize} ${activeTab === index ? `${variants[tabTheme][variant].active.text}` : `${variants[tabTheme][variant].text}`}`}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[contentStyle, animatedStyle]}
        >
          {tabs.map((tab, index) => (
            <View key={index} style={{ width }} className="">
              {tab.content}
            </View>
          ))}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Tab;