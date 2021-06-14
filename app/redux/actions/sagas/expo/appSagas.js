import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import {
  getCountry,
  getPages,
  getTags,
  getVideos,
  setCommercials,
  setCountries,
  setCurrencies,
  setFaqs,
  setHomeSplashes,
  setSettings,
  setSlides,
  startGetHomeCategoriesScenario,
  startGetParentCategoriesScenario,
} from '../requestSagas';
import {
  setHomeBrands,
  startAuthenticatedScenario,
  startGetDesignerScenario,
  startGetHomeCelebrities,
  startGetHomeCompaniesScenario,
  startGetHomeDesigners,
  startGetRolesScenario,
} from '../userSagas';
import {
  disableLoading,
  disableLoadingBoxedList,
  disableLoadingProfile,
  setDeviceId,
  setVersion,
  startGetColorsScenario,
  startGetSizesScenario,
} from '../settingSagas';
import {
  getBestSaleProducts,
  getHotDealsProducts,
  getLatestProducts,
  getOnSaleProducts,
  getProductIndex,
  setHomeProducts,
} from '../productSagas';
import {getHomeServicesScenario, getServiceIndex} from '../serviceSagas';
import {getHomeUserCategories} from '../categorySagas';
import * as actions from '../../types';

export function* expoBootStrap() {
  const {country} = yield select();
  try {
    yield all([
      call(getCountry),
      call(setSettings),
      call(setCurrencies),
      call(setFaqs),
      call(setCountries),
      call(setSlides),
      // call(setCommercials),
      // call(setHomeBrands),
      call(startAuthenticatedScenario),
      call(setDeviceId),
      call(getPages),
      call(getTags),
      // call(getVideos),
      call(getProductIndex),
      // call(getServiceIndex),
      // call(getHomeServicesScenario),
      call(setHomeSplashes),
      call(startGetColorsScenario),
      call(startGetSizesScenario),
      call(startGetRolesScenario),
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
          on_sale: 1,
          hot_deals: 1,
        },
      }),
      call(getLatestProducts, {
        payload: {on_home: 1, country_id: country.id, latest: 1},
      }),
      call(getHomeUserCategories, {
        payload: {on_home: 1, type: 'is_user', country_id: country.id},
      }),
      call(setHomeProducts, {
        payload: {on_home: 1, country_id: country.id},
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
          redirect: false,
        },
      }),
      call(startGetHomeCelebrities, {
        payload: {
          searchParams: {on_home: 1, is_celebrity: 1, country_id: country.id},
        },
      }),
      put({type: actions.TOGGLE_RESET_APP, payload: false}),
    ]);
    yield put({type: actions.TOGGLE_BOOTSTRAPPED, payload: true});
  } finally {
    yield all([call(disableLoading), call(disableLoadingBoxedList)]);
  }
}
