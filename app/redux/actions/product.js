import * as actions from './types';

export function getAllProducts(payload) {
  return {
    type: actions.GET_ALL_PRODUCTS,
  };
}

export function toggleProductFavorite(payload) {
  return {
    type: actions.TOGGLE_PRODUCT_FAVORITE,
    payload,
  };
}

export function getBrand(payload) {
  return {
    type: actions.GET_BRAND,
    payload,
  };
}

export function setHomeProducts(products) {
  return {
    type: actions.SET_HOME_PRODUCTS,
    payload: products,
  };
}

export function getProduct(payload) {
  return {
    type: actions.GET_PRODUCT,
    payload,
  };
}

export function getSearchProducts(payload) {
  return {
    type: actions.GET_SEARCH_PRODUCTS,
    payload,
  };
}

export function setBrands(payload) {
  return {
    type: actions.SET_BRANDS,
    payload,
  };
}

export function setBrand(payload) {
  return {
    type: actions.SET_BRAND,
    payload,
  };
}

export function getCollection(payload) {
  return {
    type: actions.GET_COLLECTION,
    payload,
  };
}
