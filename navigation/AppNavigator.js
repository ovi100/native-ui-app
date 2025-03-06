import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthRoute} from './AuthRoute';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthRoute />
    </NavigationContainer>
  );
};

export default AppNavigator;
