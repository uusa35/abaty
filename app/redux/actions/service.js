import * as actions from './types';

export function getService(payload) {
  return {
    type: actions.GET_SERVICE,
    payload,
  };
}

export function getSearchServices(payload) {
  return {
    type: actions.GET_SEARCH_SERVICES,
    payload,
  };
}
