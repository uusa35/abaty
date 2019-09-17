import {call, put, all, takeLatest} from 'redux-saga/effects';
import * as api from '../api';
import validate from 'validate.js';
import * as actions from '../types';
import {
  disableLoading,
  disableLoadingContent,
  enableErrorMessage,
  enableLoadingContent,
  enableWarningMessage
} from './settingSagas';
import I18n from '../../../I18n';
import {NavigationActions} from 'react-navigation';

export function* setHomeProducts() {
  try {
    const products = yield call(api.getHomeProducts);
    if (!validate.isEmpty(products) && validate.isArray(products)) {
      yield put({type: actions.SET_HOME_PRODUCTS, payload: products});
    } else {
      yield put({type: actions.SET_HOME_PRODUCTS, payload: []});
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_home_products'))]);
  }
}

export function* getHomeCollectionsScenario() {
  try {
    const collections = yield call(api.getHomeCollections);
    if (!validate.isEmpty(collections) && validate.isArray(collections)) {
      yield all([
        put({type: actions.SET_HOME_COLLECTIONS, payload: collections})
      ]);
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_home_products'))]);
  }
}

export function* startGetCollectionsScenario() {
  try {
    const collections = yield call(api.getCollections);
    if (!validate.isEmpty(collections) && validate.isArray(collections)) {
      yield all([
        put({type: actions.SET_COLLECTIONS, payload: collections}),
        put({type: actions.SET_SEARCH_PARAMS, payload: {}}),
        yield put(
          NavigationActions.navigate({
            routeName: 'CollectionIndex',
            params: {
              name: I18n.t('collections'),
              searchElements: {}
            }
          })
        )
      ]);
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_collections'))]);
  }
}

export function* getProductIndex() {
  try {
    const products = yield call(api.getProducts);
    if (!validate.isEmpty(products) && validate.isArray(products)) {
      yield all([put({type: actions.SET_PRODUCTS, payload: products})]);
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_products'))]);
  }
}

export function* setProducts() {
  try {
    const products = yield call(api.getProducts);
    if (!validate.isEmpty(products) && validate.isArray(products)) {
      yield all([put({type: actions.SET_PRODUCTS, payload: products})]);
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_products'))]);
  }
}

export function* startGetProductScenario(action) {
  try {
    yield call(enableLoadingContent);
    const product = yield call(api.getProduct, action.payload);
    if (!validate.isEmpty(product) && validate.isObject(product)) {
      yield put({type: actions.SET_PRODUCT, payload: product});
      yield all([
        put(
          NavigationActions.navigate({
            routeName: 'Product',
            params: {name: product.name, id: product.id, model: 'product'}
          })
        ),
        call(disableLoadingContent)
      ]);
    }
  } catch (e) {
    yield all([
      call(disableLoadingContent),
      call(enableWarningMessage, I18n.t('error_while_loading_product'))
    ]);
  }
}

export function* startGetSearchProductsScenario(action) {
  try {
    const {name, searchParams, redirect} = action.payload;
    const products = yield call(api.getSearchProducts, searchParams);
    if (!validate.isEmpty(products) && validate.isArray(products)) {
      yield all([
        put({type: actions.SET_PRODUCTS, payload: products}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchParams})
      ]);
      if (!validate.isEmpty(redirect) && redirect) {
        yield put(
          NavigationActions.navigate({
            routeName: 'ProductIndex',
            params: {name: name ? name : I18n.t('products')}
          })
        );
      }
    } else {
      throw products;
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableWarningMessage, I18n.t('no_products'))
    ]);
  }
}

export function* startGetAllProductsScenario(action) {
  try {
    const products = yield call(api.getSearchProducts, action.payload);
    if (!validate.isEmpty(products) && validate.isArray(products)) {
      yield all([
        put({type: actions.SET_PRODUCTS, payload: products}),
        put({type: actions.SET_SEARCH_PARAMS, payload: {}})
      ]);
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableWarningMessage, I18n.t('no_products'))
    ]);
  }
}

export function* setProductFavorites(productFavorites) {
  if (
    !validate.isEmpty(productFavorites) &&
    validate.isArray(productFavorites)
  ) {
    yield put({
      type: actions.SET_PRODUCT_FAVORITES,
      payload: productFavorites
    });
  } else {
    yield put({type: actions.SET_PRODUCT_FAVORITES, payload: []});
  }
}

export function* startToggleProductFavoriteScenario(action) {
  try {
    const products = yield call(api.toggleFavorite, action.payload);
    if (!validate.isEmpty(products) && validate.isArray(products)) {
      yield all([
        put({type: actions.SET_PRODUCT_FAVORITES, payload: products}),
        call(enableWarningMessage, I18n.t('favorite_success'))
      ]);
    } else {
      yield put({type: actions.SET_PRODUCT_FAVORITES, payload: []});
      throw products;
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}

export function* getProduct() {
  yield takeLatest(actions.GET_PRODUCT, startGetProductScenario);
}

export function* getAllProducts() {
  yield takeLatest(actions.GET_ALL_PRODUCTS, startGetAllProductsScenario);
}

export function* toggleProductFavorite() {
  yield takeLatest(
    actions.TOGGLE_PRODUCT_FAVORITE,
    startToggleProductFavoriteScenario
  );
}
export function* getSearchProducts() {
  yield takeLatest(actions.GET_SEARCH_PRODUCTS, startGetSearchProductsScenario);
}

export function* getCollections() {
  yield takeLatest(actions.GET_COLLECTIONS, startGetCollectionsScenario);
}
