import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const defaultProps = {
  label: '',
  checked: false,
  onChange: () => null,
  disabled: false,
  variant: 'default',
  size: 'medium',
};


const CheckBox = ({ label, checked, size, variant, onChange, disabled }) => {

  label = label || defaultProps.label;
  checked = checked || defaultProps.checked;
  onChange = onChange || defaultProps.onChange;
  disabled = disabled || defaultProps.disabled;
  size = size || defaultProps.size;
  variant = variant || defaultProps.variant;

  const sizes = {
    small: { box: 'w-5 h-5', sign: 'left-1 w-2 h-3', fontSize: 'text-sm' },
    medium: { box: 'w-6 h-6', sign: 'left-1.5 w-2 h-3.5', fontSize: 'text-base' },
    large: { box: 'w-7 h-7', sign: 'left-2 w-2 h-4', fontSize: 'text-lg' },
  };

  const variants = {
    default: { bg: 'bg-black', border: 'border-black', text: 'text-black' },
    brand: { bg: 'bg-brand', border: 'border-brand', text: 'text-brand' },
    primary: { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-500' },
    secondary: { bg: 'bg-purple-500', border: 'border-purple-500', text: 'text-purple-500' },
    danger: { bg: 'bg-red-500', border: 'border-red-500', text: 'text-red-500' },
    success: { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-500' },
    warn: { bg: 'bg-orange-400', border: 'border-orange-400', text: 'text-orange-500' },
  };

  const Wrapper = !disabled ? TouchableOpacity : View;

  return (
    <Wrapper
      className="flex-row items-center my-1.5"
      onPress={() => onChange(!checked)}>
      <View
        className={`checkbox relative items-center justify-center border-2 ${sizes[size].box} 
        ${checked ? `${variants[variant].bg} ${variants[variant].border}` : 'bg-transparent border-gray-300'} mr-2.5 rounded`}>
        {checked && (
          <View className={`absolute ${sizes[size].sign} border-white 
          border-b-2 border-r-2 rotate-[40deg] ease-in-out duration-500`} />
        )}
      </View>
      {label && (
        <Text
          // className={`${sizes[size].fontSize} ${checked ? 'text-black' : 'text-gray-400'} `}>
          className={`${sizes[size].fontSize} text-black`}>
          {label}
        </Text>
      )}
    </Wrapper>
  );
};

export default CheckBox;
