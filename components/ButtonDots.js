import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { edges } from '../lib/common';

const ButtonDots = ({ buttonStyles, onPress, onLayout }) => {
  const { size, color, direction, edge } = buttonStyles;

  const getMenuButtonContainerStyle = () => {
    let style = {
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
      pending: 10,
    };

    return style;
  };

  const getMenuButtonStyle = () => {
    let style = {
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: edges[edge],
      // marginHorizontal: 5,
    };

    return style;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={getMenuButtonContainerStyle()}
      onLayout={onLayout}
    >
      <View style={getMenuButtonStyle()} />
      <View style={getMenuButtonStyle()} />
      <View style={getMenuButtonStyle()} />
    </TouchableOpacity>
  );
};

export default ButtonDots;
