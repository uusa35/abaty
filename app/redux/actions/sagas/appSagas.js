import {BackHandler, Alert} from 'react-native';
import * as actions from '../types';
import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import {PersistStore} from './../../store';
import {defaultLang} from './langSagas';
import CodePush from 'react-native-code-push';
import {
  getCountry,
  setHomeBrands,
  setHomeProducts,
  setSlides,
  startDeepLinkingScenario,
  startSetCountryScenario,
  startStorePlayerIdScenario,
  setHomeDesigners,
  startGetDesignerScenario,
  startGetProductScenario,
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
  startCreateMyFatorrahPaymentUrlScenario,
  startCreateTapPaymentUrlScenario,
  startRemoveFromCartScenario,
  startRegisterScenario,
  getProductIndex,
  toggleFavoriteScenario,
  startGetAllProductsScenario,
  startUpdateUserScenario,
  startSubmitCartScenario,
  getVideos,
  startGetSearchServicesScenario,
  startGetServiceScenario,
  setServices,
  startRateUserScenario,
  startBecomeFanScenario
} from './requestSagas';
import {NavigationActions} from 'react-navigation';
import I18n from './../../../I18n';
import {
  setHomeCategories,
  setSettings,
  startRefetchHomeCategories,
  startRefetchUserScenario,
  setCommercials,
  setCountries,
  startGetUserScenario
} from './requestSagas';
import {disableLoading, setDeviceId, enableErrorMessage} from './settingSagas';
import {offlineActionTypes} from 'react-native-offline';

function* startAppBootStrap() {
  try {
    const {network, bootStrapped} = yield select();
    if (!bootStrapped || (__DEV__ && network.isConnected)) {
      console.log('from inside');
      yield all([
        put({
          type: offlineActionTypes.CONNECTION_CHANGE,
          payload: network.isConnected
        }),
        call(setSettings),
        call(setCountries),
        call(setSlides),
        call(setServices),
        call(setCommercials),
        call(setHomeBrands),
        call(startAuthenticatedScenario),
        call(defaultLang),
        call(getCountry),
        call(setDeviceId)
      ]);
      yield call(setHomeCategories);
      yield call(setHomeProducts);
      yield call(getProductIndex);
      yield call(getVideos);
      yield call(setHomeDesigners);
      yield call(setHomeCelebrities);
      yield call(setHomeSplashes);
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

export function* getService() {
  yield takeLatest(actions.GET_SERVICE, startGetServiceScenario);
}

export function* getSearchProducts() {
  yield takeLatest(actions.GET_SEARCH_PRODUCTS, startGetSearchProductsScenario);
}

export function* getSearchServices() {
  yield takeLatest(actions.GET_SEARCH_SERVICES, startGetSearchServicesScenario);
}

export function* getAllProducts() {
  yield takeLatest(actions.GET_ALL_PRODUCTS, startGetAllProductsScenario);
}

export function* toggleFavorite() {
  yield takeLatest(actions.TOGGLE_FAVORITE, toggleFavoriteScenario);
}

export function* setCountry() {
  yield takeLatest(actions.SET_COUNTRY, startSetCountryScenario);
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
  yield takeLatest(actions.DO_CLEAR_CART_PROCESS, startClearCartScenario);
}

export function* submitCart() {
  yield takeLatest(actions.SUBMIT_CART, startSubmitCartScenario);
}

export function* submitAuth() {
  yield takeLatest(actions.SUBMIT_AUTH, startSubmitAuthScenario);
}

export function* updateUser() {
  yield takeLatest(actions.UPDATE_USER, startUpdateUserScenario);
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

export function* rateUser() {
  yield takeLatest(actions.RATE_USER, startRateUserScenario);
}

export function* becomeFan() {
  yield takeLatest(actions.BECOME_FAN, startBecomeFanScenario);
}

export function* resetStore() {
  yield takeLatest(actions.RESET_STORE, startResetStoreScenario);
}

export function* startResetStoreScenario(action) {
  yield put({type: actions.TOGGLE_BOOTSTRAPPED, payload: false}),
    PersistStore.purge();
  yield delay(1000);
  yield call(startAppBootStrap);
}
