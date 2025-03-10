import React, {useState} from 'react';
import {Text, useColorScheme, View} from 'react-native';
import usePermissions from '../hooks/usePermissions';
import '../global.css';
import {Button} from 'halka-test';
import Accordion from '../components/Accordion';

const App = () => {
  usePermissions();
  const isDarkMode = useColorScheme() === 'dark';

  console.log('is dark mode', isDarkMode);

  return (
    <View className="bg-white flex-1">
      <Text className="text-3xl text-blue-500 font-semibold">
        Halka UI Native
      </Text>
      <Accordion title="Accordion">
        <Text>The above collapsible component toggles the expanded/collapsed state when the user presses the panel header by using the expanded state field.</Text>
      </Accordion>
    </View>
  );
};

export default App;
