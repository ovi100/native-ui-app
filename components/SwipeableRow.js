import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const SwipeableRow = ({ item, columns, onDelete }) => {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = Math.max(-100, Math.min(0, event.translationX));
    })
    .onEnd(() => {
      translateX.value = translateX.value < -50 ? withTiming(-100) : withTiming(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.swipeContainer}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.row, animatedStyle]}>
          {columns.map((col, index) => (
            <Text key={index} style={styles.cell}>{item[col]}</Text>
          ))}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  swipeContainer: { flexDirection: 'row', alignItems: 'center', overflow: 'hidden' },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 7, backgroundColor: '#fff', flex: 1 },
  cell: { flex: 1, textAlign: 'center', fontSize: 14 },
  deleteButton: { backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', width: 100, height: '100%', position: 'absolute', right: 0, zIndex: -1 },
  deleteText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
});

export default SwipeableRow;
