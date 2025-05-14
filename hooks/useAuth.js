// import {API_URL} from '@env';
import {useState} from 'react';
import {version} from '../package.json';
import {Alert, useColorScheme} from 'react-native';

const useAuth = () => {
  const theme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // console.log('API URL', API_URL);

  const login = async (userId, password) => {
    try {
      setIsLoading(true);
      const userData = {userId, password, appVersion: version};
      // await fetch(API_URL + 'api/user/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(userData),
      // })
      //   .then(response => response.json())
      //   .then(async result => {
      //     if (result.status) {
      //       setUser(result.user);
      //       setToken(result.token);
      //     } else {
      //       Alert.alert(result.message);
      //     }
      //   })
      //   .catch(error => {
      //     const message = error.message.includes('JSON Parse error')
      //       ? 'Server is down'
      //       : error.message;
      //     Alert.alert(message);
      //   });
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoading(false);
  };

  const authInfo = {
    login,
    logout,
    user,
    setUser,
    token,
    version,
    theme,
  };

  return authInfo;
};

export default useAuth;
