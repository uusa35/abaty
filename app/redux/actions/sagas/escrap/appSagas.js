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
} from '../requestSagas';
import {setHomeBrands, startAuthenticatedScenario} from '../userSagas';
import {setDeviceId} from '../settingSagas';
import {getClassifiedIndex} from '../classifiedSagas';
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
    call(getHomeClassifiedCategories, {
      on_home: true,
      type: 'is_classified',
    }),
    call(getHomeUserCategories, {on_home: true, type: 'is_user'}),
    put({type: actions.GET_CATEGORIES}),
    put({type: actions.GET_HOME_CATEGORIES}),
    put({
      type: actions.GET_HOME_COMPANIES,
      payload: {searchParams: {on_home: 1, is_company: 1}},
    }),
    put({
      type: actions.GET_HOME_CLASSIFIEDS,
      payload: {searchParams: {on_home: 1}},
    }),
    put({type: actions.TOGGLE_RESET_APP, payload: false}),
  ]);
  yield put({type: actions.TOGGLE_BOOTSTRAPPED, payload: true});
}
