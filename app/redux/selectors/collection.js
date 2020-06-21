import {createSelector} from 'reselect';
import {useSelector} from 'react-redux';

const token = (state) => state.token;
const colors = (state) => state.settings.colors;
const logo = (state) => state.settings.logo;
const country = (state) => state.country;
const currency = (state) => state.currency;
const playerId = (state) => state.playerId;
const auth = (state) => state.auth;
const settings = (state) => state.settings;
const menuBg = (state) => state.settings.menu_bg;
const phone = (state) => state.settings.phone;
const mobile = (state) => state.settings.mobile;
const companyName = (state) => state.settings.company;
const settingImages = (state) => state.settings.images;
const youtube = (state) => state.settings.youtube;
const guest = (state) => state.guest;
const lang = (state) => state.lang;
const authName = (state) => state.auth.name;
const product = (state) => state.product;
const designer = (state) => state.designer;
const service = (state) => state.service;
const loginModal = (state) => state.loginModal;
const commentModal = (state) => state.commentModal;
const userWidget = (state) => state.designers;

export const tokenSelector = createSelector(token, (token) => token);

export const colorsSelector = createSelector(colors, (colors) => colors);

export const logoSelector = createSelector(logo, (logo) => logo);

export const countrySelector = createSelector(country, (country) => country);

export const currencySelector = createSelector(
  currency,
  (currency) => currency,
);

export const playerIdSelector = createSelector(
  playerId,
  (playerId) => playerId,
);

export const authSelector = createSelector(auth, (auth) => auth);

export const settingsSelector = createSelector(
  settings,
  (settings) => settings,
);

export const menuBgSelector = createSelector(menuBg, (menuBg) => menuBg);

export const companyNameSelector = createSelector(
  companyName,
  (companyName) => companyName,
);
export const settingImagesSelector = createSelector(
  settingImages,
  (settingImages) => settingImages,
);
export const youtubeSelector = createSelector(youtube, (youtube) => youtube);
export const guestSelector = createSelector(guest, (guest) => guest);
export const langSelector = createSelector(lang, (lang) => lang);
export const phoneSelector = createSelector(phone, (phone) => phone);
export const mobileSelector = createSelector(mobile, (mobile) => mobile);
export const authNameSelector = createSelector(
  authName,
  (authName) => authName,
);
export const serviceSelector = createSelector(service, (service) => service);
export const productSelector = createSelector(product, (product) => product);

export const loginModalSelector = createSelector(
  loginModal,
  (loginModal) => loginModal,
);

export const commentModalSelector = createSelector(
  commentModal,
  (commentModal) => commentModal,
);

export const designerSelector = createSelector(
  designer,
  (designer) => designer,
);
