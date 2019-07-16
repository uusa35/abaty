/**
 * Created by usamaahmed on 9/25/17.
 */
import React from 'react';
import {Alert, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import I18n from './../I18n';
import {width, isIOS, prefix} from './../constants';
import geolib, {getDistance} from 'geolib';
import validate from 'validate.js';
import {checkInternetConnection} from 'react-native-offline';

export async function setAuthToken(token) {
  return AsyncStorage.setItem('api_token', token);
}

export async function getAuthToken() {
  return AsyncStorage.getItem('api_token');
}

export function setLang(lang) {
  return AsyncStorage.setItem('lang', lang);
}

export async function getLang() {
  return await AsyncStorage.getItem('lang');
}

export function setCurrency(currency) {
  return AsyncStorage.setItem('@myapp:currency', currency);
}

export async function getCurrency() {
  try {
    const currency = await AsyncStorage.getItem('@myapp:currency');
    return currency;
  } catch (error) {
    console.log('currency storage error', error.message);
  }
}

export function setCart(cart) {
  return AsyncStorage.setItem('cart', cart);
}

export function getCart() {
  return AsyncStorage.getItem('cart');
}

export function showAlert(title, message) {
  return Alert.alert(title, message, [
    {text: I18n.t('ok'), style: I18n.t('cancel')}
  ]);
}

export function checkImage(img) {
  if (_.has(img, 'sourceURL')) {
    return !_.isUndefined(img.sourceURL) && !_.isNull(img.sourceURL)
      ? true
      : false;
  } else {
    return false;
  }
}
export function getImageExtension(img) {
  return _.has(img, 'filename')
    ? img.filename.substring(img.filename.lastIndexOf('.') + 1)
    : '';
}

export function getImageUri(img) {
  return _.has(img, 'sourceURL') ? img.sourceURL : '';
}

export function getImagePath(img) {
  return _.has(img, 'path') ? img.path : '';
}

export function getImageName(img) {
  return _.has(img, 'filename') ? img.filename : '';
}

export function handleError(e) {
  if (!validate.isEmpty(e.graphQLErrors) && validate.isArray(e.graphQLErrors)) {
    return e.graphQLErrors[0].message;
  } else if (!validate.isEmpty(e.graphQLErrors)) {
    return e.graphQLErrors.message;
  } else if (!validate.isEmpty(e.response)) {
    return e.response.data.message;
  } else {
    return e.message;
  }
}

// export async function internetChecker() {
//   return await checkInternetConnection();
// }

export function calculateDistance(
  currentLat,
  currentLong,
  latitude,
  longitude
) {
  let currentLongA = !validate.isEmpty(currentLong) ? currentLong : null;
  let currentLatA = !validate.isEmpty(currentLat) ? currentLat : null;
  let latitudeA = !validate.isEmpty(latitude) ? latitude : null;
  let longitudeA = !validate.isEmpty(longitude) ? longitude : null;
  if (
    !validate.isEmpty(currentLatA) &&
    !validate.isEmpty(currentLongA) &&
    !validate.isEmpty(latitudeA) &&
    !validate.isEmpty(longitudeA)
  ) {
    return getDistance(
      {latitude: parseFloat(currentLatA), longitude: currentLongA},
      {latitude: parseFloat(latitudeA), longitude: longitudeA}
    );
  } else {
    return null;
  }
}

export const getHeader = title => {
  return (
    <Text
      style={{
        fontFamily: 'Tajawal-Medium',
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        borderWidth: 5,
        width: width - 110,
        alignSelf: 'center'
      }}>
      {title}
    </Text>
  );
};

export function getTabTitle(title) {
  return (
    <Text
      style={{
        fontFamily: 'Tajawal-Medium',
        color: 'black',
        textAlign: 'center',
        marginTop: isIOS ? 10 : 3,
        fontSize: isIOS ? 12 : 10
      }}>
      {title}
    </Text>
  );
}

export function isAuthenticated(auth) {
  return !validate.isEmpty(auth.api_token) ? true : false;
}

export function getPathForDeepLinking(url) {
  const delimiter = url.split('://');
  let type = delimiter[1].split('/')[0];
  let id  = delimiter[1].split('/')[1];
  return {type, id};
}

export function getProductConvertedFinalPrice(price, rate) {
  return _.round(price * rate, 2);
}
