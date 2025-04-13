import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {Eye, EyeOff} from '../icons';
import useAppContext from '../hooks/useAppContext';

const Input = ({isPassword = false, ...props}) => {
  const {deviceInfo} = useAppContext();
  const [secureText, setSecureText] = useState(isPassword);
  const isDarkMode = deviceInfo.theme === 'dark';
  const IconWrapper = secureText ? EyeOff : Eye;

  // console.log(props);

  return (
    <View className="relative">
      <TextInput
        className="h-14 md:h-16 border border-tb text-gray-400 text-xs xs:text-sm rounded-md px-4 mb-2"
        placeholderTextColor={props.placeholderTextColor || '#aaa'}
        secureTextEntry={secureText}
        {...props}
      />
      {isPassword && props.value && (
        <TouchableOpacity
          className="absolute top-4 md:top-5 right-4"
          onPress={() => setSecureText(prev => !prev)}>
          <IconWrapper size={5} color={isDarkMode ? '#aaa' : '#000'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
