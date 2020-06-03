import {SET_SEARCH_SERVICES} from '../actions/types';

export default function (searchServices = [], action) {
  switch (action.type) {
    case SET_SEARCH_SERVICES:
      return action.payload;
    default:
      return searchServices;
  }
}
