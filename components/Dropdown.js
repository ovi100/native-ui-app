import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { elevations } from '../lib/common';

const { height } = Dimensions.get('window');

const HEIGHT = height;

const Dropdown = ({
  options,
  onChange,
  placeholder = 'Select an option',
  searchable = false,
  position = 'bottom',
  elevation = 3,
  dropdownStyle = {},
}) => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const sharedHeight = useSharedValue(0);
  const rotateValue = useSharedValue(45);

  const normalizedOptions = useMemo(() => {
    return options.map(item =>
      typeof item === 'string' ? { label: item, value: item } : item,
    );
  }, [options]);

  const toggleDropdown = () => {
    setOpen(!open);
    sharedHeight.value = withTiming(
      open
        ? 0
        : searchable
          ? normalizedOptions.length * 45 + 50
          : options.length * 45,
      { duration: 300 },
    );
    rotateValue.value = withTiming(open ? 45 : 225, { duration: 300 });
  };

  const handleSelect = option => {
    setSelected(option.value);
    setSearchText('');
    setOpen(false);
    sharedHeight.value = withTiming(0, { duration: 300 });
    rotateValue.value = withTiming(45, { duration: 300 });
    onChange(option);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: sharedHeight.value,
  }));

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value}deg` }],
  }));

  const filteredOptions = normalizedOptions.filter(
    item =>
      item.label.toLowerCase().includes(searchText.toLowerCase()) ||
      item.value.toLowerCase().includes(searchText.toLowerCase()),
  );

  // console.log(dropdownStyle);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[dropdownStyle?.button ? dropdownStyle?.button : styles.button]}
        onPress={(e) => toggleDropdown()}
      >
        <Text style={dropdownStyle?.text ? dropdownStyle?.text : styles.text}>{selected || placeholder}</Text>
        <Animated.View style={[dropdownStyle?.icon ? dropdownStyle?.icon : styles.icon, rotateStyle]} />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.dropdown,
          position === 'top' ? styles.dropdownTop : styles.dropdownBottom,
          // { top: buttonLayout.height - 5 },
          elevations[elevation],
          animatedStyle,
        ]}>
        {open && searchable && (
          <TextInput
            style={styles.searchInput}
            placeholder="Search options"
            placeholderTextColor="#aaa"
            value={searchText}
            autoFocus={open}
            onChangeText={setSearchText}
          />
        )}
        {open && (
          <FlatList
            data={searchable ? filteredOptions : normalizedOptions}
            keyExtractor={item => item.value.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={[styles.flexRow, styles.option]}>
                <Text style={styles.text}>{item.label}</Text>
                {selected === item.value && <View style={styles.sign} />}
              </TouchableOpacity>
            )}
            initialNumToRender={10}
            ListEmptyComponent={
              searchable && (
                <Text style={styles.noResults}>No options found</Text>
              )
            }
          />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 'auto',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  dropdown: {
    position: 'absolute',
    width: '100%',
    maxHeight: HEIGHT * 0.5,
    backgroundColor: 'white',
    marginTop: 8,
    borderRadius: 8,
    // borderBottomLeftRadius: 8,
    // borderBottomRightRadius: 8,
    zIndex: 100,
  },
  dropdownTop: {
    bottom: '100%',
    marginBottom: 1,
  },
  dropdownBottom: {
    top: '100%',
    marginTop: 1,
  },
  icon: {
    width: 10,
    height: 10,
    borderColor: '#333',
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  searchInput: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sign: {
    width: 8,
    height: 14,
    borderBottomWidth: 2.5,
    borderRightWidth: 2.5,
    borderColor: 'green',
    transform: [{ rotate: '40deg' }],
    marginRight: 10,
  },
  noResults: {
    padding: 12,
    textAlign: 'center',
    color: '#777',
  },
});

export default Dropdown;
