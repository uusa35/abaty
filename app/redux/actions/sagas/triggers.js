import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import * as actions from '../types';
import * as requestSaga from './requestSagas';
import * as userSaga from './userSagas';
import * as productSaga from './productSagas';
import {
  startAppBootStrap,
  goBackBtnScenario,
  startResetStoreScenario,
} from './appSagas';
import {
  startGetSearchServicesScenario,
  startGetServiceScenario,
  startToggleClassifiedFavoriteScenario,
} from './serviceSagas';
import * as classifiedSaga from './classifiedSagas';
import {startChangeLang} from './langSagas';
import {startStorePlayerIdScenario} from './userSagas';
import {startGetRolesScenario} from './userSagas';
import {checkConnectionStatus} from '../api';
import {checkConnection} from './settingSagas';

export function* triggerGoBackBtn() {
  yield takeLatest(actions.GO_BACK, goBackBtnScenario);
}

export function* triggerRefetchHomeCategories() {
  yield takeLatest(
    actions.REFETCH_HOME_CATEGORIES,
    requestSaga.startRefetchHomeCategories,
  );
}

export function* triggerToggleClassifiedFavorite() {
  yield takeLatest(
    actions.TOGGLE_CLASSIFIED_FAVORITE,
    startToggleClassifiedFavoriteScenario,
  );
}

export function* triggerChooseCountry() {
  yield takeLatest(
    actions.CHOOSE_COUNTRY,
    requestSaga.startChooseCountryScenario,
  );
}

export function* triggerGoDeepLinking() {
  yield takeLatest(
    actions.GO_DEEP_LINKING,
    requestSaga.startDeepLinkingScenario,
  );
}

export function* triggerSetPlayerId() {
  yield takeLatest(actions.SET_PLAYER_ID, startStorePlayerIdScenario);
}

export function* triggerRefetchHomeElements() {
  yield takeLatest(
    actions.REFETCH_HOME_ELEMENTS,
    requestSaga.startRefetchHomeElementsScenario,
  );
}

export function* triggerAddToCart() {
  yield takeLatest(actions.ADD_TO_CART, requestSaga.startAddToCartScenario);
}

export function* triggerRemoveFromCart() {
  yield takeLatest(
    actions.REMOVE_FROM_CART,
    requestSaga.startRemoveFromCartScenario,
  );
}

export function* triggerClearCart() {
  yield takeLatest(
    actions.DO_CLEAR_CART_PROCESS,
    requestSaga.startClearCartScenario,
  );
}

export function* triggerSubmitCart() {
  yield takeLatest(actions.SUBMIT_CART, requestSaga.startSubmitCartScenario);
}

export function* triggerGetCoupon() {
  yield takeLatest(actions.GET_COUPON, requestSaga.startGetCouponScenario);
}

export function* triggerCreateTapPaymentUrl() {
  yield takeLatest(
    actions.CREATE_TAP_PAYMENT_URL,
    requestSaga.startCreateTapPaymentUrlScenario,
  );
}

export function* triggerCreateCashOnDeliveryPayment() {
  yield takeLatest(
    actions.CASH_ON_DELIVERY,
    requestSaga.startCreateCashOnDeliveryPayment,
  );
}

export function* triggerAddComment() {
  yield takeLatest(actions.ADD_COMMENT, requestSaga.startAddCommentScenario);
}

export function* triggerResetStore() {
  yield takeLatest(actions.RESET_STORE, startResetStoreScenario);
}

export function* triggerGetRoles() {
  yield takeLatest(actions.GET_ROLES, startGetRolesScenario);
}

export function* triggerGetHomeCategories() {
  yield takeLatest(
    actions.GET_HOME_CATEGORIES,
    requestSaga.startGetHomeCategoriesScenario,
  );
}

export function* triggerGetParentCategories() {
  yield takeLatest(
    actions.GET_CATEGORIES,
    requestSaga.startGetParentCategoriesScenario,
  );
}

export function* triggerGetCategoryAndGoToNavChildren() {
  yield takeLatest(
    actions.SET_CATEGORY_AND_GO_TO_NAV_CHILDREN,
    requestSaga.startGetCategoryAndGoToNavChildren,
  );
}

export function* triggerCreateMyFatoorahPaymentUrl() {
  yield takeLatest(
    actions.CREATE_MYFATOORAH_PAYMENT_URL,
    requestSaga.startCreateMyFatorrahPaymentUrlScenario,
  );
}

// product
export function* triggerGetProduct() {
  yield takeLatest(actions.GET_PRODUCT, productSaga.startGetProductScenario);
}

export function* triggerGetAllProducts() {
  yield takeLatest(
    actions.GET_ALL_PRODUCTS,
    productSaga.startGetAllProductsScenario,
  );
}

export function* triggerToggleProductFavorite() {
  yield takeLatest(
    actions.TOGGLE_PRODUCT_FAVORITE,
    productSaga.startToggleProductFavoriteScenario,
  );
}
export function* triggerGetSearchProducts() {
  yield takeLatest(
    actions.GET_SEARCH_PRODUCTS,
    productSaga.startGetSearchProductsScenario,
  );
}

export function* triggerGetCollections() {
  yield takeLatest(
    actions.GET_COLLECTIONS,
    productSaga.startGetCollectionsScenario,
  );
}

export function* triggerTriggerGetCollection() {
  yield takeLatest(
    actions.GET_COLLECTION,
    productSaga.startGetCollectionScenario,
  );
}

// request

export function* triggerBecomeFan() {
  yield takeLatest(actions.BECOME_FAN, requestSaga.startBecomeFanScenario);
}

export function* triggerAppBootstrap() {
  yield takeLatest(actions.START_BOOTSTRAP, startAppBootStrap);
}

export function* triggerCheckConnection() {
  yield takeLatest(actions.CHECK_CONNECTION, checkConnection);
}

export function* triggerGetUser() {
  yield takeLatest(actions.GET_USER, userSaga.startGetUserScenario);
}

export function* triggerGetDesigner() {
  yield takeLatest(actions.GET_DESIGNER, userSaga.startGetDesignerScenario);
}

export function* triggerGetShopper() {
  yield takeLatest(actions.GET_SHOPPER, userSaga.startGetShopperScenario);
}

export function* triggerGetCompany() {
  yield takeLatest(actions.GET_COMPANY, userSaga.startGetCompanyScenario);
}

export function* triggerGetCelebrity() {
  yield takeLatest(actions.GET_CELEBRITY, userSaga.startGetCelebrityScenario);
}

export function* triggerGetVideo() {
  yield takeLatest(actions.GET_VIDEO, userSaga.startGetVideoScenario);
}

export function* triggerSubmitAuth() {
  yield takeLatest(actions.SUBMIT_AUTH, userSaga.startSubmitAuthScenario);
}

export function* triggerReAuthenticate() {
  yield takeLatest(
    actions.REAUTHENTICATE,
    userSaga.startReAuthenticateScenario,
  );
}

export function* triggerGoogleLogin() {
  yield takeLatest(actions.GOOGLE_LOGIN, requestSaga.startGoogleLoginScenario);
}

export function* triggerUpdateUser() {
  yield takeLatest(actions.UPDATE_USER, userSaga.startUpdateUserScenario);
}

export function* triggerSubmitLogout() {
  yield takeLatest(actions.REMOVE_AUTH, userSaga.startLogoutScenario);
}

export function* triggerRegister() {
  yield takeLatest(actions.REGISTER, userSaga.startRegisterScenario);
}

export function* triggerCompanyRegister() {
  yield takeLatest(
    actions.COMPANY_REGISTER,
    userSaga.startCompanyRegisterScenario,
  );
}

export function* triggerRateUser() {
  yield takeLatest(actions.RATE_USER, userSaga.startRateUserScenario);
}

export function* triggerGetSearchCompanies() {
  yield takeLatest(
    actions.GET_COMPANIES,
    userSaga.startGetSearchCompaniesScenario,
  );
}

export function* triggerGetSearchDesigners() {
  yield takeLatest(actions.GET_DESIGNERS, userSaga.startGetDesignersScenario);
}

export function* triggerGetSearchCelebrities() {
  yield takeLatest(
    actions.GET_CELEBRITIES,
    userSaga.startGetCelebritiesScenario,
  );
}

export function* triggerGetHomeCompanies() {
  yield takeLatest(
    actions.GET_HOME_COMPANIES,
    userSaga.startGetHomeCompaniesScenario,
  );
}

export function* triggerGetHomeCelebrities() {
  yield takeLatest(
    actions.GET_HOME_CELEBRITIES,
    userSaga.startGetHomeCelebrities,
  );
}

export function* triggerGetHomeDesigners() {
  yield takeLatest(actions.GET_HOME_DESIGNERS, userSaga.startGetHomeDesigners);
}

// classified
export function* triggerGetAllClassifieds() {
  yield takeLatest(
    actions.GET_ALL_CLASSIFIEDS,
    classifiedSaga.startGetAllClassifiedsSceanrio,
  );
}

export function* triggerGetSearchClassifieds() {
  yield takeLatest(
    actions.GET_CLASSIFIEDS,
    classifiedSaga.startGetClassifiedsScenario,
  );
}

export function* triggerStartClassifiedSearching() {
  yield takeLatest(
    actions.START_CLASSIFIED_SEARCHING,
    classifiedSaga.startClassifiedSearchingScenario,
  );
}

export function* triggerGetMyClassifieds() {
  yield takeLatest(
    actions.GET_MY_CLASSIFIEDS,
    classifiedSaga.startGetMyClassifiedsScenario,
  );
}

export function* triggerGetHomeClassifieds() {
  yield takeLatest(
    actions.GET_HOME_CLASSIFIEDS,
    classifiedSaga.startGetHomeClassifiedsScenario,
  );
}

export function* triggerGetClassified() {
  yield takeLatest(
    actions.GET_CLASSIFIED,
    classifiedSaga.startGetClassifiedScenario,
  );
}

export function* triggerDeleteClassified() {
  yield takeLatest(
    actions.DELETE_CLASSIFIED,
    classifiedSaga.startDeleteClassifiedScenario,
  );
}

export function* triggerStoreClassified() {
  yield takeLatest(
    actions.STORE_CLASSIFIED,
    classifiedSaga.startStoreClassifiedScenario,
  );
}

export function* triggerEditClassified() {
  yield takeLatest(
    actions.EDIT_CLASSIFIED,
    classifiedSaga.startEditClassifiedScenario,
  );
}

export function* triggerStartNewClassified() {
  yield takeLatest(
    actions.START_NEW_CLASSIFIED,
    classifiedSaga.startNewClassifiedScenario,
  );
}

// service
export function* triggerGetService() {
  yield takeLatest(actions.GET_SERVICE, startGetServiceScenario);
}

export function* triggerGetSearchServices() {
  yield takeLatest(actions.GET_SEARCH_SERVICES, startGetSearchServicesScenario);
}

// language
export function* triggerChangeLang() {
  yield takeLatest(actions.CHANGE_LANG, startChangeLang);
}
