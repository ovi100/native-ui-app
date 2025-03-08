import React from 'react';
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
    <View className="bg-white flex-1 items-center justify-center">
      <Text className="text-3xl text-blue-500 font-semibold">
        Halka UI Native
      </Text>
      <Accordion title="Accordion" variant="primary">
        <Text className="text-3xl text-blue-500 font-semibold">
          Halka UI Native
        </Text>
      </Accordion>
    </View>
  );
};

export default App;
