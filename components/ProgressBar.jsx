import React from 'react';
import {View} from 'react-native';

const defaultStyles = {
  containerBg: null,
  progressBg: null,
  height: null,
  edge: null,
};

const ProgressBar = ({progress, styles = defaultStyles}) => {
  let containerBg = styles.containerBg || 'bg-gray-300';
  let progressBg = styles.progressBg || 'bg-blue-600';
  let height = styles.height || 'h-1.5';
  let edge = styles.edge || 'rounded-full';

  return (
    <View
      className={`progress relative w-full ${containerBg} ${height} ${edge}`}>
      <View
        className={`absolute top-0 ${progressBg} ${height} ${edge}`}
        style={{width: `${progress}%`}}
      />
    </View>
  );
};

export default ProgressBar;
