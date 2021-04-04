import * as actions from './types';

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

export function register(payload) {
  return {
    type: actions.REGISTER,
    payload,
  };
}

export function companyRegister(payload) {
  return {
    type: actions.COMPANY_REGISTER,
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

export const setRole = (payload) => ({
  type: actions.SET_ROLE,
  payload,
});

export const setAddress = (payload) => ({
  type: actions.SET_ADDRESS,
  payload,
});

export const changeAddress = (payload) => ({
  type: actions.CHANGE_ADDRESS,
  payload,
});

export const updateAddress = (payload) => ({
  type: actions.UPDATE_ADDRESS,
  payload,
});

export const createAddress = (payload) => ({
  type: actions.CREATE_ADDRESS,
  payload,
});

export const deleteAddress = (payload) => ({
  type: actions.DELETE_ADDRESS,
  payload,
});
