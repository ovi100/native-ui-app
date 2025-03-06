import {useEffect} from 'react';
import {PermissionsAndroid, Platform, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const requestPermissions = async () => {
  try {
    // Check if permissions were already asked
    const isPermissionGranted = await AsyncStorage.getItem(
      'permissionsGranted',
    );

    if (isPermissionGranted === 'true') {
      return;
    }

    let permissions = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.REQUEST_INSTALL_PACKAGES,
    ];

    // Storage permission (Android 13+ does not require write permission)
    if (Platform.Version < 33) {
      permissions.push(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    } else {
      permissions.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
    }

    // Post Notifications (Only required for Android 13+)
    if (Platform.Version >= 33) {
      permissions.push(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }

    // Request permissions
    const result = await PermissionsAndroid.requestMultiple(permissions);

    console.log('Permissions request', result);

    // Check if all permissions are granted
    const granted = Object.values(result).every(
      status => status === PermissionsAndroid.RESULTS.GRANTED,
    );

    if (granted) {
      await AsyncStorage.setItem('permissionList', JSON.stringify(result));
      await AsyncStorage.setItem('permissionsGranted', 'true');
    } else {
      ToastAndroid.show('Some permissions were not granted');
    }
  } catch (error) {
    ToastAndroid.show(error.message);
  }
};

const usePermissions = () => {
  useEffect(() => {
    requestPermissions();
  }, []);
};

export default usePermissions;
