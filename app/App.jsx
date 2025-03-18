import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import usePermissions from '../hooks/usePermissions';
import '../global.css';
import { Button } from 'halka-test';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Drawer from '../components/Drawer';
import { img1, img2, img3 } from '../images';
import Carousel from '../components/Carousel';
import Dropdown from '../components/Dropdown';
import PendingBar from '../components/PendingBar';
const { width, height } = Dimensions.get('window');

const App = () => {
  usePermissions();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const newImages = [img1, img2, img3];
  const [selectedValue, setSelectedValue] = useState(null);
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  return (
    <GestureHandlerRootView className="">
      <PendingBar duration={2000} />
      <View className="bg-white flex-1 p-5">
        {/* <View>
          <Carousel
            autoPlay
            images={newImages}
            // indicatorPosition="outside"
            indicatorType="dots"
          />
        </View> */}
        <Button
          text="Open Drawer"
          variant="action"
          onPress={() => setDrawerVisible(true)}
        />

        <View>
          <Text>Selected: {selectedValue || 'None'}</Text>
          <Dropdown options={options} onSelect={setSelectedValue} />
        </View>

        <Drawer
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          position="bottom"
          height={height}
        // width={width}
        >
          <View style={{ padding: 20 }}>
            <Text>Drawer Content</Text>
            <Button text="Close" onPress={() => setDrawerVisible(false)} />
          </View>
        </Drawer>
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
