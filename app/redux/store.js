import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import rootSaga from './actions/sagas';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import {navMiddleware} from './../AppNavigator';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {createNetworkMiddleware} from 'react-native-offline';
import {networkTransform} from './../redux/actions/api';

const persistConfig = {
  key: 'root',
  storage,
  transforms: [networkTransform],
  blacklist: ['message', 'countryModal', 'loginModal'] // navigation will not be persisted
  //whitelist: ['navigation', 'auth','isLoading','nav','roles','token','notification','notifications'] // only navigation will be persisted
};
let Store;
let PersistStore;
if (__DEV__) {
  // create our new saga monitor
  // and in your call to createSagaMiddlware, pass it along inside
  // the 1st parameter's object.
  const persistedReducer = persistReducer(persistConfig, reducers);
  const sagaMiddleware = createSagaMiddleware();
  const networkMiddleware = createNetworkMiddleware({
    queueReleaseThrottle: 200
  });
  const appLogger = createLogger({
    collapsed: true,
    duration: true
  });
  Store = createStore(
    persistedReducer,
    applyMiddleware(networkMiddleware, appLogger, sagaMiddleware, navMiddleware)
  );
  PersistStore = persistStore(Store);
  // Only in case you want to empty the store !!!
  // PresistStore.purge();
  // run the saga --> go to actions then calling the saga related function
  sagaMiddleware.run(rootSaga);
} else {
  const persistedReducer = persistReducer(persistConfig, reducers);
  const sagaMiddleware = createSagaMiddleware();
  const networkMiddleware = createNetworkMiddleware({
    queueReleaseThrottle: 200
  });
  Store = createStore(
    persistedReducer,
    applyMiddleware(networkMiddleware, sagaMiddleware, navMiddleware)
  );
  PersistStore = persistStore(Store);
  sagaMiddleware.run(rootSaga);
}

export {Store, PersistStore};
