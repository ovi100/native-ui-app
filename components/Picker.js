import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  Dimensions,
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Platform,
  Keyboard,
} from 'react-native';

const {height} = Dimensions.get('window');

const PickerItem = ({item, index, enableSearch, handleSelect}) => (
  <TouchableOpacity
    style={[styles.item, !enableSearch && index === 0 && {borderTopWidth: 0}]}
    onPress={() => handleSelect(item)}>
    <Text style={styles.text}>{item.label}</Text>
  </TouchableOpacity>
);

const Picker = ({
  options = [],
  onSelect,
  selectedValue,
  enableSearch = false,
  placeholder = 'Select an option',
}) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleSelect = useCallback(item => {
    setVisible(false);
    onSelect(item);
  }, [onSelect]);

  const formattedData = useMemo(() => {
    return options.map(item =>
      typeof item === 'string' ? {label: item, value: item} : item,
    );
  }, [options]);

  const filteredData = useMemo(() => {
    if (!enableSearch || !search.trim()) {
      return formattedData;
    }

    return formattedData.filter(
      item =>
        item.label.toLowerCase().includes(search.toLowerCase()) ||
        item.value.toLowerCase().includes(search.toLowerCase()),
    );
  }, [enableSearch, search, formattedData]);

  const renderItem = ({item, index}) => (
    <PickerItem
      item={item}
      index={index}
      enableSearch={enableSearch}
      handleSelect={handleSelect}
    />
  );

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.selectedText}>
          {selectedValue ? selectedValue.label : placeholder}
        </Text>
        <View
          style={[
            styles.icon,
            {transform: [{rotate: visible ? '225deg' : '45deg'}]},
          ]}
        />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, {top: keyboardStatus ? 40 : 0}]}>
            {filteredData.length > 0 && (
              <>
                {enableSearch && (
                  <TextInput
                    style={styles.searchInput}
                    placeholder="search an option....."
                    value={search}
                    onChangeText={setSearch}
                  />
                )}
                <FlatList
                  data={filteredData}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={renderItem}
                  keyboardShouldPersistTaps="handled"
                />
              </>
            )}
            {filteredData.length === 0 && (
              <View style={styles.emptyContent}>
                <Text style={styles.emptyContentMessage}>
                  No options is found!
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setVisible(false)}>
              <Text style={styles.cancelText}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Picker;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    marginVertical: 8,
  },
  selectedText: {
    fontSize: 15,
    color: '#333',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: height * 0.8,
    padding: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  searchInput: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 0,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
  },
  text: {
    color: '#333',
    fontWeight: '600',
  },
  icon: {
    width: 10,
    height: 10,
    borderColor: '#bdbdbd',
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  emptyContent: {
    padding: 15,
  },
  emptyContentMessage: {
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: 10,
  },
  cancelText: {
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
