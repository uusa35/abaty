import * as actions from './types';

export function setCategories(payload) {
  return {
    type: actions.SET_CATEGORIES,
    payload,
  };
}

export const setCategory = (payload) => ({
  type: actions.SET_CATEGORY,
  payload,
});

export const setSubCategory = (payload) => ({
  type: actions.SET_SUB_CATEGORY,
  payload,
});

export function setCategoryAndGoToNavChildren(payload) {
  return {
    type: actions.SET_CATEGORY_AND_GO_TO_NAV_CHILDREN,
    payload,
  };
}

export function getCategoryElements(payload) {
  return {
    type: actions.GET_CATEGORY_ELEMENTS,
    payload,
  };
}

export function getHomeCategories(payload) {
  return {
    type: actions.GET_HOME_CATEGORIES,
    payload,
  };
}

export function getHomeUserCategories(payload) {
  return {
    type: actions.SET_HOME_USER_CATEGORIES,
    payload,
  };
}

export function getHomeClassifiedCategories(payload) {
  return {
    type: actions.SET_HOME_CLASSIFIED_CATEGORIES,
    payload,
  };
}
