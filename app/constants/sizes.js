import {Dimensions} from 'react-native';
import {isRTL} from '../I18n';
import {AR_FONT, EN_FONT} from '../../app';

export const {height, width} = Dimensions.get('window');
export const touchOpacity = 0.8;
export const rightHorizontalContentInset = 200;
export const bottomVerticalContentInset = 200;
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
  smallest: 10,
  smaller: 20,
  medium: 30,
  large: 40,
  larger: 50,
  largest: 60,
};

export const text = {
  smallest: 5,
  smaller: 10,
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 25,
  font: isRTL ? AR_FONT : EN_FONT,
};
