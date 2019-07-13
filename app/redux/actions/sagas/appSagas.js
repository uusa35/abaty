import {BackHandler, Alert} from 'react-native';
import * as actions from '../types';
import axios from 'axios';
import {call, put, all, delay, takeLatest, select} from 'redux-saga/effects';
import {defaultLang} from './langSagas';
import {
  getCountry,
  setHomeBrands,
  setHomeProducts,
  setProducts,
  setSlides,
  startDeepLinkingScenario,
  startSetCountryScenario,
  startStorePlayerIdScenario,
  setHomeDesigners,
  startSetCurrencyScenario,
  startGetDesignerScenario,
  startGetProductScenario,
  startGetBrandScenario,
  setHomeCelebrities,
  startGetSearchProductsScenario,
  startRefetchHomeElementsScenario,
  setHomeSplashes,
  startGetUsersScenario,
  startAddToCartScenario,
  startClearCartScenario,
  startAuthenticatedScenario,
  startSubmitAuthScenario,
  startLogoutScenario,
  startGetCouponScenario,
  startCreatePaymentUrlScenario,
  startCreateMyFatorrahPaymentUrlScenario,
  startCreateTapPaymentUrlScenario,
  startRemoveFromCartScenario,
  startRegisterScenario,
  getProductIndex,
  toggleFavoriteScenario,
  startGetAllProductsScenario
} from './requestSagas';
import {NavigationActions} from 'react-navigation';
import I18n from './../../../I18n';
import {
  setHomeCategories,
  setSettings,
  startRefetchHomeCategories,
  startGetCategoryElementsScenario,
  startRefetchUserScenario,
  setCommercials,
  setCountries,
  startGetUserScenario
} from './requestSagas';
import {
  enableLoading,
  disableLoading,
  toggleBootStrapped,
  setDeviceId,
  enableErrorMessage
} from './settingSagas';
import {offlineActionTypes} from 'react-native-offline';
import {internetChecker} from '../../../helpers';
import * as api from '../api';
import validate from 'validate.js';
import {axiosInstance} from '../api';
import {getProducts} from '../api';

function* startAppBootStrap() {
  try {
    const {network, bootStrapped, currency, lang} = yield select();
    // axiosInstance.defaults.headers.common['currency'] = currency.symbol;
    // axiosInstance.defaults.headers.common['lang'] = lang;
    if (!bootStrapped || (__DEV__ && network.isConnected)) {
      console.log('from inside');
      yield all([
        put({
          type: offlineActionTypes.CONNECTION_CHANGE,
          payload: network.isConnected
        }),
        call(defaultLang),
        call(setSettings),
        call(getProductIndex),
        call(getCountry),
        call(setDeviceId),
        call(setHomeCategories),
        call(setCountries),
        call(setSlides),
        call(setCommercials),
        call(setHomeBrands),
        call(setHomeProducts),
        call(setHomeDesigners),
        call(setHomeCelebrities),
        call(setHomeSplashes),
        call(startAuthenticatedScenario)
      ]);
      yield all([
        put({type: actions.TOGGLE_BOOTSTRAPPED, payload: true}),
        call(disableLoading)
      ]);
    }
  } catch (e) {
    console.log('the eeee', e);
    yield all([
      call(disableLoading),
      call(enableErrorMessage, I18n.t('app_general_error'))
    ]);
  }
}

export function* appBootstrap() {
  yield takeLatest(actions.START_BOOTSTRAP, startAppBootStrap);
}

export function* goBackBtnScenario(action) {
  if (!action.payload) {
    yield put(NavigationActions.back());
  } else {
    Alert.alert(I18n.t('do_you_want_to_exit_the_app'), '', [
      {
        text: I18n.t('confirm'),
        onPress: () => BackHandler.exitApp()
      },
      {
        text: I18n.t('cancel'),
        onPress: () => false
      }
    ]);
  }
}

export function* goBackBtn() {
  yield takeLatest(actions.GO_BACK, goBackBtnScenario);
}

export function* refetchHomeCategories() {
  yield takeLatest(actions.REFETCH_HOME_CATEGORIES, startRefetchHomeCategories);
}

export function* refetchUsers() {
  yield takeLatest(actions.REFETCH_USERS, startRefetchUserScenario);
}

export function* getCategoryElements() {
  yield takeLatest(
    actions.GET_CATEGORY_ELEMENTS,
    startGetCategoryElementsScenario
  );
}

export function* getUsers() {
  yield takeLatest(actions.GET_USERS, startGetUsersScenario);
}

export function* getUser() {
  yield takeLatest(actions.GET_USER, startGetUserScenario);
}

export function* getDesigner() {
  yield takeLatest(actions.GET_DESIGNER, startGetDesignerScenario);
}

export function* getProduct() {
  yield takeLatest(actions.GET_PRODUCT, startGetProductScenario);
}

export function* getSearchProducts() {
  yield takeLatest(actions.GET_SEARCH_PRODUCTS, startGetSearchProductsScenario);
}

export function* getAllProducts() {
  yield takeLatest(actions.GET_ALL_PRODUCTS, startGetAllProductsScenario);
}

export function* toggleFavorite() {
  yield takeLatest(actions.TOGGLE_LOADING, toggleFavoriteScenario);
}

export function* setCountry() {
  yield takeLatest(actions.SET_COUNTRY, startSetCountryScenario);
}

export function* setCurrency() {
  yield takeLatest(actions.SET_CURRENCY, startSetCurrencyScenario);
}

export function* getBrand() {
  yield takeLatest(actions.GET_BRAND, startGetBrandScenario);
}

export function* goDeepLinking() {
  yield takeLatest(actions.GO_DEEP_LINKING, startDeepLinkingScenario);
}

export function* setPlayerId() {
  yield takeLatest(actions.SET_PLAYER_ID, startStorePlayerIdScenario);
}

export function* refetchHomeElements() {
  yield takeLatest(
    actions.REFETCH_HOME_ELEMENTS,
    startRefetchHomeElementsScenario
  );
}

export function* addToCart() {
  yield takeLatest(actions.ADD_TO_CART, startAddToCartScenario);
}

export function* removeFromCart() {
  yield takeLatest(actions.REMOVE_FROM_CART, startRemoveFromCartScenario);
}

export function* clearCart() {
  yield takeLatest(actions.CLEAR_CART, startClearCartScenario);
}

export function* submitAuth() {
  yield takeLatest(actions.SUBMIT_AUTH, startSubmitAuthScenario);
}

export function* submitLogout() {
  yield takeLatest(actions.REMOVE_AUTH, startLogoutScenario);
}

export function* getCoupon() {
  yield takeLatest(actions.GET_COUPON, startGetCouponScenario);
}

export function* createMyFatoorahPaymentUrl() {
  yield takeLatest(
    actions.CREATE_MYFATOORAH_PAYMENT_URL,
    startCreateMyFatorrahPaymentUrlScenario
  );
}

export function* createTapPaymentUrl() {
  yield takeLatest(
    actions.CREATE_TAP_PAYMENT_URL,
    startCreateTapPaymentUrlScenario
  );
}

export function* register() {
  yield takeLatest(actions.REGISTER, startRegisterScenario);
}

export function* setSearchParams() {
  yield takeLatest(actions.SET_SEARCH_PARAMS, startSetSearchParamsScenario);
}
