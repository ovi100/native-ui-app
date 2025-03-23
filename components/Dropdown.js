import React, { useState } from 'react';
import {
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

const Dropdown = ({
  options,
  onSelect,
  placeholder = 'Select an option',
  searchable = true,
  elevation = 3,
}) => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const height = useSharedValue(0);
  const rotateValue = useSharedValue(45);

  const toggleDropdown = () => {
    setOpen(!open);
    height.value = withTiming(
      open ? 0 : searchable ? options.length * 45 + 50 : options.length * 45,
      { duration: 300 },
    );
    rotateValue.value = withTiming(open ? 45 : 225, { duration: 300 });
  };

  const handleSelect = option => {
    setSelected(option);
    setSearchText('');
    setOpen(false);
    height.value = withTiming(0, { duration: 300 });
    rotateValue.value = withTiming(45, { duration: 300 });
    onSelect(option);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value}deg` }],
  }));

  const filteredOptions = options.filter(item =>
    item.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <Text style={styles.text}>{selected || placeholder}</Text>
        <Animated.View style={[styles.icon, rotateStyle]} />
      </TouchableOpacity>

      <Animated.View style={[styles.dropdown, elevations[elevation], animatedStyle]}>
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
            data={searchable ? filteredOptions : options}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={styles.option}>
                <Text style={styles.text}>{item}</Text>
                {selected === item && <View style={styles.sign} />}
              </TouchableOpacity>
            )}
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
    width: '100%',
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    marginTop: 8,
    overflow: 'hidden',
    borderRadius: 8,
    // borderBottomLeftRadius: 8,
    // borderBottomRightRadius: 8,
    backgroundColor: 'white',
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
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
