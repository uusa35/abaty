/**
 * Created by usamaahmed on 9/25/17.
 */
import React from 'react';
import {Alert, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import I18n from './../I18n';
import {width} from '../constants/sizes';
import {isIOS} from '../constants';
import geolib, {getDistance} from 'geolib';
import validate from 'validate.js';
import {useSelector} from 'react-redux';

export const convertNumberToEnglish = n => {
  return n.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, c => c.charCodeAt(0) & 0xf);
};

export function setLang(lang) {
  return AsyncStorage.setItem('lang', lang);
}

export async function getLang() {
  return await AsyncStorage.getItem('lang');
}

export function checkImage(img) {
  if (_.has(img, 'path')) {
    return !_.isUndefined(img.path) && !_.isNull(img.path) ? true : false;
  } else {
    return false;
  }
}
export function getImageExtension(img) {
  return _.has(img, 'filename')
    ? img.filename.substring(img.filename.lastIndexOf('.') + 1)
    : img.mime;
}

export function getImageUri(img) {
  return _.has(img, 'sourceURL') ? img.sourceURL : '';
}

export function getImagePath(img) {
  return _.has(img, 'path') ? img.path : '';
}

export function getImageName(img) {
  return _.has(img, 'filename')
    ? img.filename
    : 'img-' + Math.floor(Math.random() * 100) + '.jpeg';
}

// export async function internetChecker() {
//   return await checkInternetConnection();
// }

export function calculateDistance(
  currentLat,
  currentLong,
  latitude,
  longitude,
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
      {latitude: parseFloat(latitudeA), longitude: longitudeA},
    );
  } else {
    return null;
  }
}

export function getPathForDeepLinking(url) {
  const delimiter = url.split('://');
  let type = delimiter[1].split('/')[0];
  let id = delimiter[1].split('/')[1];
  return {type, id};
}

export function getProductConvertedFinalPrice(price, rate) {
  return _.round(price * rate, 2);
}

export function getConvertedFinalPrice(price, rate) {
  return _.round(price * rate, 2);
}

export function getWhatsappLink(number, text = '') {
  return `https://api.whatsapp.com/send?phone=${number}&text=${text}`;
}
export function adjustColor(color, amount) {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, color =>
        (
          '0' +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2),
      )
  );
}
