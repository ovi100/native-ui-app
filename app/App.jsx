import React, {useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import usePermissions from '../hooks/usePermissions';
import '../global.css';
// import { Button } from 'halka-test';
import Accordion from '../components/Accordion';
import CheckBox from '../components/CheckBox';
import CircularProgress from '../components/CircularProgress';
import ProgressBar from '../components/ProgressBar';
import Tab from '../components/Tab';
import Button from '../components/Button';
import {accordions, images, tabs} from '../data';
import BottomSheet from '../components/BottomSheet';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Toast, {showToast} from '../components/Toast';
import Carousel from '../components/Carousel';

const App = () => {
  // const [isChecked, setIsChecked] = useState(true);
  usePermissions();
  // const isDarkMode = useColorScheme() === 'dark';
  // const {height} = Dimensions.get('screen');
  // const bottomSheetRef = useRef();

  // const sheetHandler = useCallback(() => {
  //   bottomSheetRef.current.expand();
  // }, []);

  // console.log('is dark mode', isDarkMode);
  // console.log('device height', height, height * 0.8);

  return (
    // <SafeAreaProvider>
    <View className="bg-white flex-1 p-5">
      {/* <View className="mt-5">
          <Button text="open sheet" variant="action" onPress={() => sheetHandler()} />
        </View> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* {accordions.map((item, i) => {
          return <Accordion item={item} variant="brand" key={i} />;
        })}
        <View className="buttons flex-col gap-5 mt-5">
          <Button text="Button small" size="small" />
          <Button text="Button default" />
          <Button text="Button large" size="large" />
        </View>
        <View className="checkbox flex-row gap-5 mt-5">
          <CheckBox
            label="Small"
            size="small"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <CheckBox label="Medium" checked={isChecked} onChange={setIsChecked} />
          <CheckBox
            label="Large"
            size="large"
            checked={isChecked}
            onChange={setIsChecked}
          />
        </View>
        <View className="circular-progress flex-row gap-5 mt-5">
          <CircularProgress size="small" />
          <CircularProgress />
          <CircularProgress size="large" />
        </View>
        <View className="progress flex-col gap-5 mt-5">
          <ProgressBar size="small" />
          <ProgressBar />
          <ProgressBar size="large" />
        </View> */}
        <View className="tabs flex-col gap-5 mt-5">
          <Tab tabs={tabs} />
          <Tab tabs={tabs} tabTheme="square" variant="brand" />
          <Tab tabs={tabs} tabTheme="rounded" variant="primary" />
        </View>

        <View className="carousels flex-col gap-5 mt-5">
          <Carousel images={images} autoPlay={true} />
        </View>
      </ScrollView>

      <Button
        text="Show Success Toast"
        onPress={() =>
          showToast({
            message: 'This is a error message',
            type: 'error',
            animation: 'fadeIn',
            position: 'top',
            duration: 1000,
          })
        }
      />

      {/* <BottomSheet
        ref={bottomSheetRef}
        activeHeight={height}
        backgroundColor={'#f2f2f2'}
        backDropColor={'black'}>
        <View style={styles.container}>
          <View style={styles.imageContaier}>
            <Image
              source={{ uri: 'https://placehold.jp/500x500.png' }}
              style={styles.image}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>Royal Palm Sofa</Text>
            <Text style={styles.text}>Vissle dark Blue/Kabusa dark Navy</Text>
            <Text style={styles.textPrice}>Price: $100</Text>
          </View>
          <View>
            <Button text="ADD TO CART" variant="success" />
          </View>
        </View>
      </BottomSheet> */}
      <Toast />
    </View>
    // </SafeAreaProvider>
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
