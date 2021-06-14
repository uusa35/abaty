import * as actions from './types';

export function getCommercial(payload) {
  return {
    type: actions.GET_COMMERCIAL,
    payload,
  };
}

export function setCommercial(payload) {
  return {
    type: actions.SET_COMMERCIAL,
    payload,
  };
}
