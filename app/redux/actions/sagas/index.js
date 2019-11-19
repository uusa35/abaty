import {fork, take, all} from 'redux-saga/effects';
import * as appSagas from './appSagas';
import * as langSagas from './langSagas';
import * as productSagas from './productSagas';
import * as serviceSagas from './serviceSagas';
import * as userSagas from './userSagas';
import * as classifiedSagas from './classifiedSagas';
import {networkSaga} from 'react-native-offline';
import {REHYDRATE, PURGE} from 'redux-persist/lib/constants';

export default function* rootSaga() {
  yield all([
    fork(appSagas.appBootstrap),
    fork(appSagas.refetchHomeCategories),
    // fork(userSagas.refetchUsers),
    fork(userSagas.getUser),
    fork(userSagas.getDesigner),
    fork(userSagas.getShopper),
    fork(userSagas.getCompany),
    fork(userSagas.getCelebrity),
    fork(userSagas.getVideo),
    fork(userSagas.submitAuth),
    fork(userSagas.googleLogin),
    fork(userSagas.reAuthenticate),
    fork(userSagas.updateUser),
    fork(userSagas.submitLogout),
    fork(userSagas.register),
    fork(userSagas.rateUser),
    fork(userSagas.becomeFan),
    fork(productSagas.getProduct),
    fork(productSagas.getSearchProducts),
    fork(serviceSagas.getService),
    fork(serviceSagas.getSearchServices),
    fork(userSagas.getSearchCompanies),
    fork(userSagas.getSearchDesigners),
    fork(userSagas.getSearchCelebrities),
    fork(productSagas.getAllProducts),
    fork(productSagas.getCollections),
    fork(classifiedSagas.getSearchClassifieds),
    fork(classifiedSagas.getClassified),
    fork(classifiedSagas.startNewClassified),
    fork(classifiedSagas.storeClassified),
    fork(classifiedSagas.getHomeClassifieds),
    fork(classifiedSagas.triggerStartClassifiedSearching),
    fork(userSagas.getHomeCompanies),
    fork(userSagas.getHomeDesigners),
    fork(userSagas.getHomeCelebrities),
    fork(productSagas.toggleProductFavorite),
    fork(langSagas.changeLang),
    fork(appSagas.triggerGetCategoryAndGoToNavChildren),
    fork(appSagas.triggerGetParentCategories),
    fork(appSagas.triggerGetHomeCategories),
    fork(appSagas.toggleClassifiedFavorite),
    fork(appSagas.goBackBtn),
    fork(appSagas.goDeepLinking),
    fork(appSagas.refetchHomeElements),
    fork(appSagas.addToCart),
    fork(appSagas.removeFromCart),
    fork(appSagas.clearCart),
    fork(appSagas.submitCart),
    fork(appSagas.setCountry),
    fork(appSagas.setPlayerId),
    fork(appSagas.getCoupon),
    fork(appSagas.createMyFatoorahPaymentUrl),
    fork(appSagas.createTapPaymentUrl),
    fork(appSagas.createCashOnDeliveryPayment),
    fork(appSagas.goDeepLinking),
    fork(appSagas.addComment),
    fork(appSagas.resetStore),
    fork(networkSaga, {pingInterval: 20000}),
  ]);
  yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store
  yield take(PURGE);
}

// Flixable :: fire an action which is empty payload
// then takeLatest(the action fired, then do some sagahere)
