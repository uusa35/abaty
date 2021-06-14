import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import {BackHandler, Alert} from 'react-native';
import * as actions from '../types';
import {PersistStore} from './../../store';
import {defaultLang} from './langSagas';
import * as RootNavigation from './../../../RootNavigation.js';
import I18n from './../../../I18n';
import {
  disableLoading,
  enableErrorMessage,
  setVersion,
  enableResetApp,
} from './settingSagas';
import {designeratBootStrap} from './designerat/appSagas';
import {expoBootStrap} from './expo/appSagas';
import {
  DESIGNERAT,
  EXPO,
  ISTORES,
  IHOUSES,
  ABATI,
} from './../../../../app.json';
import {istoresBootStrap} from './istores/appSagas';
import {abatiBootStrap} from './abati/appSagas';

export function* startAppBootStrap() {
  try {
    const {bootStrapped} = yield select();
    yield call(defaultLang);
    if (!bootStrapped) {
      if (EXPO) {
        yield call(expoBootStrap);
      } else if (DESIGNERAT) {
        yield call(designeratBootStrap);
      } else if (ABATI) {
        yield call(abatiBootStrap);
      } else if (ISTORES) {
        yield call(istoresBootStrap);
      } else if (IHOUSES) {
        yield call(istoresBootStrap);
      }
    }
  } catch (e) {
    if (__DEV__) {
      yield call(enableErrorMessage, I18n.t('app_general_error'));
    }
  } finally {
    yield all([call(disableLoading), call(enableResetApp)]);
  }
}

export function* goBackBtnScenario(action) {
  if (action.payload !== 'Home') {
    RootNavigation.back();
  } else {
    Alert.alert(
      I18n.t('do_you_want_to_exit_the_app'),
      I18n.t('do_you_want_to_exit_the_app'),
      [
        {
          text: I18n.t('confirm'),
          onPress: () => BackHandler.exitApp(),
        },
        {
          text: I18n.t('cancel'),
          onPress: () => false,
        },
      ],
    );
  }
}

export function* startResetStoreScenario() {
  RootNavigation.navigate('Home');
  yield all([put({type: actions.TOGGLE_BOOTSTRAPPED, payload: false})]);
  PersistStore.purge();
  yield delay(1000);
  yield call(startAppBootStrap);
}
