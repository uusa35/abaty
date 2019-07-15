import {fork, take, all} from 'redux-saga/effects';
import * as appSagas from './appSagas';
import * as langSagas from './langSagas';
import {networkSaga} from 'react-native-offline';
import {REHYDRATE, PURGE} from 'redux-persist/lib/constants';

export default function* rootSaga() {
  yield all([
    fork(appSagas.appBootstrap),
    fork(appSagas.refetchHomeCategories),
    fork(appSagas.refetchUsers),
    fork(appSagas.getUsers),
    fork(appSagas.getUser),
    fork(appSagas.getDesigner),
    fork(appSagas.getProduct),
    fork(appSagas.getSearchProducts),
    fork(appSagas.getAllProducts),
    fork(appSagas.toggleFavorite),
    fork(langSagas.changeLang),
    fork(appSagas.goBackBtn),
    fork(appSagas.goDeepLinking),
    fork(appSagas.refetchHomeElements),
    fork(appSagas.addToCart),
    fork(appSagas.removeFromCart),
    fork(appSagas.clearCart),
    // fork(appSagas.setCountry)
    fork(appSagas.setCurrency),
    fork(appSagas.setPlayerId),
    fork(appSagas.submitAuth),
    fork(appSagas.updateUser),
    fork(appSagas.submitLogout),
    fork(appSagas.getCoupon),
    fork(appSagas.createMyFatoorahPaymentUrl),
    fork(appSagas.createTapPaymentUrl),
    fork(appSagas.goDeepLinking),
    fork(appSagas.register),
    fork(networkSaga, {pingInterval: 20000})
  ]);
  yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store
  yield take(PURGE);
}

// Flixable :: fire an action which is empty payload
// then takeLatest(the action fired, then do some sagahere)
