import React, {createContext} from 'react';
import {useAuth, useDevice} from '../hooks';

export const AppContext = createContext({});

const AppProvider = ({children}) => {
  const authInfo = useAuth();
  const deviceInfo = useDevice();

  const contextValues = {
    authInfo,
    deviceInfo,
  };
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
