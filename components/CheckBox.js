import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

const CheckBox = ({
  label = '',
  checked = false,
  onChange = () => null,
  disabled = false,
  variant = 'default',
  size = 'medium',
  brandColor = '',
}) => {
  const sizes = {
    small: {
      box: {width: 20, height: 20},
      sign: {left: 4, width: 8, height: 12},
      fontSize: 14,
    },
    medium: {
      box: {width: 24, height: 24},
      sign: {left: 6, width: 8, height: 14},
      fontSize: 16,
    },
    large: {
      box: {width: 28, height: 28},
      sign: {left: 8, width: 8, height: 16},
      fontSize: 18,
    },
  };
  const variants = {
    default: {bg: '#000000', border: '#000000', sign: '#ffffff'},
    brand: {bg: '#4f46e5', border: '#4f46e5', sign: '#ffffff'},
    primary: {bg: '#3b82f6', border: '#3b82f6', sign: '#ffffff'},
    secondary: {bg: '#a855f7', border: '#a855f7', sign: '#ffffff'},
    danger: {bg: '#ef4444', border: '#ef4444', sign: '#ffffff'},
    success: {bg: '#22c55e', border: '#22c55e', sign: '#ffffff'},
    warn: {bg: '#fb923c', border: '#fb923c', sign: '#ffffff'},
    cancel: {bg: '#e5e7eb', border: '#374151', sign: '#ffffff'},
    action: {bg: '#bae6fd', border: '#1d4ed8', sign: '#ffffff'},
  };

  if (variant === 'brand' && brandColor) {
    variants[variant].bg = brandColor;
    variants[variant].border = brandColor;
    variants[variant].text = brandColor;
  }

  const Wrapper = !disabled ? Pressable : View;

  const dynamicCheckboxStyle = () => {
    let styles;
    if (checked) {
      styles = {
        borderColor: variants[variant].border,
        backgroundColor: variants[variant].bg,
      };
    } else {
      styles = {
        borderColor: '#d1d5db',
        backgroundColor: 'transparent',
      };
    }
    return styles;
  };

  return (
    <Wrapper style={[styles.container]} onPress={() => onChange(!checked)}>
      <View style={[styles.checkbox, sizes[size].box, dynamicCheckboxStyle()]}>
        {checked && (
          <View
            style={[
              styles.sign,
              sizes[size].sign,
              {borderColor: variants[variant].sign},
            ]}
          />
        )}
      </View>
      {label && (
        <Text style={[styles.label, {fontSize: sizes[size].fontSize}]}>
          {label}
        </Text>
      )}
    </Wrapper>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkbox: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 10,
  },
  sign: {
    position: 'absolute',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    transform: [{rotate: '40deg'}],
    marginRight: 10,
  },
  label: {
    color: '#000000',
  },
});
