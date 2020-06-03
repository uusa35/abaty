import {SET_SEARCH_PARAMS, REMOVE_SEARCH_PARAMS} from '../actions/types';

export default function (searchParams = {}, action) {
  switch (action.type) {
    case SET_SEARCH_PARAMS:
      return action.payload;
    case REMOVE_SEARCH_PARAMS:
      return {};
    default:
      return searchParams;
  }
}
