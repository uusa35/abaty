import React from 'react';
import {Provider} from 'react-redux';
import {Store, PersistStore} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import {ReduxNetworkProvider, NetworkProvider} from 'react-native-offline';

export const Abaty = () => (
  <PersistGate loading={null} persistor={PersistStore}>
    <Provider store={Store}>
      <ReduxNetworkProvider>
        <App />
      </ReduxNetworkProvider>
    </Provider>
  </PersistGate>
);
