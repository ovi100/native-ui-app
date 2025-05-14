import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useAppContext} from '../hooks';

const Input = ({isPassword = false, ...props}) => {
  const {deviceInfo} = useAppContext();
  const [secureText, setSecureText] = useState(isPassword);
  const isDarkMode = deviceInfo.theme === 'dark';

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
          <Text style={{color: isDarkMode ? '#aaa' : '#000'}}>
            {secureText ? 'hide' : 'show'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
