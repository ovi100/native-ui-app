import React, { useState } from 'react';
import { Dimensions, Pressable, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { Easing, SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { edges, elevations } from '../lib/common';
import ButtonDots from './ButtonDots';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Menu = ({
  items,
  elevation = 3,
  position = 'left',
  menuButtonStyles = {
    size: 5,
    color: '#000',
    direction: 'horizontal',
    edge: 'circle',
  },
  showDivider = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonLayout, setButtonLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  const onButtonLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setButtonLayout({ x, y, width, height });
  };

  const getOverlayStyle = (pos) => {
    let style = { top: buttonLayout.height };
    if (pos === 'left') {
      style = { ...style, left: buttonLayout.x };
      return style;
    }

    if (pos === 'right') {
      style = { ...style, right: (buttonLayout.width - 16) - buttonLayout.width };
      return style;
    }

    return null;
  };

  const getMenuStyle = (pos) => {
    let style = { top: buttonLayout.y + buttonLayout.height, ...elevations[elevation] };
    if (pos === 'left') {
      style = { ...style, left: buttonLayout.x };
      return style;
    }

    if (pos === 'right') {
      style = { ...style, right: buttonLayout.x };
      return style;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {/* 3 Dots Button */}
      <ButtonDots
        buttonStyles={menuButtonStyles}
        onLayout={onButtonLayout}
        onPress={toggleMenu}
      />

      {isVisible && <Pressable style={[styles.overlay, getOverlayStyle(position)]} onPress={toggleMenu} />}

      {/* Menu Items */}
      {isVisible && (
        <Animated.View
          style={[styles.menu, getMenuStyle(position)]}
          entering={SlideInUp.duration(300).easing(Easing.ease)}
          exiting={SlideOutUp.duration(500).easing(Easing.ease)}
        >
          {items.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  item.onPress();
                  toggleMenu();
                }}
                style={styles.menuItem}
              >
                <Text style={styles.menuItemText}>{item.content}</Text>
              </TouchableOpacity>
              {showDivider && index < items.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </Animated.View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  overlay: {
    height: screenHeight,
    width: screenWidth,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
  menu: {
    minWidth: 200,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    zIndex: 50,
  },
  menuItem: {
    padding: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
  },
});

export default Menu;
