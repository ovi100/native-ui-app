import React, {useState} from 'react';
import {
  Dimensions,
  View,
  Text,
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
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const Tab = ({
  tabs = null,
  tabTheme = 'classic',
  size = 'medium',
  variant = 'default',
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useSharedValue(0);

  const sizes = {
    small: {space: 6, fontSize: 14, iconSize: 14},
    medium: {space: 8, fontSize: 16, iconSize: 16},
    large: {space: 10, fontSize: 18, iconSize: 18},
  };

  const variants = {
    classic: {
      track: {backgroundColor: '#fff', borderColor: '#fff'},
      default: {
        text: '#6b7280',
        iconColor: '#000000',
        active: {
          button: {borderBottomWidth: 2, borderColor: '#374151'},
          text: {color: '#374151', fontWeight: 'semibold'},
        },
      },
      brand: {
        text: '#6b7280',
        iconColor: '#000000',
        active: {
          button: {borderBottomWidth: 2, borderColor: '#4f46e5'},
          text: {color: '#4f46e5', fontWeight: 'semibold'},
        },
      },
      primary: {
        text: '#6b7280',
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
        },
      },
      success: {
        text: 'text-gray-500',
        iconColor: '#000000',
        active: {
          button: 'border-b-2 border-green-500',
          text: 'text-green-500 font-medium',
        },
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

  const handleTabPress = index => {
    setActiveTab(index);
    translateX.value = withSpring(-width * index, {
      damping: 20,
      stiffness: 100,
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
          damping: 20,
          stiffness: 100,
        });
      }
    });

  const contentStyle = {width: width * tabs.length, flexDirection: 'row'};

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  if (tabs === null) {
    return null;
  }

  const tabButtonStyle = index => {
    if (activeTab === index) {
      return variants[tabTheme][variant].active.button;
    } else {
      return {};
    }
  };

  const tabButtonTextStyle = index => {
    if (activeTab === index) {
      return {
        fontSize: sizes[size].fontSize,
        ...variants[tabTheme][variant].active.text,
      };
    } else {
      return {
        fontSize: sizes[size].fontSize,
        color: variants[tabTheme][variant].active.text,
      };
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Tab Headers */}
      <View
        style={[
          styles.header,
          variants[tabTheme].track,
          {padding: sizes[size].space, fontSize: sizes[size].fontSize},
        ]}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleTabPress(index)}
            style={tabButtonStyle(index)}>
            <Text style={tabButtonTextStyle(index)}>{tab.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[contentStyle, animatedStyle]}>
          {tabs.map((tab, index) => (
            <View key={index} style={{width}}>
              {tab.content}
            </View>
          ))}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
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
