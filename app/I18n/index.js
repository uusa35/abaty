import {I18nManager} from 'react-native';
import I18n from 'react-native-i18n';
const en = require('./en.json');
const ar = require('./ar.json');
I18n.fallbacks = false;
I18n.defaultLocale = 'en';
I18n.locale = I18nManager.isRTL ? 'ar' : 'en';
I18n.translations = {
  en,
  ar
};
export const isRTL = I18nManager.isRTL;
I18nManager.allowRTL(isRTL);
__DEV__ ? console.log('the isRTL', isRTL) : null;
export default I18n;
