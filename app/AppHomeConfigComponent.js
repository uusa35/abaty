import React, {
  Fragment,
  useCallback,
  useEffect,
  useContext,
  useState,
  useMemo,
} from 'react';
import {Linking} from 'react-native';
import {GlobalValuesContext} from './redux/GlobalValuesContext';
import {DispatchContext} from './redux/DispatchContext';
import {
  ABATI,
  ABATI_ONE_SIGNAL_APP_ID,
  MALLR,
  MALLR_ONE_SIGNAL_APP_ID,
  HOMEKEY,
  HOMKEY_ONE_SIGNAL_APP_ID,
  ESCRAP,
  ESCRAP_ONE_SIGNAL_APP_ID,
} from '../app';
import OneSignal from 'react-native-onesignal';
import {getPathForDeepLinking} from './helpers';
import {goDeepLinking, setDeepLinking, setPlayerId} from './redux/actions';
import validate from 'validate.js';

const AppHomeConfigComponent = () => {
  const {dispatch} = useContext(DispatchContext);
  const {bootStrapped, resetApp} = useContext(GlobalValuesContext);
  const [deviceId, setDeviceId] = useState('');
  const [device, setDevice] = useState('');
  const [signalId, setSignalId] = useState();

  useMemo(() => {
    if (ABATI) {
      setSignalId(ABATI_ONE_SIGNAL_APP_ID);
    } else if (MALLR) {
      setSignalId(MALLR_ONE_SIGNAL_APP_ID);
    } else if (HOMEKEY) {
      setSignalId(HOMKEY_ONE_SIGNAL_APP_ID);
    } else if (ESCRAP) {
      setSignalId(ESCRAP_ONE_SIGNAL_APP_ID);
    }
  }, [bootStrapped]);

  useEffect(() => {
    OneSignal.init(signalId);
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
    Linking.addEventListener('url', handleOpenURL);
  }, [bootStrapped]);

  const handleOpenURL = useCallback(event => {
    const {type, id} = getPathForDeepLinking(event.url);
    return dispatch(goDeepLinking({type, id}));
  });

  const onReceived = useCallback(notification => {
    __DEV__ ? console.log('Notification received: ', notification) : null;
  });

  const onOpened = useCallback(openResult => {
    if (__DEV__) {
      console.log('the whole thing', openResult.notification.payload);
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult.notification.payload.launchURL);
    }
    const notification = getPathForDeepLinking(
      openResult.notification.payload.launchURL,
    );
    dispatch(setDeepLinking(notification));
    setTimeout(() => {
      dispatch(goDeepLinking(notification));
    }, 1000);
  });

  const onIds = useCallback(
    device => {
      if (!validate.isEmpty(device)) {
        setDeviceId(device.userId);
        if (device.userId !== deviceId) {
          dispatch(setPlayerId(device.userId));
        }
      }
    },
    [deviceId],
  );

  return <Fragment></Fragment>;
};

export default AppHomeConfigComponent;
