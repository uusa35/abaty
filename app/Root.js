import React from 'react';
import {Provider} from 'react-redux';
import {Store, PersistStore} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import {ReduxNetworkProvider} from 'react-native-offline';
console.disableYellowBox = true;

export const Abaty = () => (
  <PersistGate loading={null} persistor={PersistStore}>
    <Provider store={Store}>
      <ReduxNetworkProvider>
        <App />
      </ReduxNetworkProvider>
    </Provider>
  </PersistGate>
);
