import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {edges, sizes, variants} from '../utils/common';

/**
 * A customizable button component with support for size, variant, icons, loading, and disabled states.
 *
 * @param {Object} props - Button component props.
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] - Size of the button.
 * @param {'default' | 'brand' | 'primary' | 'secondary' | 'danger' | 'success' | 'warn' | 'cancel' | 'action'} [props.variant='default'] - Variant/style type of the button.
 * @param {string} [props.text='Button text'] - Text to display inside the button.
 * @param {'filled' | 'outline' | 'text' | 'icon'} [props.type='filled'] - Type of the button.
 * @param {'square' | 'rounded' | 'capsule'} [props.edge='rounded'] - Button edge style.
 * @param {string|null} [props.brandColor=null] - Custom brand color used when variant is 'brand'.
 * @param {() => void|null} [props.onPress=null] - Function to call when the button is pressed.
 * @param {React.ReactNode|null} [props.icon=null] - Optional icon to render inside the button.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {boolean} [props.loading=false] - Whether to show a loading indicator.
 *
 * @returns {JSX.Element} A styled button component.
 */
const Button = ({
  size = 'medium',
  variant = 'default',
  text = 'Button text',
  brandColor = null,
  onPress = null,
  icon = null,
  disabled = false,
  loading = false,
  edge = 'rounded',
  type = 'filled',
}) => {
  const Wrapper = !loading && !disabled ? TouchableOpacity : View;

  // Dynamic styles based on props
  const getDynamicContainerStyles = (s, v, d, bc) => {
    const backgroundColor =
      type === 'filled'
        ? v === 'brand' && bc
          ? bc
          : variants[v].bg
        : 'transparent';
    const borderColor =
      type === 'filled' || type === 'outline'
        ? v === 'brand' && bc
          ? bc
          : variants[v].bg
        : 'transparent';
    const borderWidth = type === 'filled' || type === 'outline' ? 1 : 0;
    const borderRadius = edges[edge];
    return {
      padding: type !== 'icon' ? sizes[s].space : 0,
      backgroundColor,
      borderColor,
      borderWidth,
      borderRadius,
      opacity: d ? 0.5 : 1,
    };
  };

  const getDynamicTextStyles = (s, v) => {
    const color = type === 'filled' ? variants[v].text : variants[v].bg;
    return {
      color,
      fontSize: sizes[s].fontSize,
    };
  };

  const dynamicContainerStyles = getDynamicContainerStyles(
    size,
    variant,
    disabled,
    brandColor,
  );
  const dynamicTextStyles = getDynamicTextStyles(size, variant);

  const iconStyle = {
    marginRight: type !== 'icon' ? 8 : 0,
  };

  return (
    <Wrapper
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, dynamicContainerStyles]}>
      {loading ? (
        <>
          <ActivityIndicator size="small" color="#FFF" />
          {text && (
            <Text style={[styles.loadingText, dynamicTextStyles]}>{text}</Text>
          )}
        </>
      ) : (
        <View style={styles.buttonContainer}>
          {icon && <View style={iconStyle}>{icon}</View>}
          {type !== 'icon' && (
            <Text style={[styles.buttonText, dynamicTextStyles]}>{text}</Text>
          )}
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
  },
  loadingText: {
    fontWeight: 'semibold',
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 700,
  },
});

export default Button;
