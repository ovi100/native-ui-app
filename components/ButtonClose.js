import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';

const ButtonClose = ({ size = 20, color = '#ccc', onPress }) => {
  const getButtonStyle = (s, c) => {
    const height = s > 10 ? s / 10 : s;
    return {
      width: s,
      height,
      backgroundColor: c,
    };
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.closeButton}>
      <View style={[styles.closeBar, getButtonStyle(size, color), styles.closeBarPosition1]} />
      <View style={[styles.closeBar, getButtonStyle(size, color), styles.closeBarPosition2]} />
    </TouchableOpacity>
  );
};

export default ButtonClose;

const styles = StyleSheet.create({
  closeButton: {
    position: 'relative',
    marginLeft: 10,
    padding: 4,
  },
  closeBar: {
    borderRadius: 2,
    margin: 2,
  },
  closeBarPosition1: {
    transform: [{ translateX: 6 }, { translateY: 1 }, { rotate: '45deg' }],
  },
  closeBarPosition2: {
    transform: [{ translateX: 6 }, { translateY: -5 }, { rotate: '-45deg' }],
  },
});
