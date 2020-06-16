import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import {
  getCountry,
  getPages,
  getTags,
  getVideos,
  setCommercials,
  setCountries,
  setHomeSplashes,
  setSettings,
  setSlides,
  startGetHomeCategoriesScenario,
  startGetParentCategoriesScenario,
} from '../requestSagas';
import {
  setHomeBrands,
  startAuthenticatedScenario,
  startGetHomeCompaniesScenario,
  startGetRolesScenario,
} from '../userSagas';
import {setDeviceId, setVersion} from '../settingSagas';
import {
  getClassifiedIndex,
  startGetHomeClassifiedsScenario,
} from '../classifiedSagas';
import {
  getHomeClassifiedCategories,
  getHomeUserCategories,
} from '../categorySagas';
import * as actions from '../../types';

export function* escrapBootStrap() {
  yield all([
    call(getCountry),
    call(setSettings),
    call(setCountries),
    call(setSlides),
    call(setCommercials),
    call(setHomeBrands),
    call(startAuthenticatedScenario),
    call(setDeviceId),
    call(getPages),
    call(getTags),
    call(getVideos),
    call(getClassifiedIndex),
    call(setHomeSplashes),
    call(startGetRolesScenario),
    call(getHomeClassifiedCategories, {
      on_home: true,
      type: 'is_classified',
    }),
    call(getHomeUserCategories, {on_home: true, type: 'is_user'}),
    // put({type: actions.GET_CATEGORIES}),
    yield call(startGetParentCategoriesScenario),
    // put({type: actions.GET_HOME_CATEGORIES}),
    call(startGetHomeCategoriesScenario),
    call(startGetHomeCompaniesScenario, {
      payload: {searchParams: {on_home: 1, is_company: 1}},
    }),
    yield call(startGetHomeClassifiedsScenario, {
      payload: {searchParams: {on_home: 1}},
    }),
    put({type: actions.TOGGLE_RESET_APP, payload: false}),
  ]);
  yield put({type: actions.TOGGLE_BOOTSTRAPPED, payload: true});
}
