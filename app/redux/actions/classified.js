import * as actions from './types';

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

export function editClassified(payload) {
  return {
    type: actions.EDIT_CLASSIFIED,
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

export function startNewClassified(payload) {
  return {
    type: actions.START_NEW_CLASSIFIED,
    payload,
  };
}

export function toggleClassifiedFavorite(payload) {
  return {
    type: actions.TOGGLE_CLASSIFIED_FAVORITE,
    payload,
  };
}

export function getMyClassifieds(payload) {
  return {
    type: actions.GET_MY_CLASSIFIEDS,
    payload,
  };
}

export const getAllClassifieds = (payload) => ({
  type: actions.GET_ALL_CLASSIFIEDS,
  payload,
});

export const deleteClassified = (payload) => ({
  type: actions.DELETE_CLASSIFIED,
  payload,
});
