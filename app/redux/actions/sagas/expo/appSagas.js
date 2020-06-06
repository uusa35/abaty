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
  startGetHomeCelebrities,
  startGetHomeCompaniesScenario,
  startGetHomeDesigners,
} from '../userSagas';
import {
  setDeviceId,
  setVersion,
  startGetColorsScenario,
  startGetSizesScenario,
} from '../settingSagas';
import {
  getLatestProducts,
  getProductIndex,
  setHomeProducts,
} from '../productSagas';
import {getHomeServicesScenario} from '../serviceSagas';
import {getHomeUserCategories} from '../categorySagas';
import * as actions from '../../types';
import {GET_ROLES} from '../../types';

export function* expoBootStrap() {
  yield all([
    call(getCountry),
    call(setSettings),
    call(setCountries),
    call(setSlides),
    // call(setCommercials),
    // call(setHomeBrands),
    call(startAuthenticatedScenario),
    call(setDeviceId),
    // call(setHomeProducts),
    // call(getLatestProducts),
    call(getPages),
    call(getTags),
    // call(getVideos),
    call(getProductIndex),
    // call(getHomeServicesScenario),
    call(setHomeSplashes),
    call(startGetColorsScenario),
    call(startGetSizesScenario),
    put({type: GET_ROLES, payload: {}}),
    call(getHomeUserCategories, {on_home: true, type: 'is_user'}),
    call(startGetParentCategoriesScenario),
    call(startGetHomeCategoriesScenario),
    call(startGetHomeCompaniesScenario, {
      payload: {searchParams: {on_home: 1, is_company: 1}},
    }),
    call(startGetHomeDesigners, {
      payload: {searchParams: {on_home: 1, is_designer: 1}},
    }),
    call(startGetHomeCelebrities, {
      payload: {searchParams: {on_home: 1, is_celebrity: 1}},
    }),
    put({type: actions.TOGGLE_RESET_APP, payload: false}),
  ]);
  yield put({type: actions.TOGGLE_BOOTSTRAPPED, payload: true});
}
