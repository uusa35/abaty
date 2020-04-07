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

export function refetchHomeCategories() {
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

export function setDeepLinking(payload) {
  return {
    type: actions.SET_DEEP_LINKING,
    payload,
  };
}

export function refetchHomeElements() {
  return {
    type: actions.REFETCH_HOME_ELEMENTS,
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

export function toggleLoading(payload) {
  return {
    type: actions.TOGGLE_LOADING,
    payload,
  };
}

export function toggleResetApp(payload) {
  return {
    type: actions.TOGGLE_RESET_APP,
    payload,
  };
}
