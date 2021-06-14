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
  getProductIndex,
  setHomeProducts,
} from '../productSagas';
import {getHomeServicesScenario, getServiceIndex} from '../serviceSagas';
import {getHomeUserCategories} from '../categorySagas';
import * as actions from '../../types';

export function* istoresBootStrap() {
  const {country} = yield select();
  try {
    yield all([
      call(getCountry),
      call(setSettings),
      call(setFaqs),
      call(setCountries),
      call(setCurrencies),
      call(setSlides),
      call(setCommercials),
      call(setHomeBrands),
      call(startAuthenticatedScenario),
      call(setDeviceId),
      call(setHomeProducts, {payload: {on_home: 1}}),
      call(getLatestProducts),
      call(getPages),
      call(getTags),
      call(getVideos),
      call(getProductIndex),
      // call(getServiceIndex),
      // call(getHomeServicesScenario),
      call(setHomeSplashes),
      call(startGetColorsScenario),
      call(startGetSizesScenario),
      call(startGetRolesScenario),
      call(getHomeUserCategories, {
        payload: {on_home: 1, type: 'is_user', country_id: country.id},
      }),
      // call(setHomeProducts, {
      //   payload: {on_home: 1, country_id: country.id},
      // }),
      call(getBestSaleProducts, {
        payload: {on_home: 1, contry_id: country.id, on_sale: 1},
      }),
      call(getHotDealsProducts, {
        payload: {
          on_home: 1,
          contry_id: country.id,
          on_sale: 1,
          is_hot_deal: 1,
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
          redirect: false,
        },
      }),
      put({type: actions.TOGGLE_RESET_APP, payload: false}),
    ]);
    yield put({type: actions.TOGGLE_BOOTSTRAPPED, payload: true});
  } catch (e) {
    if (__DEV__) {
      console.log('eee', e);
    }
  } finally {
    yield all([call(disableLoading), call(disableLoadingBoxedList)]);
  }
}
