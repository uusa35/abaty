import * as actions from './types';
import I18n from './../../I18n';

export function appBootstrap() {
  return {
    type: actions.START_BOOTSTRAP,
  };
}

export function linkNotification(notification) {
  return {
    type: actions.LINK_NOTIFICATION,
    payload: notification,
  };
}

export function toggleBootstrapped(bootstrapped) {
  return {
    type: actions.TOGGLE_BOOTSTRAPPED,
    payload: bootstrapped,
  };
}

export function logout() {
  return {
    type: actions.REMOVE_AUTH,
  };
}

export function submitAuth(payload) {
  return {
    type: actions.SUBMIT_AUTH,
    payload,
  };
}

export function updateUser(payload) {
  return {
    type: actions.UPDATE_USER,
    payload,
  };
}

export function enableMessage(
  content,
  status = 'info',
  title = I18n.t('asad'),
  color = 'orange',
) {
  return {
    type: actions.ENABLE_MESSAGE,
    payload: {
      status,
      content,
      title,
      visible: true,
      color,
    },
  };
}

export function enableSuccessMessage(content, title = I18n.t('asad')) {
  return {
    type: actions.ENABLE_MESSAGE,
    payload: {
      icon: 'exclamation-triangle',
      color: 'green',
      visible: true,
      content,
      title,
    },
  };
}

export function enableErrorMessage(content, title = I18n.t('asad')) {
  return {
    type: actions.ENABLE_MESSAGE,
    payload: {
      icon: 'exclamation-triangle',
      visible: true,
      color: 'red',
      content,
      title,
    },
  };
}

export function enableWarningMessage(content, title = I18n.t('asad')) {
  return {
    type: actions.ENABLE_MESSAGE,
    payload: {
      icon: 'exclamation-triangle',
      visible: true,
      color: 'orange',
      content,
      title,
    },
  };
}

export function disableMessage() {
  return {
    type: actions.DISABLE_MESSAGE,
  };
}
export function changeLang(payload) {
  return {
    type: actions.CHANGE_LANG,
    payload,
  };
}

export function setLang(lang) {
  return {
    type: actions.SET_LANG,
    payload: lang,
  };
}
export function toggleGuest(guest) {
  return {
    type: actions.TOGGLE_GUEST,
    payload: guest,
  };
}

export function setHomeSliders(sliders) {
  return {
    type: actions.SET_HOME_SLIDERS,
    payload: sliders,
  };
}

export function setHomeProducts(products) {
  return {
    type: actions.SET_HOME_PRODUCTS,
    payload: products,
  };
}

export function getRoles(roles) {
  return {
    type: actions.GET_ROLES,
    payload: roles,
  };
}

export function setGalleries(galleries) {
  return {
    type: actions.SET_GALLERIES,
    payload: galleries,
  };
}

export function setSettings(settings) {
  return {
    type: actions.SET_SETTINGS,
    payload: settings,
  };
}

export function submitRegisterRequest(payload) {
  return {
    type: actions.SUBMIT_REGISTER_REQUEST,
    payload,
  };
}

export function refetchHomeCategories(payload) {
  return {
    type: actions.REFETCH_HOME_CATEGORIES,
  };
}

export function submitForgetPassword(payload) {
  return {
    type: actions.SUBMIT_FORGET_PASSWORD,
    payload,
  };
}

export function getNotifications() {
  return {
    type: actions.GET_NOTIFICATIONS,
  };
}

export function setNotifications(payload) {
  return {
    type: actions.SET_NOTIFICATIONS,
    payload,
  };
}

export function setCategories(payload) {
  return {
    type: actions.SET_CATEGORIES,
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

export function setCompanies(payload) {
  return {
    type: actions.SET_COMPANIES,
    payload,
  };
}

export function setCompany(payload) {
  return {
    type: actions.SET_COMPANY,
    payload,
  };
}

export function getDesigner(payload) {
  return {
    type: actions.GET_DESIGNER,
    payload,
  };
}

export function getShopper(payload) {
  return {
    type: actions.GET_SHOPPER,
    payload,
  };
}

export function getCelebrity(payload) {
  return {
    type: actions.GET_CELEBRITY,
    payload,
  };
}

export function getCompany(payload) {
  return {
    type: actions.GET_COMPANY,
    payload,
  };
}

export function setDesigner(payload) {
  return {
    type: actions.SET_DESIGNER,
    payload,
  };
}

export function getProduct(payload) {
  return {
    type: actions.GET_PRODUCT,
    payload,
  };
}

export function getService(payload) {
  return {
    type: actions.GET_SERVICE,
    payload,
  };
}

export function getSearchProducts(payload) {
  return {
    type: actions.GET_SEARCH_PRODUCTS,
    payload,
  };
}

export function getSearchServices(payload) {
  return {
    type: actions.GET_SEARCH_SERVICES,
    payload,
  };
}

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

export function toggleClassifiedFavorite(payload) {
  return {
    type: actions.TOGGLE_CLASSIFIED_FAVORITE,
    payload,
  };
}

export function getBrand(payload) {
  return {
    type: actions.GET_BRAND,
    payload,
  };
}

export function setPlayerId(payload) {
  return {
    type: actions.SET_PLAYER_ID,
    payload,
  };
}

export function goBackBtn(payload) {
  return {
    type: actions.GO_BACK,
    payload,
  };
}

export function setDeviceId(payload) {
  return {
    type: actions.SET_DEVICE_ID,
    payload,
  };
}
export function getCategoryElements(payload) {
  return {
    type: actions.GET_CATEGORY_ELEMENTS,
    payload,
  };
}

export function setUsers(payload) {
  return {
    type: actions.SET_USERS,
    payload,
  };
}

export function getUser(payload) {
  return {
    type: actions.GET_USER,
    payload,
  };
}

export function getUsers(payload) {
  return {
    type: actions.GET_USERS,
    payload,
  };
}

export function getSearchCelebrities(payload) {
  return {
    type: actions.GET_CELEBRITIES,
    payload,
  };
}

export function getSearchDesigners(payload) {
  return {
    type: actions.GET_DESIGNERS,
    payload,
  };
}

export function getSearchCompanies(payload) {
  return {
    type: actions.GET_COMPANIES,
    payload,
  };
}

export function setCountry(payload) {
  return {
    type: actions.SET_COUNTRY,
    payload,
  };
}

export function setArea(payload) {
  return {
    type: actions.SET_AREA,
    payload,
  };
}

export function setCurrency(payload) {
  return {
    type: actions.SET_CURRENCY,
    payload,
  };
}
export function refetchUsers(payload) {
  return {
    type: actions.REFETCH_USERS,
    payload,
  };
}

export function showCountryModal() {
  return {
    type: actions.SHOW_COUNTRY_MODAL,
  };
}

export function hideCountryModal() {
  return {
    type: actions.HIDE_COUNTRY_MODAL,
  };
}

export function showAreaModal() {
  return {
    type: actions.SHOW_AREA_MODAL,
  };
}

export function hideAreaModal() {
  return {
    type: actions.HIDE_AREA_MODAL,
  };
}

export function goDeepLinking(payload) {
  return {
    type: actions.GO_DEEP_LINKING,
    payload,
  };
}

export function addToCart(payload) {
  return {
    type: actions.ADD_TO_CART,
    payload,
  };
}

export function submitCart(payload) {
  return {
    type: actions.SUBMIT_CART,
    payload,
  };
}
export function filterCart(payload) {
  return {
    type: actions.FILTER_CART,
    payload,
  };
}

export function clearCart() {
  return {
    type: actions.DO_CLEAR_CART_PROCESS,
  };
}

export function setItem(payload) {
  return {
    type: actions.SET_ITEM,
    payload,
  };
}

export function removeItem(payload) {
  return {
    type: actions.REMOVE_FROM_CART,
    payload,
  };
}

export function refetchHomeElements() {
  return {
    type: actions.REFETCH_HOME_ELEMENTS,
  };
}

export function getCoupon(payload) {
  return {
    type: actions.GET_COUPON,
    payload,
  };
}

export function removeCoupon() {
  return {
    type: actions.REMOVE_COUPON,
  };
}

export function register(payload) {
  return {
    type: actions.REGISTER,
    payload,
  };
}

export function setSearchParams(payload) {
  return {
    type: actions.SET_SEARCH_PARAMS,
    payload,
  };
}

export function resetStore() {
  return {
    type: actions.RESET_STORE,
  };
}

export function rateUser(payload) {
  return {
    type: actions.RATE_USER,
    payload,
  };
}

export function becomeFan(payload) {
  return {
    type: actions.BECOME_FAN,
    payload,
  };
}

export function showLoginModal() {
  return {
    type: actions.SHOW_LOGIN_MODAL,
  };
}

export function hideLoginModal() {
  return {
    type: actions.HIDE_LOGIN_MODAL,
  };
}

export function showCommentModal() {
  return {
    type: actions.SHOW_COMMENT_MODAL,
  };
}

export function hideCommentModal() {
  return {
    type: actions.HIDE_COMMENT_MODAL,
  };
}

export function addComment(payload) {
  return {
    type: actions.ADD_COMMENT,
    payload,
  };
}

export function reAuthenticate() {
  return {
    type: actions.REAUTHENTICATE,
  };
}

export function googleLogin() {
  return {
    type: actions.GOOGLE_LOGIN,
  };
}

export function googleRegister() {
  return {
    type: actions.GOOGLE_REGISTER,
  };
}

export function getSearchClassifieds(payload) {
  return {
    type: actions.GET_CLASSIFIEDS,
    payload,
  };
}

export function getClassified(payload) {
  return {
    type: actions.GET_CLASSIFIED,
    payload,
  };
}

export function storeClassified(payload) {
  return {
    type: actions.STORE_CLASSIFIED,
    payload,
  };
}

export function setProperties(payload) {
  return {
    type: actions.SET_PROPERTIES,
    payload,
  };
}

export function addToProperties(payload) {
  return {
    type: actions.ADD_TO_PROPERTIES,
    payload,
  };
}

export function startClassifiedSearching(payload) {
  return {
    type: actions.START_CLASSIFIED_SEARCHING,
    payload,
  };
}
