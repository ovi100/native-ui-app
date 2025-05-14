import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../home/Home';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const screens = [
    {
      id: 'home',
      name: 'Home',
      component: Home,
      options: {},
    },
  ];

  return (
    <Stack.Navigator initialRouteName="Home">
      {screens.map(screen => (
        <Stack.Screen
          key={screen.id}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AppStack;
