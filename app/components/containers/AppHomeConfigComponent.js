import React, {
  Fragment,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {Linking} from 'react-native';
import {
  ABATI,
  ABATI_ONE_SIGNAL_APP_ID,
  MALLR,
  MALLR_ONE_SIGNAL_APP_ID,
  HOMEKEY,
  HOMKEY_ONE_SIGNAL_APP_ID,
  ESCRAP,
  ESCRAP_ONE_SIGNAL_APP_ID,
  EXPO,
  EXPO_ONE_SIGNAL_APP_ID,
  DAILY,
  DAILY_ONE_SIGNAL_APP_ID,
} from '../../../app';
import OneSignal from 'react-native-onesignal';
import {getPathForDeepLinking} from './../../helpers';
import {
  goDeepLinking,
  setDeepLinking,
  setPlayerId,
} from './../../redux/actions';
import validate from 'validate.js';
import analytics from '@react-native-firebase/analytics';
import {useDispatch, useSelector} from 'react-redux';

const AppHomeConfigComponent = () => {
  const dispatch = useDispatch();
  const {bootStrapped, resetApp, playerId, linking} = useSelector(
    (state) => state,
  );
  const [deviceId, setDeviceId] = useState('');
  const [device, setDevice] = useState('');
  const [signalId, setSignalId] = useState();

  useMemo(() => {
    analytics().setAnalyticsCollectionEnabled(true);
    if (ABATI) {
      setSignalId(ABATI_ONE_SIGNAL_APP_ID);
    } else if (MALLR) {
      setSignalId(MALLR_ONE_SIGNAL_APP_ID);
    } else if (HOMEKEY) {
      setSignalId(HOMKEY_ONE_SIGNAL_APP_ID);
    } else if (ESCRAP) {
      setSignalId(ESCRAP_ONE_SIGNAL_APP_ID);
    } else if (EXPO) {
      setSignalId(EXPO_ONE_SIGNAL_APP_ID);
    } else if (DAILY) {
      setSignalId(DAILY_ONE_SIGNAL_APP_ID);
    }
  }, [bootStrapped]);

  useEffect(() => {
    OneSignal.init(signalId);
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
    Linking.addEventListener('url', handleOpenURL);
    return () => {
      //   OneSignal.removeEventListener('received', onReceived);
      //   OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
      //   Linking.removeEventListener('url', handleOpenURL);
    };
  }, [bootStrapped]);

  const handleOpenURL = useCallback((event) => {
    const {type, id} = getPathForDeepLinking(event.url);
    return dispatch(goDeepLinking({type, id}));
  });

  const onReceived = (notification) => {
    // __DEV__ ? console.log('Notification received: ', notification) : null;
  };

  const onOpened = useCallback((openResult) => {
    if (__DEV__) {
      // console.log('the whole thing', openResult.notification.payload);
      // console.log('Message: ', openResult.notification.payload.body);
      // console.log('Data: ', openResult.notification.payload.additionalData);
      // console.log('isActive: ', openResult.notification.isAppInFocus);
      // console.log('openResult: ', openResult.notification.payload.launchURL);
    }
    const notification = getPathForDeepLinking(
      openResult.notification.payload.launchURL,
    );
    dispatch(setDeepLinking(notification));
    setTimeout(() => {
      dispatch(goDeepLinking(notification));
    }, 1000);
  });

  const onIds = useCallback((device) => {
    if (!validate.isEmpty(device.userId) && playerId !== device.userId) {
      setDeviceId(device.userId);
      if (device.userId !== deviceId) {
        dispatch(setPlayerId(device.userId));
      }
    }
  });

  return <Fragment></Fragment>;
};

export default React.memo(AppHomeConfigComponent);
