import {I18nManager} from 'react-native';
import * as actions from '../types';
import {call, put, all, delay, takeLatest, select} from 'redux-saga/effects';
import I18n from './../../../I18n';
import validate from 'validate.js/validate';
import {enableLoading} from './settingSagas';
import * as helpers from './../../../helpers';
import * as RootNavigation from './../../../RootNavigation.js';
import {DrawerActions} from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import {axiosInstance} from '../api';

export function* setDirection(lang) {
  try {
    if (lang === 'ar') {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    } else {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }
  } catch (e) {
    // if (__DEV__) {
    //   console.log('e', e);
    //   yield call(enableErrorMessage, e.message);
    // }
  }
}

export function* startChangeLang(action) {
  try {
    yield call(enableLoading);
    yield call(RootNavigation.closeDrawer);
    const lang = action.payload;
    helpers.setLang(lang);
    yield call(setDirection, lang);
    I18n.locale = lang;
  } catch (e) {
    // if (__DEV__) {
    //   console.log('ee', e);
    // }
  } finally {
    yield delay(2000);
    yield put({type: actions.TOGGLE_BOOTSTRAPPED, payload: false});
    yield delay(1000);
    RNRestart.Restart();
    // yield call(CodePush.restartApp());
    // PersistStore.purge(['homeUserCategories']);
  }
}

export function* defaultLang() {
  try {
    const defaultLang = yield call(helpers.getLang);
    const lang = !validate.isEmpty(defaultLang)
      ? defaultLang
      : I18n.defaultLocale;
    I18n.locale = lang;
    if (!validate.isEmpty(lang)) {
      yield all([
        put({type: actions.SET_LANG, payload: lang}),
        call(setDirection, lang),
        call(helpers.setLang, lang),
      ]);
      axiosInstance.defaults.headers['lang'] = lang;
      axiosInstance.defaults.headers.common['lang'] = lang;
    }
  } catch (e) {
    // __DEV__ ? console.log('the e from default Lang', e) : null;
  }
}
