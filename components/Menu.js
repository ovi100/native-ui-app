import React, { useState } from 'react';
import { Pressable, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const Menu = ({ items, showDivider = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonLayout, setButtonLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  const onButtonLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setButtonLayout({ x, y, width, height });
  };

  return (
    <View style={styles.container}>
      {/* 3 Dots Button */}
      <TouchableOpacity
        onPress={toggleMenu}
        style={styles.menuButton}
        onLayout={onButtonLayout}
      >
        <Text style={styles.menuButtonText}>...</Text>
      </TouchableOpacity>

      {isVisible && <Pressable className="h-full" onPress={toggleMenu} />}

      {/* Menu Items */}
      {isVisible && (
        <Animated.View
          style={[
            styles.menu,
            {
              top: buttonLayout.y + buttonLayout.height, // Position below the button
              left: buttonLayout.x, // Align with the button's left edge
            },
          ]}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
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
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
              {/* Render divider if not the last item and showDivider is true */}
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
  menuButton: {
    padding: 10,
  },
  menuButtonText: {
    fontSize: 24,
  },
  menu: {
    minWidth: 200,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    paddingVertical: 10,
  },
  menuItem: {
    padding: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: 'black',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
  },
});

export default Menu;
