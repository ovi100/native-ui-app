import React, { useState } from "react";
import { View, Text, TouchableOpacity, LayoutChangeEvent } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const sizes = {
  small: { space: 10, fontSize: 14, iconSize: 4 },
  medium: { space: 14, fontSize: 16, iconSize: 6 },
  large: { space: 18, fontSize: 18, iconSize: 8 },
};

const variants = {
  default: { bg: "#d1d5db", text: "#1f2937", iconColor: "black" },
  brand: { bg: "#4f46e5", text: "white", iconColor: "white" },
  primary: { bg: "#3b82f6", text: "white", iconColor: "white" },
  secondary: { bg: "#a855f7", text: "white", iconColor: "white" },
  danger: { bg: "#ef4444", text: "white", iconColor: "white" },
  success: { bg: "#22c55e", text: "white", iconColor: "white" },
  warn: { bg: "#fb923c", text: "white", iconColor: "white" },
  cancel: { bg: "#e5e7eb", text: "#374151", iconColor: "white" },
  action: { bg: "#bae6fd", text: "#1d4ed8", iconColor: "white" },
};

const Accordion = ({ title, children, size = "medium", variant = "default" }) => {
  const [isActive, setIsActive] = useState(false);
  const height = useSharedValue(0);
  const [contentHeight, setContentHeight] = useState(0);

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(isActive ? contentHeight : 0, { duration: 300 }),
  }));

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  const { space, fontSize } = sizes[size] || sizes.medium;
  const { bg, text } = variants[variant] || variants.default;

  return (
    <View style={{ marginBottom: space, borderWidth: 1, borderRadius: 5, borderColor: bg }}>
      <TouchableOpacity
        onPress={() => setIsActive(!isActive)}
        style={{ padding: space, backgroundColor: bg }}
      >
        <Text style={{ fontSize, color: text }}>{title}</Text>
      </TouchableOpacity>
      <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
        <View style={{ padding: space }} onLayout={handleLayout}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export default Accordion;
