import React from 'react';
import {Modal as RNModal, Text, TouchableOpacity, View} from 'react-native';

const Modal = ({
  isOpen,
  isNormal = true,
  withCloseButton = true,
  children,
  modalHeader = '',
  onPress = null,
}) => {
  const content = (
    <View className="bg-zinc-900/40 flex-1 items-center justify-center px-3">
      <View
        className={`relative w-full ${
          !isNormal ? 'top-3 h-[92%]' : 'h-auto'
        } bg-white rounded-md p-5`}>
        {modalHeader && (
          <View className="modal-header flex-row items-center">
            <Text className="flex-1 text-black text-base xs:text-lg text-center font-semibold">
              {modalHeader}
            </Text>
            {withCloseButton && (
              <TouchableOpacity onPress={onPress}>
                <Text className="text-gray-300 text-sm">close</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        <View className="modal-content mt-3">{children}</View>
      </View>
    </View>
  );
  return (
    <RNModal
      visible={isOpen}
      animationType="fade"
      statusBarTranslucent
      transparent>
      {content}
    </RNModal>
  );
};

export default Modal;
