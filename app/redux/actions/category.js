import * as actions from './types';

export function setCategories(payload) {
  return {
    type: actions.SET_CATEGORIES,
    payload,
  };
}

export function setCategory(payload) {
  return {
    type: actions.SET_CATEGORY,
    payload,
  };
}

export function setSubCategory(payload) {
  return {
    type: actions.SET_SUB_CATEGORY,
    payload,
  };
}

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
