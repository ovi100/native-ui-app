import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useAppContext from '../../hooks/useAppContext';
import Receiving from '../screens/home/receiving/Receiving';
import DocumentDetails from '../screens/home/receiving/DocumentDetails';
import ArticleDetails from '../screens/home/receiving/ArticleDetails';
import Profile from '../screens/home/profile/Profile';
import ChangePassword from '../screens/home/profile/ChangePassword';
import UpdateInfo from '../screens/home/profile/UpdateInfo';
import ChangeSite from '../screens/home/profile/ChangeSite';
import ChooseSite from '../screens/home/sites/ChooseSite';

const OPTIONS = {
  headerShown: true,
  headerShadowVisible: false,
  headerBackVisible: true,
  // headerTitleStyle: {
  //   fontSize: width >= 360 ? 18 : 14,
  // },
};

const MenuRoute = () => {
  const {authInfo} = useAppContext();
  const {user} = authInfo;
  const Stack = createNativeStackNavigator();
  const hasSite = user?.name && Array.isArray(user?.site);

  console.log('user', user);

  const screens = [
    {
      name: 'ChooseSite',
      component: ChooseSite,
      children: [],
    },
    {
      name: 'Receiving',
      component: Receiving,
      children: [
        {name: 'DocumentDetails', component: DocumentDetails},
        {name: 'ArticleDetails', component: ArticleDetails},
      ],
    },
    {
      name: 'Profile',
      component: Profile,
      children: [
        {name: 'ChangePassword', component: ChangePassword},
        {name: 'UpdateInfo', component: UpdateInfo},
        {name: 'ChangeSite', component: ChangeSite},
      ],
    },
  ];

  return (
    <Stack.Navigator initialRouteName={hasSite ? 'ChooseSite' : 'Home'}>
      <Stack.Group>
        {screens.map(screen => (
          <Stack.Screen
            key={screen.id}
            name={screen.name}
            component={screen.component}
            options={OPTIONS}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MenuRoute;
