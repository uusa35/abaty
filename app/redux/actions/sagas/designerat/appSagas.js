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
  startGetDesignerScenario,
  startGetHomeCelebrities,
  startGetHomeCompaniesScenario,
  startGetHomeDesigners,
  startGetRolesScenario,
} from '../userSagas';
import {
  disableLoading,
  disableLoadingBoxedList,
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
import {getHomeServicesScenario, getServiceIndex} from '../serviceSagas';
import {getHomeUserCategories} from '../categorySagas';
import * as actions from '../../types';
import {GET_ROLES} from '../../types';
import SplashScreen from 'react-native-splash-screen';

export function* designeratBootStrap() {
  try {
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
      // call(getOnSaleProducts, {
      //   payload: {on_home: 1, country_id: country.id, on_sale: 1},
      // }),
      // call(getBestSaleProducts, {
      //   payload: {on_home: 1, country_id: country.id, best_sale: 1},
      // }),
      // call(getHotDealsProducts, {
      //   payload: {on_home: 1, country_id: country.id, hot_deals: 1},
      // }),
      // call(getLatestProducts, {
      //   payload: {on_home: 1, country_id: country.id, latest: 1},
      // }),
      // call(getPages),
      // call(getTags),
      // call(getVideos),
      // call(getProductIndex),
      // call(getHomeServicesScenario, {
      //   payload: {page: 1, country_id: country.id, on_home: 1},
      // }),
      // call(getServiceIndex, {payload: {page: 1, country_id: country.id}}),
      call(setHomeSplashes),
      call(startGetColorsScenario),
      call(startGetSizesScenario),
      call(getHomeUserCategories, {
        payload: {on_home: true, type: 'is_user', country_id: country.id},
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
      call(startGetRolesScenario),
      put({type: actions.TOGGLE_RESET_APP, payload: false}),
    ]);
    yield put({type: actions.TOGGLE_BOOTSTRAPPED, payload: true});
    SplashScreen.hide();
  } finally {
    yield all([call(disableLoading), call(disableLoadingBoxedList)]);
  }
}
