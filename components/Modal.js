import React from 'react';
import { Dimensions, Modal as RNModal, Text, TouchableOpacity, View } from 'react-native';
const { width } = Dimensions.get('window');

const defaultProps = {
  isOpen: false,
  showCloseButton: true,
  closeIcon: null,
  header: '',
  onPress: null,
  children: <Text className="p-4">This is modal children and it can be anything Ex: Text, View.......</Text>,
};

const Modal = ({
  isOpen,
  showCloseButton,
  closeIcon,
  header,
  onPress,
  children,
}) => {

  isOpen = isOpen || defaultProps.isOpen;
  showCloseButton = showCloseButton || defaultProps.showCloseButton;
  closeIcon = closeIcon || defaultProps.closeIcon;
  header = header || defaultProps.header;
  onPress = onPress || defaultProps.onPress;
  children = children || defaultProps.children;

  return (
    <RNModal
      visible={isOpen}
      animationType="fade"
      statusBarTranslucent
      transparent>
      <View className="bg-zinc-900/40 flex-1 items-center justify-center px-3">
        <View
          className={`relative ${width > 480 ? 'w-[95%]' : 'w-full'} h-auto bg-white rounded-md p-5`}>
          {header && (
            <View className="modal-header flex-row items-center">
              <Text className="flex-1 text-black text-base sm:text-lg md:text-2xl text-center font-semibold">
                {header}
              </Text>
              {showCloseButton && closeIcon && (
                <TouchableOpacity onPress={onPress}>
                  {closeIcon}
                </TouchableOpacity>
              )}
            </View>
          )}
          <View className={`modal-content ${header ? 'mt-3' : 'mt-0'}`}>
            {children}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;
