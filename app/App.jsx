import React, { useState } from 'react';
import { ScrollView, Text, useColorScheme, View } from 'react-native';
import usePermissions from '../hooks/usePermissions';
import '../global.css';
// import { Button } from 'halka-test';
import Accordion from '../components/Accordion';
import CheckBox from '../components/CheckBox';
import CircularProgress from '../components/CircularProgress';
import ProgressBar from '../components/ProgressBar';
import Tab from '../components/Tab';
import Button from '../components/Button';

const App = () => {
  const [isChecked, setIsChecked] = useState(true);
  usePermissions();
  const isDarkMode = useColorScheme() === 'dark';

  console.log('is dark mode', isDarkMode);

  const accordionStyle = { color: '#fff', fontSize: 14 };

  const data = [
    {
      title: 'Accordion 1',
      content: (
        <View>
          <Text style={accordionStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      ),
    },
    {
      title: 'Accordion 2',
      content: (
        <View>
          <Text style={accordionStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      ),
    },
    {
      title: 'Accordion 2',
      content: (
        <View>
          <Text style={accordionStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      ),
    },
  ];

  const tabs = [
    {
      title: 'Tab 1',
      content: (
        <View className="mt-5">
          <Text className="text-lg">Content for Tab 1</Text>
        </View>
      ),
    },
    {
      title: 'Tab 2',
      content: (
        <View className="mt-5">
          <Text className="text-lg">Content for Tab 2</Text>
        </View>
      ),
    },
    {
      title: 'Tab 3',
      content: (
        <View className="mt-5">
          <Text className="text-lg">Content for Tab 3</Text>
        </View>
      ),
    },
  ];

  return (
    <View className="bg-white flex-1 p-5">
      {/* <Text className="text-3xl text-blue-500 font-semibold">
        Native UI
      </Text> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((item, i) => {
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
        </View>
        <View className="tabs flex-col gap-5 mt-5">
          <Tab tabs={tabs} />
          {/* <Tab tabs={tabs} tabTheme="modern" /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default App;
