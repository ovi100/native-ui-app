import React, {useState} from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import usePermissions from '../hooks/usePermissions';
import '../global.css';
import {Button} from 'halka-test';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Drawer from '../components/Drawer';
import Dropdown from '../components/Dropdown';
import Menu from '../components/Menu';
import Box from '../components/Box';
import SwipeTabs from '../components/SwipeTabs';
const {width, height} = Dimensions.get('window');

const App = () => {
  usePermissions();
  // const [drawerVisible, setDrawerVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
  const menuItems = [
    {label: 'Option 1', onPress: () => console.log('Option 1 pressed')},
    {label: 'Option 2', onPress: () => console.log('Option 2 pressed')},
    {label: 'Option 3', onPress: () => console.log('Option 3 pressed')},
  ];

  const tabs = [
    {
      label: 'Details',
      content: (
        <View>
          <Text style={{color: 'white'}}>Details Content</Text>
        </View>
      ),
    },
    {
      label: 'Odds',
      content: (
        <View>
          <Text style={{color: 'white'}}>Odds Content</Text>
        </View>
      ),
    },
    {
      label: 'Lineups',
      content: (
        <View>
          <Text style={{color: 'white'}}>Lineups Content</Text>
        </View>
      ),
    },
    {
      label: 'Knockout',
      content: (
        <View>
          <Text style={{color: 'white'}}>Knockout Content</Text>
        </View>
      ),
    },
  ];

  return (
    <GestureHandlerRootView className="">
      <View className="bg-white flex-1 p-5">
        <Menu items={menuItems} />
        <SwipeTabs tabs={tabs} />
      </View>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContaier: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContaierExample2: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  imageExample2: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.65636588,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  buttonText: {
    color: '#DAD3C8',
  },
  textContainer: {
    marginHorizontal: 20,
  },
  text: {
    color: '#000000',
    fontSize: 16,
  },
  textExample2: {
    color: '#000000',
    fontSize: 26,
  },
  textPrice: {
    color: '#000000',
    marginVertical: 20,
    fontSize: 16,
  },
});
