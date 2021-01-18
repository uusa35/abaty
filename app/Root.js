import React from 'react';
import {Provider} from 'react-redux';
import {Store, PersistStore} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';
import {isLocal} from './env';
import SimpleSpinner from './components/SimpleSpinner';
console.ignoredYellowBox = ['Warning:'];

export const Root = () => (
  <PersistGate loading={<SimpleSpinner />} persistor={PersistStore}>
    <Provider store={Store}>
      {isLocal ? (
        <React.StrictMode>
          <App />
        </React.StrictMode>
      ) : (
        <App />
      )}
    </Provider>
  </PersistGate>
);
