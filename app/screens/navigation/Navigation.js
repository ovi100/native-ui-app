import {NavigationContainer} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import AppStack from './AppStack';
import {Dialog} from '../../../components';
// import AuthStack from './AuthStack';
// import {useAppContext} from '../../../hooks';

const Navigation = () => {
  // const {authInfo} = useAppContext();
  // const {isLoading, user} = authInfo;
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    const backAction = () => {
      setDialogVisible(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // if (isLoading) {
  //   return (
  //     <View className="bg-white flex-1 justify-center items-center">
  //       <ActivityIndicator size="large" color="#EB4B50" />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      {/* {user ? <AppStack /> : <AuthStack />} */}
      <AppStack />
      <Dialog
        isOpen={dialogVisible}
        modalHeader="Exit operations app"
        modalSubHeader="Press 'Cancel' to continue or 'Exit' to close the app."
        onClose={() => setDialogVisible(false)}
        onSubmit={() => BackHandler.exitApp()}
        leftButtonText="cancel"
        rightButtonText="exit"
      />
    </NavigationContainer>
  );
};

export default Navigation;
