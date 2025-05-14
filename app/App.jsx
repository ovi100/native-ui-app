import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Text,
  View,
} from 'react-native';
import '../global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HotUpdater } from '@hot-updater/react-native';
import ProgressBar from '../components/ProgressBar';
import AppProvider from '../contexts/AppContext';
import Navigation from './screens/navigation/Navigation';
import { usePermissions } from '../hooks';


const App = () => {
  usePermissions();

  return (
    <AppProvider>
      <GestureHandlerRootView className="flex-1 bg-white">
        <Navigation />
      </GestureHandlerRootView>
    </AppProvider>
  );
};

export default HotUpdater.wrap({
  source: 'https://veztrsdcupuupewujfgr.supabase.co/functions/v1/update-server',
  requestHeaders: {
    // if you want to use the request headers, you can add them here
  },
  fallbackComponent: ({ progress, status }) => {
    const showModal = status === 'UPDATING' || status === 'CHECK_FOR_UPDATE';

    return (
      <Modal
        isOpen={showModal}
        showCloseButton={false}
        header="Live update is in progress">
        <View className="modal-content">
          {status === 'CHECK_FOR_UPDATE' && progress === 0 && (
            <>
              <ActivityIndicator size="large" color="#000" />
              <Text className="text-black text-center">
                Checking for Updates...
              </Text>
            </>
          )}
          {progress > 0 && (
            <>
              <Text className="text-base sm:text-sm md:text-lg text-black text-center font-medium">
                Applying the live update ensures you will get the latest version
                of the application.
              </Text>
              <Text className="text-xs md:text-base text-black text-center font-semibold my-2.5">
                Downloading ({progress})%
              </Text>
              <View className="">
                <ProgressBar progress={Math.round(progress * 100)} size="small" variant="success" />
              </View>
            </>
          )}

        </View>
      </Modal>
    );
  },
})(App);


// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageContaier: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageContaierExample2: {
//     marginHorizontal: 20,
//     marginBottom: 20,
//   },
//   image: {
//     width: '100%',
//     height: 250,
//     resizeMode: 'cover',
//   },
//   imageExample2: {
//     width: '100%',
//     height: undefined,
//     aspectRatio: 1.65636588,
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: '#000000',
//     padding: 16,
//     marginHorizontal: 20,
//     marginBottom: 20,
//     borderRadius: 16,
//   },
//   buttonText: {
//     color: '#DAD3C8',
//   },
//   textContainer: {
//     marginHorizontal: 20,
//   },
//   text: {
//     color: '#000000',
//     fontSize: 16,
//   },
//   textExample2: {
//     color: '#000000',
//     fontSize: 26,
//   },
//   textPrice: {
//     color: '#000000',
//     marginVertical: 20,
//     fontSize: 16,
//   },
//   modalContent: {
//     backgroundColor: '#ddd',
//     padding: 24,
//     borderRadius: 12,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 16,
//   },
//   message: {
//     color: '#ccc',
//     fontSize: 16,
//     marginTop: 8,
//   },
//   progress: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//     marginTop: 10,
//   },
// });
