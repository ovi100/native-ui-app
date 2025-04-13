import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Button from './Button';

const demoContent = {color: 'black', padding: 16, textAlign: 'center'};

const Dialog = ({
  isOpen = false,
  header = 'Dialog Header',
  subHeader = '',
  onClose = () => null,
  onSubmit = () => null,
  leftButtonText = 'Cancel',
  rightButtonText = 'Submit',
  children = null,
}) => {
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      statusBarTranslucent
      transparent>
      <View style={styles.container}>
        <View style={styles.dialog}>
          <View style={styles.dialogHeader}>
            <Text style={styles.headerText}>{header}</Text>
          </View>
          <View style={styles.dialogBody}>
            {subHeader && <Text style={styles.subHeaderText}>{subHeader}</Text>}
            {children && children}
          </View>
          <View style={styles.dialogFooter}>
            <View style={styles.actionButtonContainer}>
              <View style={styles.button}>
                <Button
                  text={leftButtonText}
                  size="small"
                  variant={
                    leftButtonText.toLowerCase() === 'cancel'
                      ? 'cancel'
                      : 'default'
                  }
                  onPress={onClose}
                />
              </View>
              <View style={styles.button}>
                <Button
                  text={rightButtonText}
                  size="small"
                  variant="action"
                  onPress={onSubmit}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Dialog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(39, 39, 42, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  dialog: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 6,
  },
  dialogHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 18,
    lineHeight: 28,
    color: 'black',
    textAlign: 'center',
    fontWeight: 700,
  },
  dialogBody: {
    marginTop: 12,
    paddingHorizontal: 20,
  },
  subHeaderText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontWeight: 600,
  },
  dialogFooter: {
    paddingHorizontal: 40,
    paddingBottom: 12,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  button: {
    width: '50%',
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    textTransform: 'capitalize',
  },
  cancelButton: {
    backgroundColor: '#e5e7eb',
    color: '#374151',
  },
  confirmButton: {
    backgroundColor: '#bae6fd',
    color: '#1d4ed8',
  },
  confirmButtonText: {
    backgroundColor: '#bae6fd',
    color: '#1d4ed8',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    textTransform: 'capitalize',
  },
});
