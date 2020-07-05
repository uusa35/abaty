import {Dimensions} from 'react-native';
import {isRTL} from '../I18n';
import {
  AR_FONT,
  EN_FONT,
  APP_CASE,
  ABATI_AR_FONT,
  ABATI_EN_FONT,
} from '../../app';

export const {height, width} = Dimensions.get('window');
export const touchOpacity = 0.8;
export const rightHorizontalContentInset = 200;
export const bottomVerticalContentInset = 200;
export const bottomContentInset = 200;
export const TheHold = 0.5;
export const productWidget = {
  x4Small: {
    productWidth: 100,
    productHeight: 160,
  },
  smallest: {
    productWidth: 150,
    productHeight: 200,
  },
  smaller: {
    productWidth: 200,
    productHeight: 267,
  },
  small: {
    productWidth: 220,
    productHeight: 293,
  },
  medium: {
    productWidth: 250,
    productHeight: 333,
  },
  large: {
    productWidth: 280,
    productHeight: 373,
  },
};

export const serviceWidget = {
  smallest: {
    productWidth: 150,
    productHeight: 200,
  },
  smaller: {
    productWidth: 200,
    productHeight: 267,
  },
  small: {
    productWidth: 220,
    productHeight: 293,
  },
  medium: {
    productWidth: 250,
    productHeight: 333,
  },
  large: {
    productWidth: 280,
    productHeight: 373,
  },
};

export const iconSizes = {
  tiny: 10,
  smallest: 15,
  smaller: 25,
  small: 30,
  medium: 40,
  large: 50,
  larger: 60,
  largest: 70,
};

export const getFont = () => {
  switch (APP_CASE) {
    case 'abati':
      return isRTL ? ABATI_AR_FONT : ABATI_EN_FONT;
    case 'escrap':
      return isRTL ? AR_FONT : EN_FONT;
    default:
      return isRTL ? AR_FONT : EN_FONT;
  }
};

export const text = {
  smallest: 5,
  smaller: 10,
  small: 12,
  medium: 15,
  large: 20,
  xlarge: 25,
  font: getFont(),
};
