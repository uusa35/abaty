import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import {
  disableLoading,
  disableLoadingContent,
  enableErrorMessage,
  enableLoadingContent,
  enableWarningMessage,
} from './settingSagas';
import * as api from '../api';
import validate from 'validate.js';
import * as actions from '../types';
import {NavigationActions} from 'react-navigation';
import I18n from '../../../I18n';
import {SET_SERVICES} from '../types';

export function* startGetServiceScenario(action) {
  try {
    yield call(enableLoadingContent);
    const service = yield call(api.getService, action.payload);
    if (!validate.isEmpty(service) && validate.isObject(service)) {
      yield put({type: actions.SET_SERVICE, payload: service});
      yield all([
        put(
          NavigationActions.navigate({
            routeName: 'Service',
            params: {name: service.name, id: service.id, model: 'service'},
          }),
        ),
        call(disableLoadingContent),
      ]);
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableWarningMessage, I18n.t('error_while_loading_service')),
    ]);
  }
}

export function* startGetSearchServicesScenario(action) {
  try {
    const {element, searchElements, redirect} = action.payload;
    const services = yield call(api.getSearchServices, searchElements);
    if (!validate.isEmpty(services) && validate.isArray(services)) {
      yield all([
        put({type: actions.SET_SERVICES, payload: services}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchElements}),
      ]);
      if (!validate.isEmpty(redirect) && redirect) {
        yield put(
          NavigationActions.navigate({
            routeName: 'ServiceIndex',
            params: {name: element ? element.name : I18n.t('services')},
          }),
        );
      }
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      // call(enableWarningMessage, I18n.t('no_services')),
    ]);
  }
}

export function* getServiceIndex() {
  try {
    const services = yield call(api.getServices, {page: 1});
    if (!validate.isEmpty(services) && validate.isArray(services)) {
      yield put({type: actions.SET_SERVICES, payload: services});
    } else {
      yield put({type: SET_SERVICES, payload: []});
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableErrorMessage, I18n.t('no_services')),
    ]);
  }
}

export function* getHomeServicesScenario() {
  try {
    const services = yield call(api.getServices, {is_home: true, page: 1});
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

export function* getService() {
  yield takeLatest(actions.GET_SERVICE, startGetServiceScenario);
}

export function* getSearchServices() {
  yield takeLatest(actions.GET_SEARCH_SERVICES, startGetSearchServicesScenario);
}
