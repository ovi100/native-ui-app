import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import usePermissions from '../hooks/usePermissions';
import '../global.css';
import { Button } from 'halka-test';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Drawer from '../components/Drawer';
import Dropdown from '../components/Dropdown';
import Menu from '../components/Menu';
import Tab from '../components/Tab';
import LoadingBar from '../components/LoadingBar';
import Switch from '../components/Switch';
import DataTable from '../components/DataTable';
import SwipeableRow from '../components/SwipeableRow';
const { width, height } = Dimensions.get('window');

const App = () => {
  usePermissions();
  const tabs = [
    {
      label: 'Details',
      content: (
        <View>
          <Text className="text-black text-lg py-5">Details Content</Text>
        </View>
      ),
    },
    {
      label: 'Odds',
      content: (
        <View>
          <Text className="text-black text-lg py-5">Odds Content</Text>
        </View>
      ),
    },
    {
      label: 'Lineups',
      content: (
        <View>
          <Text className="text-black text-lg py-5">Lineups Content</Text>
        </View>
      ),
    },
    {
      label: 'Knockout',
      content: (
        <View>
          <Text className="text-black text-lg py-5">Knockout Content</Text>
        </View>
      ),
    },
  ];
  const [squareEnabled, setSquareEnabled] = useState(false);
  const [roundedEnabled, setRoundedEnabled] = useState(true);
  const [toggleEnabled, setToggleEnabled] = useState(false);

  const columns = ['id', 'name', 'age'];
  const data = [
    { id: '3', name: 'Charlie', age: '28' },
    { id: '1', name: 'Alice', age: '25' },
    { id: '2', name: 'Bob', age: '30' },
    { id: '4', name: 'David', age: '35' },
    { id: '5', name: 'Eve', age: '22' },
    { id: '7', name: 'Grace', age: '27' },
    { id: '6', name: 'Frank', age: '40' },
    { id: '8', name: 'Hank', age: '32' },
    { id: '10', name: 'Jack', age: '33' },
    { id: '9', name: 'Ivy', age: '29' },
    { id: '3', name: 'Charlie', age: '28' },
    { id: '1', name: 'Alice', age: '25' },
    { id: '2', name: 'Bob', age: '30' },
    { id: '4', name: 'David', age: '35' },
    { id: '5', name: 'Eve', age: '22' },
    { id: '7', name: 'Grace', age: '27' },
    { id: '6', name: 'Frank', age: '40' },
    { id: '8', name: 'Hank', age: '32' },
    { id: '10', name: 'Jack', age: '33' },
    { id: '9', name: 'Ivy', age: '29' },
    { id: '3', name: 'Charlie', age: '28' },
    { id: '1', name: 'Alice', age: '25' },
    { id: '2', name: 'Bob', age: '30' },
    { id: '4', name: 'David', age: '35' },
    { id: '5', name: 'Eve', age: '22' },
    { id: '7', name: 'Grace', age: '27' },
    { id: '6', name: 'Frank', age: '40' },
    { id: '8', name: 'Hank', age: '32' },
    { id: '10', name: 'Jack', age: '33' },
    { id: '9', name: 'Ivy', age: '29' },
  ];

  const renderItem = ({ item }) => (
    <View className="flex-row items-center border-b border-gray-200 p-2.5">
      <Text className="w-1/3 text-base text-center text-black" numberOfLines={1}>
        {item.id}
      </Text>
      <Text className="w-1/3 text-black text-center text-base">
        {item.name}
      </Text>
      <Text className="w-1/3 text-black text-center text-base">
        {item.age}
      </Text>
    </View>
  );


  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <View className="bg-white flex-1 p-5">
        {/* <View className="switches flex-row items-center justify-around">
          <Switch
            value={squareEnabled}
            onChange={setSquareEnabled}
            type="square"
            size={30}
          />

          <Switch
            value={roundedEnabled}
            onChange={setRoundedEnabled}
            type="rounded"
            size={30}
          />

          <Switch
            value={toggleEnabled}
            onChange={setToggleEnabled}
            type="toggle"
            size={30}
          />
        </View> */}
        <View className="data-table flex-1 mt-5">
          {/* <DataTable columns={columns} initialData={data} /> */}
          <View className="flex-row items-center bg-gray-300 p-2 mb-2">
            {columns.map((col, index) => (
              <Text className="w-1/3 text-center text-base font-semibold capitalize" key={index}>{col}</Text>
            ))}
          </View>

          {/* Table Rows */}
          <FlatList
            data={data}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => <SwipeableRow item={item} columns={columns} />}
            initialNumToRender={10}
          // onEndReached={handleEndReached}
          // ListFooterComponent={data.length > 10 ? renderFooter : null}
          // ListFooterComponentStyle={styles.ListFooterStyle}
          // style={{ flex: 1 }}
          // contentContainerStyle={{ paddingBottom: 50 }}
          />
        </View>
      </View>
    </GestureHandlerRootView >
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
