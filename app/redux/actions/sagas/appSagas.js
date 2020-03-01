import {BackHandler, Alert} from 'react-native';
import * as actions from '../types';
import {ABATI, MALLR, HOMEKEY, appVersion} from './../../../../app';
import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import {PersistStore} from './../../store';
import {defaultLang} from './langSagas';
import {
  getCountry,
  setSlides,
  startDeepLinkingScenario,
  startSetCountryScenario,
  startRefetchHomeElementsScenario,
  setHomeSplashes,
  startAddToCartScenario,
  startClearCartScenario,
  startGetCouponScenario,
  startCreateMyFatorrahPaymentUrlScenario,
  startCreateTapPaymentUrlScenario,
  startRemoveFromCartScenario,
  startSubmitCartScenario,
  getVideos,
  startAddCommentScenario,
  setSettings,
  startRefetchHomeCategories,
  setCommercials,
  setCountries,
  getPages,
  getTags,
  startGetHomeCategoriesScenario,
  startGetParentCategoriesScenario,
  startGetCategoryAndGoToNavChildren,
  startCreateCashOnDeliveryPayment,
} from './requestSagas';
import {NavigationActions} from 'react-navigation';
import I18n from './../../../I18n';
import {
  disableLoading,
  setDeviceId,
  enableErrorMessage,
  checkConnection,
} from './settingSagas';
import {
  offlineActionTypes,
  checkInternetConnection,
} from 'react-native-offline';
import validate from 'validate.js';
import DeviceInfo from 'react-native-device-info';
import {
  getHomeServicesScenario,
  getServiceIndex,
  startToggleClassifiedFavoriteScenario,
} from './serviceSagas';
import {
  setHomeBrands,
  startAuthenticatedScenario,
  startStorePlayerIdScenario,
} from './userSagas';
import {
  getBestSaleProducts,
  getHomeCollectionsScenario,
  getHotDealsProducts,
  getLatestProducts,
  getOnSaleProducts,
  getProductIndex,
  setHomeProducts,
} from './productSagas';
import {getClassifiedIndex} from './classifiedSagas';
import {
  getHomeClassifiedCategories,
  getHomeUserCategories,
} from './categorySagas';

function* startAppBootStrap() {
  try {
    const {bootStrapped, version} = yield select();
    yield all([call(defaultLang), call(checkConnection)]);
    if (validate.isEmpty(version)) {
      if (version !== DeviceInfo.getVersion()) {
        yield put({
          type: actions.SET_VERSION,
          payload: DeviceInfo.getVersion(),
        });
        yield call(startResetStoreScenario);
      }
    } else {
      yield put({type: actions.SET_VERSION, payload: DeviceInfo.getVersion()});
    }
    if (!bootStrapped) {
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
        call(getOnSaleProducts),
        call(getBestSaleProducts),
        call(getHotDealsProducts),
        call(getLatestProducts),
        call(getPages),
        call(getTags),
        call(getVideos),
        call(getProductIndex),
        call(getClassifiedIndex),
        call(getHomeServicesScenario),
        call(getServiceIndex),
        call(setHomeSplashes),
        call(getHomeCollectionsScenario),
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
          type: actions.GET_HOME_DESIGNERS,
          payload: {searchParams: {on_home: 1, is_designer: 1}},
        }),
        put({
          type: actions.GET_HOME_CELEBRITIES,
          payload: {searchParams: {on_home: 1, is_celebrity: 1}},
        }),
        put({
          type: actions.GET_HOME_CLASSIFIEDS,
          payload: {searchParams: {on_home: 1}},
        }),
      ]);
      yield put({type: actions.TOGGLE_BOOTSTRAPPED, payload: true}),
        yield call(disableLoading);
    }
  } catch (e) {
    if (__DEV__) {
      console.log('appSaga', e);
    }
    yield call(enableErrorMessage, I18n.t('app_general_error'));
  } finally {
    yield call(disableLoading);
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
        onPress: () => BackHandler.exitApp(),
      },
      {
        text: I18n.t('cancel'),
        onPress: () => false,
      },
    ]);
  }
}

export function* goBackBtn() {
  yield takeLatest(actions.GO_BACK, goBackBtnScenario);
}

export function* refetchHomeCategories() {
  yield takeLatest(actions.REFETCH_HOME_CATEGORIES, startRefetchHomeCategories);
}

export function* toggleClassifiedFavorite() {
  yield takeLatest(
    actions.TOGGLE_CLASSIFIED_FAVORITE,
    startToggleClassifiedFavoriteScenario,
  );
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
    startRefetchHomeElementsScenario,
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

export function* getCoupon() {
  yield takeLatest(actions.GET_COUPON, startGetCouponScenario);
}

export function* createMyFatoorahPaymentUrl() {
  yield takeLatest(
    actions.CREATE_MYFATOORAH_PAYMENT_URL,
    startCreateMyFatorrahPaymentUrlScenario,
  );
}

export function* createTapPaymentUrl() {
  yield takeLatest(
    actions.CREATE_TAP_PAYMENT_URL,
    startCreateTapPaymentUrlScenario,
  );
}

export function* createCashOnDeliveryPayment() {
  yield takeLatest(actions.CASH_ON_DELIVERY, startCreateCashOnDeliveryPayment);
}

export function* addComment() {
  yield takeLatest(actions.ADD_COMMENT, startAddCommentScenario);
}

export function* resetStore() {
  yield takeLatest(actions.RESET_STORE, startResetStoreScenario);
}

export function* startResetStoreScenario() {
  yield all([
    put(
        NavigationActions.navigate({
        routeName: 'Home',
      }),
    ),
    put({type: actions.TOGGLE_BOOTSTRAPPED, payload: false}),
  ]);
  PersistStore.purge();
  yield delay(1000);
  yield call(startAppBootStrap);
}

export function* triggerGetHomeCategories() {
  yield takeLatest(actions.GET_HOME_CATEGORIES, startGetHomeCategoriesScenario);
}

export function* triggerGetParentCategories() {
  yield takeLatest(actions.GET_CATEGORIES, startGetParentCategoriesScenario);
}

export function* triggerGetCategoryAndGoToNavChildren() {
  yield takeLatest(
    actions.SET_CATEGORY_AND_GO_TO_NAV_CHILDREN,
    startGetCategoryAndGoToNavChildren,
  );
}
