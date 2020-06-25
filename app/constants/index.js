import React from 'react';
import {Platform, Dimensions} from 'react-native';
import {
  AR_FONT,
  EN_FONT,
  ABATI_ANDROID_GOOGLE_API_AUTH_KEY,
  ESCRAP_ANDROID_GOOGLE_API_AUTH_KEY,
  ABATI_IOS_GOOGLE_API_AUTH_KEY,
  ESCRAP_IOS_GOOGLE_API_AUTH_KEY,
  APP_CASE,
} from './../../app';

export const {height, width} = Dimensions.get('window');
export const isIOS = Platform.OS === 'ios' ? true : false;
export const LOGIN_AUTH_KEY = () => {
  switch (APP_CASE) {
    case 'abati':
      return isIOS
        ? ABATI_IOS_GOOGLE_API_AUTH_KEY
        : ABATI_ANDROID_GOOGLE_API_AUTH_KEY;
    case 'escrap':
      return isIOS
        ? ESCRAP_IOS_GOOGLE_API_AUTH_KEY
        : ESCRAP_ANDROID_GOOGLE_API_AUTH_KEY;
    default:
      return {};
  }
};
