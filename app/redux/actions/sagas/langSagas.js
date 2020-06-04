import {I18nManager} from 'react-native';
import CodePush from 'react-native-code-push';
import * as actions from '../types';
import {call, put, all, delay, takeLatest} from 'redux-saga/effects';
import I18n from './../../../I18n';
import validate from 'validate.js/validate';
import {
  enableErrorMessage,
  disableLoading,
  enableLoading,
} from './settingSagas';
import * as helpers from './../../../helpers';
import axios from 'axios';
import {resetStore, startResetStoreScenario} from './appSagas';
import {DrawerActions} from 'react-navigation-drawer';

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
    yield all([call(disableLoading), call(enableErrorMessage, e.message)]);
  }
}

export function* startChangeLang(action) {
  try {
    yield call(enableLoading);
    yield put(DrawerActions.closeDrawer());
    const lang = action.payload;
    yield call(helpers.setLang, lang);
    yield call(setDirection, lang);
    I18n.locale = lang;
    axios.defaults.headers.common['lang'] = lang;
    yield delay(1000);
    yield put({type: actions.TOGGLE_BOOTSTRAPPED, payload: false});
    yield call(CodePush.restartApp());
  } catch (e) {
    if (__DEV__) {
      console.log('ee', e);
    }
  } finally {
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
    }
  } catch (e) {
    __DEV__ ? console.log('the e from default Lang', e) : null;
  }
}
