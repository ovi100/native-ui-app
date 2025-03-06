import {Dimensions, useColorScheme} from 'react-native';

const useDevice = () => {
  const theme = useColorScheme();
  const {width, height} = Dimensions.get('window');

  const deviceInfo = {
    theme,
    width,
    height,
  };

  return deviceInfo;
};

export default useDevice;
