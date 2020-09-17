import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import {BackHandler, Alert, DevSettings} from 'react-native';
import * as actions from '../types';
import {
  ABATI,
  MALLR,
  ESCRAP,
  EXPO,
  HOMEKEY,
  DAILY,
  BITS,
  NASHKW,
} from './../../../../app';
import {PersistStore} from './../../store';
import {defaultLang} from './langSagas';
import {NavigationActions} from 'react-navigation';
import I18n from './../../../I18n';
import {
  disableLoading,
  enableErrorMessage,
  checkConnection,
  setVersion,
  enableResetApp,
} from './settingSagas';
import {abatiBootStrap} from './abati/appSagas';
import {mallrBootStrap} from './mallr/appSagas';
import {escrapBootStrap} from './escrap/appSagas';
import {homeKeyBootStrap} from './homekey/appSagas';
import {expoBootStrap} from './expo/appSagas';
import {dailyBootStrap} from './daily/appSagas';

export function* startAppBootStrap() {
  try {
    const {bootStrapped} = yield select();
    yield call(defaultLang);
    yield call(setVersion);
    if (!bootStrapped) {
      if (ABATI) {
        yield call(abatiBootStrap);
      } else if (MALLR) {
        yield call(mallrBootStrap);
      } else if (ESCRAP) {
        yield call(escrapBootStrap);
      } else if (HOMEKEY) {
        yield call(homeKeyBootStrap);
      } else if (EXPO) {
        yield call(expoBootStrap);
      } else if (DAILY) {
        yield call(dailyBootStrap);
      } else if (BITS) {
        yield call(abatiBootStrap);
      } else if (NASHKW) {
        yield call(abatiBootStrap);
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
  if (action.payload) {
    yield put(NavigationActions.back());
  } else {
    Alert.alert(I18n.t('do_you_want_to_exit_the_app'), '', [
      {
        text: I18n.t('confirm'),
        onPress: () => BackHandler.exitApp(),
      },
      {
        text: I18n.t('cancel'),
        onPress: () => false,
      },
    ]);
  }
}

export function* startResetStoreScenario() {
  yield all([
    put(
      NavigationActions.navigate({
        routeName: 'Home',
      }),
    ),
    put({type: actions.TOGGLE_BOOTSTRAPPED, payload: false}),
  ]);
  PersistStore.purge();
  yield delay(1000);
  yield call(startAppBootStrap);
}
