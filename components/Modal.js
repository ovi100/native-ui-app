import React from 'react';
import {
  Dimensions,
  Modal as RNModal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ButtonClose from './ButtonClose';
const { width } = Dimensions.get('window');

const demoContent = { color: 'black', padding: 16, textAlign: 'center' };

const Modal = ({
  isOpen = false,
  showCloseButton = true,
  closeIcon = null,
  header = '',
  onPress = null,
  children = (
    <Text style={demoContent}>
      This is modal children and it can be anything Ex: Text, View.......
    </Text>
  ),
}) => {
  const getDynamicWidth = (w) => {
    return {
      width: w > 480 ? '95%' : '100%',
    };
  };

  const getContentStyles = () => {
    return {
      marginTop: header ? 12 : 0,
    };
  };

  return (
    <RNModal
      visible={isOpen}
      animationType="fade"
      statusBarTranslucent
      transparent>
      <View style={styles.container}>
        <View
          style={[styles.modal, getDynamicWidth(width)]}>
          {header && (
            <View style={styles.modalHeader}>
              <Text style={styles.headerText}>{header}</Text>
              {showCloseButton && (
                <ButtonClose onPress={onPress} />
              )}
            </View>
          )}
          <View style={getContentStyles()}>
            {children}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(39, 39, 42, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 20,
    height: 'auto',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '600',
  },
});
