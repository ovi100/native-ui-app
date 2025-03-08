import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

const defaultProps = {
  isOpen: false,
  header: 'Dialog Header',
  subHeader: '',
  onClose: null,
  onSubmit: null,
  leftButtonText: 'Cancel',
  rightButtonText: 'Submit',
};
const Dialog = ({
  isOpen,
  header,
  subHeader,
  onClose,
  onSubmit,
  leftButtonText,
  rightButtonText,
  children,
}) => {
  isOpen = isOpen || defaultProps.isOpen;
  header = header || defaultProps.header;
  subHeader = subHeader || defaultProps.subHeader;
  onClose = onClose || defaultProps.onClose;
  onSubmit = onSubmit || defaultProps.onSubmit;
  leftButtonText = leftButtonText || defaultProps.leftButtonText;
  rightButtonText = rightButtonText || defaultProps.rightButtonText;
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      statusBarTranslucent
      transparent>
      <View className="bg-zinc-900/40 flex-1 items-center justify-center px-3">
        <View className="bg-white w-full rounded-md">
          <View className="dialog-header px-5 pt-5">
            <Text className="text-lg xs:text-xl text-black text-center font-bold">
              {header}
            </Text>
          </View>
          <View className="dialog-body mt-3 px-5">
            {!children && (
              <Text className="text-base text-black text-center font-medium">
                {subHeader}
              </Text>
            )}
            {children && children}
          </View>
          <View className="dialog-footer px-10 pb-3">
            <View className="action-button flex-row items-center justify-center gap-3">
              <View className="button w-1/2 py-3">
                <TouchableOpacity onPress={onClose}>
                  <Text
                    className={`${leftButtonText === 'cancel'
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-sky-200 text-blue-700'
                      } text-sm xs:text-base text-center font-bold rounded px-3 py-2 capitalize`}>
                    {leftButtonText}
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="button w-1/2 py-3">
                <TouchableOpacity onPress={onSubmit}>
                  <Text className="bg-sky-200 text-blue-700 text-sm xs:text-base text-center font-bold rounded px-3 py-2 capitalize">
                    {rightButtonText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Dialog;
