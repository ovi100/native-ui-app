import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sizes, variants } from './common';

const Button = ({
  size = 'medium',
  variant = 'default',
  text = 'Button text',
  brandColor = null,
  onPress = null,
  icon = null,
  disabled = false,
  loading = false,
}) => {


  if (variant === 'brand' && brandColor) {
    variants[variant].bg = brandColor;
  }

  const Wrapper = !loading && !disabled ? TouchableOpacity : View;

  // Dynamic styles based on props
  const getDynamicContainerStyles = (s, v, d) => {
    return {
      padding: sizes[s].space,
      backgroundColor: variants[v].bg,
      opacity: d ? 0.5 : 1,
    };
  };

  const getDynamicTextStyles = (s, v) => {
    return {
      color: variants[v].text,
      fontSize: sizes[s].fontSize,
    };
  };

  const dynamicContainerStyles = getDynamicContainerStyles(size, variant, disabled);
  const dynamicTextStyles = getDynamicTextStyles(size, variant);

  return (
    <Wrapper
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, dynamicContainerStyles]}
    >
      {loading ? (
        <>
          <ActivityIndicator size="small" color="#FFF" />
          {text && <Text style={[styles.loadingText, dynamicTextStyles]}>{text}</Text>}
        </>
      ) : (
        <View style={styles.buttonContainer}>
          {icon && <View style={styles.buttonIcon}>{icon}</View>}
          <Text style={[styles.buttonText, dynamicTextStyles]}>{text}</Text>
        </View>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  loadingText: {
    fontWeight: 'semibold',
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontWeight: 'semibold',
  },
});

export default Button;
