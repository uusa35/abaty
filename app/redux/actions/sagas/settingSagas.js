import {call, put} from 'redux-saga/effects';
import I18n from './../../../I18n';
import * as actions from '../types';
import DeviceInfo from 'react-native-device-info';
import {displayName} from './../../../../app';
import {isLocal} from '../../../env';
import {checkConnectionStatus} from '../api';
import {offlineActionTypes} from 'react-native-offline';

export function* enableLoading() {
  yield put({type: actions.TOGGLE_LOADING, payload: true});
}

export function* disableLoading() {
  yield put({type: actions.TOGGLE_LOADING, payload: false});
}

export function* enableLoadingBoxedList() {
  yield put({type: actions.TOGGLE_LOADING_BOXED_LIST, payload: true});
}

export function* disableLoadingBoxedList() {
  yield put({type: actions.TOGGLE_LOADING_BOXED_LIST, payload: false});
}

export function* enableLoadingContent() {
  yield put({type: actions.TOGGLE_LOADING_CONTENT, payload: true});
}

export function* disableLoadingContent() {
  yield put({type: actions.TOGGLE_LOADING_CONTENT, payload: false});
}

export function* enableLoadingProfile() {
  yield put({type: actions.TOGGLE_LOADING_PROFILE, payload: true});
}

export function* disableLoadingProfile() {
  yield put({type: actions.TOGGLE_LOADING_PROFILE, payload: false});
}

export function* toggleBootStrapped(bootStrapped: boolean) {
  yield put({type: actions.TOGGLE_BOOTSTRAPPED, payload: bootStrapped});
}

export function* toggleGuest(guest) {
  yield put({type: actions.TOGGLE_GUEST, payload: guest});
}

export function* setDeviceId() {
  try {
    let deviceId = DeviceInfo.getUniqueID(); // get the deviceID
    if (isLocal) {
      console.log('device_id', deviceId);
    }
    yield put({type: actions.SET_DEVICE_ID, payload: deviceId}); // store deviceId into state
  } catch (e) {
    if (isLocal) {
      console.log('the e from device id', e);
    }
    // yield call(enableErrorMessage, I18n.t('no_settings_from_catch'));
  }
}

export function* enableSuccessMessage(
  content = '',
  title = I18n.t(displayName),
) {
  yield put({
    type: actions.ENABLE_MESSAGE,
    payload: {
      content,
      title,
      icon: 'exclamation-triangle',
      color: 'green',
      visible: true,
    },
  });
}

export function* enableErrorMessage(content = '', title = I18n.t(displayName)) {
  yield put({
    type: actions.ENABLE_MESSAGE,
    payload: {
      content,
      title,
      icon: 'exclamation-triangle',
      visible: true,
      color: 'red',
    },
  });
}

export function* enableWarningMessage(
  content = '',
  title = I18n.t(displayName),
) {
  yield put({
    type: actions.ENABLE_MESSAGE,
    payload: {
      content,
      title,
      icon: 'exclamation-triangle',
      visible: true,
      color: 'orange',
    },
  });
}

export function* checkConnection() {
  const connecitonStatus = yield call(checkConnectionStatus);
  if (__DEV__) {
    console.log('currentConnection', connecitonStatus);
  }
  yield put({
    type: offlineActionTypes.CONNECTION_CHANGE,
    payload: connecitonStatus,
  });
}
