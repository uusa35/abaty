import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import rootSaga from './actions/sagas';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import {navMiddleware} from './../AppNavigator';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
// import {createNetworkMiddleware} from 'react-native-offline';
import {networkTransform} from './../redux/actions/api';
import {composeWithDevTools} from 'redux-devtools-extension';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // transforms: [networkTransform],
  blacklist: [
    'message',
    'cart',
    'coupon',
    'shipment_fees',
    'countryModal',
    'loginModal',
    'isLoadingProfile',
    'isLoadingContent',
    'isLoading',
    'propertiesModal',
    'searchModal',
    'linking',
    'resetApp',
    'productFilterModal',
    'classifiedFilterModal',
    'companySearchTextInputModal',
    'isLoadingBoxedList',
    'showIntroduction',
    'isConnected',
    'bootStrapped',
    'commentModal',
  ], // navigation will not be persisted
  //whitelist: ['navigation', 'auth','isLoading','nav','roles','token','notification','notifications'] // only navigation will be persisted
  // throttle: 1000,
  debug: __DEV__,
};
let Store;
let PersistStore;
if (__DEV__) {
  // create our new saga monitor
  // and in your call to createSagaMiddlware, pass it along inside
  // the 1st parameter's object.
  const persistedReducer = persistReducer(persistConfig, reducers);
  const sagaMiddleware = createSagaMiddleware();
  // const networkMiddleware = createNetworkMiddleware({
  //   queueReleaseThrottle: 200,
  // });
  const appLogger = createLogger({
    collapsed: true,
    duration: true,
  });
  const composeEnhancers = composeWithDevTools({realtime: true, port: 8081});
  const createDebugger = require('redux-flipper').default;
  const createFlipperMiddleware = require('rn-redux-middleware-flipper')
    .default;
  Store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(
        // networkMiddleware,
        createDebugger(),
        createFlipperMiddleware(),
        appLogger,
        sagaMiddleware,
        navMiddleware,
      ),
    ),
  );
  PersistStore = persistStore(Store);
  sagaMiddleware.run(rootSaga);
} else {
  const persistedReducer = persistReducer(persistConfig, reducers);
  const sagaMiddleware = createSagaMiddleware();
  // const networkMiddleware = createNetworkMiddleware({
  //   queueReleaseThrottle: 200,
  // });
  Store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware, navMiddleware),
  );
  PersistStore = persistStore(Store);
  sagaMiddleware.run(rootSaga);
}

export {Store, PersistStore};
