import {call, put, all, takeLatest, select} from 'redux-saga/effects';
import * as api from '../api';
import validate from 'validate.js';
import * as actions from '../types';
import {
  disableLoading,
  disableLoadingBoxedList,
  disableLoadingContent,
  enableErrorMessage,
  enableLoadingBoxedList,
  enableLoadingContent,
  enableWarningMessage,
  startGoogleAnalyticsScenario,
} from './settingSagas';
import I18n from '../../../I18n';
import {NavigationActions} from 'react-navigation';
import {SET_ELEMENT_TYPE} from '../types';

export function* setHomeProducts() {
  try {
    const elements = yield call(api.getHomeProducts, {on_home: 1});
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield put({type: actions.SET_HOME_PRODUCTS, payload: elements});
    } else {
      yield put({type: actions.SET_HOME_PRODUCTS, payload: []});
    }
  } catch (e) {
    yield enableErrorMessage(I18n.t('no_home_products'));
  } finally {
    yield call(disableLoading);
  }
}

export function* getOnSaleProducts() {
  try {
    const elements = yield call(api.getHomeProducts, {on_sale: 1});
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield put({type: actions.SET_ON_SALE_PRODUCTS, payload: elements});
    } else {
      yield put({type: actions.SET_ON_SALE_PRODUCTS, payload: []});
    }
  } catch (e) {
    yield all([
      disableLoading,
      enableErrorMessage(I18n.t('no_on_sale_products')),
    ]);
  }
}

export function* getBestSaleProducts() {
  try {
    const elements = yield call(api.getHomeProducts, {best_sale: 1});
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield put({type: actions.SET_BEST_SALE_PRODUCTS, payload: elements});
    } else {
      yield put({type: actions.SET_BEST_SALE_PRODUCTS, payload: []});
    }
  } catch (e) {
    yield all([
      disableLoading,
      enableErrorMessage(I18n.t('no_best_sale_products')),
    ]);
  }
}

export function* getLatestProducts() {
  try {
    const elements = yield call(api.getHomeProducts, {latest: 1});
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield put({type: actions.SET_LATEST_PRODUCTS, payload: elements});
    } else {
      yield put({type: actions.SET_LATEST_PRODUCTS, payload: []});
    }
  } catch (e) {
    yield all([
      disableLoading,
      enableErrorMessage(I18n.t('no_latest_products')),
    ]);
  }
}
export function* getHotDealsProducts() {
  try {
    const elements = yield call(api.getHomeProducts, {hot_deals: 1});
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield put({type: actions.SET_HOT_DEALS_PRODUCTS, payload: elements});
    } else {
      yield put({type: actions.SET_HOT_DEALS_PRODUCTS, payload: []});
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_hot_deals'))]);
  }
}

export function* getHomeCollectionsScenario() {
  try {
    const collections = yield call(api.getHomeCollections);
    if (!validate.isEmpty(collections) && validate.isArray(collections)) {
      yield all([
        put({type: actions.SET_HOME_COLLECTIONS, payload: collections}),
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
              searchElements: {},
            },
          }),
        ),
      ]);
    }
  } catch (e) {
    yield call(enableErrorMessage, I18n.t('no_collections'));
  } finally {
    yield call(disableLoading);
  }
}

export function* startGetCollectionScenario(action) {
  try {
    const {id, redirect} = action.payload;
    if (validate.isEmpty(redirect) && redirect) {
      yield call(enableLoadingContent);
    }
    const element = yield call(api.getCollection, id);
    if (validate.isEmpty(element) && validate.isObject(element) && element.id) {
      yield put({type: actions.SET_COLLECTION, payload: element});
      if (validate.isEmpty(redirect) && redirect) {
        yield put(
          NavigationActions.navigate({
            routeName: 'CollectionShow',
            params: {
              name: element.user.slug,
              searchElements: {collection_id: element.id},
            },
          }),
        );
      }
    }
  } catch (e) {
  } finally {
    yield call(disableLoadingContent);
  }
}

export function* getProductIndex() {
  try {
    const products = yield call(api.getProducts);
    if (!validate.isEmpty(products) && validate.isArray(products)) {
      yield put({type: actions.SET_PRODUCTS, payload: products});
    }
  } catch (e) {
    yield enableErrorMessage(I18n.t('no_products'));
  } finally {
    yield call(disableLoading);
  }
}

export function* setProducts() {
  try {
    const elements = yield call(api.getProducts);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield all([put({type: actions.SET_PRODUCTS, payload: elements})]);
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_products'))]);
  }
}

export function* startGetProductScenario(action) {
  try {
    const {redirect} = action.payload;
    if (!validate.isEmpty(redirect) && redirect) {
      yield call(enableLoadingContent);
    }
    const element = yield call(api.getProduct, action.payload);
    if (
      !validate.isEmpty(element) &&
      validate.isObject(element) &&
      element.id
    ) {
      if (__DEV__) {
        // console.log('the product', element);
      }
      yield all([put({type: actions.SET_PRODUCT, payload: element})]);
      if (!validate.isEmpty(redirect) && redirect) {
        yield all([
          call(startGoogleAnalyticsScenario, {
            payload: {type: 'Product', element},
          }),
          put(
            NavigationActions.navigate({
              routeName: 'Product',
              params: {
                name: element.name,
                id: element.id,
                model: 'product',
                type: 'product',
              },
            }),
          ),
        ]);
      }
    }
  } catch (e) {
    // if (__DEV__) {
    //   console.log('e', e);
    // }
    yield call(enableWarningMessage, I18n.t('error_while_loading_product'));
  } finally {
    yield call(disableLoadingContent);
  }
}

export function* startGetSearchProductsScenario(action) {
  try {
    const {name, searchParams, redirect} = action.payload;
    if (!validate.isEmpty(redirect) && redirect) {
      yield call(enableLoadingBoxedList);
    }
    yield all([
      put({type: actions.HIDE_PRODUCT_FILTER_MODAL}),
      call(enableLoadingBoxedList),
      // put({type: actions.SET_SEARCH_PRODUCTS, payload: []}),
    ]);
    const elements = yield call(api.getSearchProducts, searchParams);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield all([
        put({type: actions.SET_SEARCH_PRODUCTS, payload: elements}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchParams}),
      ]);
      if (!validate.isEmpty(redirect) && redirect) {
        yield all([
          put(
            NavigationActions.navigate({
              routeName: 'SearchProductIndex',
              params: {name: name ? name : I18n.t('products')},
            }),
          ),
        ]);
      }
    } else {
      yield all([
        put({type: actions.SET_SEARCH_PRODUCTS, payload: []}),
        put({type: actions.SET_SEARCH_PARAMS, payload: {}}),
      ]);
      throw products;
    }
  } catch (e) {
    yield call(enableWarningMessage, I18n.t('no_products'));
  } finally {
    yield call(disableLoadingBoxedList);
  }
}

export function* startGetAllProductsScenario(action) {
  try {
    const products = yield call(api.getSearchProducts, action.payload);
    yield put({type: SET_ELEMENT_TYPE, payload: 'product'});
    if (!validate.isEmpty(products) && validate.isArray(products)) {
      yield all([
        put({type: actions.SET_PRODUCTS, payload: products}),
        // put({type : actions.SET_SEARCH_PRODUCTS, payload : []})
        // put({type: actions.SET_SEARCH_PARAMS, payload: {}}),
      ]);
    } else {
      yield all([
        put({type: actions.SET_PRODUCTS, payload: []}),
        // put({type : actions.SET_SEARCH_PRODUCTS, payload : []}),
        put({type: actions.SET_SEARCH_PARAMS, payload: {}}),
      ]);
      throw 'no_products';
    }
  } catch (e) {
    yield call(enableWarningMessage, I18n.t('no_products'));
  } finally {
    yield call(disableLoading);
  }
}

export function* setProductFavorites(productFavorites) {
  if (
    !validate.isEmpty(productFavorites) &&
    validate.isArray(productFavorites)
  ) {
    yield put({
      type: actions.SET_PRODUCT_FAVORITES,
      payload: productFavorites,
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
        call(enableWarningMessage, I18n.t('favorite_success')),
      ]);
    } else {
      yield put({type: actions.SET_PRODUCT_FAVORITES, payload: []});
      throw products;
    }
  } catch (e) {
    yield call(enableWarningMessage, I18n.t('no_products'));
  } finally {
  }
}
