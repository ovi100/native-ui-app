import React, {useEffect, useRef, useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

const OtpInput = ({length = 4, type = 'box', focusColor = '', onOtpChange}) => {
  length = Math.round(length);
  const [otp, setOtp] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    setOtp(Array(length).fill(''));
  }, [length]);

  const handleChange = (text, index) => {
    // if (text.length > 1) {
    //   const pastedOtp = text.split('').slice(0, length);
    //   setOtp(pastedOtp);
    //   onOtpChange(pastedOtp.join(''));
    //   pastedOtp.forEach((digit, i) => {
    //     if (inputRefs.current[i]) { inputRefs.current[i].setNativeProps({ text: digit }); }
    //   });
    //   return;
    // }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onOtpChange(newOtp.join(''));

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste from clipboard
  // const handlePaste = async () => {
  //   const clipboardText = await Clipboard.getString();
  //   if (clipboardText.length === length) {
  //     const newCodes = clipboardText.split('');
  //     setOtp(newCodes);

  //     // Focus the last input
  //     inputRefs.current[length - 1].focus();

  //     // Trigger onComplete
  //     if (onOtpChange) {
  //       onOtpChange(newCodes.join(''));
  //     }
  //   }
  // };

  const getInputStyles = inputType => {
    let size = 100 / length;
    size = length > 5 ? size * 2.5 : length > 4 ? size * 2 : size * 1.7;
    let styles = {
      width: size,
      height: size,
    };

    if (inputType === 'box') {
      styles = {
        ...styles,
        borderWidth: 1.5,
        borderRadius: 4,
      };
    } else {
      styles = {
        ...styles,
        borderBottomWidth: 2,
      };
    }
    return styles;
  };

  const getFocusedStyles = index => {
    let styles;
    if (!focusColor) {
      styles = {
        borderColor: '#9ca3af',
      };
    } else {
      styles = {
        borderColor: focusedInput === index ? focusColor : '#9ca3af',
      };
    }
    return styles;
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={el => (inputRefs.current[index] = el)}
          style={[styles.input, getInputStyles(type), getFocusedStyles(index)]}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onFocus={() => setFocusedInput(index)}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 6,
    verticalAlign: 'middle',
  },
});

export default OtpInput;
