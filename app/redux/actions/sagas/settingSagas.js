import {call, put, all, select, delay} from 'redux-saga/effects';
import I18n from './../../../I18n';
import * as actions from '../types';
import {getUniqueId} from 'react-native-device-info';
import {displayName} from './../../../../app';
import {isLocal} from '../../../env';
import {getColors, getSizes} from '../api';
import {startResetStoreScenario} from './appSagas';
import validate from 'validate.js';
import analytics from '@react-native-firebase/analytics';
import moment from 'moment';
import {buildVersion} from './../../../../app';
import {TOGGLE_IS_CONNECTED, SET_PRODUCT_COLORS, SET_SIZES} from '../types';
import {DeviceInfo} from 'react-native';

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
    let deviceId = yield call(getUniqueId); // get the deviceID
    if (__DEV__) {
      // console.log('device_id', deviceId);
    }
    if (deviceId) {
      yield put({type: actions.SET_DEVICE_ID, payload: deviceId});
    }
  } catch (e) {
    if (isLocal) {
      // console.log('the e from device id', e);
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
      icon: 'check',
      type: 'antdesign',
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
      icon: 'exclamationcircleo',
      type: 'antdesign',
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
      icon: 'warning',
      type: 'antdesign',
      visible: true,
      color: 'orange',
    },
  });
}

export function* enableResetApp() {
  yield delay(60 * 15 * 1000);
  yield put({type: actions.TOGGLE_RESET_APP, payload: true});
}

export function* startGoogleAnalyticsScenario(action) {
  const {type, element} = action.payload;
  switch (type) {
    case 'Product':
      return analytics().logEvent(`${type}View_ID_${element.id}`, {
        id: element.id,
        item: element.name,
        description: element.description
          ? element.description.substr(0, 100)
          : null,
        type: `${type}_SKU_${element.sku}`,
        date: moment().format('YYYY-MM-DD'),
      });
    case 'AddToCart':
      return analytics().logEvent(`${type}_ID_${element.id}`, {
        id: element.id,
        item: element.name,
        description: element.description
          ? element.description.substr(0, 100)
          : null,
        type: `${type}_SKU_${element.sku}`,
        date: moment().format('YYYY-MM-DD'),
      });
    case 'Service':
      return analytics().logEvent(`${type}View_ID_${element.id}`, {
        id: element.id,
        item: element.name,
        description: element.description
          ? element.description.substr(0, 100)
          : null,
        type,
        start_date: moment().format('YYYY-MM-DD'),
      });
    case 'User':
      return analytics().logEvent(
        `${element.role.name}_View_ID_${element.id}`,
        {
          id: element.id,
          item: element.slug,
          description: element.description
            ? element.description.substr(0, 100)
            : null,
          type,
          start_date: moment().format('YYYY-MM-DD'),
        },
      );
    case 'UserLogged':
      return analytics().logEvent(`${type}_${element.id}`, {
        id: element.id,
        item: element.name,
        description: element.description
          ? element.description.substr(0, 100)
          : null,
        type,
        start_date: moment().format('YYYY-MM-DD'),
      });
    case 'NewUserRegister':
      return analytics().logEvent(`${type}_${element.id}`, {
        id: element.id,
        item: element.name,
        description: element.description
          ? element.description.substr(0, 100)
          : null,
        type,
        start_date: moment().format('YYYY-MM-DD'),
      });
    default:
      return null;
  }
}

export function* startGetColorsScenario() {
  try {
    const elements = yield call(getColors);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield put({type: SET_PRODUCT_COLORS, payload: elements});
    }
  } catch (e) {
    if (isLocal) {
      // console.log('e', e);
    }
  } finally {
  }
}

export function* startGetSizesScenario() {
  try {
    const elements = yield call(getSizes);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield put({type: SET_SIZES, payload: elements});
    }
  } catch (e) {
    if (isLocal) {
      // console.log('e', e);
    }
  } finally {
  }
}
