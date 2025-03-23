import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../lib/tailwind/colors';
import { elevations } from '../lib/common';

const Box = ({ style, elevation, children }) => {
  // console.log(style.backgroundColor)
  const boxStyle = [
    styles.box,
    style,
    elevation !== undefined && elevations[elevation],
  ];

  return <View style={boxStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  box: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.gray[50],
  },
});

export default Box;
