import {SET_SEARCH} from '../actions/types';

export default function(search = [], action) {
  switch (action.type) {
    case SET_SEARCH:
      return action.payload;
    default:
      return search;
  }
}
