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
import {
  setDeviceId,
  setVersion,
  startGetColorsScenario,
  startGetSizesScenario,
} from '../settingSagas';
import {
  getBestSaleProducts,
  getHomeCollectionsScenario,
  getHotDealsProducts,
  getLatestProducts,
  getOnSaleProducts,
  getProductIndex,
  setHomeProducts,
} from '../productSagas';
import {getClassifiedIndex} from '../classifiedSagas';
import {getHomeServicesScenario, getServiceIndex} from '../serviceSagas';
import {
  getHomeClassifiedCategories,
  getHomeUserCategories,
} from '../categorySagas';
import * as actions from '../../types';
import {GET_ROLES} from '../../types';

export function* expoBootStrap() {
  yield all([
    call(getCountry),
    call(setSettings),
    call(setCountries),
    call(setSlides),
    call(setCommercials),
    call(setHomeBrands),
    call(startAuthenticatedScenario),
    call(setDeviceId),
    call(setHomeProducts),
    call(getLatestProducts),
    call(getPages),
    call(getTags),
    call(getVideos),
    call(getProductIndex),
    call(getHomeServicesScenario),
    call(setHomeSplashes),
    call(startGetColorsScenario),
    call(startGetSizesScenario),
    put({type: GET_ROLES, payload: {}}),
    call(getHomeUserCategories, {on_home: true, type: 'is_user'}),
    put({type: actions.GET_CATEGORIES}),
    put({type: actions.GET_HOME_CATEGORIES}),
    put({
      type: actions.GET_HOME_COMPANIES,
      payload: {searchParams: {on_home: 1, is_company: 1}},
    }),
    put({
      type: actions.GET_HOME_DESIGNERS,
      payload: {searchParams: {on_home: 1, is_designer: 1}},
    }),
    put({
      type: actions.GET_HOME_CELEBRITIES,
      payload: {searchParams: {on_home: 1, is_celebrity: 1}},
    }),
    put({type: actions.TOGGLE_RESET_APP, payload: false}),
  ]);
  yield put({type: actions.TOGGLE_BOOTSTRAPPED, payload: true});
}
