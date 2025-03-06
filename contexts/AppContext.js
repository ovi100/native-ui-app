import React, {createContext} from 'react';
import useAuth from '../hooks/useAuth';
import useDnPicking from '../hooks/useDnPicking';
import useManual from '../hooks/useManual';
import useChallanInfo from '../hooks/useChallanInfo';
import useDeviceInfo from '../hooks/useDeviceInfo';

export const AppContext = createContext({});

const AppProvider = ({children}) => {
  const deviceInfo = useDeviceInfo();
  const authInfo = useAuth();
  const PickingInfo = useDnPicking();
  const manualInfo = useManual();
  const challanInfo = useChallanInfo();
  const contextValues = {
    deviceInfo,
    authInfo,
    PickingInfo,
    manualInfo,
    challanInfo,
  };
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
