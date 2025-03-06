import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/authentication/Login';
import Register from '../screens/authentication/Register';

const OPTIONS = {
  headerShown: true,
  headerShadowVisible: false,
  headerBackVisible: true,
  // headerTitleStyle: {
  //   fontSize: width >= 360 ? 18 : 14,
  // },
};

const AuthRoute = () => {
  const Stack = createNativeStackNavigator();

  const screens = [
    {
      name: 'Login',
      component: Login,
      options: {},
    },
    {
      name: 'Register',
      component: Register,
      options: {},
    },
    {
      name: 'ForgotPassword',
      component: null,
      options: {},
    },
    {
      name: 'ResetPassword',
      component: null,
      options: {},
    },
  ];

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Group>
        {screens.map(screen => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={OPTIONS}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthRoute;
