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
  startGetHomeDesigners,
} from '../userSagas';
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
import {getHomeUserCategories} from '../categorySagas';
import * as actions from '../../types';

export function* mallrBootStrap() {
  const {country} = yield select();
  yield all([
    call(getCountry),
    call(setSettings),
    call(setCountries),
    call(setSlides),
    call(setCommercials),
    call(setHomeBrands),
    call(startAuthenticatedScenario),
    call(setDeviceId),
    call(setHomeProducts, {payload: {on_home: 1, country_id: country.id}}),
    call(getOnSaleProducts, {
      payload: {on_home: 1, country_id: country.id, on_sale: 1},
    }),
    call(getBestSaleProducts, {
      payload: {
        on_home: 1,
        country_id: country.id,
        best_sale: 1,
      },
    }),
    call(getHotDealsProducts, {
      payload: {
        on_home: 1,
        country_id: country.id,
        hot_deals: 1,
      },
    }),
    call(getLatestProducts, {
      payload: {on_home: 1, country_id: country.id, latest: 1},
    }),
    call(getPages),
    call(getTags),
    call(getVideos),
    call(getProductIndex, {payload: {country_id: country.id}}),
    call(setHomeSplashes),
    call(getHomeCollectionsScenario, {
      payload: {on_home: 1, country_id: country.id},
    }),
    call(startGetColorsScenario),
    call(startGetSizesScenario),
    call(getHomeUserCategories, {
      payload: {
        on_home: 1,
        type: 'is_user',
        country_id: country.id,
      },
    }),
    call(startGetParentCategoriesScenario),
    call(startGetHomeCategoriesScenario),
    call(startGetHomeCompaniesScenario, {
      payload: {
        searchParams: {on_home: 1, is_company: 1, country_id: country.id},
      },
    }),
    call(startGetHomeDesigners, {
      payload: {
        searchParams: {on_home: 1, is_designer: 1, country_id: country.id},
      },
    }),
    put({type: actions.TOGGLE_RESET_APP, payload: false}),
  ]);
  yield put({type: actions.TOGGLE_BOOTSTRAPPED, payload: 1});
}
