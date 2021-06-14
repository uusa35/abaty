import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import {
  disableLoading,
  disableLoadingContent,
  enableErrorMessage,
  enableLoadingContent,
  enableWarningMessage,
  startGoogleAnalyticsScenario,
} from './settingSagas';
import * as api from '../api';
import validate from 'validate.js';
import * as actions from '../types';
import * as RootNavigation from './../../../RootNavigation.js';
import I18n from '../../../I18n';
import {SET_SERVICES} from '../types';

export function* startGetServiceScenario(action) {
  try {
    const {redirect} = action.payload;
    if (!validate.isEmpty(redirect) && redirect) {
      yield call(enableLoadingContent);
    }
    const element = yield call(api.getService, action.payload);
    if (
      !validate.isEmpty(element) &&
      validate.isObject(element) &&
      element.id
    ) {
      yield put({type: actions.SET_SERVICE, payload: element});
      if (!validate.isEmpty(redirect) && redirect) {
        yield call(startGoogleAnalyticsScenario, {
          payload: {type: 'Service', element},
        });
        RootNavigation.navigate('ServiceShow', {
          name: element.name,
          id: element.id,
          model: 'service',
          type: 'service',
        });
      }
    }
  } catch (e) {
    if (__DEV__) {
      console.log('e', e);
    }
    yield call(enableWarningMessage, I18n.t('error_while_loading_service'));
  } finally {
    if (action.payload.redirect) {
      yield call(disableLoadingContent);
    }
  }
}

export function* startGetSearchServicesScenario(action) {
  try {
    const {searchParams, redirect} = action.payload;
    const services = yield call(api.getSearchServices, searchParams);
    if (!validate.isEmpty(services) && validate.isArray(services)) {
      yield all([
        put({type: actions.SET_SERVICES, payload: services}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchParams}),
      ]);
      if (!validate.isEmpty(redirect) && redirect) {
        yield put(
          RootNavigation.navigate('ServiceIndex', {name: I18n.t('services')}),
        );
      }
    } else {
      yield all([
        put({type: actions.SET_SERVICES, payload: []}),
        put({type: actions.SET_SEARCH_PARAMS, payload: {}}),
      ]);
      throw services;
    }
  } catch (e) {
  } finally {
    yield all([
      call(disableLoading),
      // call(enableWarningMessage, I18n.t('no_services')),
    ]);
  }
}

export function* getServiceIndex(action) {
  try {
    const services = yield call(api.getServices, action.payload);
    if (!validate.isEmpty(services) && validate.isArray(services)) {
      yield put({type: actions.SET_SERVICES, payload: services});
    } else {
      yield put({type: SET_SERVICES, payload: []});
    }
  } catch (e) {
  } finally {
  }
}

export function* getHomeServicesScenario(action) {
  try {
    const services = yield call(api.getServices, action.payload);
    if (!validate.isEmpty(services) && validate.isArray(services)) {
      yield put({type: actions.SET_HOME_SERVICES, payload: services});
    } else {
      yield put({type: actions.SET_HOME_SERVICES, payload: []});
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableErrorMessage, I18n.t('no_services')),
    ]);
  }
}

export function* startToggleClassifiedFavoriteScenario(action) {
  try {
    const classifieds = yield call(api.toggleFavorite, action.payload);
    if (!validate.isEmpty(classifieds) && validate.isArray(classifieds)) {
      yield all([
        put({type: actions.SET_CLASSIFIED_FAVORITES, payload: classifieds}),
        call(enableWarningMessage, I18n.t('favorite_success')),
      ]);
    } else {
      yield put({type: actions.SET_CLASSIFIED_FAVORITES, payload: []});
      throw classifieds;
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}
