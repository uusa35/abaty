import React from 'react';
import {Platform, Dimensions} from 'react-native';
import {appUrlIos, appUrlAndroid} from './env';
import {isRTL} from './I18n';
import {
  AR_FONT,
  EN_FONT,
  ABATI_ANDROID_GOOGLE_API_AUTH_KEY,
  ESCRAP_ANDROID_GOOGLE_API_AUTH_KEY,
  ABATI_IOS_GOOGLE_API_AUTH_KEY,
  ESCRAP_IOS_GOOGLE_API_AUTH_KEY,
} from './../app';
import {APP_CASE} from '../app';

export const {height, width} = Dimensions.get('window');
export const isIOS = Platform.OS === 'ios' ? true : false;
export const touchOpacity = 0.8;
export const rightHorizontalContentInset = 200;
export const bottomVerticalContentInset = 200;
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
export const coreState = {
  isLoading: false,
  bootStrapped: false,
  message: {
    visible: false,
    title: '',
    content: '',
    icon: 'exclamation-triangle',
    color: '#fac811',
  },
  auth: {},
  guest: true,
  currentPage: 1,
  lang: 'ar',
  settings: {},
  users: [],
  user: {},
  categories: [],
  category: {},
  brand: {},
  brands: [],
  company: {},
  companies: [],
  designer: {},
  designers: [],
  product: {},
  products: [],
  homeProducts: [],
  cart: [],
  coupon: {},
  items: [],
  celebrity: {},
  celebrities: [],
  country: {},
  countries: [],
  currency: 'KWD',
  commercials: [],
  deviceId: '',
  playerId: '',
  countryModal: false,
  linking: {},
  classifiedProps: [],
};

export const links = {
  apiUrl: isIOS ? appUrlIos + 'api/' : appUrlAndroid + 'api/',
  storageUrl: isIOS
    ? appUrlIos + 'storage/uploads/images/'
    : appUrlAndroid + 'storage/uploads/images/',
  thumbnailUrl: isIOS
    ? appUrlIos + 'storage/uploads/images/thumbnail/'
    : appUrlAndroid + 'storage/uploads/images/thumbnail/',
  mediumUrl: isIOS
    ? appUrlIos + 'storage/uploads/images/medium/'
    : appUrlAndroid + 'storage/uploads/images/medium/',
  largeUrl: isIOS
    ? appUrlIos + 'storage/uploads/images/large/'
    : appUrlAndroid + 'storage/uploads/images/large/',
  googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=',
  facebook: 'http://facebook.com/',
  twitter: 'http://twitter.com/',
  instagram: 'http//instagram.com/',
  snapchat: 'http://snapchat.com/',
  whatsapp: 'https://api.whatsapp.com/send?text=Asad Group&phone=',
};

export const images = {
  abati: require('./../assets/images/abati.jpeg'),
  mallr: require('./../assets/images/mallr.jpeg'),
  escrap: require('./../assets/images/escrap.jpeg'),
  homekey: require('./../assets/images/homekey.jpeg'),
  pin: require('./../assets/images/pin.png'),
};

export const icons = {
  user: require('./../assets/icons/user.png'),
  info: require('./../assets/icons/info.png'),
  home: require('./../assets/icons/home.png'),
  brands: require('./../assets/icons/brands.png'),
};

export const animations = {
  linAnimation: require('./../assets/animations/LineAnimation.json'),
  burger: require('./../assets/animations/HamburgerArrow.json'),
  logo: require('./../assets/animations/LottieLogo1.json'),
  logo_2: require('./../assets/animations/LottieLogo2.json'),
  walkThrough: require('./../assets/animations/LottieWalkthrough.json'),
  watermelon: require('./../assets/animations/Watermelon.json'),
  squares: require('./../assets/animations/9squares-AlBoardman.json'),
  corpse: require('./../assets/animations/MotionCorpse-Jrcanest.json'),
  pinJump: require('./../assets/animations/PinJump.json'),
  twitterHeart: require('./../assets/animations/TwitterHeart.json'),
  circleLoading: require('./../assets/animations/circle-loading-animation.json'),
  circleLoading_2: require('./../assets/animations/circle-animation.json'),
  offline: require('./../assets/animations/offline.json'),
  car: require('./../assets/animations/car.json'),
  animationCollection: [
    'bounceIn',
    'bounceInDown',
    'bounceInUp',
    'bounceInLeft',
    'bounceInRight',
  ],
  animationSingleElement: ['bounceInLeft', 'bounceInRight'],
};
export const colors = {
  main: 'white',
  danger: 'red',
  warning: 'yellow',
  success: 'green',
};

export const text = {
  smaller: 10,
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 25,
  font: isRTL ? AR_FONT : EN_FONT,
};

export const prefix = `${appUrlIos}element/linking`;
export const linkingPrefix = `${appUrlIos}element/linking?model=`;

export const submitLogin = {
  email: {
    presence: true,
    email: true,
    length: {
      minimum: 2,
      message: 'must be at least 2 characters.',
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 characters.',
    },
  },
};

export const registerConstrains = {
  name: {length: {minimum: 3}, presence: true},
  email: {email: true, presence: true},
  mobile: {length: {minimum: 6}, presence: true},
  address: {length: {minimum: 3}, presence: true},
};

export const storeClassifiedConstrains = {
  name: {length: {minimum: 3}, presence: true},
  price: {presence: true, length: {minimum: 1}},
  mobile: {length: {minimum: 6}, presence: true},
  description: {length: {minimum: 5}, presence: true},
  image: {presence: {allowEmpty: false}},
  images: {presence: {allowEmpty: false}, length: {minimum: 2}},
};

export const editClassifiedConstrains = {
  name: {length: {minimum: 3}, presence: true},
  price: {presence: true},
  mobile: {length: {minimum: 6}, presence: true},
  description: {length: {minimum: 5}, presence: true},
  image: {presence: {allowEmpty: true}},
  images: {presence: {allowEmpty: false}, length: {minimum: 2}},
};

export const commentStoreConstrains = {
  title: {length: {minimum: 3}, presence: true},
  content: {length: {minimum: 3}, presence: true},
};
