import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import usePermissions from '../hooks/usePermissions';

const App = () => {
  usePermissions();
  const isDarkMode = useColorScheme() === 'dark';

  console.log('is dark mode', isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Halka UI Native</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default App;
