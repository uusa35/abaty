import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import rootSaga from './actions/sagas';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'message',
    'cart',
    'branch',
    'branches',
    'pickup',
    'coupon',
    'player_id',
    'shipment_fees',
    'countryModal',
    'currencyModal',
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
  const persistedReducer = persistReducer(persistConfig, reducers);
  const sagaMiddleware = createSagaMiddleware();
  const appLogger = createLogger({
    collapsed: true,
    duration: true,
  });
  const composeEnhancers = composeWithDevTools({realtime: true, port: 8081});
  const createDebugger = require('redux-flipper').default;
  const createFlipperMiddleware =
    require('rn-redux-middleware-flipper').default;
  Store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(
        // networkMiddleware,
        createDebugger(),
        createFlipperMiddleware(),
        appLogger,
        sagaMiddleware,
      ),
    ),
  );
  PersistStore = persistStore(Store);
  sagaMiddleware.run(rootSaga);
} else {
  const persistedReducer = persistReducer(persistConfig, reducers);
  const sagaMiddleware = createSagaMiddleware();
  Store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  PersistStore = persistStore(Store);
  sagaMiddleware.run(rootSaga);
}

export {Store, PersistStore};
