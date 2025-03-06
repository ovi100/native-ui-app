import React from 'react';
import {Text, useColorScheme, View} from 'react-native';
import usePermissions from '../hooks/usePermissions';
import '../global.css';

const App = () => {
  usePermissions();
  const isDarkMode = useColorScheme() === 'dark';

  console.log('is dark mode', isDarkMode);

  return (
    <View className="bg-white flex-1 items-center justify-center">
      <Text className="text-3xl text-blue-500 font-semibold">
        Halka UI Native
      </Text>
    </View>
  );
};

export default App;
